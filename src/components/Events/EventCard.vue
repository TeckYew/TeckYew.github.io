<script setup>
defineProps({
  eventData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="col animated fadeInUp">
    <div class="card mx-auto my-4" style="height: 500px;">
      <img class="card-img-top" :src="theme" :alt="eventData.eventTitle" style="height: 200px" />
      <div class="card-body">
        <h5 class="card-title">{{ eventData.eventTitle }}</h5>
        <h6 class="card-title">{{ formattedDate }}</h6>
        <h6 class="card-title">{{ formattedTime }}</h6>
        <div class="container p-0 mt-3">
          <span v-for="e in eventData.eventType" class="badge rounded-pill bg-success ms-0 me-3 mb-2 p-2" :key="e">{{ e
          }}</span>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <button class="btn btn-outline-success my-3 mx-auto w-100" @click="goToEventDetails">
            More Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['eventData'],
  data() {
    return {
      formattedDate: '',
      formattedTime: ''
    }
  },
  created() {
    const eventDate = new Date(this.eventData?.eventDate)

    const zone = eventDate.getHours() > 12 ? 'PM' : 'AM'
    this.formattedDate = `${eventDate.toLocaleString('default', {
      weekday: 'long'
    })}, ${eventDate.getDate()} ${eventDate.toLocaleString('default', {
      month: 'long'
    })} ${eventDate.getFullYear()}`

    this.formattedTime = `${eventDate.getHours() % 12}:${(eventDate.getMinutes() < 10 ? '0' : '') + eventDate.getMinutes()
      } ${zone}`
  },
  methods: {
    goTo() {
      // this redirects the path to signup page
      const routeData = `./details/${this.eventData?.eventId}`
      window.open(routeData)
    },
    goToEventDetails() {
      this.$router.push({
        name: 'eventDetails',
        params: { event_id: this.eventData.eventId }
      });
    }
  },

  computed: {
    theme() {
      if (this.eventData.hasOwnProperty('eventType')) {
        if (this.eventData.eventType !== undefined) {
          let types = this.eventData.eventType
          let firstItem = String(types.slice(0, 1)[0])
          console.log(firstItem)
          return `../../assets/themes/${firstItem.toLowerCase()}.jpg`
        }
      }
      return '../../assets/themes/education.jpg'
    }
  }
}
</script>

<style>
@keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-webkit-keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
}

.animatedFadeInUp {
  opacity: 0;
}

.fadeInUp {
  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
}

.badge {}
</style>
