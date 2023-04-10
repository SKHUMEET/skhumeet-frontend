import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import firebaseconfig from "@/firebaseconfig.json";

const app = firebase.initializeApp(firebaseconfig);

const firestorage = getStorage(app);

export { firestorage };
