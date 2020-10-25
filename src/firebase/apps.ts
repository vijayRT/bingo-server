import * as admin from 'firebase-admin';

var serviceAccount = require("./chill-bingo-yg-firebase-adminsdk-5oqoh-d0290f8b9e.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chill-bingo-yg.firebaseio.com"
});

export const firestoreApp = firebaseApp.firestore()
export const firebaseAuthApp = firebaseApp.auth()
