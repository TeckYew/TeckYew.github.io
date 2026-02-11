<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { storage } from '../../firebase/index.js'
import { ref, uploadBytes } from 'firebase/storage'
import CloudImage from './CloudImage.vue'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required('Name is required!')
})
</script>

<template>
  <div
    class="container w-75 justify-content-center p-5 mx-auto mb-5 shadow rounded rounded-4 animated fadeInUp"
  >
    <div class="row detailBody">
      <div class="col-lg-9 col-6">
        <h1 class>{{ events.name }}</h1>
        <h6>{{ getDateTime }}</h6>
        <div class="container-fluid p-0 mt-3">
          <span
            v-for="e in events.cat"
            class="badge rounded-pill bg-success me-3 mb-2 p-2"
            :key="e"
            >{{ e }}</span
          >
        </div>
      </div>

      <div
        v-if="events.datetime.seconds * 1000 < Date.now()"
        class="col-lg-3 col-12 text-center mb-5 p-3 border rounded-4 border-danger border-3 text-bg-danger"
      >
        <h6 class="p-1">Event has concluded</h6>
        <button class="btn btn-danger w-100 p-3">Sign Up Closed</button>
      </div>
      <div
        v-else-if="!isRegistered"
        class="col-lg-3 col-12 text-center mb-5 p-3 border rounded-4 border-success border-3 text-bg-outline-success"
      >
        <h6 class="p-1">Register for this event:</h6>
        <button class="btn btn-success w-100 p-3" @click="registerUserEvent">Register</button>
      </div>

      <div v-else class="col-lg-3 col-12 text-center mb-5 p-3">
        <button class="btn btn-outline-danger w-100 p-3 border-3" @click="cancelUserEvent">
          Cancel Registration
        </button>
      </div>
    </div>
    <div class="row mb-5">
      <h5>Posted By:</h5>
      <p>{{ org }}</p>
    </div>
    <div class="row mb-5">
      <h5>Date & Time:</h5>
      <p>{{ getDateTime }}</p>
    </div>
    <div class="row mb-5">
      <h5>Event Description:</h5>
      <p>{{ events.desc }}</p>
    </div>
    <div class="row mb-5">
      <h5>Location:</h5>
      <p>{{ address }}</p>
      <GoogleMap
        :api-key="map_api_key"
        style="width: 100%; height: 500px"
        :center="location"
        :zoom="15"
      >
        <Marker :options="{ position: location }">
          <InfoWindow>
            <div id="content">
              <div id="siteNotice"></div>
              <h3 id="firstHeading" class="firstHeading">Location</h3>
              <p>{{ address }}</p>
              <div id="bodyContent">
                <button class="btn btn-dark" @click="goToMaps">Find directions</button>
              </div>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </div>
  </div>
</template>

<script>
// <!-- to test when FireBase is setup successfully -->
import { db } from '../../firebase/index.js'
import { useToast } from 'vue-toastification'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useRoute, useRouter } from 'vue-router'
import {
  doc,
  getDoc,
  collection,
  addDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { defineComponent } from 'vue'
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import axios from 'axios'

export default {
  // name: "User",
  // props: {
  //   msg: String
  // },
  components: {
    GoogleMap,
    Marker
  },
  data() {
    return {
      userType: -1,
      events: [],
      address: '',
      org: '',
      location: {
        lat: '',
        lng: ''
      },
      isRegistered: false,
      registerData: '',
      registerId: '',
      event_id: '',
      map_api_key: 'AIzaSyBgYCkqaNwiwerPaTrRi-EeyYx_x_77Lq4'
    }
  },

  computed: {
    getDateTime() {
      // Converts number of seconds to a preferred DateTime mode
      // Output: Monday, 1 December 2022, 12.00 PM
      const eventDate = new Date(this.events.datetime.seconds * 1000)
      let zone = ''
      if (eventDate.getHours() > 12) {
        zone = 'PM'
      } else {
        zone = 'AM'
      }
      let formattedTime = `, ${eventDate.getHours() % 12}:${
        (eventDate.getMinutes() < 10 ? '0' : '') + eventDate.getMinutes()
      } ${zone}`
      let formattedDate = `${eventDate.toLocaleString('default', {
        weekday: 'long'
      })}, ${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' })} ${
        eventDate.getYear() + 1900
      }`

      return formattedDate + formattedTime
    }
  },

  async created() {
    // Just to check if the userType is User
    this.userType = window.localStorage.getItem('userType')
    if (this.userType != 1) {
      this.$router.push('/Error')
    }
    const route = useRoute()
    this.event_id = route.params.event_id

    // Retrieves event information
    const docSnap = await getDoc(doc(db, 'event', this.event_id))
    if (docSnap.exists()) {
      this.events = docSnap.data()
      this.org_id = this.events.org_id._key.path.segments[6]
      this.location = { lat: Number(this.events.location[0]), lng: Number(this.events.location[1]) }
    } else {
      console.log('Document does not exist')
    }

    // Retrieves organiser info
    const docSnap_org = await getDoc(doc(db, 'organization', this.org_id))
    if (docSnap_org.exists()) {
      let org_data = docSnap_org.data()
      this.org = org_data.orgname
    } else {
      console.log('Document does not exist')
    }

    // Checks if user has already registered prior
    const docSnap_register = await getDoc(doc(db, 'users', window.localStorage.getItem('userid')))
    if (docSnap_register.exists()) {
      this.userData = docSnap_register.data()
    } else {
      console.log('Document does not exist')
    }

    // If user has registered, change appearance and save the data
    if (this.userData.hasOwnProperty('userEvents')) {
      for (var e of this.userData.userEvents) {
        if (e == this.event_id) {
          this.isRegistered = true
        }
      }
    }

    // Retrieves address (location) of the event for Google Maps
    let add = ''
    axios
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          latlng: `${this.location.lat}, ${this.location.lng}`,
          key: this.map_api_key,
          result_type: 'park|point_of_interest|airport|premise|subpremise'
        }
      })
      .then((response) => {
        console.log(response.data)
        add = response.data.results[0].formatted_address
        this.address = add
      })
      .catch((error) => {
        console.error(error)
      })
  },
  methods: {
    async registerUserEvent() {
      let userid = window.localStorage.getItem('userid')
      const userdb = doc(db, 'users', userid)

      if (!this.userData.hasOwnProperty('userEvents')) {
        let entry = [this.event_id]
        await setDoc(userdb, {
          userEvents: entry
        })
      } else {
        await updateDoc(userdb, {
          userEvents: arrayUnion(this.event_id)
        })
      }

      if (!this.userData.hasOwnProperty('points')) {
        await setDoc(userdb, {
          points: 50
        })
      } else {
        let points = Number(this.userData.points) + 50
        await updateDoc(userdb, {
          points: points
        })
      }

      // alert("User saved successfully!");
      const toast = useToast()
      toast.success('Registration is successful!', {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 1.48,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
      toast.info('50 points have been added!', {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 1.48,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
      this.isRegistered = true
    },

    async cancelUserEvent() {
      let userid = window.localStorage.getItem('userid')
      const userdb = doc(db, 'users', userid)

      await updateDoc(userdb, {
        userEvents: arrayRemove(this.event_id)
      })

      if (!this.userData.hasOwnProperty('points')) {
        await setDoc(userdb, {
          points: 50
        })
      } else {
        let points = Math.max(Number(this.userData.points) - 50, 0)
        await updateDoc(userdb, {
          points: points
        })
      }

      const toast = useToast()
      toast.info('Registration cancelled successfully', {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 1.48,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })

      toast.info('50 points have been deducted from your account', {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 1.48,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })

      this.isRegistered = false
    },
    goToMaps() {
      const routeData = `http://maps.google.com/maps?z=12"&q=loc:${this.location.lat}+${this.location.lng}`
      window.open(routeData)
    }
  }
}
</script>

<style>
.shadow {
  box-shadow:
    0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  background-color: white;
}

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
</style>
