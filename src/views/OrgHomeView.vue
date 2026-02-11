<script setup>
import UpcomingEvent from '../components/Events/UpcomingEvents.vue'
import UserEvent from '../components/Events/UserEvents.vue'
import PastEvent from '../components/Events/PastEvents.vue'
import RecEvent from '../components/Events/RecommendedEvents.vue'
// import RecEvent from '../components/Events/test.vue'
import { getAdditionalUserInfo } from 'firebase/auth'
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

  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 col-12 ms-4">
        <h1>Hey {{ name }}!</h1>
        <br />

        <h2>Thank you for being here for us!</h2>
        <br />

        <h5>It's time..</h5>
        <h4>to create..</h4>
        <h3>more events!</h3>
      </div>

      <div class="col-lg col-6 me-4" style="background-color: rgb(235, 235, 235)">
        <h1 class="font-weight-light mx-4 mt-3 my-3">Events with users</h1>
        <ul id="myTab" role="tablist">
          <li v-for="(events, index1) in event" :key="events.eventid" role="presentation">
            <div v-for="(orgs, index2) in user" :key="orgs.userid" class="collection-item">
              <div
                v-for="(locals, index3) in local"
                :key="locals.localdata"
                class="collection-item"
              ></div>
              <div v-if="events.orgid == orgs.userid && orgs.name == 'newuser'">
                <a
                  class="btn btn-success"
                  :id="'event-tab-' + index1"
                  :data-bs-target="'#eventContent-' + index1"
                >
                  {{ events.name }}
                </a>
              </div>
            </div>
          </li>
        </ul>
        <ul class="collection with-header" id="newTab">
          <li v-for="(users, index) in user" :key="users.userid" class="collection-item">
            <div v-for="(events, index1) in event" :key="events.id" class="collection-item">
              <div
                v-for="(userevent, index2) in userevents"
                :key="userevent.id"
                class="collection-item"
              >
                <div v-if="events.eventid == userevent.eventid && users.userid == userevent.userid">
                  <div class="chip">{{ index }}</div>
                  {{ users.email }} : {{ users.name }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { useToast } from 'vue-toastification'
import { query, collection, addDoc, getDocs, where } from 'firebase/firestore'
import { db } from '../firebase/index.js'

export default {
  data() {
    return {
      userSet: new Set(),
      name: '',
      event: [],
      user: [],
      userevents: [],
      // eventid: [],
      // userid: [],
      org: [],
      local: []
    }
  },
  created() {
    this.getEvent()
    this.getUsers()
    this.getUserEvents()
    this.getLocal()
    this.getOrg()
    this.name = window.localStorage.getItem('username')
    // console.log(this.name)
  },
  methods: {
    async getEvent() {
      db.collection('event')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var data0 = {
              eventid: doc.id,
              name: doc.data().name,
              orgid: doc.data().orgid
            }
            this.event.push(data0)
            // this.eventid.push(data1.eventid)
          })
          console.log(this.event)
        })
    },
    async getUsers() {
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var data1 = {
              userid: doc.id,
              name: doc.data().name,
              email: doc.data().email
            }
            this.user.push(data1)
          })
          console.log(this.user)
        })
    },

    async getUserEvents() {
      db.collection('userevent')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var data2 = {
              eventid: doc.data().eventid,
              userid: doc.data().userid
            }
            this.userevents.push(data2)
          })
          console.log(this.userevents)
        })
    },
    async getOrg() {
      db.collection('organization')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var data3 = {
              id: doc.id,
              email: doc.data().orgemail,
              name: doc.data().orgname,
              password: doc.data().password
            }
            this.org.push(data3)
          })
          console.log(this.org)
        })
    },
    async getLocal() {
      var data4 = {
        localdata: window.localStorage.getItem('users')
      }
      this.local.push(data4)
      console.log(this.local)
    }
  },
  computed: {}
}
const dbRef = collection(db, 'users')
const data = {
  email: 'verynewuser@gmail.com'
}

// addDoc(dbRef, data)
// .then(docRef => {
//     console.log(docRef.id);
// })
// .catch(error => {
//     console.log(error);
// })
</script>
<style scoped>
.banner {
  background: lightgrey;
}

.statsCard {
  background-color: whitesmoke;
}
.chip {
  display: inline-block;
  padding: 0 15px;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  border-radius: 25px;
  background-color: #f1f1f1;
}

.carouselBtn {
  color: white;
  background-color: green;
  text-align: center;
  padding-top: 10px;
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

#myTab {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.nav-item {
  margin-right: 10px; /* Adjust the margin as needed */
  white-space: nowrap;
}

#newTab {
  overflow-x: hidden;
  overflow-y: auto;
  flex-wrap: nowrap;
}

.btn {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
