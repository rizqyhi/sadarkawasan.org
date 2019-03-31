const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const feedgram = require('./feedgram');

// Initialize Firebase
admin.initializeApp()
const db = admin.firestore()
db.settings({
  timestampsInSnapshots: true
})

// Initialize Algolia
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const algoliaClient = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const KAWASAN_INDEX = 'dev_kawasan';

/**
 * Save kawasan object to Algolia when created
 */
exports.AlgoliaCreateKawasan = functions.firestore.document('kawasan/{kawasanId}')
  .onCreate((snap, context) => {
    let kawasan = snap.data()
    kawasan.objectID = context.params.kawasanId

    const index = algoliaClient.initIndex(KAWASAN_INDEX)
    return index.addObject(kawasan)
  })

/**
 * Save kawasan object to Algolia after updated
 */
exports.AlgoliaUpdateKawasan = functions.firestore.document('kawasan/{kawasanId}')
  .onUpdate((snap, context) => {
    let kawasan = snap.after.data()
    kawasan.objectID = context.params.kawasanId

    const index = algoliaClient.initIndex(KAWASAN_INDEX)
    return index.saveObject(kawasan)
  })

/**
 * Delete kawasan object from Algolia when deleted
 */
exports.AlgoliaDeleteKawasan = functions.firestore.document('kawasan/{kawasanId}')
  .onDelete((snap, context) => {
    const objectID = context.params.kawasanId
    const index = algoliaClient.initIndex(KAWASAN_INDEX)
    return index.deleteObject(objectID)
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
