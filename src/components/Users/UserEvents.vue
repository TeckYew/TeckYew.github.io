<script setup>
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
</script>
<template>
  <h1>My Events</h1>

  <hr />
  <div v-if="userEvents.length == 0">
    You have not signed up for any events! Wanna go sign up some?
  </div>
  <div class="container-fluid" v-else>
    <!-- BS card: Start v-for this shit once db is available-->
    <div
      class="card mb-4 animated fadeInUp"
      v-for="(e, idx) in events"
      :key="idx"
      style="width: 100%"
    >
      <div class="row">
        <div class="card-body col-lg-8 ms-3">
          <h5 class="card-title">{{ e.name }}</h5>
          <h6 class="card-text">{{ getDateTime(e.datetime) }}</h6>
          <p class="card-text">{{ e.desc }}</p>
        </div>
        <div class="card-body col-lg-3 align-items-center">
          <RouterLink :to="{ name: 'eventDetails', params: { event_id: e.id } }" target="_blank">
            <button class="btn btn-success mb-2 w-100">More Details</button></RouterLink
          >
          <!-- <button class="btn btn-outline-danger w-100"><a href="#"
                            class="card-link text-decoration-none text-danger">Cancel Event</a></button> -->
        </div>

        <div class="col"></div>
      </div>
    </div>
    <!-- BS card: End -->
  </div>
</template>

<script>
import { query, collection, doc, getDoc, getDocs, where } from 'firebase/firestore'
import { db } from '../../firebase/index.js'

export default {
  data() {
    return {
      events: [],
      userEvents: [],
      selectedCat: [],
      isRendered: 0
    }
  },
  created() {
    this.userid = window.localStorage.getItem('userid')
    this.getUserEvents()

    this.isRendered = 1
  },

  methods: {
    async getUserEvents() {
      let userid = window.localStorage.getItem('userid')
      const docSnap_user = await getDoc(doc(db, 'users', userid))
      if (docSnap_user.exists()) {
        this.userEvents = docSnap_user.data().userEvents
      } else {
        console.log('Document does not exist')
      }

      for (var e of this.userEvents) {
        const docSnap_event = await getDoc(doc(db, 'event', e))
        if (docSnap_event.exists()) {
          let event = docSnap_event.data()
          console.log(event.datetime)
          if (event.datetime.seconds * 1000 >= Date.now()) {
            event.id = e
            this.events.push(event)
          }
        } else {
          console.log('Document does not exist')
        }
      }

      this.events = this.events.sort((a, b) => a.datetime.seconds - b.datetime.seconds)
    },
    async getEvents(e) {
      try {
        // query to get all docs in 'countries' collection
        const docSnap = await getDoc(doc(db, 'event', e))
        if (docSnap.exists()) {
          this.events.push(docSnap.data())
        } else {
          console.log('Document does not exist')
        }
      } catch (error) {
        console.error('Error fetching event details:', error)
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
    },
    getDateTime(dt) {
      // Converts number of seconds to a preferred DateTime mode
      // Output: Monday, 1 December 2022, 12.00 PM
      const eventDate = new Date(dt.seconds * 1000)
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
  }
}
</script>

<style>
.btn {
  white-space: nowrap;
  text-align: center;
  border-radius: 16px;
}
</style>
