<template>
  <div class="blog-post">
    <h6 class="blog-post__title"><a :href="url" target="_blank">{{ title }} <span class="emojicon">↗</span></a></h6>
    <div class="blog-post__content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default () {
        return {
          id: 0,
          url: '',
          date: '',
          title: '',
          content: ''
        }
      }
    }
  },

  data () {
    return {
      id: this.post.id,
      url: this.post.url,
      date: this.post.date,
      title: this.post.title,
      content: this.post.excerpt
    }
  }
}
</script>

<style lang="scss">
.blog-post {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid rgba($primary, .05);
  background: rgba($primary, .01);
  border-radius: $border-radius
}
</style>
