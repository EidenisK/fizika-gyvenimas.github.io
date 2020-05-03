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

$(document).ready(function() {
  var loginPassword = document.querySelector('#login-pass');
  var loginButton = document.querySelector('#login-button');
  var loginStatus = document.querySelector("#login-status");

  const list = document.querySelector('#link-list');
  const mainListContainer = document.querySelector('#main-list');
  const mainLoginContainer = document.querySelector('#main-login');

  $('#edit_row').hide();
  $('#link-list-main').hide();

  loginButton.addEventListener("click", function(e) {
    var pass = loginPassword.value;
    firebase.auth().signInWithEmailAndPassword('fizika_gyvenimas@gmail.com', pass).then(function() {
      loginStatus.innerHTML = "Būsena: PRISIJUNGTA";
      $('#edit_row').show();
      $('#login_row').hide();
      $('#link-list-main').show();
      loadMessages();
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
    var docRef = firestore.doc("8WGcnyFV0zfyFom12JzWOEGMODs2/" + inputText.value);
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
  firestore.collection('8WGcnyFV0zfyFom12JzWOEGMODs2').get().then(function(snap) {
      list.innerHTML = "";
      snap.forEach(function(doc) {
        if(doc.data().name != "sample") {
          var text = '<li><a href="' + doc.data().link + '">' + doc.data().name + "</a>" + ' <u onclick="delete_messages(' + "'" + doc.id + "'" + ')">IŠTRINTI</u></li>';
          list.innerHTML += text;
        }
      });
    });
}

function delete_messages(document_id) {
  firestore.doc("8WGcnyFV0zfyFom12JzWOEGMODs2/" + document_id).delete();
  loadMessages();
}
