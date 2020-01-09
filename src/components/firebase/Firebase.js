import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: ###INSERT KEY###,
  authDomain: ###INSERT KEY###,
  databaseURL: ###INSERT KEY###,
  projectId: ###INSERT KEY###,
  storageBucket: ###INSERT KEY###,
  messagingSenderId: ###INSERT KEY###,
  appId: ###INSERT KEY###,
  measurementId: ###INSERT KEY###
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }


/** Firebase Auth API **/
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordupdate = password => this.auth.currentUser.updatePassword(password);
  doRetrieveToken = () => this.auth.currentUser.getIdToken(true);
}

export default Firebase;
