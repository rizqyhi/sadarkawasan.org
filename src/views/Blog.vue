<template>
  <page class="blog-view">
    <template slot="header">
      <span class="ti-notepad"></span>
      Blog dan tulisan
    </template>

    <p class="mb-4">Kumpulan tulisan dan artikel blog dari pegiat kampanye #SadarKawasan. Tautan mengarah ke blog/situs lain.</p>

    <blog-post
      v-for="post in posts"
      :key="post.id"
      :post="post" />
  </page>
</template>

<script>
import BlogPost from '@/components/BlogPost'
import blogService from '@/services/blogService'

export default {
  components: { BlogPost },

  data () {
    return {
      posts: []
    }
  },

  mounted () {
    blogService.getAllPosts()
      .then(posts => {
        this.posts = this.posts.concat(posts)
      })
  }
}
</script>

<style>

</style>
