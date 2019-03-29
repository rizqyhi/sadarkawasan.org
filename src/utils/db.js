import { openDB } from 'idb'

const dbConnection = openDB('sadarkawasan', 1, {
  upgrade (db, oldVersion, newVersion, tx) {
    switch (newVersion) {
      case 1:
        const blogStore = db.createObjectStore('blogPosts', {
          keyPath: 'id',
          autoIncrement: false
        })
        blogStore.createIndex('publishedAt', 'publishedAt')
        break;
    }
  }
})

export default dbConnection
