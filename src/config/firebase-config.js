import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/analytics"

const firebaseConfig = {
    apiKey: "AIzaSyAkwgam2TfcnYuErdzTvWMRptj2rI9U4J0",
    authDomain: "saint-seeing-5d426.firebaseapp.com",
    projectId: "saint-seeing-5d426",
    storageBucket: "saint-seeing-5d426.appspot.com",
    messagingSenderId: "1012597148133",
    appId: "1:1012597148133:web:d1ab6d32809140cc75870c",
    measurementId: "G-0G9XHJEH6X"
};

const app = firebase.initializeApp(firebaseConfig);
//firebase.analytics();
export const db = getFirestore(app);