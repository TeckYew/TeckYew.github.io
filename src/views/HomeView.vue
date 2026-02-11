<script setup>
import EventCard from '../components/Events/EventCard.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row gx-4 gx-lg-4 align-items-center justify-content-center" style="min-height: 100vh; padding: 40px 20px;">
      <div class="col-lg-6 d-flex justify-content-center">
        <img
          class="img-fluid mb-4 mb-lg-0"
          src="../assets/hero-profile.jpg"
          alt="Hero Profile"
          style="border-radius: 50%; width: 90%; margin: 0 auto; display: block; border: 5px solid #28a745; box-shadow: 0 10px 40px rgba(40, 167, 69, 0.3), 0 0 0 15px rgba(40, 167, 69, 0.1); transition: transform 0.3s ease;"
        />
      </div>

      <div class="col-lg-6 col-sm-12">
        <h1 class="font-weight-light" style="font-size: 3.5rem; line-height: 1.2; margin-bottom: 10px;">Hi, I'm Thong Teck Yew.</h1>
        <p style="font-size: 1.5rem; margin-bottom: 30px; line-height: 1.6; color: #666;">Welcome to my portfolio!</p>
        <p style="font-size: 1.3rem; margin-bottom: 30px; line-height: 1.6;">Below are some quick links to get you <a href="https://www.linkedin.com/in/teck-yew/" target="_blank" style="text-decoration: underline;"><span style="color: #4285F4;">G</span><span style="color: #EA4335;">o</span><span style="color: #FBBC04;">o</span><span style="color: #4285F4;">g</span><span style="color: #EA4335;">l</span><span style="color: #FBBC04;">i</span><span style="color: #4285F4;">n</span><span style="color: #EA4335;">g</span></a> about me 😁</p>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
          <a class="btn btn-success btn-lg" href="#featuredProjects" style="padding: 12px 40px; font-size: 1.1rem;">See what I'm up to!</a>
          <a class="btn btn-lg" href="https://www.linkedin.com/in/teck-yew/" target="_blank" style="padding: 12px 40px; font-size: 1.1rem; background-color: #0A66C2; color: white; border: none;">LinkedIn</a>
        </div>
      </div>
    </div>

    <!-- Projects Showcase Section -->
    <div id="featuredProjects" style="margin-top: 40px; padding: 60px 20px;">
      <h2 class="font-weight-light" style="font-size: 2.5rem; margin-bottom: 40px;">Featured Projects</h2>
      <div style="display: grid; grid-template-columns: 20% 1fr; gap: 40px; align-items: center; padding: 40px; background: #f9f9f9; border-radius: 12px;">
        <div style="position: relative;">
          <img 
            src="../assets/idp-handsup.png" 
            alt="Project" 
            style="width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
          />
        </div>
        <div>
          <h3 style="font-size: 1.8rem; margin-bottom: 15px;">HandsUP</h3>
          <p style="font-size: 0.95rem; line-height: 1.8; color: #555; margin-bottom: 10px;">
            <strong>Duration:</strong> ~12 weeks | <strong>Role:</strong> UX Designer (Research, Interaction Design, Prototyping) | <strong>Team:</strong> 4 members
          </p>
          <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 20px;">
            Young individuals often struggle to find people with similar interests, especially with people who are outside of their connection. Existing solutions fail to bridge the gap to overcome their scheduling conflicts and overcomplicate the process of attending events together.
            <br><br>
            Through this project, we conducted interviews, define clear insight, ideate and prototype a solution through testing and iteration, and ultimately providing clear impact for our users.
          </p>
          <div style="display: flex; gap: 15px;">
            <a class="btn btn-success" href="https://drive.google.com/drive/u/1/folders/1n79GfToXoFEP9BKVfejc7VJtgpSvtu40" target="_blank" style="padding: 10px 30px;">View Project</a>
            <a class="btn" href="https://www.figma.com/design/3TqrvNRyOKK5F2jHAcXEjY/HandsUP?node-id=11-4400&p=f&t=pwWXsKTg5eMDZt9U-0" target="_blank" style="padding: 10px 30px; background-color: #A259FF; color: white; border: none;">View Figma</a>
          </div>
        </div>
      </div>

      <!-- Second Project -->
      <div style="display: grid; grid-template-columns: 20% 1fr; gap: 40px; align-items: center; padding: 40px; background: #f9f9f9; border-radius: 12px; margin-top: 40px;">
        <div style="position: relative;">
          <img 
            src="../assets/googlemaps-carspots.png" 
            alt="Project" 
            style="width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
          />
        </div>
        <div>
          <h3 style="font-size: 1.8rem; margin-bottom: 15px;">Project Management Experience Hackathon</h3>
          <p style="font-size: 0.95rem; line-height: 1.8; color: #555; margin-bottom: 10px;">
            <strong>Duration:</strong> 48-hour Hackathon | <strong>Role:</strong> Project Lead / Strategy & Coordination | <strong>Team:</strong> 4 members
          </p>
          <p style="font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 20px;">
            In a fast-paced hackathon setting, our team was challenged to develop a scalable solution addressing [insert actual challenge theme if you have it]. With limited time and cross-functional team members, alignment and prioritisation were critical to execution.
            <br><br>
            I applied systems thinking to map out key stakeholders, dependencies, and constraints early in the process. This helped us identify core leverage points instead of attempting to solve peripheral issues.
            <br><br>
            Rather than tackling isolated symptoms, we thought of how we might design a solution that balances feasibility, stakeholder incentives, and long-term scalability within a tight timeline. We implemented stakeholder mapping, task breakdown, and defined a clear solution using design thinking process, ultimately getting first place for our hackathon.
          </p>
          <div style="display: flex; gap: 15px;">
            <a class="btn btn-success" href="https://www.canva.com/design/DAF9ZSgPvTg/_xYKmIjjbGJRnSQ-CUbG1Q/view?utm_content=DAF9ZSgPvTg&utm_campaign=designshare&utm_medium=link&utm_source=editor#1" target="_blank" style="padding: 10px 30px;">View Project</a>
            <a class="btn" href="https://www.linkedin.com/posts/teck-yew_dont-design-features-solve-problems-ugcPost-7170242465197740032-zFfc?utm_source=share&utm_medium=member_desktop&rcm=ACoAABPCGQ8BLzk9s9gW5mp8UMP3vihOYV2qCt4" target="_blank" style="padding: 10px 30px; background-color: #0A66C2; color: white; border: none;">View Post</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from '../firebase/index.js'

export default {
  data() {
    return {
      pastEvents: [],
      upcomingEvents: []
    }
  },
  created() {
    let today = new Date()
    db.collection('event')
      .orderBy('datetime')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data())
          let { name, desc, datetime, cat } = doc.data()
          let eventDate = new Date(datetime['seconds'] * 1000)
          let eventDetail = {
            eventId: doc.id,
            eventTitle: name,
            eventDesc: desc,
            eventDate: eventDate,
            eventType: cat
          }

          // console.log(doc.data()['name'])
          if (eventDate > today && this.upcomingEvents.length < 3) {
            this.upcomingEvents.push(eventDetail)
          } else {
            this.pastEvents.push(eventDetail)
          }
        })
      })
  }
}
</script>
