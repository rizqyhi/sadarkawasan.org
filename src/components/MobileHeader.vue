<template>
  <div class="mobile-header d-block d-md-none">
    <button
      type="button"
      class="hamburger hamburger--slider"
      :class="{'is-active': isNavOpened}"
      @click.prevent="toggleNav"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <span class="mobile-header__app-name">Sadar Kawasan</span>
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
$hamburger-padding-x: 10px;
$hamburger-padding-y: 0;
$hamburger-layer-width: 24px;
$hamburger-layer-spacing: 4px;
$hamburger-layer-color: #28a745;
$hamburger-types: (slider);
@import "~hamburgers/_sass/hamburgers/hamburgers";

.hamburger {
  vertical-align: middle;

  &:focus, &:active {
    outline: none;
    box-shadow: none
  }
}

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
