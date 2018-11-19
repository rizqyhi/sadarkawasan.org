import axios from 'axios'
import pick from 'lodash/pick'

export default {
  getAllPosts () {
    return axios.get('https://public-api.wordpress.com/rest/v1.1/sites/sadarkawasan.wordpress.com/posts/')
      .then(response => {
        return response.data.posts.map(post => {
          return pick(post, ['ID', 'date', 'title', 'URL', 'excerpt'])
        })
      })
  }
}
