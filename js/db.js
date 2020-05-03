// Initialize Firebase
var config = {
  apiKey: "AIzaSyAMNdtWVeedQ0-NOBTDPZpxVZcpxMcTnFE",
  authDomain: "eidenisk-data-collection.firebaseapp.com",
  databaseURL: "https://eidenisk-data-collection.firebaseio.com",
  projectId: "eidenisk-data-collection",
  storageBucket: "eidenisk-data-collection.appspot.com",
  messagingSenderId: "295312564384"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings)
firebase.auth().signOut();

var loginPassword = document.querySelector('#login-pass');
var loginButton = document.querySelector('#login-button');
var loginStatus = document.querySelector("#login-status");

$(document).ready(function() {
  const list = document.querySelector('#link-list');
  list.innerHTML = "";
  firestore.collection('8WGcnyFV0zfyFom12JzWOEGMODs2').get().then(function(snap) {
    snap.forEach(function(doc) {
      if(doc.data().name != "sample") {
        var text = '<li><a href="' + doc.data().link + '">' + doc.data().name + "</a></li>";
        list.innerHTML += text;
      }
    });
  });
});
