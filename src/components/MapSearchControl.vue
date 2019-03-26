<template>
  <div class="map-search-control">
    <input
      type="search"
      class="form-control"
      placeholder="Cari kawasan..."
      :value="value"
      @input="termChanged"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  methods: {
    termChanged (event) {
      setTimeout(() => {
        this.$emit('input', event.target.value)
      }, 150)
    }
  }
}
</script>

<style lang="scss">
.map-search-control {
  width: 400px;
  padding: .25rem .5rem;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 15px rgba(0,0,0,0.1);

  &::before {
    content: "\01F50D";
    position: absolute;
    top: 11px;
    left: 1rem;
    z-index: 1;
    font-size: 1rem;
  }

  .form-control {
    padding-left: 2.5rem;
    border: none;
    border-bottom: 2px solid transparent;
    border-radius: 0;

    &:focus {
      border-bottom: 2px solid rgba($primary, .5);
      box-shadow: none;
    }
  }
}
</style>
