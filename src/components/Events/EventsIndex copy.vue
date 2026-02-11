<script setup>
import EventCard from './EventCard.vue'
</script>

<template>
  <div class="d-flex justify-content-center">
    <div v-if="userType == 1" class="container-fluid mx-auto">
      <!-- Added mx-auto for horizontal centering -->
      <div class="row mx-auto">
        <!-- Left Side: List of Upcoming Events -->
        <div class="col-12">
          <h1 class="text-center">Events</h1>

          <div class="container mt-3"></div>
          <div class="container w-75 my-3 mx-auto">
            <div class="row">
              <nav class="navbar navbar-expand bg-light">
                <div class="col-lg-2 col-12 col">
                  <li class="nav-item oo-roboto-override dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style="display: flex; align-items: center"
                    >
                      <h3 style="margin: 0">{{ currentCat }}</h3>
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
                </div>
                <div class="col ms-5">
                  <div class="form">
                    <i class="fa fa-search"></i>
                    <input
                      type="text"
                      class="form-control form-input"
                      placeholder="Search anything..."
                      :value="searchQuery"
                    />
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <div class="flex row w-75 mx-auto">
            <div class="col" v-for="event in upcomingEvents" :key="event.eventId">
              <EventCard :eventData="event"></EventCard>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Event Details -->

      <!-- Buttons: Create Event and Delete Event -->
      <div class="row mt-4">
        <div class="col-md-6">
          <button class="btn btn-primary btn-block" @click="createEvent">Create Event</button>
          <!-- <RouterLink class="button" :to="{ name: 'hello', params: {id:1}}">
          <span>Hello</span>
          </RouterLink> -->
        </div>
        <!-- <div class="col-md-6">
          <button class="btn btn-danger btn-block">Delete Event</button>
        </div> -->
      </div>
    </div>

    <div v-if="userType == 2" class="container mt-4 mx-auto">
      <!-- Added mx-auto for horizontal centering -->
      <div class="row">
        <!-- Left Side: List of Upcoming Events -->
        <div class="col-md-8">
          <h2>All Events</h2>
          <div class="list-container">
            <ul class="list-group">
              <!-- Replace with dynamic event list -->
              <li v-for="event in upcomingEvents" :key="event.eventId" class="list-group-item">
                {{ event.eventTitle }}
                <button
                  style="float: right"
                  class="btn btn-outline-success"
                  @click="updateEvent(event.eventId)"
                >
                  Update
                </button>
              </li>
              <!-- Add more events here as needed -->
            </ul>
          </div>
        </div>

        <!-- Right Side: Event Details -->
        <div class="col-md-8">
          <h2 class="eventdetails">Event Details</h2>
          <div class="event-details-container">
            <!-- Details for the selected event will be displayed here -->
          </div>
        </div>
      </div>

      <!-- Buttons: Create Event and Delete Event -->
      <div class="row mt-4">
        <div class="col-md-6">
          <button class="btn btn-primary btn-block" @click="createEvent">Create Event</button>
          <!-- <RouterLink class="button" :to="{ name: 'hello', params: {id:1}}">
          <span>Hello</span>
          </RouterLink> -->
        </div>
        <!-- <div class="col-md-6">
          <button class="btn btn-danger btn-block">Delete Event</button>
        </div> -->
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

export default {
  data() {
    return {
      cats: [
        'Just for You',
        'All Events',
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
      upcomingEvents: [],
      pastEvents: [],
      recommendedEvents: [],
      catEvents: [],
      userType: 1,
      searchQuery: '',
      currentCat: 'Just for You'
    }
  },
  created() {
    this.userType = window.localStorage.getItem('userType')
  },
  async created() {
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
          // let checkEvent = today.getFullYear() - eventDate.getFullYear()
          // if (checkEvent == 0) {
          //   if (today.getMonth() >= eventDate.getMonth()) {
          //     if (today.getDate() >= eventDate.getDate()) {
          //       if today.getT
          //     }
          //   }
          // }
          // if (today.getMonth() > birthday.getMonth()) {
          //   // return currentAge
          // }
          // else if (today.getMonth() == birthday.getMonth()) {
          //   if (today.getDate() >= birthday.getDate()) {
          //     // return currentAge
          //   }
          //   else {
          //     // return currentAge - 1
          //   }
          // }
          // else {
          //   // return currentAge - 1
          // }
          // console.log(doc.data()['datetime']['seconds'])
        })
      })
  },
  methods: {
    // route paths
    createEvent() {
      this.$router.push('create')
    },
    updateEvent(id) {
      this.$router.push({ name: 'updateEvent', params: { id: id } })
      // console.log(id)
    },
    changeTabs(cat) {
      this.currentCat = cat
      if (cat == 'Just for You') {
        this.selectedEvents = this.recommendedEventsEvents
      } else if (cat == 'All Events') {
        this.selectedEvents = this.upcomingEvents
      } else {
        this.selectedEvents = this.catEvents
      }
    }
  }
}
</script>

<style>
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
