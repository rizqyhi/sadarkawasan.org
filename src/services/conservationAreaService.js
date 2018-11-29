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
  },

  async get (id) {
    const area = await db.collection('kawasan').doc(id).get()

    return {
      id: area.id,
      ...area.data()
    }
  }
}
