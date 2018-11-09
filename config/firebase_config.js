import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAn0CvsUh_-WjorQiszj8tZRJ-Vd1c1REU",
  authDomain: "maps-f0784.firebaseapp.com",
  databaseURL: "https://maps-f0784.firebaseio.com",
  projectId: "maps-f0784",
  storageBucket: "maps-f0784.appspot.com",
  messagingSenderId: "657064097017"
};
firebase.initializeApp(config);

export default config;