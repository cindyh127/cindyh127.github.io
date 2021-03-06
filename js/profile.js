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
    checkIfLoggedIn()
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

function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            console.log("user signed in");
            //update html elements with user info
            var photoURL = user.photoURL;
            document.getElementById('profile-pic')
                .setAttribute('src', photoURL);
            var displayName = user.displayName;
            document.getElementById('display-name').innerHTML = displayName;
            var email = user.email;
            document.getElementById('email').innerHTML = email;  
        }
    })
}
