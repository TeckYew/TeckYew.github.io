<script setup>
import UpcomingEvent from '../components/Events/UpcomingEvents.vue'
import UserEvent from '../components/Events/UserEvents.vue'
import PastEvent from '../components/Events/PastEvents.vue'
import RecEvent from '../components/Events/RecommendedEvents.vue'
// import RecEvent from '../components/Events/test.vue'
import { getAdditionalUserInfo } from 'firebase/auth'
import bulbie from '../components/bulbasaur.vue'
import bigSTree from '../components/bigSTree.vue'
import novice from '../components/novice.vue'
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->

  <!-- <h1>Welcome back {{ UserInfo.userName }}</h1>   -->
  <!-- <div class="wrapper"> -->

  <!-- <video autoplay muted loop id="myVideo">
      <source src="../assets/HomePageVideo.mp4" type="video/mp4">
    </video> -->

  <!-- <div class="videoContent">
      <h1>Heading</h1>
      <p>Lorem ipsum...</p>
</div>
  </div> -->

  <h1 class="ms-4">Hey {{ name.charAt(0).toUpperCase() + name.slice(1) }}!</h1>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-lg-9 col-12 me-4 ms-4 animated fadeInUp">

        <h2>Grow Your Tree</h2>
        <span class="h3">Your Points Now: {{ points }}</span>
        <h5 v-if="points<250">{{ 250 - points }} more points to grow tree!</h5>
        <h5 v-else-if="points<500">{{ 500 - points }} more points to grow tree!</h5>
        <h5 v-else-if="points<1000">{{ 1000 - points }} more points for a companion!</h5>
        <h5 v-else-if="points >= 1000" >Congratulations, your tree is fully grown!</h5>
        <a href="/events"><button class="btn btn-primary mb-2">Get more points</button></a>

        <div id="background" class="container-fluid mb-5">
          <div class="row">
            <!-- <div class="col-md-3"></div>
            <div class="col-md-4"></div>
            <div class="col-md-4"> -->
              <!-- <bulbie class="mt-5"/> -->
            <!-- </div> -->
            
            <bigSTree v-if="points>=500" class="col-md-5 pb-10" :userPoints="points"/>
            <novice v-if="points<500" :userPoints="points"/>
            <div class="row">
              <div class="cloud"></div>
            </div>
          </div>
          <div class="row">
            <div id="innerBackground" class="col-md-12"></div>
          </div>
          <!-- <div style="background-color: blue;height:30px;width:100%;border-radius: ;"></div> -->
        </div>
        
        
      </div>

    <!-- Registered Events -->
      <div class="col-lg col-12 mt-sm-5 mt-lg-0 me-4 animated fadeInRight" style="background-color: rgb(235, 235, 235)">
        <h1 class="font-weight-light mt-2">Your Events</h1>
        <ul class="nav nav-pills mt-3" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              class="nav-link active me-3"
              id="upcoming-tab"
              data-bs-toggle="pill"
              data-bs-target="#upcoming"
            >
              Upcoming
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="past-tab" data-bs-toggle="pill" data-bs-target="#past">Past</a>
          </li>
        </ul>
        <div class="tab-content mt-3" id="myTabContent" style="max-height: 550px !important;">
          <!-- Achievements Info -->
          <div class="tab-pane fade show active" id="upcoming" role="tabpanel">
            <UpcomingEvent v-for="(event, index) in eventList" :key="index" :eventData="event" />
          </div>
          <!-- Score Info -->
          <div class="tab-pane fade" id="past" role="tabpanel">
            <PastEvent v-for="(event, index) in eventList" :key="index" :eventData="event" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row gx-4 mt-5 p-3 animated in-left" style="background-color: #32612d">
    <!-- <div class="banner row gx-4 mt-5 p-3 text-center"> -->
    <!-- <h3>Events Just for You</h3> -->
    <!-- Carousel for Recommended events -->
    <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 text-center my-auto">
          <h1 class="mb-3" style="color: white">Events Just for You</h1>
          <p style="color: white; font-size: large">
            Curated just for you, we have sieved out some of the interesting events not to be
            missed!
          </p>
        </div>
        <div class="col-md-9 col-12 bg-light rounded-4">
          <!-- <div id="carouselBannerControls" class="carousel slide carousel-dark" data-bs-ride="carousel" > -->
          <div class="carousel-inner">
            <RecEvent :recList="selectedEvents" />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Badges/Achievements -->
  <!-- <div class="container-fluid d-flex">
    <div class="row gx-4 gx-lg-5 mt-2 p-3">
      <div class="col-md-12 mx-auto">
        <div class="row">
          <h1 class="font-weight-light">My Achievements</h1>
        </div>

        Achievements
        <div class="row mt-3"> -->
  <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->

  <!-- <div class="col-md-3">
            <div class="card statsCard mx-auto border-0" style="width: 18rem">
              <div class="card-body">
                <p class="card-title h2 fw-light">Achievements</p>
                <p class="card-text h3">
                  <i class="fa fa-trophy"></i>
                  {{ badgeList.length }}
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card statsCard mx-auto border-0" style="width: 18rem">
              <div class="card-body">
                <p class="card-title h2 fw-light">Points</p>
                <p class="card-text h3">
                  <i class="fa fa-star"></i>
                  {{ badgeList.length }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card statsCard mx-auto border-0" style="width: 18rem">
              <div class="card-body">
                <p class="card-title h2 fw-light">Completed Events</p>
                <p class="card-text h3">
                  <i class="fa fa-smile-o"></i>
                  {{ eventList.length }}
                </p>
              </div>
            </div>
          </div>
          <div class="col"></div>
        </div> -->

  <!-- Tabs -->
  <!-- <ul class="nav nav-tabs mt-4" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="achievements-tab"
              data-bs-toggle="tab"
              data-bs-target="#achievements"
            >
              Achievements
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="score-tab" data-bs-toggle="tab" data-bs-target="#score"
              >Score</a
            >
          </li>
        </ul>
        <div class="tab-content mt-2" id="myTabContent">
          Achievements Info -->
  <!-- <div class="tab-pane fade show active" id="achievements" role="tabpanel">
            <div v-if="badgeList.length <= 6" class="row">  -->
  <!-- <div v-for="badge in badgeList" class="col-md-4 mb-3">
                <div class="card h-100 mx-auto">
                  <img
                    class="img-fluid mx-auto mt-3"
                    :src="badge.badgeURL"
                    alt="100%x280"
                    style="max-width: 15w; max-height: 15vh"
                  />
                  <div class="card-body text-center">
                    <h5 class="title">{{ badge.badgeName }}</h5>
                    <h5 class="card-text text-secondary">{{ badge.badgeDesc }}</h5>
                  </div>
                  <div class="card-footer text-secondary text-center">{{ badge.eventName }}</div>
                </div>
              </div> -->
  <!-- </div> -->
  <!-- <div v-else class="row"></div> -->
  <!-- Score Info -->
  <div class="tab-pane fade" id="score" role="tabpanel"></div>
  <!-- </div>
        </div>
      </div>
    </div>
  </div> -->
</template>
<script>
import { useToast } from 'vue-toastification'
import { query, collection, addDoc, getDocs, where, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/index.js'

export default {
  data() {
    return {
      name: '',
      points: 0,
      displayEvent: false,
      allEvents: [],
      events: [],
      userEvents: [],
      selectedCat: [],
      eventList: [],
      selectedEvents: [],
      upcomingEvents: [],
      showPopup: false
    }
  },
  async created() {
    this.userid = window.localStorage.getItem('userid')
    this.name = window.localStorage.getItem('username')
    this.points = window.localStorage.getItem('points')
    await this.getUserEvents()
    this.events = this.events.sort(function (a, b) {
      return new Date(b.datetime) - new Date(a.datetime)
    })
  },
  methods: {
    async getUserEvents() {
      let currentUser = this.userid
      const docSnap_user = await getDoc(doc(db, 'users', currentUser))
      if (docSnap_user.exists()) {
        this.events = docSnap_user.data().userEvents
      } else {
        console.log('Document does not exist')
      }

      for (var e of this.events) {
        const docSnap_event = await getDoc(doc(db, 'event', e))
        if (docSnap_event.exists()) {
          this.eventList.push(docSnap_event.data())
        } else {
          console.log('Document does not exist')
        }
      }
      // catch (error) {
      //   console.error('Error fetching event details:', error);
      // }
      this.eventList = this.eventList.sort((a, b) => a.datetime.seconds - b.datetime.seconds)
      const event_q = query(collection(db, 'event'))
      const eventSnap = await getDocs(event_q)

      eventSnap.forEach((doc) => {
        let d = doc.data()
        d.id = doc.id
        this.allEvents.push(d)
        if (d.datetime.seconds * 1000 > Date.now()) {
          this.upcomingEvents.push(d)
        }
      })

      let userID = window.localStorage.getItem('userid')
      const q = query(collection(db, 'theme'), where('userID', '==', userID))
      const querySnap = await getDocs(q)
      querySnap.forEach((doc) => {
        this.selectedCat = doc.data().cat
      })
      for (var ev of this.upcomingEvents) {
        if (ev.hasOwnProperty('cat') == true) {
          const contains = ev.cat.some((element) => {
            return this.selectedCat.includes(element)
          })

          if (contains == true) {
            this.selectedEvents.push(ev)
          }
        }
      }

      if (this.selectedEvents.length == 0) {
        let sub = this.upcomingEvents
        sub.slice(5)
        this.selectedEvents = sub
      }
    },

    secondsToDate(seconds) {
      var date = new Date(0)
      date.setUTCSeconds(seconds)

      var options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }

      var formattedDate = date.toLocaleString('en-GB', options)

      return formattedDate
    }
    // async getPreferences() {

    //   const event_q = query(collection(db, 'event'))
    //   const eventSnap = await getDocs(event_q);

    //   eventSnap.forEach((doc) => {
    //     this.allEvents.push(doc.data())
    //   })

    //   // query to get all docs in 'countries' collection
    //   let userID = document.getElementById('user-id').innerHTML;
    //   const q = query(collection(db, 'theme'), where('userID', '==', userID))
    //   const querySnap = await getDocs(q);
    //   querySnap.forEach((doc) => {
    //     this.selectedCat = doc.data().cat
    //   })
    //   for (var e in this.allEvents) {
    //     const contains = e.cat.some(element => {
    //       return this.selectedCat.cat.includes(element);
    //     });

    //     if (contains == true) {
    //       this.selectedEvents.push(e)
    //     }
    //   }
    //   console.log(`${this.selectedEvents}`)
    // }
  }
}
</script>
<style scoped>
#background {
  /* background-image: url('../assets/trees/sky.jpg'); */
  /* background-repeat: no-repeat;
  background-size: cover; */
  background-color: lightblue;
  border: solid grey;
  border-radius: 3%;
}
#innerBackground {
  width: 20rem;
  height: 8rem;
  /* background-color: rgb(243, 189, 63); */
  background-color: #CADC88;
  border-radius: 8rem 8rem 1rem 1rem;
  /* margin-left:31%; */
  margin: auto;
  /* position: relative; */
}
/* Cloud */
.cloud{ 
   /* margin-right: 2%; */
   /* margin-left:30%; */
   left:10%;
   bottom:300%;
   width:350px;
   height:120px;
   background:#ECEFF1;
   box-shadow: 10px 10px rgba(0,0,0,0.2);
   border-radius:100px;
   position: relative;
}
.cloud::after, .cloud::before{
    content:"";
    position:relative;
    display:inline-block;
    background:inherit;
    border-radius:inherit;
}
.cloud::after{
    width:100px;
    height:100px;
    top:-150px;
    left:-150px;
}
.cloud::before{
    width:180px;
    height:180px;
    top: -68px;
    left:90px;
}

wrapper {
  width: 100%;
  height: auto;
}

video {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
}

.videoContent {
  position: absolute;
  top: 15%;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
}

.nav-pills .nav-item a.active,
.nav-pills .nav-item a:hover {
  background-color: green;
}

.nav-pills .nav-item a.active,
.nav-pills .nav-item a:hover {
  color: #ffffff;
}

.nav-pills .nav-item a {
  background-color: #ffffff;
}

.nav-pills .nav-item a {
  color: green;
}

@-webkit-keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translateX(20px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}
</style>
