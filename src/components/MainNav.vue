<template>
  <div class="main-nav">
    <h1 class="app-title">Sadar kawasan</h1>

    <div class="app-nav">
      <router-link
        v-for="menu in menus"
        :key="menu.route"
        :to="menu.route"
        :class="{active: isActiveMenu(menu)}"
        @click="navigatePage(menu)"
      >{{ menu.name }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  data () {
    return {
      activeMenu: {}
    }
  },

  methods: {
    isActiveMenu (menu) {
      return this.activeMenu.route &&
        this.activeMenu.route === menu.route
    },

    navigatePage (menu) {
      this.activeMenu = menu
    }
  }
}
</script>

<style lang="scss">
.main-nav {
  position: absolute !important;
  height: 100%;
  padding: 0 2rem !important;
  z-index: 999;
  background: #fff;
  box-shadow: 1px 0 50px 10px rgba(#42b983,0.09)
}

</style>
