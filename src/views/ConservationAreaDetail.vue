<template>
  <page class="conservation-area-type-view">
    <template slot="header">
      <loading v-if="loading" />
      <span class="ti-direction-alt" v-if="!loading"></span>
      {{ conservationArea.name }}
    </template>

    <div style="margin: -2rem -2rem 0; margin-bottom: 2rem">
      <l-map
        :min-zoom="map.minZoom"
        :center="map.center"
        :options="map.options"
        v-if="conservationArea"
        style="height: 300px"
        ref="caMap"
      >
        <v-tilelayer-googlemutant apikey="AIzaSyAZ9zikt49fhL3mdBLzU6iFaPXw6G8tV8M" />
        <l-marker
          :key="conservationArea.id"
          :lat-lng="[conservationArea.lat, conservationArea.lng]"
          :icon="generateMarkerFor(conservationArea.type)" />
      </l-map>
    </div>

    <div class="row">
      <div class="col-md-8">
        <h4 class="section-title"><span class="ti-light-bulb"></span> Detail Kawasan</h4>
        <hr>
        <p>{{ conservationArea.description }}</p>
        <p><strong>Luas Kawasan: </strong>{{ conservationArea.area }}</p>
        <p><strong>Flora: </strong><span v-html="formatScientificName(conservationArea.flora)" /></p>
        <p><strong>Fauna: </strong><span v-html="formatScientificName(conservationArea.fauna)" /></p>
      </div>

      <div class="col">
        <h4 class="section-title"><span class="ti-location-pin"></span> Lokasi</h4>
        <hr>
        <p>{{ conservationArea.location }}</p>
        <p>
          <code>{{ Math.abs(conservationArea.lat).toFixed(5) }}</code><sup>&deg;</sup><span v-if="conservationArea.lat > 0"> LU</span><span v-else> LS</span><br>
          <code>{{ conservationArea.lng.toFixed(5) }}</code><sup>&deg;</sup> BT
        </p>

        <h4 class="section-title mt-5"><span class="ti-info-alt"></span> Narahubung</h4>
        <hr>
        <p v-for="(contact, i) in conservationArea.contacts" :key="i">
          <strong>{{ contact.name }}</strong><br>
          <span>{{ contact.address }}</span><br>
          <span>{{ contact.phone }}</span>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <h4 class="section-title mt-5"><span class="ti-files"></span> Sumber Data</h4>
        <hr>
        <ol>
          <li v-for="(source, i) in conservationArea.dataSources" :key="i">{{ source.source }}</li>
        </ol>
      </div>
    </div>
  </page>
</template>

<script>
import L from 'leaflet'
import { LMap, LMarker } from 'vue2-leaflet'
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant'
import conservationAreaService from '@/services/conservationAreaService'

export default {
  components: {
    LMap,
    LMarker,
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
      loading: true,
      conservationArea: {}
    }
  },

  methods: {
    resizeMap () {
      this.$nextTick(() => {
        let offset = (document.documentElement.clientWidth < 768) ? 60 : 0
        this.$refs.caMap.$el.style.height = window.innerHeight - offset + 'px'
      })
    },

    async getConservationArea (id) {
      try {
        const area = await conservationAreaService.get(id)
        this.conservationArea = area
        this.loading = false

        this.$nextTick(() => {
          const map = this.$refs.caMap.mapObject
          map.flyTo(L.latLng(area.lat, area.lng), 12)
          L.polygon(area.boundaries.map(coord => [coord.lat, coord.lng])).addTo(map)
        })
      } catch (e) {
        console.log(e)
      }
    },

    generateMarkerFor (type = 'default') {
      return L.icon({
        iconUrl: require(`@/assets/marker-${type}.svg`),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      })
    },

    formatScientificName (text) {
      let formattedText = text.replace(/(\(.*?\))/g, '<em>$1</em>')
      return formattedText
    }
  },

  mounted () {
    this.getConservationArea(this.$route.params.id)
    // this.resizeMap()
    // window.addEventListener('resize', this.resizeMap)

    this.$nextTick(() => {
      this.$refs.caMap.mapObject.zoomControl.setPosition('bottomright')
    })
  },

  destroyed () {
    // window.removeEventListener('resize', this.resizeMap)
  }
}
</script>

<style>
.section-title {
  font-size: 1.2rem
}
</style>
