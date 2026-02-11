<script setup>
import UpcomingEvent from '../../components/Events/UpcomingEvents.vue'
import UserEvent from '../../components/Events/UserEvents.vue'
import PastEvent from '../../components/Events/PastEvents.vue'
import RecEvent from '../../components/Events/RecommendedEvents.vue'
// import RecEvent from '../components/Events/test.vue'
import { getAdditionalUserInfo } from 'firebase/auth'
</script>

<template>
  <!-- <div class="body">
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
      </div>
    </div>
  </div>
   Past Events -->
  <!-- <div class="col">
      <h3>Past Events</h3>
      <UserEvent v-for="(event, index) in eventList" :key="index" :eventData="event" />
    </div> -->

  <div class="banner row gx-4 mt-5 p-3 animated in-left" style="background-color: #32612d">
    <!-- <div class="banner row gx-4 mt-5 p-3 text-center"> -->
    <!-- <h3>Events Just for You</h3> -->
    <!-- Carousel for Recommended events -->
    <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 text-center my-auto">
          <h1 class="mb-3" style="color: white">Events Just for You</h1>
          <h6 style="color: white; font-size: large">
            Curated just for you, we have sieved out some of the interesting events not to be
            missed!
          </h6>
        </div>
        <div class="col-9">
          <div
            id="carouselBannerControls"
            class="carousel slide carousel-dark"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <!-- Recommended Events Cards-->
              <!-- <RecEvent v-for="(event, index) in recEvents" :key="index" :eventData="event" class="carousel-item active text-center" data-bs-interval="3000" /> -->
              <!-- <RecEvent v-for="(n, i) in recEvents" :i="i" :recList="recEvents"/> -->
              <RecEvent :recList="recEvents" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Badges/Achievements -->
  <!-- <div class="container-fluid d-flex">
    <div class="row gx-4 gx-lg-5 mt-2 p-3">
      <div class="col-md-12 mx-auto">
        <div class="row">
          <h1 class="font-weight-light">My Achievements</h1>
        </div>

        Achievements
        <div class="row mt-3"> -->
  <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->

  <!-- <div class="col-md-3">
            <div class="card statsCard mx-auto border-0" style="width: 18rem">
              <div class="card-body">
                <p class="card-title h2 fw-light">Achievements</p>
                <p class="card-text h3">
                  <i class="fa fa-trophy"></i>
                  {{ badgeList.length }}
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card statsCard mx-auto border-0" style="width: 18rem">
              <div class="card-body">
                <p class="card-title h2 fw-light">Points</p>
                <p class="card-text h3">
                  <i class="fa fa-star"></i>
                  {{ badgeList.length }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card statsCard mx-auto border-0" style="width: 18rem">
              <div class="card-body">
                <p class="card-title h2 fw-light">Completed Events</p>
                <p class="card-text h3">
                  <i class="fa fa-smile-o"></i>
                  {{ eventList.length }}
                </p>
              </div>
            </div>
          </div>
          <div class="col"></div>
        </div> -->

  <!-- Tabs -->
  <!-- <ul class="nav nav-tabs mt-4" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="achievements-tab" data-bs-toggle="tab" data-bs-target="#achievements">
              Achievements
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="score-tab" data-bs-toggle="tab" data-bs-target="#score">Score</a>
          </li>
        </ul>
        <div class="tab-content mt-2" id="myTabContent">
          Achievements Info -->
  <!-- <div class="tab-pane fade show active" id="achievements" role="tabpanel">
            <div v-if="badgeList.length <= 6" class="row">  -->
  <!-- <div v-for="badge in badgeList" class="col-md-4 mb-3">
                <div class="card h-100 mx-auto">
                  <img class="img-fluid mx-auto mt-3" :src="badge.badgeURL" alt="100%x280"
                    style="max-width: 15w; max-height: 15vh" />
                  <div class="card-body text-center">
                    <h5 class="title">{{ badge.badgeName }}</h5>
                    <h5 class="card-text text-secondary">{{ badge.badgeDesc }}</h5>
                  </div>
                  <div class="card-footer text-secondary text-center">{{ badge.eventName }}</div>
                </div>
              </div> -->
  <!-- </div> -->
  <!-- <div v-else class="row"></div> -->
  <!-- Score Info -->
  <div class="tab-pane fade" id="score" role="tabpanel"></div>
  <!-- </div>
        </div>
      </div>
    </div>
  </div>
</div> -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->

  <!-- <h1>Welcome back {{ UserInfo.userName }}</h1>   -->
  <!-- <div class="wrapper"> -->

  <!-- <video autoplay muted loop id="myVideo">
      <source src="../assets/HomePageVideo.mp4" type="video/mp4">
    </video> -->

  <!-- <div class="videoContent">
      <h1>Heading</h1>
      <p>Lorem ipsum...</p>
</div>
  </div> -->
  <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-12 ms-4">
            <h1>Hey {{ name }}!</h1>
            <br />
    
            <h2>Here are your event statistics!</h2>
            <br />
            
            <p>Users signed up for event(s): {{ filteredUsers.length }}</p>
            
    
    
    
          </div>
    
          <div class="col-lg col-6 me-4" style="background-color: rgb(235, 235, 235)">
            <h1 class="font-weight-light mx-4 mt-3 my-3">Events with users</h1>
              <ul id="myTab" role="tablist">
                  <!-- <a
                  :class="isallSelected ? 'btn btn-success' : 'btn btn-outline-secondary'"
                  id="events.eventid"
                  @click="changeallColor(events.eventid)"
                  :data-bs-target="'#eventContent-' + index1"
                  >
                  All
                </a> -->
                
                  <div v-for="(orgs, index2) in user" :key="orgs.userid" class="collection-item" role="presentation">
                    <div v-for="(users, index3) in local" :key="users.users" class="collection-item">
                    <div v-if="orgs.email == users.users">
                      <a
                      :class="isSelected ? 'btn btn-success' : 'btn btn-outline-secondary'"
                      :id="orgs.userid"
                      @click="changeallColor(orgs.userid)"
                      :data-bs-target="'#eventContent-' + index1"
                      >
                      All
                    </a>
                    </div>
                    </div>
                  </div>
      
                <li v-for="(events, index1) in event" :key="events.eventid" role="presentation">
                  <div v-for="(orgs, index2) in user" :key="orgs.userid" class="collection-item">
                    <div v-for="(users, index3) in local" :key="users.users" class="collection-item">
                    <div v-if="events.orgid == orgs.userid && orgs.email == users.users">
                      <a
                      :class="isSelected ? 'btn btn-success' : 'btn btn-outline-secondary'"
                      :id="events.eventid"
                      @click="changeColor(events.eventid)"
                      :data-bs-target="'#eventContent-' + index1"
                      >
                      {{ events.name }}
                    </a>
                    </div>
                  </div>
                  </div>
                </li> 
            </ul>
            <h3 class="font-weight-light mx-4 mt-3 my-3">Users registered for this event:</h3>
              <!-- Display filtered users here -->
            <div v-if="filteredUsers.length > 0">
              <ul>
                <li v-for="(user, index) in filteredUsers" :key="user.userid">
                  <div class="chip">{{ index+1 }}</div>{{ user.email }} : {{ user.name }} 
                </li>
              </ul>
            </div>
            <div v-else>
              <!-- <ul class="collection with-header" id="newTab">
                <li v-for="(users, index) in user" :key="users.userid" class="collection-item">
                  <div v-for="(events, index1) in event" :key="events.id" class="collection-item">
                    <div v-for="(userevent, index2) in userevents" :key="userevent.id" class="collection-item">
                      <div v-for="(orgs, index2) in user" :key="orgs.userid" class="collection-item">
                      <div v-for="(users, index3) in local" :key="users.users" class="collection-item">
                      <div v-if="events.eventid == userevent.eventid && users.userid == userevent.userid && events.orgid == orgs.userid && orgs.email == users.users">
                        <div class="chip">{{ index }}</div>{{ users.email }} : {{ users.name }} 
                      </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </li>
              </ul> -->
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <script>
    // <!-- to test when FireBase is setup successfully -->
    // export default {
    //   data() {
    //     return {
    //       user: {
    //         name: '',
    //         email: '',
    //         password: ''
    //       },
    //       confirmation: ''
    //     }
    //   },
    //   methods: {
    //     onSubmit() {
    //       db.collection('users')
    //         .add(this.user)
    //         .then((docRef) => {
    //           // alert("User saved successfully!");
    //           console.log(docRef)
    //           console.log('Document written with ID: ', docRef.id)
    //         })
    //         .catch((error) => {
    //           console.error('Error adding document: ', error)
    //         })
    //     }
    //   }
    // }
    
    import { collection } from 'firebase/firestore'
    import { db } from '../../firebase/index.js'
    
    export default {
      data() {
        return {
          buttonColors: {},
          isSelected: false,
          isallSelected: false,
          userSet: new Set(),
          name: '',
          event: [],
          user: [],
          userevents: [],
          org: [],
          local: [],
          filteredUsers: [],
          allfilteredUsers: new Set(),
          eventCount: []
        }
      },
      created() {
        this.getEvent()
        this.getUsers()
        this.getUserEvents()
        this.getLocal() 
        this.getOrg()
        this.name = window.localStorage.getItem("username")
      },
      methods: {
        async getEvent() {
          db.collection("event").get().then
                    (querySnapshot => {
                        querySnapshot.forEach((doc) => {
                          var data0 = {
                              'eventid': doc.id,
                              'name': doc.data().name,
                              'orgid': doc.data().orgid
                          }
                          this.event.push(data0)
                        })
                        console.log(this.event)
                    })  
        },
        async getUsers() {
          db.collection("users").get().then
                    (querySnapshot => {
                        querySnapshot.forEach((doc) => {
                          var data1 = {
                              'userid': doc.id,
                              'name': doc.data().name,
                              'email': doc.data().email
                          }
                          this.user.push(data1)
                        })
                        console.log(this.user)
                    })  
        },
        async getUserEvents() {
          db.collection("userevent").get().then
                    (querySnapshot => {
                        querySnapshot.forEach((doc) => {
                          var data2 = {
                              'eventid': doc.data().eventid,
                              'userid': doc.data().userid
                          }
                          this.userevents.push(data2)
                        })
                        console.log(this.userevents)
                    })  
        },
        async getOrg() {
          db.collection("organization").get().then
                    (querySnapshot => {
                        querySnapshot.forEach((doc) => {
                          var data3 = {
                              'id': doc.id,
                              'email': doc.data().orgemail,
                              'name': doc.data().orgname,
                              'password': doc.data().password
                          }
                          this.org.push(data3)
                        })
                        console.log(this.org)
                    })  
        },
        async getLocal() {
          var data4 = {
            'users': window.localStorage.getItem("email")
          }
          this.local.push(data4)
          console.log(this.local)
        },
        changeColor(id){
    
          const button = document.getElementById(id);
          console.log(button)
    
          if (button) {
            // Reset the color of all buttons to the default state
            Object.keys(this.buttonColors).forEach((buttonId) => {
              const currentButton = document.getElementById(buttonId);
              if (currentButton) {
                const defaultColor = 'btn-outline-secondary';
                currentButton.classList.remove('btn-success');
                currentButton.classList.add(defaultColor);
                this.buttonColors[buttonId] = defaultColor;
              }
            });
            
          const buttonId = button.id;
          console.log('Button ID:', buttonId);
          
          const currentColor = this.buttonColors[buttonId] || 'btn-outline-secondary';
          
          // Toggle between 'btn-success' and 'btn-outline-secondary'
          const newColor = currentColor === 'btn-success' ? 'btn-outline-secondary' : 'btn-success';
          
          // Update the buttonColors object with the new color
          this.buttonColors[buttonId] = newColor;
          console.log(this.buttonColors[buttonId]);
          
          // Apply the new color to the button
          button.classList.remove(currentColor);
          button.classList.add(newColor);
          
          if (newColor === 'btn-success') {
            // Clear the filtered users array
            this.filteredUsers = [];
            
            // Filter users based on the selected event
            this.userevents.forEach((userevent) => {
              if (userevent.eventid === buttonId) {
                // Find the user associated with this event
                const user = this.user.find((u) => u.userid === userevent.userid);
                
              if (user) {
                this.filteredUsers.push(user);
              }
            }
          });
          }
          console.log(this.filteredUsers);
        }
    
        },
        changeallColor(id) {
          const button = document.getElementById(id);
          console.log(button);
          
          if (button) {
            // Reset the color of all buttons to the default state
            Object.keys(this.buttonColors).forEach((buttonId) => {
              const currentButton = document.getElementById(buttonId);
              if (currentButton) {
                const defaultColor = 'btn-outline-secondary';
                currentButton.classList.remove('btn-success');
                currentButton.classList.add(defaultColor);
                this.buttonColors[buttonId] = defaultColor;
              }
            });
            this.filteredUsers = [];
            const buttonId = button.id;
            console.log('Button ID:', buttonId);
            
            const currentColor = this.buttonColors[buttonId] || 'btn-outline-secondary';
            
            // Toggle between 'btn-success' and 'btn-outline-secondary'
            const newColor = currentColor === 'btn-success' ? 'btn-outline-secondary' : 'btn-success';
            
            // Update the buttonColors object with the new color
            this.buttonColors[buttonId] = newColor;
            console.log(this.buttonColors[buttonId]);
            
            // Apply the new color to the button
            button.classList.remove(currentColor);
            button.classList.add(newColor);
            
            // Update isallSelected based on the newColor
            this.isallSelected = newColor === 'btn-success';
            
            console.log(id)
            const selectedEventIds = this.event.filter((e) => e.orgid === id).map((e) => e.eventid);
            
            var eventCount = this.userevents.filter((event) => selectedEventIds.includes(event.eventid));
    
            var selectedUserIds = []
    
            eventCount.forEach((item)=>{
              console.log(item.userid)
              selectedUserIds.push(item.userid)
            })
    
            console.log(selectedUserIds)
            
    
           
    
            
            var userCount = this.user.filter((user)=> selectedUserIds.includes(user.userid))
    
            console.log(userCount);
            
    
            this.filteredUsers = userCount
          }
          
    }
    
    
      }
      
    }
    </script>
    <style scoped>
    .banner {
      background: lightgrey;
    }
    
    .statsCard {
      background-color: whitesmoke;
    }
    .chip {
      display: inline-block;
      padding: 0 15px;
      height: 50px;
      font-size: 16px;
      line-height: 50px;
      border-radius: 25px;
      background-color: #f1f1f1;
    }
    
    .carouselBtn {
      color: white;
      background-color: green;
      text-align: center;
      padding-top: 10px;
    }
    
    wrapper {
      width: 100%;
      height: auto;
    }
    
    video {
      position: relative;
      display: block;
      width: 100%;
      height: auto;
      display: block;
      margin: 0;
    }
    
    .videoContent {
      position: absolute;
      top: 15%;
      background: rgba(0, 0, 0, 0.5);
      color: #f1f1f1;
      width: 100%;
      padding: 20px;
    }
    
    .nav-pills .nav-item a.active,
    .nav-pills .nav-item a:hover {
      background-color: green;
    }
    
    .nav-pills .nav-item a.active,
    .nav-pills .nav-item a:hover {
      color: #ffffff;
    }
    
    .nav-pills .nav-item a {
      background-color: #ffffff;
    }
    
    .nav-pills .nav-item a {
      color: green;
    }
    
    #myTab {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      flex-wrap: nowrap;
      white-space: nowrap;
      }
    
    .nav-item {
      margin-right: 10px; /* Adjust the margin as needed */
      white-space: nowrap;
    }
    
    #newTab {
      overflow-x: hidden;
       overflow-y:auto;
       flex-wrap: nowrap;
      }
    
      .btn{
        margin-right: 10px;
        margin-bottom: 10px;
      }
    
    </style>
    