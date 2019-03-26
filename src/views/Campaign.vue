<template>
  <page class="campaign-view">
    <template slot="header">
      <span class="emojicon">📣</span>
      Media &amp; Kampanye
    </template>

    <h3 class="section-title"><span class="emojicon">💁‍♂️</span> Video Edukasi</h3>
    <hr>
    <loading v-if="isLoadingVideos" />
    <div class="row">
      <div class="col" v-for="video in videos" :key="video.id">
        <a href="#" class="video" v-b-modal.video-modal @click.prevent="currentVideoUrl = video.url">
          <img :src="getVideoThumbnail(video.url)" alt="" class="img-fluid rounded">
        </a>
      </div>
    </div>

    <b-modal id="video-modal" size="lg" centered :hide-header="true" :hide-footer="true">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" :src="currentVideoUrl+'?autoplay=1'" allowfullscreen></iframe>
      </div>
    </b-modal>

    <h3 class="section-title mt-5"><span class="emojicon">💁‍♀️</span> Feed Instagram</h3>
    <hr>
    <loading v-if="isLoadingInstagramFeeds" />
    <div class="row">
      <div class="col-md-3 mb-3" v-for="feed in instagramFeeds" :key="feed.id">
        <a :href="`https://www.instagram.com/p/${feed.shortcode}`" class="video" target="_blank">
          <img :src="feed.image_url" alt="" class="img-fluid rounded">
        </a>
      </div>
    </div>
  </page>
</template>

<script>
import videoService from '@/services/videoService'
import instagramFeedService from '@/services/instagramFeedService'

export default {
  data () {
    return {
      videos: [],
      currentVideoUrl: null,
      isLoadingVideos: true,
      instagramFeeds: [],
      isLoadingInstagramFeeds: true
    }
  },

  methods: {
    getVideoId (url) {
      return url.match(/embed\/(.*)/)[1]
    },

    getVideoThumbnail (videoUrl) {
      const videoId = this.getVideoId(videoUrl)
      return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    },

    async loadVideos () {
      try {
        const videos = await videoService.getAll()
        this.videos = this.videos.concat(videos)
        this.isLoadingVideos = false
      } catch (err) {
        console.log(err)
      }
    },

    async loadInstagramFeeds () {
      try {
        const instagramFeeds = await instagramFeedService.getAll()
        this.instagramFeeds = this.instagramFeeds.concat(instagramFeeds)
        this.isLoadingInstagramFeeds = false
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted () {
    this.loadVideos()
    this.loadInstagramFeeds()
  }
}
</script>

<style lang="scss">
.section-title {
  font-size: 1.2rem
}
.video {
  display: block;
  position: relative;
  box-shadow: 0 2px 20px 2px rgba($primary, .1);
  transition: all .1s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px 2px rgba($primary, .2);
  }

  img {
    border-radius: 1rem;
  }
}
</style>
