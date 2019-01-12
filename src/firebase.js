import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";

//see official docs for more info
var config = {
  apiKey: "AIzaSyD20wARC_8RRygsk_Y1TBy-uD4hOEog-tY",
  authDomain: "reactjs-houstonrockets.firebaseapp.com",
  databaseURL: "https://reactjs-houstonrockets.firebaseio.com",
  projectId: "reactjs-houstonrockets",
  storageBucket: "reactjs-houstonrockets.appspot.com",
  messagingSenderId: "492311369219"
};
firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseGames = firebaseDB.ref("games");
const firebasePromotion = firebaseDB.ref("promotion");
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");

//for testing
// firebaseDB.ref("games").once("value")
//   .then((snapshot) => {
//     console.log(snapshot.val());
//   })

export {
  firebase,
  firebaseDB,
  firebaseGames,
  firebasePromotion,
  firebaseTeams,
  firebasePlayers
}