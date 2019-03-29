import dbConnection from '@/utils/db'
import { checkFetchStatus } from '@/utils'

export default {
  getAllPosts () {
    const networkData = this.getAllPostsFromNetwork().then(data => {
      dbConnection.then(async db => {
        console.log('storing data to IDB')
        const tx = db.transaction('blogPosts', 'readwrite')

        data.forEach(post => {
          tx.store.put(post)
        })

        await tx.done
      })

      return data
    })

    const cacheData = dbConnection.then(async db => {
      let blogPosts = []
      let blogPostsCursor = await db.transaction('blogPosts').store.openCursor(null, 'prev')

      while (blogPostsCursor) {
        blogPosts.push(blogPostsCursor.value)
        blogPostsCursor = await blogPostsCursor.continue();
      }

      return blogPosts
    })

    return networkData
      .catch(err => {
        console.warn('Network failed, returning IDB cache')

        return cacheData
      })
  },

  getAllPostsFromNetwork () {
    return fetch('https://public-api.wordpress.com/rest/v1.1/sites/sadarkawasan.wordpress.com/posts/')
      .then(checkFetchStatus)
      .then(response => response.json())
      .then(data => {
        return data.posts.map(post => {
          return {
            id: post.ID,
            publishedAt: post.date,
            title: post.title,
            url: post.URL,
            excerpt: post.excerpt
          }
        })
      })
  }
}
