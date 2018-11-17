<template>
  <div class="main-nav">
    <h1 class="app-title">Sadar kawasan</h1>

    <div class="app-nav">
      <a
        v-for="menu in menus"
        :key="menu.route"
        :class="{active: isActiveMenu(menu)}"
        @click="navigatePage(menu)"
      >{{ menu.name }}</a>
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

<style>

</style>
