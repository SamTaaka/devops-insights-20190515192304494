(function () {

    'use strict';

    var apiv1 = require('../../routes/apiv1');
    var assert = require('chai').assert;
    var REQUEST = require('request');

    var request = REQUEST.defaults( {
        strictSSL: false
    });

    var appUrl = process.env.APP_URL;

    describe('Get Weather', function() {

    	
    	it('with valid city name', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather?zip=Hamilton'
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              assert(pbody.city === 'Hamilton', "City name does not match");
              done();
            }
        });
    	});

      it('without city name', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather'
          }, /* @callback */ function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 400);
              done();
            }
        });
    	});

		it('with nonexistant city', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather?zip=hamk'
          }, /* @callback */ function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 400);
              done();
            }
        });
    	});
    	
    	
    	it('with unexpected character cases in an otherwise valid input', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather?zip=hamiLTOn'
          }, /* @callback */ function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              assert(pbody.city === 'Hamilton', "City name does not match");
              done();
            }
        });
    	});
    	
    });
    
    /*try without
     //fvt test for using latlng
    describe('Get weather by coords', function(){
    	var lat = -37.7870;
    	var lon = 175.2793;
    	var both = lat + '&lon=' + lon;
    	it('with valid cords', function(done){
    		if(!appUrl) {
            	assert.fail("Environment variable APP_URL is not defined");
            	return done();
        	}
        	request({
        		method: 'GET',
        		url: appUrl + '/api/v1/getWeatherByCoords?lat=' + both
        	}, function(err, resp, body){
        		if(err){
        			assert.fail('Failed to get the response');
        		} else{
        			assert.equal(resp.statusCode, 200);
        			var pbody = JSON.parse(body);
        			assert(pbody.city === 'Hamilton', "City name does not match");
        			done();
        		}
        	});
    	});
    	
    	it('without coords', function(done){
    		if(!appUrl) {
            	assert.fail("Environment variable APP_URL is not defined");
            	return done();
        	}
        	request({
        		method: 'GET',
        		url: appUrl + '/api/v1/getWeatherByCoords?lat='
        	}, function(err, resp, body){
        		if(err){
        			assert.fail('Failed to get the response');
        		} else{
        			assert.equal(resp.statusCode, 400);
        			done();
        		}
        	}
        	);
    	});
    	
    	it('with another valid coords', function(done){
    		if(!appUrl) {
            	assert.fail("Environment variable APP_URL is not defined");
            	return done();
        	}
        	request({
        		method: 'GET',
        		url: appUrl + '/api/v1/getWeatherByCoords?lat=' + both
        	}, function(err, resp, body){
        		if(err){
        			assert.fail('Failed to get the response');
        		} else{
        			assert.equal(resp.statusCode, 200);
        			var pbody = JSON.parse(body);
        			assert(pbody.city === 'Hamilton', "City name does not match");
        			done();
        		}
        	});
    	});
    });
    
    */
    
    
   

})();