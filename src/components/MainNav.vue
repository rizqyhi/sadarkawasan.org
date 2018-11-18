<template>
  <div class="main-nav">
    <h1 class="app-title">
      <img src="../assets/logo.png" alt="Logo Sadarkawasan" width="140">
    </h1>

    <p class="mb-4"><em>Mengetahui, memahami, menyadari ke mana kita akan pergi.</em></p>

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

.app-title {
  margin: 1rem 0;
  font-size: 1.5rem;
  text-align: center;
}
</style>
