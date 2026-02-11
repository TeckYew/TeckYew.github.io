<script setup>
defineProps({
  eventData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="col">
    <div
      v-if="Date.now() > new Date(this.eventData.datetime['seconds'] * 1000)"
      class="card eventCard mb-4 mx-auto"
      style="max-width: 540px"
      @click="showPopup = !showPopup"
    >
      <div class="row eventCardRow g-0">
        <div class="col">
          <div class="card card-body">
            <h5 class="card-title text-start text-break">{{ eventData.name }}</h5>
            <h6 class="card-text fw-light">{{ eventDate }}</h6>
            <p class="card-text">
              <small class="text-muted">{{ eventTime }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-show="showPopup" class="col">
    <div class="card mb-3">
      <i
        id="close"
        class="fa fa-close position-absolute float-right ms-2 mt-2"
        @click="showPopup = false"
      ></i>
      <img :src="eventData.imgURL" class="card-img-top" alt="..." />
      <div class="card-body">
        <p class="card-text h1">{{ eventData.name }}</p>
        <p class="card-text">{{ eventData.desc }}</p>
        <p class="card-text">
          <span>{{ eventData.startDate }}, </span>
          <span>{{ eventData.time }}</span>
        </p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        <a href="#" class="btn btn-primary">Event Page</a>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      eventList: null,
      showDesc: false,
      showPopup: false,
      userEvents: []
    }
  },
  methods: {
    goTo() {
      // this redirects the path to signup page
      this.$router.push({ path: '/signup' }) // testing how router push works
    }
  },
  computed: {
    eventDate() {
      let eventDate = new Date(this.eventData.datetime['seconds'] * 1000)

      let datetime = `${eventDate.toLocaleString('default', {
        weekday: 'long'
      })}, ${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' })} ${
        eventDate.getYear() + 1900
      }`

      return datetime
    },
    eventTime() {
      let eventDate = new Date(this.eventData.datetime['seconds'] * 1000)

      let zone = ''
      if (eventDate.getHours() > 12) {
        zone = 'PM'
      } else {
        zone = 'AM'
      }
      let formattedTime = `${eventDate.getHours() % 12}:${
        (eventDate.getMinutes() < 10 ? '0' : '') + eventDate.getMinutes()
      } ${zone}`

      return formattedTime
    }
  }
}
</script>

<style scoped>
.eventCardRow > div {
  flex: 1;
  background: lightgrey;
  border: 1px solid grey;
}

.eventDesc {
  background-color: #69c67f;
  color: white;
}

.eventCard:hover {
  cursor: pointer;
}
i {
  float: right;
}
i:hover {
  cursor: pointer;
  background-color: lightgrey;
  border-radius: 50%;
}
</style>
