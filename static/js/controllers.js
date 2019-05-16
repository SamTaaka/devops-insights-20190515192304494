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

	var arrayMark = [0,0,0,0];
	var index;
	
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
	
		function startMap(){
		$scope.map = new google.maps.Map(document.getElementById('map'), {
		zoom: 6,
		center: { lat: -37.7870, lng: 175.2793 }
	});
	
	    $scope.map.addListener('click', function(e){
		marker(index, e.latLng.lat(), e.latLng.lng());
		weatherMark(e.latLng.lat(), e.latLng.lng());
	 });
    } //end function to set up the map
	
	function marker(i, latitude, longitude){
		console.log("The index is currently: " + index);
		console.log("Latitude: " + latiude + typeof latitude + ", Longitude: " + longitude + typeof longitude);
		var myCoords = new google.mapsLatLng(latitude, longitude);
		var mark = new google.maps.Marker({
			position: myCoords,
			map: $scope.map,
			title: i.toString()
		});
		
		//trying to see if this method can check if an index is already in the array
		if(arrayMark[i-1] !== 0){
			arrayMark[i-1].setMap(null);
		} //end if statement
		
		$scope.map.panTo(myCoords);
		index = i;
		console.log("New index is now: " + index);
		arrayMark[i-1] = mark;
	} //end marker function
	
	    function weatherMark(latitude, longitude){
    	
    	if(latitude !== undefined && longitude !== undefined){
    		$http({
    			method: "GET",
    			url: '/api/v1/getWeatherByCoords?lat=' + latitude + '&lng=' + longitude
    		}).then(function(response) {
    			if(index === 1){
    				$scope.zip1City = response.data.city;
    				$scope.zip1Weather = response.data.weather;
    			} else if(index === 2){
    	            $scope.zip2City = response.data.city;
    				$scope.zip2Weather = response.data.weather;
    			}
    			 else if(index === 3){
    	            $scope.zip3City = response.data.city;
    				$scope.zip3Weather = response.data.weather;
    			}
    			 else if(index === 4){
    	            $scope.zip4City = response.data.city;
    				$scope.zip4Weather = response.data.weather;
    			} //end last else if
    		}); //end section of if statements	
    	} //end if statement
    	else{
    		if(index === 1){
    			$scope.zip1City = "";
    			$scope.zip1Weather = "";
    			$scope.zip1lat = "";
    			$scope.zip1lon = "";
    		} else if(index === 2){
    			$scope.zip2City = "";
    			$scope.zip2Weather = "";
    		} else if(index === 3){
    			$scope.zip3City = "";
    			$scope.zip3Weather = "";
    		} else if(index === 4){
    			$scope.zip4City = "";
    			$scope.zip4Weather = "";
    		} //end last else if
    	} //end else
    } //end function
    
    

	
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
   
   startMap();
   
    
    //mapInfo.open(map, mark);
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
        
        

        if(data.length > 0) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
            	var latLong = nul;
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    $scope.zip1lat = response.data.lat;
                    $scope.zip1lon = response.data.lon;
                    marker(1, response.data.lat, response.data.lon);
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    marker(2, response.data.lat, response.data.lon);
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    marker(3, response.data.lat, response.data.lon);
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    marker(4, response.data.lat, response.data.lon);
                } //end last else if      
            }); //end the function(response) thingy
            
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                    $scope.zip1lat = "";
                    $scope.zip1lon = "";
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                }  //end the last else if
        } //end else
    }; //end function
    
}]); //donezies