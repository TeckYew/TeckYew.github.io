<script setup>
import EventCard from '../components/Events/EventCard.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row gx-4 gx-lg-4 align-items-center justify-content-center hero-section" style="min-height: 100vh; padding: 40px 20px;">
      <div class="col-lg-6 d-flex justify-content-center mb-4 mb-lg-0 profile-container">
        <!-- Decorative SVG Background -->
        <svg class="profile-decoration" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <!-- Background circles -->
          <circle cx="250" cy="250" r="220" fill="none" stroke="#28a745" stroke-width="2" opacity="0.3"/>
          <circle cx="250" cy="250" r="200" fill="none" stroke="#28a745" stroke-width="1.5" opacity="0.2"/>
          <circle cx="250" cy="250" r="180" fill="none" stroke="#28a745" stroke-width="1" opacity="0.15"/>
          
          <!-- Decorative corner elements -->
          <!-- Top left -->
          <g stroke="#C3FF00" stroke-width="3" fill="none" stroke-linecap="round">
            <path d="M 30 30 L 80 30 L 80 80"/>
            <path d="M 40 40 L 90 40 L 90 90"/>
            <circle cx="50" cy="50" r="15" fill="#C3FF00" opacity="0.5"/>
          </g>
          
          <!-- Top right -->
          <g stroke="#C3FF00" stroke-width="3" fill="none" stroke-linecap="round">
            <path d="M 470 30 L 420 30 L 420 80"/>
            <path d="M 460 40 L 410 40 L 410 90"/>
            <circle cx="450" cy="50" r="15" fill="#C3FF00" opacity="0.5"/>
          </g>
          
          <!-- Bottom left -->
          <g stroke="#C3FF00" stroke-width="3" fill="none" stroke-linecap="round">
            <path d="M 30 470 L 80 470 L 80 420"/>
            <path d="M 40 460 L 90 460 L 90 410"/>
            <circle cx="50" cy="450" r="15" fill="#C3FF00" opacity="0.5"/>
          </g>
          
          <!-- Bottom right -->
          <g stroke="#C3FF00" stroke-width="3" fill="none" stroke-linecap="round">
            <path d="M 470 470 L 420 470 L 420 420"/>
            <path d="M 460 460 L 410 460 L 410 410"/>
            <circle cx="450" cy="450" r="15" fill="#C3FF00" opacity="0.5"/>
          </g>
          
          <!-- Side decorative curves -->
          <path d="M 20 150 Q 50 200 20 250 Q 50 300 20 350" stroke="#28a745" stroke-width="2" fill="none" opacity="0.4" stroke-dasharray="5,5"/>
          <path d="M 480 150 Q 450 200 480 250 Q 450 300 480 350" stroke="#28a745" stroke-width="2" fill="none" opacity="0.4" stroke-dasharray="5,5"/>
          
          <!-- Diagonal accent lines -->
          <path d="M 80 80 L 150 150" stroke="#28a745" stroke-width="2" fill="none" opacity="0.3"/>
          <path d="M 420 80 L 350 150" stroke="#28a745" stroke-width="2" fill="none" opacity="0.3"/>
          <path d="M 80 420 L 150 350" stroke="#28a745" stroke-width="2" fill="none" opacity="0.3"/>
          <path d="M 420 420 L 350 350" stroke="#28a745" stroke-width="2" fill="none" opacity="0.3"/>
          
          <!-- Floating dots pattern -->
          <circle cx="100" cy="100" r="4" fill="#28a745" opacity="0.5"/>
          <circle cx="400" cy="100" r="4" fill="#28a745" opacity="0.5"/>
          <circle cx="100" cy="400" r="4" fill="#28a745" opacity="0.5"/>
          <circle cx="400" cy="400" r="4" fill="#28a745" opacity="0.5"/>
          <circle cx="120" cy="200" r="3" fill="#C3FF00" opacity="0.4"/>
          <circle cx="380" cy="200" r="3" fill="#C3FF00" opacity="0.4"/>
          <circle cx="120" cy="300" r="3" fill="#C3FF00" opacity="0.4"/>
          <circle cx="380" cy="300" r="3" fill="#C3FF00" opacity="0.4"/>
        </svg>
        
        <img
          class="img-fluid profile-image"
          src="../assets/hero-profile.jpg"
          alt="Hero Profile"
          style="border-radius: 20px; width: 90%; max-width: 400px; margin: 0 auto; display: block; border: 5px solid #28a745; box-shadow: 0 10px 40px rgba(40, 167, 69, 0.3), 0 0 0 15px rgba(40, 167, 69, 0.1); transition: transform 0.3s ease; position: relative; z-index: 2;"
        />
      </div>

      <div class="col-lg-6 col-sm-12">
        <h1 class="hero-title" style="line-height: 1.2; margin-bottom: 10px; color: #000;">Hi, I'm <span style="color: #28a745; font-weight: bold;">Teck Yew</span>.</h1>
        <p class="hero-subtitle" style="margin-bottom: 30px; line-height: 1.6; color: #666;">A graduating student from SMU with experiences in Information Systems, User Design Thinking, and Business Analytics.</p>
        <p class="hero-description" style="margin-bottom: 30px; line-height: 1.6;">Below are some quick links to get you <a href="https://www.google.com/search?q=thong+teck+yew&rlz=1C5CHFA_enSG1012SG1013&oq=thong+te&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDkyBggCEEUYQDIGCAMQRRg8MgYIBBBFGDwyBggFEEUYPDIGCAYQRRhB0gEHOTQ3ajBqMagCALACAA&sourceid=chrome&ie=UTF-8" target="_blank" style="text-decoration: underline;"><span style="color: #4285F4;">G</span><span style="color: #EA4335;">o</span><span style="color: #FBBC04;">o</span><span style="color: #4285F4;">g</span><span style="color: #EA4335;">l</span><span style="color: #FBBC04;">i</span><span style="color: #4285F4;">n</span><span style="color: #EA4335;">g</span></a> about me 😁</p>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
          <a class="btn btn-success btn-lg" href="#featuredProjects" style="padding: 12px 30px; font-size: 1rem;">My Portfolio</a>
          <a class="btn btn-lg" href="https://www.linkedin.com/in/teck-yew/" target="_blank" style="padding: 12px 30px; font-size: 1rem; background-color: #0A66C2; color: white; border: none;">LinkedIn - Where the magic happens ✨</a>
        </div>
        <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 15px;">
          <a class="btn btn-lg" href="https://github.com/TeckYew" target="_blank" style="padding: 12px 30px; font-size: 1rem; background-color: #333333; color: white; border: none;">Github</a>
          <a class="btn btn-lg" href="https://public.tableau.com/app/profile/thong.teck.yew/vizzes" target="_blank" style="padding: 12px 30px; font-size: 1rem; background-color: #E97627; color: white; border: none;">Tableau Public</a>
        </div>
      </div>
    </div>

    <!-- Projects Showcase Section -->
    <div id="featuredProjects" style="margin-top: 40px; padding: 40px 20px;">
      <h2 class="projects-title" style="margin-bottom: 40px;">Featured Projects</h2>
      
      <!-- Project 1: HandsUP -->
      <div class="project-card">
        <div class="project-image">
          <img 
            src="../assets/idp-handsup.png" 
            alt="Project" 
            style="width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
          />
        </div>
        <div class="project-content">
          <h3 class="project-title">HandsUP - Interaction Design and Prototyping Project</h3>
          <p style="font-size: 0.95rem; line-height: 1.8; color: #555; margin-bottom: 10px;">
            <strong>Duration:</strong> ~12 weeks | <strong>Role:</strong> UX Designer (Research, Interaction Design, Prototyping) | <strong>Team:</strong> 4 members
          </p>
          <p class="project-description">
            Young individuals often struggle to form new social connections outside their existing circles. Through preliminary research, we found that the main barrier was not a lack of interest, but rather, a coordination friction and uncertainty around commitment when attending events with unfamiliar peers.
            <br><br>
            We conducted 10 semi-structured interviews and identified three recurring pain points:
            <br>• Difficulty aligning schedules across groups
            <br>• Social hesitation when attending events alone
            <br>• Overly complex event platforms that required too many steps
            <br><br>
            We reframed the challenge as:
            <br><br>
            <strong>How might we reduce coordination friction and lower the psychological barrier to attending interest-based events?</strong>
            <br><br>
            Through iterative prototyping and usability testing, we designed a simplified event-matching flow that:
            <br>• Streamlined scheduling into fewer steps
            <br>• Displayed mutual interest visibility
            <br>• Reduced decision fatigue through curated recommendations
            <br><br>
            After iteration, task completion improved from 62% to 94% during testing, and users reported increased confidence in committing to events.
          </p>
          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <a class="btn btn-success" href="https://drive.google.com/drive/u/1/folders/1n79GfToXoFEP9BKVfejc7VJtgpSvtu40" target="_blank" style="padding: 10px 30px;">View Project</a>
            <a class="btn" href="https://www.figma.com/design/3TqrvNRyOKK5F2jHAcXEjY/HandsUP?node-id=11-4400&p=f&t=pwWXsKTg5eMDZt9U-0" target="_blank" style="padding: 10px 30px; background-color: #A259FF; color: white; border: none;">View Figma</a>
          </div>
        </div>
      </div>

      <!-- Second Project -->
      <div class="project-card">
        <div class="project-image">
          <img 
            src="../assets/googlemaps-carspots.png" 
            alt="Project" 
            style="width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
          />
        </div>
        <div class="project-content">
          <h3 class="project-title">Project Management Experience Hackathon</h3>
          <p style="font-size: 0.95rem; line-height: 1.8; color: #555; margin-bottom: 10px;">
            <strong>Duration:</strong> 48-hour Hackathon | <strong>Role:</strong> Project Lead / Strategy & Coordination | <strong>Team:</strong> 4 members
          </p>
          <p class="project-description">
            In a fast-paced hackathon setting led by Mr. Jason Teo from Trust Bank, along with other instructors from various companies, our team was challenged to develop a scalable solution addressing [insert actual challenge theme if you have it]. With limited time and cross-functional team members, alignment and prioritisation were critical to execution.
            <br><br>
            I applied systems thinking to map out key stakeholders, dependencies, and constraints early in the process. This helped us identify core leverage points instead of attempting to solve peripheral issues.
            <br><br>
            Rather than tackling isolated symptoms, we thought of how we might design a solution that balances feasibility, stakeholder incentives, and long-term scalability within a tight timeline. We implemented stakeholder mapping, task breakdown, and defined a clear solution using design thinking process, ultimately getting first place for our hackathon.
          </p>
          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <a class="btn btn-success" href="https://www.canva.com/design/DAF9ZSgPvTg/_xYKmIjjbGJRnSQ-CUbG1Q/view?utm_content=DAF9ZSgPvTg&utm_campaign=designshare&utm_medium=link&utm_source=editor#1" target="_blank" style="padding: 10px 30px;">View Project</a>
            <a class="btn" href="https://www.linkedin.com/posts/teck-yew_dont-design-features-solve-problems-ugcPost-7170242465197740032-zFfc?utm_source=share&utm_medium=member_desktop&rcm=ACoAABPCGQ8BLzk9s9gW5mp8UMP3vihOYV2qCt4" target="_blank" style="padding: 10px 30px; background-color: #0A66C2; color: white; border: none;">View Post</a>
          </div>
        </div>
      </div>

      <!-- Third Project -->
      <div class="project-card">
        <div class="project-image">
          <img 
            src="../assets/gis-solar-farm.png" 
            alt="GIS Project" 
            style="width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"
          />
        </div>
        <div class="project-content">
          <h3 class="project-title">Geographical Information Systems-based Multi-criteria Analysis for Urban Planning</h3>
          <p style="font-size: 0.95rem; line-height: 1.8; color: #555; margin-bottom: 10px;">
            <strong>Duration:</strong> ~12 weeks | <strong>Role:</strong> Spatial Analysis & Systems Strategy Lead | <strong>Team:</strong> 3 members
          </p>
          <p class="project-description">
            As part of a GIS-Enabled Urban Planning Support System initiative led by Dr. Kam Tin Seong, our team was tasked with designing a spatial decision-support model to identify viable solar farm locations in land-scarce Singapore.
            <br><br>
            Singapore's dense urban landscape presents a complex trade-off: renewable energy expansion must compete with housing, agriculture, and environmental conservation. The challenge was not just identifying sunny land — but balancing energy potential, terrain feasibility, urban constraints, and long-term planning alignment under the 2030 Master Plan.
            <br><br>
            Our challenge was how might we design a scalable, data-driven spatial model that balances solar efficiency, land constraints, environmental accessibility. All these need to be considered with energy potential factors like slope, aspect etc. Iterative thinking and validation of potential location using trade-offs and identification of resilient zones are key contributing success of our projects.
          </p>
          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <a class="btn btn-success" href="https://smt201-group5-solarfarm.netlify.app/" target="_blank" style="padding: 10px 30px;">View Project</a>
          </div>
        </div>
      </div>

      <!-- Other Design Projects Section -->
      <div class="other-projects-section">
        <h3 class="other-projects-title">Other Design Projects</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
          <!-- Design Project Card 1 -->
          <div style="padding: 20px; background: white; border-radius: 8px; border: 1px solid #e0e0e0; transition: all 0.3s ease;">
            <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 12px;">
              <img src="../assets/ellipsis.png" alt="SMU Ellipsis" style="width: 40px; height: 40px; object-fit: contain;">
              <h4 style="font-size: 1.1rem; font-weight: 600; color: #1a1a1a; margin: 0;">SMU Ellipsis Marketing design project</h4>
            </div>
            <p style="font-size: 0.95rem; line-height: 1.5; color: #666; margin-bottom: 15px;">
              As part of the Singapore Management University's biggest club representing the Information Systems faculty, also known as SMU Ellipsis, I was placed in charge of the Tech Series event, one of the biggest technology event that we organise in SMU, inviting guest speakers from various companies for networking sessions with the students. The event include workshops, coffee chats, networking night, and hackathon.
              <br><br>
              Another design project is the launch of our new School of Computing and Information Systems (SCIS) shirts.
              <br><br>
              These Instagram posts have been designed by me (more can be viewed on SMU Ellipsis profile), along with the planning and execution of the programs.
            </p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="https://www.instagram.com/p/CvyWet7O45H/" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #28a745; color: white; padding: 8px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: all 0.3s ease;">
                Tech Series event
              </a>
              <a href="https://www.instagram.com/p/CvwkaR-vxZk/?img_index=1" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #9C27B0; color: white; padding: 8px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: all 0.3s ease;">
                SCIS shirt launch
              </a>
            </div>
          </div>

          <!-- Design Project Card 2 - Tableau Projects -->
          <div style="padding: 20px; background: white; border-radius: 8px; border: 1px solid #e0e0e0; transition: all 0.3s ease;">
            <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 12px;">
              <img src="../assets/tableau-projects.png" alt="Tableau Projects" style="width: 40px; height: 40px; object-fit: contain;">
              <h4 style="font-size: 1.1rem; font-weight: 600; color: #1a1a1a; margin: 0;">Tableau Projects</h4>
            </div>
            <p style="font-size: 0.95rem; line-height: 1.5; color: #666; margin-bottom: 15px;">
              Being a part of the wider Tableau community, I was elected as the Tableau Academic Ambassador representing Singapore Management University. I had the chance to visit several schools to introduce Tableau to the students, along with attending Tableau workshops hosted by the Tableau community. I also post my dashboards on Tableau Public whenever I get the chance to.
            </p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="https://www.linkedin.com/posts/wenbin-y_datafam-activity-7342050561489256448-OnTe?utm_source=share&utm_medium=member_desktop&rcm=ACoAABPCGQ8BLzk9s9gW5mp8UMP3vihOYV2qCt4" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #0A66C2; color: white; padding: 8px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: all 0.3s ease;">
                LinkedIn Post
              </a>
              <a href="https://public.tableau.com/app/profile/thong.teck.yew/vizzes" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #E97627; color: white; padding: 8px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: all 0.3s ease;">
                Tableau Public
              </a>
            </div>
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

<style scoped>
/* Hero Section - Responsive Typography */
.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 4vw, 1.5rem);
}

.hero-description {
  font-size: clamp(1rem, 3vw, 1.3rem);
}

.profile-container {
  position: relative;
}

.profile-decoration {
  position: absolute;
  width: 150%;
  height: 150%;
  max-width: 600px;
  max-height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
}

.profile-image {
  position: relative;
  z-index: 2;
  cursor: pointer;
}

.profile-image:hover {
  transform: scale(1.1);
}

/* SVG Background Animations */
.profile-decoration {
  animation: gentleRotate 20s linear infinite;
}

@keyframes gentleRotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Stagger animation for circles - different speeds */
.profile-decoration circle:nth-child(10),
.profile-decoration circle:nth-child(11),
.profile-decoration circle:nth-child(12),
.profile-decoration circle:nth-child(13) {
  animation: pulse-scale 3s ease-in-out infinite;
  transform-origin: center;
}

.profile-decoration circle:nth-child(14),
.profile-decoration circle:nth-child(15),
.profile-decoration circle:nth-child(16),
.profile-decoration circle:nth-child(17) {
  animation: pulse-scale 4s ease-in-out infinite 1s;
  transform-origin: center;
}

@keyframes pulse-scale {
  0%, 100% {
    r: 4px;
    opacity: 0.5;
  }
  50% {
    r: 6px;
    opacity: 0.8;
  }
}

/* Sway animation for the curves */
.profile-decoration path {
  animation: gentle-sway 4s ease-in-out infinite;
  transform-origin: 250px 300px;
}

.profile-decoration path:nth-child(2) {
  animation-delay: 0.5s;
}

.profile-decoration path:nth-child(3) {
  animation-delay: 1s;
}

@keyframes gentle-sway {
  0%, 100% {
    opacity: 0.4;
    stroke-width: 2;
  }
  50% {
    opacity: 0.7;
    stroke-width: 2.5;
  }
}

.projects-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 300;
  text-align: center;
}

/* Project Cards - Responsive Grid */
.project-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 12px;
  margin-bottom: 40px;
}

.project-image {
  position: relative;
  min-width: 0;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.project-content {
  min-width: 0;
  text-align: center;
}

.project-title {
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  margin-bottom: 15px;
}

.project-description {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  line-height: 1.8;
  color: #555;
  margin-bottom: 20px;
  text-align: justify;
}

/* Other Projects Section */
.other-projects-section {
  margin-top: 80px;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 12px;
}

.other-projects-title {
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  margin-bottom: 30px;
  color: #1a1a1a;
  font-weight: 500;
}

/* Mobile and Tablet Responsiveness */
@media (max-width: 992px) {
  .project-card {
    padding: 30px 20px;
    gap: 30px;
  }

  .hero-section {
    padding: 30px 20px !important;
  }
}

@media (max-width: 768px) {
  .project-card {
    padding: 20px;
    gap: 20px;
  }

  .other-projects-section {
    padding: 20px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .projects-title {
    font-size: 1.5rem;
  }

  .project-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .project-card {
    padding: 15px;
    margin-bottom: 30px;
  }

  .other-projects-section {
    padding: 15px;
  }

  .hero-title {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-description {
    font-size: 0.95rem;
  }

  .projects-title {
    font-size: 1.3rem;
  }

  .other-projects-title {
    font-size: 1.2rem;
  }

  .btn {
    font-size: 0.85rem !important;
    padding: 8px 20px !important;
  }

  .btn-lg {
    padding: 10px 20px !important;
    font-size: 0.95rem !important;
  }
}
</style>
