import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
// const auth = firebase.auth()
// const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

firebase.firestore().enablePersistence({ experimentalTabSynchronization: true })
  .catch(err => {
    console.error('Firestore persistence failed:', err)
  })

// firebase collections
const kawasanCollection = db.collection('kawasan')

export {
  firebase,
  db,
  // auth,
  // currentUser,
  kawasanCollection
}
