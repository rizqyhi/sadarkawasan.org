<template>
  <page class="conservation-area-type-view" v-if="conservationArea">
    <template slot="header">
      <loading v-if="loading" />
      <span class="emojicon" v-if="!loading">🌏</span>
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
        <v-tilelayer-googlemutant
          :apikey="gmapsApiKey"
          :options="{ type: 'terrain' }"
          lang="id"
          region="ID"
        ></v-tilelayer-googlemutant>

        <l-geo-json
          :geojson="fallbackMapData"
          :options-style="fallbackMapStyles"
        ></l-geo-json>

        <l-marker
          :key="conservationArea.id"
          :lat-lng="[conservationArea.lat, conservationArea.lng]"
          :icon="generateMarkerFor(conservationArea.type)" />
      </l-map>
    </div>

    <div class="row">
      <div class="col-md-8">
        <h4 class="section-title"><span class="emojicon">💡</span> Detail Kawasan</h4>
        <hr>
        <p>{{ conservationArea.description }}</p>

        <table class="table">
          <tr>
            <th width="20%">🗺 Luas</th>
            <td>{{ conservationArea.area }}</td>
          </tr>
          <tr>
            <th>🌲 Flora</th>
            <td v-html="formatScientificName(conservationArea.flora)"></td>
          </tr>
          <tr>
            <th>🦏 Fauna</th>
            <td v-html="formatScientificName(conservationArea.fauna)"></td>
          </tr>
        </table>
      </div>

      <div class="col">
        <h4 class="section-title"><span class="emojicon">📍</span> Lokasi</h4>
        <hr>
        <p>{{ conservationArea.location }}</p>
        <p>
          <code>{{ Math.abs(conservationArea.lat).toFixed(5) }}</code><sup>&deg;</sup><span v-if="conservationArea.lat > 0"> LU</span><span v-else> LS</span><br>
          <code>{{ conservationArea.lng.toFixed(5) }}</code><sup>&deg;</sup> BT
        </p>

        <h4 class="section-title mt-5"><span class="emojicon">☎</span> Narahubung</h4>
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
        <h4 class="section-title mt-5"><span class="emojicon">📑</span> Sumber Data</h4>
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
import { LMap, LMarker, LGeoJson } from 'vue2-leaflet'
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant/Vue2LeafletGoogleMutant'
import conservationAreaService from '@/services/conservationAreaService'
import { checkFetchStatus } from '@/utils'

export default {
  components: {
    LMap,
    LMarker,
    LGeoJson,
    'v-tilelayer-googlemutant': Vue2LeafletGoogleMutant
  },

  data () {
    return {
      gmapsApiKey: process.env.VUE_APP_GMAPS_KEY,
      map: {
        minZoom: 5,
        center: L.latLng(-2.5, 118),
        maxBounds: L.latLngBounds(L.latLng(-11, 95), L.latLng(6, 141)),
        options: {
          zoomSnap: 0.5
        }
      },
      fallbackMapData: null,
      fallbackMapStyles: {
        weight: 1,
        color: '#28a745'
      },
      loading: true,
      conservationArea: null
    }
  },

  methods: {
    async getConservationArea (id) {
      try {
        const area = await conservationAreaService.get(id)
        this.conservationArea = area
        this.loading = false

        this.$nextTick(() => {
          const map = this.$refs.caMap.mapObject
          map.zoomControl.setPosition('bottomright')
          map.flyTo(L.latLng(area.lat, area.lng))
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

    fetchFallbackMap () {
      fetch('/data/indonesia.min.geojson')
        .then(checkFetchStatus)
        .then(response => response.json())
        .then(data => {
          this.fallbackMapData = data
        })
    },

    formatScientificName (text) {
      return text
        .replace(/(\(.*?\))/g, '<em>$1</em>')
        .replace(/(,)/g, '<br>')
    }
  },

  mounted () {
    this.getConservationArea(this.$route.params.id)
    this.fetchFallbackMap()
  }
}
</script>

<style>
.section-title {
  font-size: 1.2rem
}
</style>
