var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

//declare variables
var arrayMarks = [];
var map;


/*Don't actually need
	var mapInfo = new google.maps.InfoWindow({
		content: "Hi"
	});
	*/
	
	/*Don't need either
	var map = new google.maps.Map(document.getElementById('googleMap'), {
		zoom: 6,
		center: {lat: -37.7870, lon: 175.2793 }
	});
	*/ 
	

		//function intialises the map and centres it on the library at uni
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -37.7870, lng: 175.2793 },
          zoom: 8
        });
        
        	map.addListener('click', function(e) {
        		var index;
		    	for(index = 1; index < arrayMarks.length; index++){	//find next available array position
		    		if(arrayMarks[index] === null)
		    			break;
	    		}

		    	var coord = {lat: e.latLng.lat, lon: e.latLng.lng};
		    	addMarker(coord, index);
			});
      }

	function addMarker(latLng, placement){
		var marker = new google.maps.Marker({
          position: {lat: latLng.lat, lng: latLng.lon},
          map: map,
          title: placement.toString()
        });
        
        arrayMarks[placement] = marker;
	}
	
	function deleteMarker(placement){
		arrayMarks[placement].setMap(null);
		arrayMarks[placement] = null;
	}
	
	
	/*
	google.maps.event.addListener(map, 'click', function(event){
		mark = new google.maps.Marker({position: event.bothCoords, map: map});
		var city;
		var lat = event.bothCoords.lat();
		var lon = event.bothCoords.lon();
		var coords = lat + '&lon=' + lon;
	
	$http({
                method: "GET",
                url: '/api/v1/getWeatherByCoords?lat=' + coords
            }).then( function(response){
            	$scope.zip1Weather = response.data.weather;
            	$scope.zip1City = response.data.city;
            	$scope.zip1m = '';
            });
    });
    */
   

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";

    $scope.zip = function(which) {

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

        if(data.length > 1) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
            	var coords = response.data.coord;
                if(which === 1) {
                    $scope.zip1Weather = response.data.weather;
                    $scope.zip1City = response.data.coord.lat + ',' + response.data.coord.lon; 
                    addMarker(response.data.coord, which);
                } else if(which === 2) {
                    $scope.zip2City = response.data.coord.lat + ',' + response.data.coord.lon;
                    $scope.zip2Weather = response.data.weather;
                    addMarker(response.data.coord, which);
                } else if(which === 3) {
                    $scope.zip3City = response.data.coord.lat + ',' + response.data.coord.lon;
                    $scope.zip3Weather = response.data.weather;
                    addMarker(response.data.coord, which);
                } else if(which === 4) {
                    $scope.zip4City = response.data.coord.lat + ',' + response.data.coord.lon;
                    $scope.zip4Weather = response.data.weather;
                    addMarker(response.data.coord, which);
                } 
            });
        }else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                    deleteMarker(which);
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                    deleteMarker(which);
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                    deleteMarker(which);
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                    deleteMarker(which);
                } 
        }
    };
    
}]);