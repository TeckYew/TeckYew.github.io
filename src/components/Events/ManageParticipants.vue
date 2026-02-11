<script setup>
defineProps({
  eventId: {
    type: String,
    required: true
  },
  eventTitle: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  }
})
</script>
<template>
  <div>
    <div class="container mt-4 mx-auto">
      <!-- Added mx-auto for horizontal centering -->
      <div class="row">
        <!-- Left Side: List of Upcoming Events -->
        <div class="col-md-10 col-xs-6 col-lg-12">
          <h2>
            {{ eventTitle }}'s Participants
            <button
              class="btn btn-success btn-block"
              style="float: right"
              @click="cancel"
            >
              Back
            </button>
          </h2>

          <div class="row mt-4">
            <div class="list-container">
              <ul class="list-group">
                <!-- Replace with dynamic event list -->
                <li v-for="user in users" :key="users.id" class="list-group-item">
                  {{ user.name }}
                  <!-- Only upcoming events can delete participants -->

                  <div v-if="new Date(eventDate) > this.today" style="float: right">
                    <button class="btn btn-outline-danger" @click="deleteParticipant(user.id)">
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
  </div>
</template>
<script>
import { db } from '../../firebase/index.js'

export default {
  data() {
    return {
      users: [],
      today: new Date()
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data()['userEvents']) {
              if (doc.data()['userEvents'].includes(this.eventId)) {
                let userObj = {}
                userObj['name'] = doc.data().name
                userObj['id'] = doc.id
                this.users.push(userObj)
              }
            }
            // if (doc.data()['userEvents'].includes(1)) {
            //     let userObj = {}
            //     userObj["name"] = doc.data().name
            //     userObj["id"] = doc.id()
            //     this.users.push(userObj)

            // }
          })
        })
    },
    deleteParticipant(id) {
      this.$swal
        .fire({
          icon: 'warning',
          title: 'Are you sure you want to remove this user from the event?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: 'green'
          // timer: 1500
        })
        .then((res) => {
          if (res.isConfirmed) {
            db.collection('users')
              .doc(id)
              .get()
              .then((querySnapshot) => {
                let user = querySnapshot.data()
                user['userEvents'] = user['userEvents'].filter((eventId) => {
                  return eventId !== this.eventId
                })
                db.collection('users')
                  .doc(id)
                  .set(user)
                  .then((ref) => {
                    this.$swal
                      .fire({
                        icon: 'success',
                        title: 'User removed successfully!',
                        showConfirmButton: true,
                        confirmButtonColor: 'green'
                        // timer: 1500
                      })
                      .then((result) => {
                        if (result.isConfirmed) {
                          location.reload()
                        }
                      })
                  })
              })
          }
        })
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
