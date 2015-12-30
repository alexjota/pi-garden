'use strict';

var device = require('azure-iot-device');
var connectionString;
var client;

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res);
  };
}

// Public API
var initialize = function (connectionString) {
    client = device.Client.fromConnectionString(connectionString, device.Amqp);
};

var sendMessage = function(data) {
    // Create a message and send it to the IoT Hub
    var message = new device.Message(data);
    message.properties.add('myproperty', 'myvalue');
    console.log("Sending message: " + message.getData());
    client.sendEvent(message, printResultFor('send'));
};

var startReceiver = function(messageHandler) {
    client.getReceiver(function (err, receiver){
        receiver.on('message', function (msg) {
            // TODO: need to validate message and not accept it blindly
            messageHandler(msg);
            
            receiver.complete(msg, function() {
            console.log('completed');
            });
            // receiver.reject(msg, function() {
            //   console.log('rejected');
            // });
            // receiver.abandon(msg, function() {
            //   console.log('abandoned');
            // });
        });
        receiver.on('errorReceived', function(err) {
            console.warn(err);
        });
    });
};

module.exports = {
    initialize: initialize,
    sendMessage: sendMessage,
    startReceiver: startReceiver
};