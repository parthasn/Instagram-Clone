import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD7npQPYuzos4gtwlUez90BF5HBaT_xm94",
    authDomain: "instagram-clone-react-a5148.firebaseapp.com",
    projectId: "instagram-clone-react-a5148",
    storageBucket: "instagram-clone-react-a5148.appspot.com",
    messagingSenderId: "382187718987",
    appId: "1:382187718987:web:3a3e5d15a4e1d65b4f80ce",
    measurementId: "G-01XZQ2R6QH"
});

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }