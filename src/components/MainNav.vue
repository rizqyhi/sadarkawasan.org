<template>
  <div :class="{'main-nav': true, 'main-nav--opened': active}">
    <h1 class="app-title">
      <img src="../assets/logo.png" alt="Logo Sadarkawasan" width="140">
    </h1>

    <p class="mb-4"><em>Mengetahui, memahami, menyadari ke mana kita akan pergi.</em></p>

    <div class="app-nav">
      <b-nav vertical>
        <li v-for="menu in menus" :key="menu.route">
          <router-link :to="menu.route">
            <span>{{ menu.icon }}</span>
            {{ menu.name }}
          </router-link>
        </li>
      </b-nav>
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
    },
    active: Boolean
  }
}
</script>

<style lang="scss">
.main-nav {
  position: fixed !important;
  height: 100%;
  padding: 0 2rem !important;
  z-index: 1001;
  background: #fff;
  box-shadow: 1px 0 50px 10px rgba($green,0.09);

}

@include media-breakpoint-down(sm) {
  .main-nav {
    opacity: 0;
    transform: translateX(-100%);
    transition: all .3s ease-in-out;
  }
  .main-nav--opened {
    opacity: 1;
    transform: translateX(0);
  }
}

.app-title {
  margin: 1rem 0;
  font-size: 1.5rem;
  text-align: center;
}

.app-nav {
  li {
    padding: .5rem 0;

    span {
      margin-right: .75rem;
    }

    .router-link-exact-active {
      padding-bottom: 2px;
      border-bottom: 3px solid rgba($primary,.3)
    }
  }
}
</style>
