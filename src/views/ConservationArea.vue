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
      <l-control position="topleft">
        <map-search-control v-model="searchTerm"></map-search-control>
      </l-control>

      <l-control position="topleft">
        <map-filter-control v-model="typeFilters"></map-filter-control>
      </l-control>

      <v-tilelayer-googlemutant :apikey="gmapsApiKey" />

      <l-geo-json
        :geojson="fallbackMapData"
        :options-style="fallbackMapStyles"
      ></l-geo-json>

      <l-marker
        v-for="area in filteredConservationAreas"
        :key="area.id"
        :lat-lng="[area.lat, area.lng]"
        :title="area.name"
        :icon="generateMarkerFor(area.type)"
        @click="showAreaDetail(area)">
        <l-tooltip>{{ area.name }}</l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet'
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant'
import { LMap, LMarker, LTooltip, LControl, LGeoJson } from 'vue2-leaflet'
import MapSearchControl from '@/components/MapSearchControl'
import MapFilterControl from '@/components/MapFilterControl'
import conservationAreaService from '@/services/conservationAreaService'
import { checkFetchStatus } from '@/utils'

export default {
  components: {
    LMap,
    LMarker,
    LTooltip,
    LControl,
    LGeoJson,
    MapSearchControl,
    MapFilterControl,
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
      conservationAreas: [],
      filteredConservationAreas: [],
      typeFilters: ['ca', 'sm', 'tn', 'thr', 'twa'],
      searchTerm: ''
    }
  },

  watch: {
    searchTerm () {
      this.filterAreas()
    },

    typeFilters () {
      this.filterAreas()
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
        this.filterAreas()
      } catch (e) {
        console.log(e)
      }
    },

    filterAreas () {
      this.filteredConservationAreas = this.conservationAreas
        .filter(area => {
          return this.typeFilters.indexOf(area.type) > -1
        })
        .filter(area => {
          return area.name.toLowerCase().search(this.searchTerm) > -1
        })
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

    showAreaDetail (area) {
      let slug = area.name.toLowerCase().trim().replace(/[\s\W-]+/g, '-')
      this.$router.push(`/kawasan/${area.id}/${slug}`)
    },

    fetchFallbackMap () {
      fetch('/data/indonesia.min.geojson')
        .then(checkFetchStatus)
        .then(response => response.json())
        .then(data => {
          this.fallbackMapData = data
        })
    }
  },

  mounted () {
    this.getConservationAreas()
    this.resizeMap()
    window.addEventListener('resize', this.resizeMap)

    this.$nextTick(() => {
      this.$refs.caMap.mapObject.zoomControl.setPosition('bottomright')
    })

    this.fetchFallbackMap()
  },

  destroyed () {
    window.removeEventListener('resize', this.resizeMap)
  }
}
</script>

<style>

</style>
