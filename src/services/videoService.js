import { db } from '../utils/Firebase'

export default {
  async getAll () {
    const videos = await db.collection('videos').get()
    return videos.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
  }
}
