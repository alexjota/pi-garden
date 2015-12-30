'use strict';

var request = require('request');
var config = require('./config');
var messagingClient = require('./messaging');
var code = "";
var accessToken = "";
var intervalId;

// Private methods
// Poll awaiting authn response from facebook
var poll = function(appId){
  console.log("polling");
  var params = {
    type: "device_token",
    client_id: appId,
    code: code
  };

  request.post({url: "https://graph.facebook.com/oauth/device", qs: params}, function(err, resp, body){
      if (err) return console.error("Error polling: ", err);
      body = JSON.parse(body);
      if (body.error){
        return console.error("Error returned from polling: ", body.error);
      }

      accessToken = body.access_token;
      console.log("access token: " + accessToken);
      
      // stop the polling
      clearInterval(intervalId);
  });
};

// Public API
// Connect to facebook
var connect = function(appId) {
  var url = "https://graph.facebook.com/oauth/device";
  var params = {
    type: "device_code",
    client_id: appId,
    scope: "public_profile,publish_actions,user_photos"
  };

  // Send the request
  request.post({url: url, qs: params}, function(err, resp, body) {
    // Handle any errors that occur
    if (err) {
      return console.error("Error occured: ", err);  
    } 
    
    body = JSON.parse(body);
    if (body.error) {
      return console.error("Error returned from facebook: ", body.error);  
    } 

    // show code
    console.log(body);
    code = body.code;
    
    // report code to website
    var message = {
        deviceId: config.deviceId,
        command: "login-code",
        code: body.user_code
    };
    
    messagingClient.sendMessage(JSON.stringify(message));
    
    // start poll mechanism
    intervalId = setInterval(function() {
        poll(appId);
    }, 10000);
  });
};

// Post to the facebook timeline.
var postToTimeline = function(message){
  // Specify the URL and query string parameters needed for the request
  var url = 'https://graph.facebook.com/me/feed';
  var params = {
      access_token: accessToken,
      message: message
  };

  // Send the request
  request.post({url: url, qs: params}, function(err, resp, body) {
    // Handle any errors that occur
    if (err){
        return console.error("Error occured: ", err);
    }
    
    body = JSON.parse(body);
    if (body.error){
        return console.error("Error returned from facebook: ", body.error);
    } 

    // Generate output
    console.log("Message has been posted to your feed");
  });
};

var postPhotoToTimeline = function(photoPath, caption) {
  // Specify the URL and query string parameters needed for the request
  var url = 'https://graph.facebook.com/me/photos';
  var params = {
      access_token: accessToken,
      caption: caption,
      url: photoPath
  };

  // Send the request
  request.post({url: url, qs: params}, function(err, resp, body) {
    // Handle any errors that occur
    if (err){
        return console.error("Error occured: ", err);
    }
    
    body = JSON.parse(body);
    if (body.error){
        return console.error("Error returned from facebook: ", body.error);
    } 

    // Generate output
    console.log("Message has been posted to your feed");
  });
};

module.exports = {
  connect : connect,
  postToTimeline : postToTimeline,
  postPhotoToTimeline : postPhotoToTimeline
};
