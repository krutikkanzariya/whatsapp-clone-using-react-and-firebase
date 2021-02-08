import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAE-_rqcSgKv3SR_RehRnz-okNnTUnV_l4",
    authDomain: "whatsapp-clone-ceee9.firebaseapp.com",
    projectId: "whatsapp-clone-ceee9",
    storageBucket: "whatsapp-clone-ceee9.appspot.com",
    messagingSenderId: "823074755126",
    appId: "1:823074755126:web:a2066a1dadd70d460a7e97",
    measurementId: "G-PPLSYV9KW3"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export {auth, provider};