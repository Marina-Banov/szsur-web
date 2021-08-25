import { createContext, useContext } from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { common } from "./constants";
import api from "./api";

export const FirebaseContext = createContext({});
export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export default class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.auth.onAuthStateChanged(() => {
      if (!!this.auth.currentUser) {
        this.auth.currentUser.getIdToken(false).then((token) => {
          api.setToken(token);
        });
      }
    });
    this.firestore = app.firestore();
    this.storage = app.storage().ref();
  }

  sendLoginLink = (email) => {
    return this.auth.sendSignInLinkToEmail(email, {
      url: "http://localhost:3000/email-verification",
      handleCodeInApp: true,
    });
  };

  verifyEmailLink = () => {
    const email = window.localStorage.getItem(
      common.LOCAL_STORAGE_LOG_IN_EMAIL
    );
    return this.auth.isSignInWithEmailLink(window.location.href) && !!email;
  };

  logInWithEmailLink = () => {
    const email = window.localStorage.getItem(
      common.LOCAL_STORAGE_LOG_IN_EMAIL
    );
    return this.auth.signInWithEmailLink(email, window.location.href);
  };

  logInWithGoogle = () => {
    const googleProvider = new app.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(googleProvider).then();
  };

  logOut = () => {
    this.auth.signOut().then();
  };

  loggedIn = () => {
    return !!this.auth.currentUser;
  };

  uploadFile = (filepath, file) => {
    return this.storage.child(filepath).put(file);
  };

  getImage = (filepath) => {
    return this.storage.child(filepath).getDownloadURL();
  };

  firestoreCreateBulk = (collectionName, payload, doc = this.firestore) => {
    const batch = this.firestore.batch();
    payload.forEach((p) => {
      const docRef = doc.collection(collectionName).doc();
      batch.set(docRef, Object.assign({}, p));
    });
    return batch.commit();
  };
}
