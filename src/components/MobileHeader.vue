<template>
  <div class="mobile-header d-block d-md-none">
    <a href="#" class="mobile-header__nav-toggle" @click.prevent="toggleNav()">
      <span class="ti-menu" v-if="!isNavOpened"></span>
      <span class="ti-close" v-else></span>
    </a>
    <span class="mobile-header__app-name">Sadarkawasan</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isNavOpened: false
    }
  },

  watch: {
    '$route.path': function (path) {
      this.isNavOpened = false
      this.$emit('nav-toggled', this.isNavOpened)
    }
  },

  methods: {
    toggleNav () {
      this.isNavOpened = !this.isNavOpened
      this.$emit('nav-toggled', this.isNavOpened)
    }
  }
}
</script>

<style lang="scss">
.mobile-header {
  position: fixed;
  width: 100%;
  top: 0;
  padding: 1rem;
  z-index: 999;
  background: #fff;
  box-shadow: 0 1px 10px 5px rgba($green, .05)
}
.mobile-header__nav-toggle {
  margin-right: 1rem;
}
.mobile-header__app-name {
  font-size: 1.2rem;
}
</style>
