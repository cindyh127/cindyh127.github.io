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

var googleProfilePic;
var googleDisplayName;
var googleEmail;


function signInWithGoogle(){
    var googleAuthProvider =  new firebase.auth.GoogleAuthProvider
    firebase.auth().signInWithPopup(googleAuthProvider)
            .then( function(data){
                console.log(data);
                googleProfilePic = data.user.photoURL;
                googleDisplayName = data.user.displayName;
                googleEmail = data.user.email;

            })
            .catch( function(error){
                console.log(error);
            })

}