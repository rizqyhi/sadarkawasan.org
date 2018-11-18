<template>
  <div class="page">
    <div class="page__wrapper">
      <div class="page__header">
        <slot name="header" />
      </div>
      <div class="page__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/card';

.page {
  padding: 2rem;
}
.page__wrapper {
  @extend .card;
  border: none;
  box-shadow: 5px 5px 20px 5px rgba($green, .1)
}
.page__header {
  @extend .card-header;
  padding: 2rem;
  margin: 0;
  font-size: 1.5rem;
  color: $green;
  background: linear-gradient(40deg, rgba($green, .1), rgba($green, .05));
  border: none;

  span[class^="ti-"] {
    margin-right: .5rem
  }
}
.page__body {
  @extend .card-body;
  padding: 2rem
}
</style>
