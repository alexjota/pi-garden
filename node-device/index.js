/// <reference path="../../../../typings/node/node.d.ts"/>
'use strict';

var setup = require('./lib/setup'),
    config = require('./lib/config'),
    commands = require('./lib/commands'),
    messagingClient = require('./lib/messaging');

// connect to IoT hub
messagingClient.initialize(config.iotHub.connectionString);

// report the ip
setup.reportIp(config.websiteHost, config.websitePath);

// setup the receiver
messagingClient.startReceiver(commands.commandsHandler);

// telemetry data send loop
setInterval(function(){
    var temp = commands.pi.readTemperature();
    var humidity = commands.pi.readHumidity();
    var data = JSON.stringify({ deviceId: config.iotHub.deviceId, event: "device-telemetry", temp: temp, humidity: humidity });
    
    // send event
    messagingClient.sendMessage(data);
    
}, config.iotHub.interval);

// watch and alert moisture changes
commands.pi.watchMoisture(function(err, state) {
    console.log("Moisture state: " + state);
    var data = JSON.stringify({deviceId: config.iotHub.deviceId, event:"moisture-change", state: state });
    messagingClient.sendMessage(data);
});


