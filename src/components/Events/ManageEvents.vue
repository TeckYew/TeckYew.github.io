<script setup>
import { db } from '../../firebase/index.js'
import EventCard from './EventCard.vue'
import { query, collection, addDoc, getDocs, where } from 'firebase/firestore'
defineProps({
  userObj: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      upcomingEvents: [],
      pastEvents: []
    }
  },
  async created() {
    if (this.userObj.userType == 1) {
      this.$router.push('/Error')
    } else {
      // test
      this.getOUEvents()
    }
  },
  methods: {
    async getUserEvent() {
      // query to get all docs in 'countries' collection
      let currentUser = window.localStorage.getItem('username')
      const querySnap = await getDocs(
        query(collection(db, 'userevent'), where('userid', '==', currentUser))
      )
      if (!querySnap.empty) {
        // add each doc to 'countries' array
        querySnap.forEach((doc) => {
          this.events.push(doc.data().eventid)
        })
        return this.events
      }
    },

    async getEvents() {
      // query to get all docs in 'countries' collection
      let ue = []
      await this.getUserEvent()
      console.log(this.events)
      const querySnap = await getDocs(
        query(collection(db, 'event'), where('id', 'in', this.events))
      )
      console.log(querySnap)

      // add each doc to 'countries' array
      querySnap.forEach((doc) => {
        ue.push(doc.data())
      })

      this.userEvents = ue
    }
  }
}
</script>

<script>
let today = new Date()
db.collection('event')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data())
      let { name, desc, datetime } = doc.data()
      let eventDate = new Date(datetime['seconds'] * 1000)
      let eventDetail = {
        eventId: doc.id,
        eventTitle: name,
        eventDesc: desc,
        eventDate: eventDate,
        eventType: 'Workshop'
      }
      // console.log(doc.data()['name'])
      if (eventDate > today) {
        this.upcomingEvents.push(eventDetail)
      } else {
        this.pastEvents.push(eventDetail)
      }
    })
  })
</script>
