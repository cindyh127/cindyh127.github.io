var map, infoWindow;
var userLatitude = null;
var userLongitude = null;
var userEmail = null;
var userUid = null;


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
    initialFindOtherUsers();
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
            userUid = user.uid;
            console.log("email var updated")
            writeUserData(userEmail, userLatitude, userLongitude)
        }
    })
}

function writeUserData(email, latitude, longitude) {
  firebase.database().ref().child(`Users/${userUid}`).set({
    email: userEmail,
    location: new firebase.firestore.GeoPoint(latitude, longitude)
  });
  console.log("updated data")
}

function initialFindOtherUsers(){
  // firebase.database().ref('\interests').child("I would like to dine with").on('value', (snapshot) => {
  //   snapshot.forEach((child) => {
  //     console.log(child.key, child.val()); 
  //     this.intVal.push(child.val());
  //     console.log("intVal",this.intVal);
  //   });
  //   }
  // })
  var query = firebase.database().ref().child(`Users/${userUid}`).orderByKey();
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        console.log(childData);
        console.log("i tried");
    });
  });
//   var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// starCountRef.on('value', function(snapshot) {
//   updateStarCount(postElement, snapshot.val());
// });
}
