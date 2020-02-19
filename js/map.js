var map, infoWindow;
var userLatitude = null;
var userLongitude = null;
var userEmail = null;


var firebaseConfig = {
      apiKey: "AIzaSyBcVVdPGLwEPBSNAhGLTLEx_pWXzq4ccEk",
      authDomain: "circle-6d0a3.firebaseapp.com",
      databaseURL: "https://circle-6d0a3.firebaseio.com",
      projectId: "circle-6d0a3",
      storageBucket: "circle-6d0a3.appspot.com",
      messagingSenderId: "327413279613",
      appId: "1:327413279613:web:8ecba9a32e022106707a14",
      measurementId: "G-N6M24KH95H"
};
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

window.onload = function() {
    checkIfLoggedIn();
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
    });

    infoWindow = new google.maps.InfoWindow;

    //Try HTML5 geolocation
    if(navigator.geolocation){
    	navigator.geolocation.getCurrentPosition(function(position){
    		var pos = {
    			lat : position.coords.latitude,
    			lng : position.coords.longitude
    		};
            
            //set variables for lat and lng to store in firebase
            userLatitude = position.coords.latitude
            userLongitude = position.coords.longitude

            //store data to firebase --> later will do this on a seperate page or at least a button
            //checkIfLoggedIn();
            // if(userEmail!=null){
            //   writeUserData(userEmail, userLatitude, userLongitude)
            // } 
            // else{
            //   console.log("user email is null")
            // }


    		infoWindow.setPosition(pos);
    		infoWindow.setContent('You');
    		infoWindow.open(map);
            map.setCenter(pos);
    	}, function(){
    		handleLocationError(true, infoWindow, map.getCenter());
    	});
    } else{
    	//browser doensn't support geolocation
    	handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                           'Error: The Geolocation service failed.' :
                           'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            userEmail = user.email; 
            console.log("email var updated")
            writeUserData(userEmail, userLatitude, userLongitude)
        }
    })
}

function writeUserData(email, latitude, longitude) {
  firebase.database().ref().child("Users").child(userEmail).set({
    //email: userEmail,
    location: new firebase.firestore.GeoPoint(latitude, longitude)
  });
  console.log("updated data")
}
