'use strict';

var os = require('os'),
    messagingClient = require('./messaging'),
    config = require('./config');
 
// Private methods
var getIp = function() {
  var ifaces = os.networkInterfaces();
  var ip;
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        ip = iface.address;
      } else {
        // this interface has only one ipv4 adress
        ip = iface.address;
      }
      ++alias;
    });
  });

  return ip;
};

// Public API
var reportIp = function(host, path){
  // get ip addressvar ifaces = os.networkInterfaces();
  var ip = getIp();
  console.log(ip);
  
  // report ip to the website
  var message = {
      deviceId: config.iotHub.deviceId,
      command: "device-ip",
      ip: ip
  };
  
  messagingClient.sendMessage(JSON.stringify(message)); 
};

module.exports = {
  reportIp: reportIp
};
