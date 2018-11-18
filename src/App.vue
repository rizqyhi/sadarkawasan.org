<template>
  <div id="app">
    <mobile-header @nav-toggled="updateNavToggle" />
    <b-container fluid>
      <b-row>
        <main-nav :menus="menus" :active="isNavOpened" class="col-md-3" />
        <b-col col offset-md="3">
          <transition name="fade" mode="out-in">
            <router-view style="margin: 0 -15px;" />
          </transition>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav'
import MobileHeader from '@/components/MobileHeader'
import menu from '@/services/menu'

export default {
  components: { MainNav, MobileHeader },

  data () {
    return {
      menus: menu,
      isNavOpened: false
    }
  },

  methods: {
    updateNavToggle (open) {
      this.isNavOpened = open
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
#app {
  padding-top: 60px;

  @include media-breakpoint-up(md) {
    padding-top: 0
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
