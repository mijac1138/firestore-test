import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyAtYnAXGjXKsZDZoZJj58fy-gUzg5zdE44",
  authDomain: "notifying-test.firebaseapp.com",
  databaseURL: "https://notifying-test.firebaseio.com",
  projectId: "notifying-test",
  storageBucket: "notifying-test.appspot.com",
  messagingSenderId: "1088941220729"
});

const firestore = firebase.firestore()
firestore.settings({timestampsInSnapshots: true})

export default firestore;