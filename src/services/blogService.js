import pick from 'lodash/pick'
import { checkFetchStatus } from '@/utils'

export default {
  getAllPosts () {
    return fetch('https://public-api.wordpress.com/rest/v1.1/sites/sadarkawasan.wordpress.com/posts/')
      .then(checkFetchStatus)
      .then(response => response.json())
      .then(data => {
        return data.posts.map(post => {
          return pick(post, ['ID', 'date', 'title', 'URL', 'excerpt'])
        })
      })
  }
}
