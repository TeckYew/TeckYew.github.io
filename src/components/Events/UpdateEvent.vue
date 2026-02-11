<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { storage } from '../../firebase/index.js'
import { query, collection, addDoc, getDocs, where } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import CloudImage from './CloudImage.vue'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required('Name is required!'),
  desc: yup.string().required('Event Description is required!')
})

defineProps({
  eventId: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="row justify-content-center">
    <div class="col col-lg-5 px-5 px-lg-0 mx-lg-auto">
      <br /><br />
      <h3 class="text-center">🌳 Update Event - {{ eventName }} 🌳</h3>
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
          <Field
            as="textarea"
            rows="5"
            name="desc"
            class="form-control"
            v-model="event.desc"
            v-validate="'required'"
          />
          <ErrorMessage name="desc" />
        </div>
        <div class="mb-3">
          <label>Date/Time</label>
          <VueDatePicker
            locale="en-GB"
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
        <div
          class="row justify-content-left btn-toolbar"
          aria-label="Basic checkbox toggle button group"
        >
          <label>Theme</label>
          <div v-for="(c, ind) in cats" :key="ind" class="d-sm-text-center w-auto">
            <input
              type="checkbox"
              class="btn-check w-auto mx-auto"
              :id="ind"
              :value="ind"
              @click="modifyList(ind)"
              :checked="c"
            />
            <label class="btn btn-outline-success p-3 m-2 my-3" :for="ind">{{ ind }}</label
            ><br />
          </div>
        </div>
        <div class="mb-3">
          <button @submit="onSubmit" class="btn btn-success btn-block">Update Event</button>
          &nbsp;
          <button @click="cancel" class="btn btn-dark btn-block">Cancel</button>
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
export default {
  // name: "User",
  // props: {
  //   msg: String
  // },
  components: {
    CloudImage,
    VueDatePicker
  },
  data() {
    return {
      cats: {},
      eventName: '',
      event: {
        name: '',
        desc: '',
        datetime: '',
        id: '',
        location: [],
        cat: []
      },
      userType: 0
    }
  },
  async created() {
    this.userType = window.localStorage.getItem('userType')
    await this.retrieveEvent()
    await this.retrieveCat()
    if (this.userType == 0) {
      this.$router.push('/Error')
    }
  },
  methods: {
    onSubmit() {
      this.$swal
        .fire({
          title: 'Do you want to save the changes?',
          showCancelButton: true,
          confirmButtonText: 'Save',
          confirmButtonColor: 'green',
          cancelButtonColor: '#d33'
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            db.collection('event')
              .doc(this.eventId)
              .set({
                name: this.event.name,
                desc: this.event.desc,
                datetime: this.event.datetime,
                location: this.event.location,
                cat: this.event.cat,
                orgid: window.localStorage.getItem('userid')
              })
              .then((ref) => {
                this.$swal
                  .fire({
                    icon: 'success',
                    title: 'Event updated successfully!',
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
              .catch((err) => {
                this.$swal.fire('Error encountered... changes may not be saved!', '', 'info')
              })
          }
        })

      //   const toast = useToast()
      //   toast.success('Event updated successfully!!', {
      //     position: 'top-right',
      //     timeout: 5000,
      //     closeOnClick: true,
      //     pauseOnFocusLoss: true,
      //     pauseOnHover: false,
      //     draggable: true,
      //     draggablePercent: 1.48,
      //     showCloseButtonOnHover: false,
      //     hideProgressBar: false,
      //     closeButton: 'button',
      //     icon: true,
      //     rtl: false
      //   })
      //   this.$router.push('/events')
      // })
      // .catch((err) => {
      //   const toast = useToast()
      //   toast.error('GONES! There is some error!! Please try again', {
      //     position: 'top-right',
      //     timeout: 5000,
      //     closeOnClick: true,
      //     pauseOnFocusLoss: true,
      //     pauseOnHover: false,
      //     draggable: true,
      //     draggablePercent: 1.48,
      //     showCloseButtonOnHover: false,
      //     hideProgressBar: false,
      //     closeButton: 'button',
      //     icon: true,
      //     rtl: false
      //   })
      // })
      // db.collection('event')
      //     .add(this.event)
      //     .then((docRef) => {
      //         // alert("User saved successfully!");
      //         console.log('Document written with ID: ', docRef.id)
      //         const toast = useToast()
      //         toast.success('Event added successfully!', {
      //             position: 'top-right',
      //             timeout: 5000,
      //             closeOnClick: true,
      //             pauseOnFocusLoss: true,
      //             pauseOnHover: false,
      //             draggable: true,
      //             draggablePercent: 1.48,
      //             showCloseButtonOnHover: false,
      //             hideProgressBar: false,
      //             closeButton: 'button',
      //             icon: true,
      //             rtl: false
      //         })
      //     })
      //     .catch((error) => {
      //         console.error('Error adding document: ', error)
      //     })

      // db.collection('event')
      //     .get()
      //     .then((querySnapshot) => {
      //         querySnapshot.forEach((doc) => {
      //             console.log(doc.id, ' => ', doc.data())

      //             if (doc.id == this.eventId) {
      //                 console.log("found")
      //             }
      //             this.events.push(doc.data())
      //             for (var snapshot in querySnapshot.docs) {
      //                 var documentID = snapshot.id // <-- Document ID
      //             }
      //             this.events.push(documentID)
      //         })
      //     })
    },

    async retrieveEvent() {
      db.collection('event')
        .doc(this.eventId)
        .get()
        .then((querySnap) => {
          this.event = querySnap.data()
          this.event.datetime = new Date(this.event.datetime.seconds * 1000)
          this.eventName = this.event.name
        })
    },
    async retrieveCat() {
      db.collection('theme')
        .doc('themeName')
        .get()
        .then((queryResponse) => {
          for (const [key, value] of Object.entries(queryResponse.data())) {
            this.cats[value] = false
            if (this.event.cat) {
              if (this.event.cat.includes(value)) {
                this.cats[value] = true
              }
            }
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
</script>
