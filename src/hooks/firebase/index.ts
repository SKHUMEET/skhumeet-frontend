import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getStorage } from "firebase/storage";

const firebaseconfig = {
  apiKey: process.env.NEXT_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_FIREBASE_APPID,
};

const app = firebase.initializeApp(firebaseconfig);

const firestorage = getStorage(app);

export { firestorage };
