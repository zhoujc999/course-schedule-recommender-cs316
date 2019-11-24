import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBlQVjQoto6uNR50GGQ8Wae0q8ZidQXExs",
  authDomain: "course-schedule-recommender.firebaseapp.com",
  databaseURL: "https://course-schedule-recommender.firebaseio.com",
  projectId: "course-schedule-recommender",
  storageBucket: "course-schedule-recommender.appspot.com",
  messagingSenderId: "887967754562",
  appId: "1:887967754562:web:30abe3545abe567fd740db",
  measurementId: "G-YNBQT4EPQ1"
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
