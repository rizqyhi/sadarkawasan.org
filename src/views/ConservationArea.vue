<template>
  <div class="conservation-area-view">
    <l-map
      :min-zoom="map.minZoom"
      :center="map.center"
      :max-bounds="map.maxBounds"
      :options="map.options"
      style="height: 100vh"
      ref="caMap"
    >
      <v-tilelayer-googlemutant apikey="AIzaSyAZ9zikt49fhL3mdBLzU6iFaPXw6G8tV8M" />
      <l-marker
        v-for="area in conservationAreas"
        :key="area.id"
        :lat-lng="[area.lat, area.lng]"
        :title="area.name"
        @click="showAreaDetail(area)">
        <l-tooltip>{{ area.name }}</l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet'
import { LMap, LMarker, LTooltip } from 'vue2-leaflet'
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant'
import conservationAreaService from '@/services/conservationAreaService'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.imagePath = '/';
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  components: {
    LMap,
    LMarker,
    LTooltip,
    'v-tilelayer-googlemutant': Vue2LeafletGoogleMutant
  },

  data () {
    return {
      map: {
        minZoom: 5,
        center: L.latLng(-2.5, 118),
        maxBounds: L.latLngBounds(L.latLng(-11, 95), L.latLng(6, 141)),
        options: {
          zoomSnap: 0.5
        }
      },
      conservationAreas: []
    }
  },

  methods: {
    resizeMap () {
      this.$nextTick(() => {
        let offset = (document.documentElement.clientWidth < 768) ? 60 : 0
        this.$refs.caMap.$el.style.height = window.innerHeight - offset + 'px'
      })
    },

    async getConservationAreas () {
      try {
        const areas = await conservationAreaService.getAll()
        this.conservationAreas = areas
      } catch (e) {
        console.log(e)
      }
    },

    showAreaDetail (area) {
      let slug = area.name.toLowerCase().trim().replace(/[\s\W-]+/g, '-')
      this.$router.push('/kawasan/'+area.id+'/'+slug)
    }
  },

  mounted () {
    this.getConservationAreas()
    this.resizeMap()
    window.addEventListener('resize', this.resizeMap)

    this.$nextTick(() => {
      this.$refs.caMap.mapObject.zoomControl.setPosition('bottomright')
    })
  },

  destroyed () {
    window.removeEventListener('resize', this.resizeMap)
  }
}
</script>

<style>

</style>
