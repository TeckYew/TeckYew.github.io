<script setup>
import EventCard from './EventCard.vue'
import { doc, deleteDoc } from 'firebase/firestore'
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="container-fluid mt-4">
      <!-- Added mx-auto for horizontal centering -->
      <div class="row mx-auto">
        <!-- Left Side: List of Upcoming Events -->
        <div class="col-12">
          <h1 class="text-center">Events</h1>

          <div class="container mt-3"></div>
          <div class="container w-75 my-3 mx-auto">
            <div class="row">
              <nav class="navbar navbar-expand bg-light">
                <div class="col">
                  <div class="form">
                    <i class="fa fa-search"></i>
                    <input
                      type="text"
                      class="form-control form-input"
                      placeholder="Search anything..."
                      :value="searchQuery"
                      @keyup="updateQuery"
                    />
                  </div>
                </div>
              </nav>
            </div>

            <div class="d-flex row align-items-center">
              <li class="nav-item oo-roboto-override dropdown w-auto">
                <a
                  class="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style="display: flex; align-items: center"
                >
                  <h3 class="align-middle" style="margin: 0">{{ currentCat }}</h3>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li v-for="c in cats" :key="c">
                    <a
                      class="dropdown-item"
                      :value="c"
                      @click="changeTabs(c)"
                      style="display: flex; align-items: center"
                    >
                      {{ c }}
                    </a>
                  </li>
                </ul>
              </li>
              <div
                id="carouselBannerControls"
                class="carousel slide carousel-dark w-auto float-none overflow-hidden"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="container-fluid py-2" style="overflow-y: scroll">
                    <div class="d-flex flex-row flex-nowrap scrollContent">
                      <div v-for="(c, ind) in suggestedCat" :key="ind">
                        <div v-if="currentCat == c" class="d-sm-text-center w-auto">
                          <input
                            type="radio"
                            class="btn-check w-auto mx-auto"
                            :id="ind"
                            :value="c"
                            @click="changeTabs(c)"
                          />
                          <label class="btn btn-success p-3 m-2 my-3" :for="ind">{{ c }}</label
                          ><br />
                        </div>
                        <div v-else class="d-sm-text-center w-auto">
                          <input
                            type="radio"
                            class="btn-check w-auto mx-auto"
                            :id="ind"
                            :value="c"
                            @click="changeTabs(c)"
                          />
                          <label class="btn btn-outline-success p-3 m-2 my-3" :for="ind">{{
                            c
                          }}</label
                          ><br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="searchQuery.length == 0" class="row mx-auto justify-content-center w-75">
          <div
            class="col-lg-4 col-md-6 col-12 mx-auto"
            v-for="event in selectedEvents"
            :key="event.eventId"
          >
            <EventCard :eventData="event" class="animated fadeInUp"></EventCard>
          </div>
        </div>
        <div v-else class="row w-75 mx-auto justify-content-center">
          <div
            class="col-lg-4 col-6 col mx-auto"
            v-for="event in filteredEvents"
            :key="event.eventId"
          >
            <EventCard :eventData="event" class="animated fadeInUp"></EventCard>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side: Event Details -->
  </div>

  <div v-if="userType == 2" class="container mt-4 mx-auto">
    <!-- Added mx-auto for horizontal centering -->
    <div class="row">
      <!-- Left Side: List of Upcoming Events -->
      <div class="col-md-10 col-xs-6 col-lg-12">
        <h2>
          {{ name }}'s Events
          <button class="btn btn-success btn-block" style="float: right" @click="createEvent">
            Create Event
          </button>
        </h2>

        <div class="row mt-4">
          <div class="list-container">
            <ul class="list-group">
              <!-- Replace with dynamic event list -->
              <li v-for="event in allEvents" :key="event.eventId" class="list-group-item">
                {{ event.eventTitle }}

                <div style="float: right">
                  <button
                    class="btn btn-outline-success"
                    @click="manageParticipants(event.eventId, event.eventTitle, event.eventDate)"
                  >
                    Manage Participants
                  </button>
                  &nbsp;
                  <button
                    v-if="event.eventDate > date"
                    class="btn btn-outline-success"
                    @click="updateEvent(event.eventId)"
                  >
                    Update
                  </button>
                  &nbsp;
                  <button
                    v-if="event.eventDate > date"
                    class="btn btn-outline-danger"
                    @click="deleteEvent(event.eventId)"
                  >
                    Delete
                  </button>
                </div>
              </li>
              <!-- Add more events here as needed -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.list-container {
  max-height: 300px;
  /* Adjust the maximum height as needed */
  overflow-y: auto;
  height: 80%;
}

.event-details-container {
  /* border: 1px solid #ccc; Border style */
  padding: 1.16%;
  height: 80%;
}
</style>

<script>
import { db } from '../../firebase/index.js'
import { query, collection, addDoc, getDocs, where, getDoc, doc } from 'firebase/firestore'

import axios from 'axios'
export default {
  data() {
    return {
      cats: [
        'All Events',
        'Just for You',
        'Virtual',
        'Hybrid',
        'Beach Cleaning',
        'Education',
        'Corporate Social Responsibility',
        'Workshops',
        'Seminar Talks',
        'Outdoor',
        'Green Energy',
        'Upcycling',
        'Recycling',
        'Circular Economy',
        'Biodiveristy Conservation',
        'Water Conservation'
      ],
      selectedEvents: [],
      allEvents: [],
      upcomingEvents: [],
      pastEvents: [],
      recommendedEvents: [],
      catEvents: [],
      filteredEvents: [],
      name: '',
      userType: 1,
      searchQuery: '',
      currentCat: 'All Events',
      selectedCat: [],
      date: new Date()
    }
  },
  async created() {
    this.userType = window.localStorage.getItem('userType')
    this.name = window.localStorage.getItem('username')
    let userID = window.localStorage.getItem('userid')
    this.role = this.userType
    let today = new Date()
    if (this.role == 1) {
      db.collection('event')
        .orderBy('datetime')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, ' => ', doc.data())
            let { name, desc, datetime, cat } = doc.data()
            let eventDate = new Date(datetime['seconds'] * 1000)
            let eventDetail = {
              eventId: doc.id,
              eventTitle: name,
              eventDesc: desc,
              eventDate: eventDate,
              eventType: cat
            }

            // console.log(doc.data()['name'])
            if (eventDate > today) {
              this.upcomingEvents.push(eventDetail)
            } else {
              this.pastEvents.push(eventDetail)
            }
          })
        })

      this.selectedEvents = this.upcomingEvents

      const q = query(collection(db, 'theme'), where('userID', '==', userID))
      const querySnap = await getDocs(q)
      querySnap.forEach((doc) => {
        this.selectedCat = doc.data().cat
      })

      console.log(this.selectedCat)
    } else {
      let ouID = window.localStorage.getItem('userid')
      console.log(ouID)
      db.collection('event')
        .orderBy('datetime')
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((element) => {
            if (element.data()['orgid'] == ouID) {
              this.populateData(element)
            }
          })
        })
    }
  },
  computed: {
    suggestedCat() {
      let sc = this.selectedCat
      sc.slice(3)
      return sc
    }
  },
  methods: {
    populateData(doc) {
      let today = new Date()

      let { name, desc, datetime, cat } = doc.data()
      let eventDate = new Date(datetime['seconds'] * 1000)
      let eventDetail = {
        eventId: doc.id,
        eventTitle: name,
        eventDesc: desc,
        eventDate: eventDate,
        eventType: cat
      }

      this.allEvents.push(eventDetail)
    },

    // route paths
    createEvent() {
      this.$router.push({ name: 'create' })
    },
    updateEvent(id) {
      this.$router.push({ name: 'updateEvent', params: { eventId: id } })
    },
    manageParticipants(id, title, date) {
      this.$router.push({
        name: 'participantDetails',
        params: { eventId: id, eventTitle: title, eventDate: date }
      })
    },
    async deleteEvent(id) {
      this.$swal
        .fire({
          title: 'Are you sure you want to delete this?',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          confirmButtonColor: '#d33',
          cancelButtonColor: 'green'
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            db.collection('event')
              .doc(id)
              .delete()
              .then((ref) => {
                this.$swal
                  .fire({
                    title: 'Deleted successfully!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'green'
                  })
                  .then((res) => {
                    if (res.isConfirmed) {
                      this.$router.push('/events')
                    }
                  })
              })
              .catch((err) => {
                this.$swal.fire('Error encountered...!', '', 'info')
              })
          }
        })
    },
    manageParticipants(id, title, date) {
      this.$router.push({
        name: 'participantDetails',
        params: { eventId: id, eventTitle: title, eventDate: date }
      })
    },
    async deleteEvent(id) {
      this.$swal
        .fire({
          title: 'Are you sure you want to delete this?',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          confirmButtonColor: '#d33',
          cancelButtonColor: 'green'
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            db.collection('event')
              .doc(id)
              .delete()
              .then((ref) => {
                this.$swal
                  .fire({
                    title: 'Deleted successfully!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'green'
                  })
                  .then((res) => {
                    if (res.isConfirmed) {
                      this.$router.push('/events')
                    }
                  })
              })
              .catch((err) => {
                this.$swal.fire('Error encountered...!', '', 'info')
              })
          }
        })
    },
    changeTabs(cat) {
      this.currentCat = cat
      if (cat == 'Just for You') {
        this.selectedEvents = []
        for (var ev of this.upcomingEvents) {
          if (typeof ev.eventType !== 'undefined') {
            let cat = this.selectedCat
            const contains = ev.eventType.some((element) => {
              return cat.includes(element)
            })
            if (contains == true) {
              this.selectedEvents.push(ev)
            }
          }
        }

        if (this.selectedEvents.length == 0) {
          this.selectedEvents = this.upcomingEvents
        }
      } else if (cat == 'All Events') {
        this.selectedEvents = this.upcomingEvents
      } else {
        this.selectedEvents = []
        for (var ev of this.upcomingEvents) {
          if (typeof ev.eventType !== 'undefined') {
            if (ev.eventType.includes(this.currentCat)) {
              this.selectedEvents.push(ev)
            }
          }
        }
      }
    },
    updateQuery(e) {
      this.searchQuery = e.target.value
      if (this.searchQuery.length == 0) {
        return this.selectedEvents
      } else {
        let res = []
        for (var event of this.selectedEvents) {
          if (event.eventTitle.toLowerCase().includes(this.searchQuery.toLowerCase())) {
            res.push(event)
          }
        }
        this.filteredEvents = res
      }
    }
  }
}
</script>

<style>
body {
  /* background: #d1d5db; */
}

.form {
  position: relative;
}

.form .fa-search {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #9ca3af;
}

.form span {
  position: absolute;
  right: 17px;
  top: 13px;
  padding: 2px;
  border-left: 1px solid #d1d5db;
}

.left-pan {
  padding-left: 7px;
}

.left-pan i {
  padding-left: 10px;
}

.form-input {
  height: 55px;
  text-indent: 33px;
  border-radius: 10px;
}

.form-input:focus {
  box-shadow: none;
  border: none;
}
</style>
