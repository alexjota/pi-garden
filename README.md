# pi-garden
My Internet of Plants project. RaspberryPi + Node + Azure

The objective of this project is to learn and tackle common IoT challenges like security, device provisioning, device management, data ingestion, data processing and having fun.

# node-device
The device (Raspberry Pi + sensors, using Node) pushes telemetry data to the cloud (temperature, humidity...) and receives commands all through Azure IoT Hubs. Also playing with Facebook integration and testing device login flow. 

# website
IoTHubListener: receives events from devices and pushes alerts to the website using SignalR

RaspberryPiSetup: can send commands to the device such as toggling light, start Facebook device login flow, post text to Facebook.
