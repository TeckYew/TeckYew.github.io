<script setup>
import Preferences from '../components/Users/UserPreferences.vue'
import Account from '../components/Users/UserProfile.vue'
import UserEvents from '../components/Users/UserEvents.vue'
</script>

<template>
  <br />
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 in-left">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 100%">
          <div
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          >
            <svg class="bi" width="40" height="32">
              <use xlink:href="#bootstrap" />
            </svg>
            <span class="fs-4">My Account</span>
          </div>
          <hr />
          <ul class="nav nav-pill flex-column mb-auto">
            <!-- Scuffed but web version -->
            <li class="nav-item justify-content-center d-block">
              <a href="#" class="nav-link link-dark" aria-current="page" @click="getPage(0)">
                <svg class="bi me-2" width="16" height="16">
                  <use xlink:href="#accountSettings" />
                </svg>
                My Events
              </a>
            </li>
            <li class="nav-item justify-content-center d-block">
              <a href="#" class="nav-link link-dark" aria-current="page" @click="getPage(1)">
                <svg class="bi me-2" width="16" height="16">
                  <use xlink:href="#accountSettings" />
                </svg>
                Settings
              </a>
            </li>
            <li class="justify-content-center d-block">
              <a href="#" class="nav-link link-dark" @click="getPage(2)">
                <svg class="bi me-2" width="16" height="16">
                  <use xlink:href="#preferences" />
                </svg>
                Interests
              </a>
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <div v-if="pageNumber == 0" id="events" class="col mx-2 mx-lg-4">
        <UserEvents></UserEvents>
      </div>
      <div v-if="pageNumber == 1" id="profile" class="col mx-2 mx-lg-4">
        <Account></Account>
      </div>
      <div v-if="pageNumber == 2" id="preferences" class="col mx-2 mx-lg-4">
        <Preferences></Preferences>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNumber: 1
    }
  },
  created() {
    this.pageNumber = 0
  },
  methods: {
    getPage(i) {
      this.pageNumber = i
    }
  }
}
</script>

<style>
/* On screens that are less than 700px wide, make the sidebar into a topbar */
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}

@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translatex(-10px);
    -moz-transform: translatex(-10px);
    -o-transform: translatex(-10px);
    transform: translatex(-10px);
  }
  to {
    opacity: 1;
    -webkit-transform: translatex(0);
    -moz-transform: translatex(0);
    -o-transform: translatex(0);
    transform: translatex(0);
  }
}
@-moz-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translatex(-10px);
    -moz-transform: translatex(-10px);
    -o-transform: translatex(-10px);
    transform: translatex(-10px);
  }
  to {
    opacity: 1;
    -webkit-transform: translatex(0);
    -moz-transform: translatex(0);
    -o-transform: translatex(0);
    transform: translatex(0);
  }
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translatex(-100px);
    -moz-transform: translatex(-100px);
    -o-transform: translatex(-100px);
    transform: translatex(-100px);
  }
  to {
    opacity: 1;
    -webkit-transform: translatex(0);
    -moz-transform: translatex(0);
    -o-transform: translatex(0);
    transform: translatex(0);
  }
}
.in-left {
  -webkit-animation-name: fadeInLeft;
  -moz-animation-name: fadeInLeft;
  -o-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
  -o-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -o-animation-duration: 0.5s;
}
</style>
