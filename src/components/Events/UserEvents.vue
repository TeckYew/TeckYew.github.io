<script setup>
defineProps({
  eventData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="row">
    <!-- <div class="col-md-1"></div> -->
    <div class="col mb-1">
      <div class="card h-100">
        <div class="card-body">
          <span class="card-title">{{ eventData.eventName }}</span>
          <span class="card-date">{{ eventData.startDate }}</span>
          <p class="card-time">{{ eventData.time }}</p>
        </div>
      </div>
    </div>
    <div class="col-md-1">
      <div class=""></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventList: null
    }
  },
  methods: {
    goTo() {
      // this redirects the path to signup page
      this.$router.push({ path: '/signup' }) // testing how router push works
    }
  }
}
</script>

<style scoped>
.card-date,
.card-time {
  display: flex;
  justify-content: right;
}
.card-title {
  display: flex;
  justify-content: left;
  position: absolute;
  text-align: center;
}
</style>
