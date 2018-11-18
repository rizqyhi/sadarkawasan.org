<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <main-nav :menus="menus" class="col-md-3 d-none d-md-block" />
        <b-col col offset-md="3">
          <router-view style="margin: 0 -15px;" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav'
import menu from '@/services/menu'

export default {
  components: { MainNav },

  data () {
    return {
      menus: menu
    }
  }
}
</script>

<style lang="scss">
html, body {
  min-height: 100%;
}
html {
  font-family: europa, sans-serif;
}
body {
  background-color: #ebf2f1;
  background-image: url('./assets/bg.svg');
}
</style>
