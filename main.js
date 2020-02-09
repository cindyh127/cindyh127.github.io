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

 function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        console.log("this ran");
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        window.location.href = "profile.html";
}

function init() {
  gapi.load('auth2', function() {
    /* Ready. Make a call to gapi.auth2.init or some other API */
  });
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
 }
function test(){
    console.log("test worked");
}

function signInWithGoogle(){
    var googleAuthProvider =  new firebase.auth.GoogleAuthProvider
    firebase.auth().signInWithPopup(googleAuthProvider)
            .then( function(data){
                console.log(data);
            })
            .catch( function(error){
                console.log(error);
            })

}