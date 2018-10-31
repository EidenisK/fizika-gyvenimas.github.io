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

$(document).ready(function() {
  var loginPassword = document.querySelector('#login-pass');
  var loginButton = document.querySelector('#login-button');
  var loginStatus = document.querySelector("#login-status");

  const list = document.querySelector('#link-list');
  const mainListContainer = document.querySelector('#main-list');
  const mainLoginContainer = document.querySelector('#main-login');

  loadMessages();

  loginButton.addEventListener("click", function(e) {
    var pass = loginPassword.value;
    firebase.auth().signInWithEmailAndPassword('eidenis.gargzdai@gmail.com', pass).then(function() {
      loginStatus.innerHTML = "Būsena: PRISIJUNGTA";
    }).catch(function(error) {
      // Handle Errors here.
      loginStatus.innerHTML = "Būsena: KLAIDA - " + error.message;
      // ...
    });
  });

  const inputText = document.querySelector("#sendTextInput");
  const saveButton = document.querySelector("#sendTextButton");
  const loadButton = document.querySelector('#load');
  const linkText = document.querySelector('#sendLinkInput');

  loadButton.addEventListener("click", function(e) {
    loadMessages();
  })

  saveButton.addEventListener("click", function () {
    var text_status = document.getElementById("text_status");
    //CHECK LOGIN
    var user = firebase.auth().currentUser;

    if (!user) {
      // User is not signed in.
      text_status.innerHTML = "Būsena: KLAIDA - NEPRISIJUNGTA";
      return;
    }

    text_status.innerHTML = "Būsena: SIUNČIAMA";
    var docRef = firestore.doc("nuorodos/" + linkText.value);
    docRef.set( {
      name: inputText.value,
      link: linkText.value
    }).then(function() {
      text_status.innerHTML = "Būsena: NUSIŲSTA";
    }).catch(function(error) {
      text_status.innerHTML = "Būsena: KLAIDA - " + error.message;
    });
  });
});

function loadMessages() {
  var list = document.querySelector('#link-list');
  firestore.collection('nuorodos').get().then(function(snap) {
      list.innerHTML = "";
      snap.forEach(function(doc) {
        if(doc.data().name != "sample") {
          var text = '<li><a href="' + doc.data().link + '">' + doc.data().name + "</a>" + '<u onclick="delete_messages(' + "'" + doc.id + "'" + ')">IŠTRINTI</u></li>';
          list.innerHTML += text;
        }
      });
    });
}

function delete_messages(document_id) {
  firestore.doc("nuorodos/" + document_id).delete();
  loadMessages();
}
