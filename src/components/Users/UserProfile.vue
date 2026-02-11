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
  <h1>Account Settings</h1>
  <hr />
  <div class="container animated fadeInUp">
    <div class="row justify-content-center btn-toolbar">
      <h2>Account Details</h2>
      <form class="mt-3 mb-5">
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"><strong>Name:</strong></label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticName"
              :value="name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label"><strong>Email:</strong></label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail"
              :value="email"
            />
          </div>
        </div>
      </form>
    </div>
    <div class="row justify-content-center btn-toolbar">
      <h2>Change Password</h2>
      <form class="mt-3 mb-5">
        <div class="form-check form-switch ps-5">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            @click="disabled = !disabled"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault">Change my Password</label>
        </div>
        <div class="form-group row mt-3 p-0">
          <label for="inputPassword" class="col-4 col-form-label">Password</label>
          <div class="col">
            <input
              type="password"
              class="form-control"
              id="currentPassword"
              :disabled="disabled == true"
            />
          </div>
        </div>
        <div class="form-group row mt-3 p-0">
          <label for="inputPassword" class="col-4 col-form-label">New Password: </label>
          <div class="col">
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              :disabled="disabled == true"
            />
          </div>
        </div>
        <div class="form-group row mt-3 p-0">
          <label for="inputPassword" class="col-4 col-form-label">Confirm Password:</label>
          <div class="col">
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              :disabled="disabled == true"
            />
          </div>
        </div>
      </form>
    </div>
  </div>

  <button
    class="btn btn-success justify-content-center mx-auto w-5 p-3 mb-5"
    :onclick="submitPreferences"
  >
    Save my Preferences
  </button>
</template>

<script>
import { useToast } from 'vue-toastification'
import { db } from '../../firebase/index.js'

export default {
  data() {
    return {
      categories: [
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

      selectedCat: [],
      name: 'Toh Zheng Feng',
      email: 'zftoh.2022@smu.edu.sg',
      disabled: true
    }
  },
  created() {
    this.email = window.localStorage.getItem('email')
    this.name = window.localStorage.getItem('username')
  },
  computed: {
    populateList() {
      let cat = this.categories.sort((a, b) => a.length - b.length)
      return cat
    }
  },

  methods: {
    modifyList(cat) {
      let c = cat.target._value
      let idx = this.selectedCat.indexOf(c)
      if (idx == -1) {
        this.selectedCat.push(c)
      } else {
        this.selectedCat.splice(idx, 1)
      }

      console.log(this.selectedCat)
    },

    submitPreferences() {
      // upload that shit to the database
      alert(this.selectedCat)
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
