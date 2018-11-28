import { db } from '../utils/Firebase'

export default {
  async getAll () {
    const videos = await db.collection('ig-feeds').get()
    return videos.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
  }
}
