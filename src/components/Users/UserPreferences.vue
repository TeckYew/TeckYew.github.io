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
  <h1>Interests</h1>
  <h6>Please choose your preferences here</h6>
  <hr />
  <div class="container-fluid animated fadeInUp">
    <div
      class="row justify-content-center btn-toolbar"
      aria-label="Basic checkbox toggle button group"
    >
      <div v-for="(c, ind) in populateList" :key="ind" class="d-sm-text-center w-auto">
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
    <br />
    <div class="row justify-content-center">
      <div class="col-2">
        <button class="btn btn-success w-5 p-3 my-4" :onclick="submitPreferences">
          Save my Preferences
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import { updateDoc, addDoc, doc, where, query, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/index.js'

export default {
  data() {
    return {
      categories: {
        Virtual: false,
        Hybrid: false,
        'Beach Cleaning': false,
        Education: false,
        'Corporate Social Responsibility': false,
        Workshops: false,
        'Seminar Talks': false,
        Outdoor: false,
        'Green Energy': false,
        Upcycling: false,
        Recycling: false,
        'Circular Economy': false,
        'Biodiveristy Conservation': false,
        'Water Conservation': false
      },

      selectedCat: [],
      userID: '',
      docID: '',
      docExists: false
    }
  },
  computed: {
    populateList() {
      return this.categories
    }
  },
  created() {
    this.getPreferences()
  },
  methods: {
    modifyList(c) {
      console.log('I am gay')
      let idx = this.selectedCat.indexOf(c)
      if (idx == -1) {
        this.selectedCat.push(c)
      } else {
        this.selectedCat.splice(idx, 1)
      }
    },

    submitPreferences() {
      if (this.docExists == true) {
        this.updatePreferences()
      } else {
        this.createPreferences()
      }
    },

    async updatePreferences() {
      if (this.docExists == true) {
        await updateDoc(doc(db, 'theme', this.docID), {
          cat: this.selectedCat
        })
      }
      const toast = useToast()
      toast.success('Preferences saved successfully!', {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 1.48,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
    },

    async createPreferences() {
      // 'users' collection reference
      const userID = window.localStorage.getItem('userid')
      const colRef = collection(db, 'theme')
      // data to send
      const dataObj = {
        userID: userID,
        cat: this.selectedCat
      }
      // create document and return reference to it
      const docRef = await addDoc(colRef, dataObj)
      // access auto-generated ID with '.id'
      console.log('Document was created with ID:', docRef.id)
      const toast = useToast()
      toast.success('Preferences saved successfully!', {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 1.48,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })

      this.docExists = true
    },

    async getPreferences() {
      // query to get all docs in 'countries' collection
      let userID = window.localStorage.getItem('userid')
      const q = query(collection(db, 'theme'), where('userID', '==', userID))
      const querySnap = await getDocs(q)
      querySnap.forEach((doc) => {
        this.selectedCat = doc.data().cat
        this.docID = doc.id
        this.docExists = true
      })
      for (var c of this.selectedCat) {
        this.categories[c] = true
      }
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
