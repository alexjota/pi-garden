# pi-garden
My Internet of Plants project. Raspberry Pi + Node + Azure

The objective of this project is to learn and tackle common IoT challenges like security, device provisioning, device management, data ingestion, data processing and having fun with my Raspberry Pi

## node-device
The device (Raspberry Pi + sensors, using Node) pushes telemetry data to the cloud (temperature, humidity...) and receives commands all through Azure IoT Hubs. Also playing with Facebook integration and testing device login flow for posting stuff through the device.

## website
IoTHubListener: receives events from devices and pushes alerts to the website using SignalR. Still lots to be done.

RaspberryPiSetup: can send commands to the device such as toggling light, start Facebook device login flow, post to Facebook, because awesome.

## minimum requirements
To test the device you will need:
- a RaspberryPi running Node.js
- a moisture sensor, a led, resistor and breadboard
- an Azure IoT Hub
- the awesome [Device Explorer](https://github.com/Azure/azure-iot-sdks/blob/master/tools/DeviceExplorer/doc/how_to_use_device_explorer.md) tool for a quicker setup, device provisioning, monitoring events, sending commands to device, etc.

## setup
[todo]
