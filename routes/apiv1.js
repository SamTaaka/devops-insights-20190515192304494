var express = require('express');
var router = express.Router();
var REQUEST = require('request');

var request = REQUEST.defaults( {
    strictSSL: false
});


var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric";

exports.getWeather = function(req, res) {
	var city = req.query.zip;
	var aurl;
	if( (city === null) || (typeof(city) === 'undefined') ) {
		return res.status(400).send('zip missing');
	} else {
	    aurl = OPENWEATHERURL + '&q=' + city + ',nz';
	} //apparently and if/else can help? not sure though

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var lat = body.coord.lat;
    			var lon = body.coord.lon;
    			var response = {city: body.name, weather: weath, lati: body.coord.lat, long: body.coord.lon};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather', exports.getWeather);


exports.getWeatherByCoords = function(req, res) {
	var bothCoords = req.query.lat;
	if( (bothCoords === null) || (typeof(bothCoords) === 'undefined') ) {
		return res.status(400).send('coordinates are missing');
	}
	var aurl = OPENWEATHERURL + '&lat=' + req.query.lat + '&lon=' + req.query.lon;
	
	
	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "The coordinates are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var response = {city: body.name, weather: weath};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });
};
router.get('/getWeatherCoords', exports.getWeatherByCoords);


exports.router = router;