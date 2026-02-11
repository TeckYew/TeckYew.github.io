<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { storage } from '../../firebase/index.js'
import { ref, uploadBytes } from 'firebase/storage'
import CloudImage from './CloudImage.vue'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required('Name is required!'),
  desc: yup.string().required('Event Description is required!')
})
</script>
<template>
  <div class="row justify-content-center">
    <div class="col col-lg-5 px-5 px-lg-0 mx-lg-auto">
      <br /><br />
      <h3 class="text-center">🌳 Add Event 🌳</h3>
      <br /><br />
      <Form :validation-schema="schema" @submit="onSubmit">
        <div class="mb-3 field">
          <label>Event Name</label>
          <Field
            type="text"
            name="name"
            class="form-control"
            v-model="event.name"
            v-validate="'required'"
            required
          />
          <ErrorMessage name="name" />
        </div>
        <div class="mb-3">
          <label>Event Description</label>
          <Field as="textarea" rows="8" name="desc" class="form-control" v-model="event.desc" />
          <ErrorMessage name="desc" />
        </div>
        <div class="mb-3">
          <label>Date/Time</label>
          <VueDatePicker
            type="datetime"
            name="datetime"
            class="form-control"
            v-model="event.datetime"
            :min-date="new Date()"
            :is-24="false"
            required
          />
          <ErrorMessage name="datetime" />
        </div>
        <!-- <div>
          <label>Location</label>
          <input type="text" v-model="searchQuery" placeholder="Search for a place" @keydown="selectSuggestion(suggestion)">
          <ul>
            <li v-for="suggestion in suggestions" :key="suggestion">
              {{ suggestion.description }}
            </li>
          </ul>
        </div> -->
        <div
          class="row justify-content-center btn-toolbar"
          aria-label="Basic checkbox toggle button group"
        >
          <div v-for="(c, ind) in cats" :key="ind" class="d-sm-text-center w-auto">
            <input
              type="checkbox"
              class="btn-check w-auto mx-auto"
              :id="ind"
              :value="ind"
              @click="modifyList(ind)"
            />
            <label class="btn btn-outline-success p-3 m-2 my-3" :for="ind">{{ ind }}</label
            ><br />
          </div>
        </div>
        <div class="mb-3">
          <button @submit="onSubmit" class="btn btn-success btn-block">Create Event</button>
          &nbsp;
          <button @click="cancel" class="btn btn-dark btn-block">Cancel</button>
          <br /><br />
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
// <!-- to test when FireBase is setup successfully -->
import { db } from '../../firebase/index.js'
import { useToast } from 'vue-toastification'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import axios from 'axios'
export default {
  // name: "User",
  // props: {
  //   msg: String
  // },
  components: {
    VueDatePicker
  },
  data() {
    return {
      cats: {},
      events: [],
      event: {
        name: '',
        desc: '',
        datetime: new Date(),
        location: [],
        orgid: 0,
        cat: []
      },
      map_api_key: 'AIzaSyBgYCkqaNwiwerPaTrRi-EeyYx_x_77Lq4',
      loc: '',
      searchQuery: '',
      suggestions: []
    }
  },
  async created() {
    // this.$swal('Hello world')
    this.event.orgid = window.localStorage.getItem('userid')
    await this.retrieveCat()
    if (this.event.orgid == 0) {
      this.$router.push('/Error')
    }
  },
  methods: {
    onSubmit() {
      // console.log("cheebs")
      db.collection('event')
        .add(this.event)
        .then((docRef) => {
          // alert("User saved successfully!");
          // console.log('Document written with ID: ', docRef.id)
          this.$swal
            .fire({
              icon: 'success',
              title: 'Event created successfully!',
              showConfirmButton: true,
              confirmButtonColor: 'green'
              // timer: 1500
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.$router.push('/events')
              }
            })
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    },
    async retrieveCat() {
      db.collection('theme')
        .doc('themeName')
        .get()
        .then((queryResponse) => {
          for (const [key, value] of Object.entries(queryResponse.data())) {
            this.cats[value] = false
          }
        })
        .catch((err) => {
          console.log('ccb')
        })
    },
    modifyList(c) {
      if (this.event.cat) {
        let idx = this.event.cat.indexOf(c)
        if (idx == -1) {
          this.event.cat.push(c)
        } else {
          this.event.cat.splice(idx, 1)
        }
      } else {
        this.event.cat.push(c)
      }
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
//     data() {
//         return {
//             user: {
//               // name: '',
//               // email: '',
//               // password: '',
//               // confirmpassword: ''
//             }
//         }
//     },
//     // created() {
//     //     let dbRef = db.collection('users').doc(this.$route.params.id);
//     //     dbRef.get().then((doc) => {
//     //         this.user = doc.data();
//     //     }).catch((error) => {
//     //         console.log(error)
//     //     })
//     // },
//     methods: {
//         onFormSubmit(event) {
//             event.preventDefault()
//             db.collection('users').add(this.user).then(() => {
//                 alert("User successfully created!");
//                 this.user.name = ''
//                 this.user.email = ''
//                 this.user.password = ''
//                 this.user.confirmation = ''
//             }).catch((error) => {
//                 console.log(error);
//             });
//         }
//     }
// }
</script>
