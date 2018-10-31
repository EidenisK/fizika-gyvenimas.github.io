// Initialize Firebase
var config = {
  apiKey: "AIzaSyCKicExv6QeyIA3F67nQleHmq_OL_GwsoQ",
  authDomain: "fizika-tai-gyvenimas.firebaseapp.com",
  databaseURL: "https://fizika-tai-gyvenimas.firebaseio.com",
  projectId: "fizika-tai-gyvenimas",
  storageBucket: "fizika-tai-gyvenimas.appspot.com",
  messagingSenderId: "814832455967"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings)
firebase.auth().signOut();

var loginPassword = document.querySelector('#login-pass');
var loginButton = document.querySelector('#login-button');
var loginStatus = document.querySelector("#login-status");

$(document).ready(function() {
  const list = document.querySelector('#link-list');
  list.innerHTML = "";
  firestore.collection('nuorodos').get().then(function(snap) {
    snap.forEach(function(doc) {
      if(doc.data().name != "sample") {
        var text = '<li><a href="' + doc.data().link + '">' + doc.data().name + "</a></li>";
        list.innerHTML += text;
      }
    });
  });
});
