<template>
  <div class="row conservation-type">
    <div class="col-md-3">
      <h4 class="conservation-type__name">{{ name }}</h4>
    </div>
    <div class="col">
      <p class="conservation-type__description">{{ description }}</p>
      <ul class="activities" v-if="activities">
        <li
          v-for="activity in activities"
          :key="activity.name"
          :class="['activity-item', `activity-item--${activity.type}`, activity.highlight && 'activity-item--highlight']"
        >
          <span class="emojicon" v-if="activity.type === 'do'">✅</span>
          <span class="emojicon" v-else-if="activity.type === 'limited'">⚠</span>
          <span class="emojicon" v-else>🚫</span>
          {{ activity.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    area: Object
  },

  data () {
    return {
      type: this.area && this.area.type,
      name: this.area && this.area.name,
      description: this.area && this.area.description,
      activities: this.area && this.area.activities
    }
  }
}
</script>

<style lang="scss">
.conservation-type {
  margin-bottom: 2rem;
}
.conservation-type__name {
  font-size: 1rem;
  font-weight: bold;
}
.activities {
  margin: 0;
  padding: 0;
  list-style: none;
}
.activity-item {
  display: inline-block;
  margin: 0 .5rem .5rem 0;
  padding: .15rem 1rem;
  border: 1px solid $green;
  border-radius: 100px;
  color: $green;
  box-shadow: 1px 1px 10px 2px rgba($green, .05);
  font-size: .9rem
}
.activity-item--dont {
  background: $red;
  border-color: $red;
  color: #fff;
  box-shadow: 1px 1px 10px 2px rgba($red, .1)
}
.activity-item--limited {
  background: $yellow;
  border-color: $yellow;
  color: #fff;
  box-shadow: 1px 1px 10px 2px rgba($yellow, .1)
}
.activity-item--highlight {
  background: $green;
  color: #fff;
  box-shadow: 1px 1px 10px 2px rgba($green, .1)
}
</style>
