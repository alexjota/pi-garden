'use strict';

var config = require('./config');
var pi = require('./pi');
var social = require('./social');

var commandHandler = function(msg) {
    if (msg){
      console.log('Id: ' + msg.properties.messageId + ' Body: ' + msg.body);
      
      switch (msg.body) {
          case "connect-fb":
            social.connect(config.appId);
            break;
          case "post-fb":
            social.postToTimeline("hello pi + node + facebook + iot hub");
            break;
          case "post-photo-fb":
            postPhotoFb("test caption");
            break;
          case "light-on":
            pi.lightOn();
            break;
          case "light-off":
            pi.lightOff();
            break;
          default:
            console.log("no command was mapped");
      }
    }
};

var postPhotoFb = function(caption) {
    var photo = pi.takePhoto();
    social.postPhotoToTimeline(photo, caption);
};

module.exports = {
    commandsHandler : commandHandler,
    pi: pi
};