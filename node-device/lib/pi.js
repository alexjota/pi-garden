"use strict";

var Gpio = require('onoff').Gpio,
     light = new Gpio(14, 'out'),
     moist = new Gpio(17, 'in', 'both');

var readTemperature = function() {
    return 18 + (Math.random() * 10);
};

var readHumidity = function() {
    return (Math.random() * 100) + "%";
};

var lightOn = function(){
    light.writeSync(0);
    console.log("light is now ON");
};

var lightOff = function() {
    light.writeSync(1);
    console.log("light is now OFF");
};

var takePhoto = function() {
    // TODO
    return "../assets/photo.jpg";
};

var alertMoisture = function(err, state) {
    if (state === 0) {
        console.log("Moisture detected!");
        light.writeSync(1);
    }
    else if (state == 1) {
        console.log("Dry AF!");
        light.writeSync(0);
    }
};

var watchMoisture = function(onChange) {
    moist.watch(alertMoisture);
    moist.watch(onChange);
};

module.exports = {
    readTemperature: readTemperature,
    readHumidity: readHumidity,
    lightOn: lightOn,
    lightOff: lightOff,
    takePhoto: takePhoto,
    watchMoisture: watchMoisture
};