<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email('It must be a valid email!').required('Email is required!'),
  name: yup.string().required('Name is required!'),
  password: yup.string().required('Password is required!').min(8),
  confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match!')
})
</script>
<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Organisation User Sign Up</h3>
      <Form :validation-schema="schema" @submit="onSubmit">
        <div class="mb-3 field">
          <label>Organization Name</label>
          <Field
            type="text"
            name="name"
            class="form-control"
            v-model="user.name"
            v-validate="'required'"
            required
          />
          <ErrorMessage name="name" />
        </div>
        <div class="mb-3">
          <label>Organization Email</label>
          <Field type="email" name="email" class="form-control" v-model="user.email" required />
          <ErrorMessage name="email" />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <Field
            type="password"
            name="password"
            class="form-control"
            v-model="user.password"
            required
          />
          <ErrorMessage name="password" />
        </div>
        <div class="mb-3">
          <label>Confirm Password</label>
          <Field
            type="password"
            :rules="checkPassword"
            name="confirmation"
            v-model="confirmation"
            class="form-control"
            required
          />
          <ErrorMessage name="confirmation" />
        </div>
        <div class="mb-3">
          <button class="btn btn-primary btn-block">Sign Up</button>
        </div>
      </Form>
      <span
        >Have an account? Login
        <RouterLink to="/login">here</RouterLink>
      </span>
    </div>
  </div>
</template>

<script>
// <!-- to test when FireBase is setup successfully -->
import { db } from '../../firebase/index.js'
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      },
      confirmation: ''
    }
  },
  methods: {
    onSubmit() {
      db.collection('users')
        .add(this.user)
        .then((docRef) => {
          // alert("User saved successfully!");
          console.log(docRef)
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>
