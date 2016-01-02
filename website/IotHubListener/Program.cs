namespace IotHubListener
{
    using System;
    using System.Configuration;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.ServiceBus.Messaging;
    using IotHubClient;

    class Program
    {
        static string iotHubD2cEndpoint = "messages/events";
        static EventHubClient eventHubClient;
        static HubClient hubClient;

        static void Main(string[] args)
        {
            // Start SignalR hub client
            var hubUrl = ConfigurationManager.AppSettings["signalrHubUrl"];
            hubClient = new HubClient(hubUrl);
            hubClient.StartAsync().Wait();

            // Listen to device events
            Console.WriteLine("Receive messages\n");
            eventHubClient = EventHubClient.CreateFromConnectionString(ConfigurationManager.AppSettings["iotHubConnectionString"], iotHubD2cEndpoint);

            var d2cPartitions = eventHubClient.GetRuntimeInformation().PartitionIds;

            foreach (string partition in d2cPartitions)
            {
                ReceiveMessagesFromDeviceAsync(partition);
            }
            Console.ReadLine();
        }

        private async static Task ReceiveMessagesFromDeviceAsync(string partition)
        {
            var eventHubReceiver = eventHubClient.GetDefaultConsumerGroup().CreateReceiver(partition, DateTime.Now);
            while (true)
            {
                EventData eventData = await eventHubReceiver.ReceiveAsync();
                // TODO: do not blindly accept messages. Validate.
                if (eventData == null) continue;

                string data = Encoding.UTF8.GetString(eventData.GetBytes());
                Console.WriteLine(string.Format("Message received. Partition: {0} Data: '{1}'", partition, data));

                // TODO: Route event to appropriate handler, cleanup data and send
                // code: report ip and code to website
                await hubClient.SendUpdateAsync(data);
            }
        }
    }
}
