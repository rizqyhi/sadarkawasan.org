<template>
  <page class="conservation-area-type-view">
    <template slot="header">
      <span class="ti-blackboard"></span>
      Kenali Jenis Kawasan Konservasi di Indonesia
    </template>

    <p>Berdasarkan <a href="http://peraturan.go.id/inc/view/11e44c4e5319d2e0a5e0313231333231.html" target="_blank">Undang-Undang No. 5 Tahun 1990</a>, kawasan konservasi di Indonesia dibagi menjadi kawasan suaka alam dan kawasan pelestarian alam.</p>

    <h3 class="area-type mt-5"><span class="ti-direction"></span> Kawasan Suaka Alam</h3>
    <hr>
    <conservation-type v-for="item in ksaAreas" :key="item.name" :area="item" />

    <h3 class="area-type mt-5"><span class="ti-direction"></span> Kawasan Pelestarian Alam</h3>
    <hr>
    <conservation-type v-for="item in kpaAreas" :key="item.name" :area="item" />
  </page>
</template>

<script>
import ConservationType from '@/components/ConservationType'
import conservationAreaTypes from '@/services/conservationAreaTypes'

export default {
  components: { ConservationType },

  data () {
    return {
      ksaAreas: conservationAreaTypes.filter(area => area.type === 'ksa'),
      kpaAreas: conservationAreaTypes.filter(area => area.type === 'kpa')
    }
  }
}
</script>

<style lang="scss">
.area-type {
  font-size: 1.2rem;
}
</style>
