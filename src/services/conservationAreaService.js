import { db } from '../utils/Firebase'

export default {
  async getAll () {
    const areas = await db.collection('kawasan').get()
    return areas.docs.map(doc => {
      let { type, name, lat, lng } = doc.data()

      return {
        id: doc.id,
        type,
        name,
        lat,
        lng
      }
    })
  }
}
