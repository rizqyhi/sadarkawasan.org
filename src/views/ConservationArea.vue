<template>
  <div class="conservation-area-view">
    <div class="map-wrapper" ref="caMap">
      <l-map
        :zoom="map.zoom"
        :center="map.center"
        :options="map.options"
        style="height: 100%">
        <v-tilelayer-googlemutant apikey="AIzaSyAZ9zikt49fhL3mdBLzU6iFaPXw6G8tV8M" />
      </l-map>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import { LMap } from 'vue2-leaflet'
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant'

export default {
  components: {
    LMap,
    'v-tilelayer-googlemutant': Vue2LeafletGoogleMutant
  },

  data () {
    return {
      map: {
        zoom: 5,
        center: L.latLng(-2.5, 118),
        options: {
          zoomSnap: 0.5
        }
      }
    }
  },

  methods: {
    resizeMap () {
      this.$refs.caMap.style.height = window.innerHeight + 'px'
    }
  },

  mounted () {
    this.resizeMap()
    window.addEventListener('resize', this.resizeMap)
  },

  destroyed () {
    window.removeEventListener('resize', this.resizeMap)
  }
}
</script>

<style>

</style>
