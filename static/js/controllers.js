var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);


ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";

	var w,x,y,z;
	var mark;
	var mapInfo = new google.maps.InfoWindow({
		content: "Hi"
	});
	
	var map = new google.maps.Map(document.getElementById('googleMap'), {
		zoom: 6,
		center: {lat: -37.788, lon: 175.318 }
	});
	
	google.maps.event.addListener(map, 'click', function(event){
		mark = new google.maps.Marker({position: event.bothCoords, map: map});
		var city;
		var lat = event.bothCoords.lat();
		var lon = event.bothCoords.lon();
		var coords = lat + '&lon=' + lon;
	})
	
	$http({
                method: "GET",
                url: '/api/v1/getWeatherByLatLng?lat=' + coords
            }).then( function(response){
            	$scope.zip1Weather = response.data.weather;
            	$scope.zip1City = response.data.city;
            	$scope.zip1m = '';
            });
    });
    
    mapInfo.open(map, mark);
    $scope.zip = function(which);
	

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 
        
        

        if(data.length > 0) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
            	var latLong = nul;
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    latLong = {lat: response.data.la, lon: response.data.lo};
                    w = new google.maps.Marker({
                    	position: latLong,
                    	map: map,
                    });
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                     latLong = {lat: response.data.la, lon: response.data.lo};
                    x = new google.maps.Marker({
                    	position: latLong,
                    	map: map,
                    });
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                     latLong = {lat: response.data.la, lon: response.data.lo};
                    y = new google.maps.Marker({
                    	position: latLong,
                    	map: map,
                    });
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                     latLong = {lat: response.data.la, lon: response.data.lo};
                     z = new google.maps.Marker({
                    	position: latLong,
                    	map: map,
                    });
                } 
            });
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                    w.setVisible(false);
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                    x.setVisible(false);
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                    y.setVisible(false);
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                    z.setVisible(false);
                } 
        }
    };
}]);