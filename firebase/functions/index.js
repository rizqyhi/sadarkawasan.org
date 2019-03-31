const functions = require('firebase-functions');
const admin = require('firebase-admin');
const feedgram = require('./feedgram');

// Initialize Firebase
admin.initializeApp()
const db = admin.firestore()
db.settings({
  timestampsInSnapshots: true
})

/**
 * Fetch Instagram posts and save in Firestore
 */
exports.fetchIgFeed = functions.https.onRequest((request, response) => {
  return feedgram('sadarkawasan')
    .then(data => {
      var feedsRef = db.collection('media-feeds')

      data.map(post => {
        feedsRef.doc(post.shortcode).set(post, { merge: true })
          .then(doc => {
            return post
          })
          .catch(err => {
            console.log(err)
          })
      })

      return response.send(data);
    })
    .catch(err => {
      console.error(err)
    })
});
