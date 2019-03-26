<template>
  <div class="map-filter-control">
    <b-dropdown variant="link" text="🌲 Jenis Kawasan">
      <b-dropdown-header>Kawasan Suaka Alam</b-dropdown-header>

      <div
        class="custom-control custom-checkbox"
        v-for="areaType in ksaAreas"
        :key="areaType.shortname"
      >
        <input
          type="checkbox"
          class="custom-control-input"
          :id="`checkbox-${areaType.shortname}`"
          :value="areaType.shortname"
          v-model="selectedTypes"
        >
        <label
          class="custom-control-label"
          :for="`checkbox-${areaType.shortname}`"
          v-text="areaType.name"
        ></label>
      </div>

      <b-dropdown-header>Kawasan Pelestarian Alam</b-dropdown-header>

      <div
        class="custom-control custom-checkbox"
        v-for="areaType in kpaAreas"
        :key="areaType.shortname"
        style="width: 200px"
      >
        <input
          type="checkbox"
          class="custom-control-input"
          :id="`checkbox-${areaType.shortname}`"
          :value="areaType.shortname"
          v-model="selectedTypes"
        >
        <label
          class="custom-control-label"
          :for="`checkbox-${areaType.shortname}`"
          v-text="areaType.name"
        ></label>
      </div>
    </b-dropdown>
  </div>
</template>

<script>
import conservationAreaTypes from '@/services/conservationAreaTypes'

export default {
  props: {
    value: {
      type: Array,
      default () {
        return ['ca', 'sm', 'tn', 'thr', 'twa']
      }
    }
  },

  data () {
    return {
      ksaAreas: conservationAreaTypes.filter(area => area.type === 'ksa'),
      kpaAreas: conservationAreaTypes.filter(area => area.type === 'kpa'),
      selectedTypes: this.value
    }
  },

  watch: {
    selectedTypes (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.map-filter-control {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 15px rgba(0,0,0,0.1);

  .custom-checkbox {
    margin: 0 1.5rem;
  }
}
</style>
