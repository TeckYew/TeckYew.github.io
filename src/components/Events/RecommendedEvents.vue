<script setup>
defineProps(['recList'])

// Define the computed property to determine the theme based on the recEvent
const theme = (recEvent) => {
  if (recEvent.hasOwnProperty('cat') && recEvent.cat !== undefined) {
    const types = recEvent.cat
    const firstItem = String(types.slice(0, 1)[0])
    return `../../assets/themes/${firstItem.toLowerCase()}.jpg`
  }
  return '../../assets/themes/education.jpg'
}

const description = (recEvent) => {
  if (recEvent.desc.length > 200) {
    let de = recEvent.desc.substr(0, 190)
    return `${de}...`
  }
  return recEvent.desc
}
</script>

<template>
  <!-- <div class="col-md-1"></div> -->

  <!-- col-3 OR col-4 align right  -->

  <div class="container-fluid py-2" style="overflow-x: scroll">
    <div class="d-flex flex-row flex-nowrap scrollContent">
      <div v-for="(recEvent, idx) in recList" class="card" :key="idx">
        <!-- style="height: 75vh;" -->
        <img class="img-fluid" :src="theme(recEvent)" alt="100%x280" />
        <!-- style="height: 40vh;"-->
        <div class="card-body flex-column">
          <h5 class="title">{{ recEvent.name }}</h5>
          <div id="desc" class="container-fluid p-0" style="max-height: 15vh; overflow-y: scroll">
            <p class="card-desc text-secondary" overflow-y:scroll>{{ description(recEvent) }}</p>
          </div>
          <div class="row">
            <RouterLink
              :to="{ name: 'eventDetails', params: { event_id: recEvent.id } }"
              target="_blank"
              ><button class="btn btn-outline-success mx-auto w-100 mt-auto">
                Learn More
              </button></RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// console.log(recList[i][eventName]);
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
    },
    displayScroll() {
      // document.getElementById("desc").style.webkit-scrollbar = "none";
    },
    hideScroll() {
      document.getElementById('desc').style.display = 'none'
    }
  }
}
</script>

<style scoped>
.card {
  margin-left: 30px;
  /* max-height: 60vh; */
  min-height: 55vh;
  min-width: 30vw;
  max-width: 30vw;
}
.img-fluid {
  height: 40vh;
}
@media screen and (max-width: 768px) {
  .img-fluid {
    height: 20vh;
  }
  .card-desc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
#desc::-webkit-scrollbar {
  width: 5px;
  display: none;
}
#desc::-webkit-scrollbar-track {
  background: white;
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
#desc::-webkit-scrollbar-thumb {
  background: lightgrey;
  border-radius: 10px;
}
#desc::-webkit-scrollbar-thumb:hover {
  background: grey;
}
/* Scroll Bar */
::-webkit-scrollbar {
  height: 15px;
}
::-webkit-scrollbar-track {
  background: white;
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: lightgrey;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: grey;
}
</style>
