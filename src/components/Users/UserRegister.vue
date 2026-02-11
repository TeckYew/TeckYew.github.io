<script setup>
// import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
// import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email('It must be a valid email!').required('Email is required!'),
  name: yup.string().required('Name is required!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(8, 'Password must be minimally 8 characters long!'),
  confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match!'),
  userType: yup.string().required('Please select a user type!')
})

// const formValues = {
//     userType: 1
// }
</script>
<template>
  <div class="row justify-content-center mx-2">
    <div class="col-md-5">
      <h3 class="text-center">You're one step closer in starting your sustainability journey...</h3>
      <Form :validation-schema="schema" @submit="onSubmit">
        <!-- :initial-values="formValues">-->
        <div class="mb-3 field">
          <label class="form-label">Name</label>
          <Field
            type="text"
            name="name"
            class="form-control"
            v-model="user.name"
            v-validate="'required'"
            required
          />
          <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <Field type="email" name="email" class="form-control" v-model="user.email" required />
          <ErrorMessage name="email" class="text-danger" />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <Field
            type="password"
            name="password"
            class="form-control"
            v-model="user.password"
            required
          />
          <ErrorMessage name="password" class="text-danger" />
        </div>
        <div class="mb-3">
          <label class="form-label">Confirm Password</label>
          <Field
            type="password"
            name="confirmation"
            v-model="user.confirmation"
            class="form-control"
            required
          />
          <ErrorMessage name="confirmation" class="text-danger" />
        </div>
        <div class="mb-3">
          <label class="form-label">User Type</label>
          <Field name="userType" as="select" class="form-select" v-model="user.userType" required>
            <option value="" disabled>Select your user type</option>
            <option value="1">Normal User</option>
            <option value="2">Organization User</option>
          </Field>
          <ErrorMessage id="select-user" name="userType" class="text-danger" />
        </div>
        <div class="mb-3 text-center">
          <button @submit="onSubmit" class="btn btn-primary btn-block">Sign Up</button> <br /><br />
        </div>
      </Form>
      <div class="container my-4 text-center">
        <span
          >Have an account? Login
          <RouterLink to="/login">here</RouterLink>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase/index.js'

// <!-- to test when FireBase is setup successfully -->
// import { db } from '../../firebase/index.js';
export default {
  // name: "User",
  // props: {
  //   msg: String
  // },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        userType: ''
      },
      confirmation: ''
    }
  },
  //   methods: {
  //     onSubmit() {
  //       db.collection('users')
  //         .add(this.user)
  //         .then((docRef) => {
  //           // alert("User saved successfully!");
  //           console.log('Document written with ID: ', docRef.id)
  //         })
  //         .catch((error) => {
  //           console.error('Error adding document: ', error)
  //         })

  //       const auth = getAuth()
  methods: {
    onSubmit() {
      if (this.user.userType == 1) {
        ;(this.user['points'] = 0), (this.user['userEvents'] = [])
      }
      db.collection('users')
        .add(this.user)
        .then((docRef) => {
          // alert("User saved successfully!");
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then((data) => {
          console.log('Successfully registered!')

          console.log(auth.currentuser)

          this.$router.push('/')
        })
        .catch((error) => {
          let errMsg = ''
          switch (error.code) {
            case 'auth/invalid-email': {
              errMsg = 'Bad email!'
              break
            }

            case 'auth/too-many-requests': {
              errMsg = 'Please try again later...'
              break
            }
            default: {
              errMsg = 'Something went wrong, please try again!'
              break
            }
          }
          const toast = useToast()
          toast.error(errMsg, {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: false,
            draggable: true,
            draggablePercent: 1.48,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: 'button',
            icon: true,
            rtl: false
          })
        })
    }
  },
  signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user)
        const auth = getAuth()

        db.collection('users')
          .add(result.user)
          .then((docRef) => {
            // alert("User saved successfully!");
            console.log('Document written with ID: ', docRef.id)
          })
          .catch((error) => {
            console.error('Error adding document: ', error)
          })

        createUserWithEmailAndPassword(auth, result.user.email, '123')
          .then((data) => {
            console.log('Successfully registered!')

            console.log(auth.currentuser)
          })
          .catch((error) => {
            console.log(error.code)
            alert(error.message)
          })
        this.$router.push('/')
      })
      .catch((error) => {
        console.error("Couldn't add account: ", error)
      })
  },
  selectCheck() {}
}
</script>
