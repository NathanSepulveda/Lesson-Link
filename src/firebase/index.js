import firebase from "firebase/app"
import "firebase/storage"

var config = {
    apiKey: "AIzaSyA9aRF0SL54FUkPg0wi_UoEOedrNPiEB60",
    authDomain: "lesson-link.firebaseapp.com",
    databaseURL: "https://lesson-link.firebaseio.com",
    projectId: "lesson-link",
    storageBucket: "lesson-link.appspot.com",
    messagingSenderId: "428674323146"
  };
  firebase.initializeApp(config);

  const storage =  firebase.storage()

  export {
      storage, firebase as default 
  }