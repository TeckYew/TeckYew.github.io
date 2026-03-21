<script setup>
import EventCard from '../components/Events/EventCard.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row gx-4 gx-lg-4 align-items-center justify-content-center hero-section" style="min-height: 100vh; padding: 40px 20px;">
      <div class="col-lg-6 d-flex justify-content-center mb-4 mb-lg-0 profile-container">
        <!-- Decorative SVG Background - Clean with Color -->
        <svg class="profile-decoration" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#17a2b8;stop-opacity:0.3" />
              <stop offset="100%" style="stop-color:#0dcaf0;stop-opacity:0.1" />
            </linearGradient>
          </defs>
          
          <!-- Concentric circles - main structure -->
          <circle cx="250" cy="250" r="240" fill="none" stroke="#17a2b8" stroke-width="1" opacity="0.2"/>
          <circle cx="250" cy="250" r="200" fill="none" stroke="#17a2b8" stroke-width="1.5" opacity="0.3"/>
          <circle cx="250" cy="250" r="160" fill="none" stroke="#17a2b8" stroke-width="1" opacity="0.2"/>
          
          <!-- Colored orbit paths -->
          <circle cx="250" cy="250" r="180" fill="none" stroke="url(#orbitGradient)" stroke-width="2" opacity="0.4" stroke-dasharray="8,4"/>
          
          <!-- Orbiting colored dots - primary -->
          <circle class="orbit-dot orbit-dot-1" cx="250" cy="80" r="8" fill="#17a2b8" opacity="0.8"/>
          <circle class="orbit-dot orbit-dot-2" cx="420" cy="250" r="8" fill="#0dcaf0" opacity="0.8"/>
          <circle class="orbit-dot orbit-dot-3" cx="250" cy="420" r="8" fill="#ffc107" opacity="0.8"/>
          <circle class="orbit-dot orbit-dot-4" cx="80" cy="250" r="8" fill="#dc3545" opacity="0.8"/>
          
          <!-- Secondary orbiting dots - smaller -->
          <circle class="orbit-dot-small orbit-small-1" cx="250" cy="130" r="4" fill="#17a2b8" opacity="0.5"/>
          <circle class="orbit-dot-small orbit-small-2" cx="370" cy="250" r="4" fill="#0dcaf0" opacity="0.5"/>
          <circle class="orbit-dot-small orbit-small-3" cx="250" cy="370" r="4" fill="#ffc107" opacity="0.5"/>
          <circle class="orbit-dot-small orbit-small-4" cx="130" cy="250" r="4" fill="#dc3545" opacity="0.5"/>
          
          <!-- Center accent -->
          <circle class="center-glow" cx="250" cy="250" r="6" fill="#17a2b8" opacity="0.6"/>
          <circle class="center-pulse-ring" cx="250" cy="250" r="1" fill="none" stroke="#17a2b8" stroke-width="1" opacity="0.8"/>
        </svg>
        
        <img
          class="img-fluid profile-image"
          src="../assets/hero-profile.jpg"
          alt="Hero Profile"
        />
      </div>

      <div class="col-lg-6 col-sm-12">
        <h1 class="hero-title" style="line-height: 1.2; margin-bottom: 10px; color: #202124;">Hi, I'm <span style="background: linear-gradient(135deg, #4285F4, #34A853); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: bold; display: inline-block; padding-right: 3px;">Teck Yew</span>.</h1>
        <p class="hero-subtitle" style="margin-bottom: 30px; line-height: 1.6; color: #5f6368; font-weight: 500;">A graduating student from SMU with experiences in Information Systems, User Design Thinking, and Business Analytics.</p>
        <p class="hero-description" style="margin-bottom: 30px; line-height: 1.6; color: #5f6368;">Below are some quick links to get you <a href="https://www.google.com/search?q=thong+teck+yew&rlz=1C5CHFA_enSG1012SG1013&oq=thong+te&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDkyBggCEEUYQDIGCAMQRRg8MgYIBBBFGDwyBggFEEUYPDIGCAYQRRhB0gEHOTQ3ajBqMagCALACAA&sourceid=chrome&ie=UTF-8" target="_blank" style="text-decoration: none; font-weight: 600;"><span style="color: #4285F4;">G</span><span style="color: #EA4335;">o</span><span style="color: #FBBC04;">o</span><span style="color: #4285F4;">g</span><span style="color: #EA4335;">l</span><span style="color: #FBBC04;">i</span><span style="color: #4285F4;">n</span><span style="color: #EA4335;">g</span></a> about me 😁</p>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
          <button class="btn btn-lg hero-btn-primary" @click="scrollToProjects" style="padding: 12px 32px; font-size: 1rem; background: linear-gradient(135deg, #4285F4, #1f71b8); color: white; border: none; border-radius: 24px; font-weight: 600; box-shadow: 0 4px 12px rgba(66, 133, 244, 0.35); transition: all 0.3s ease; cursor: pointer;">My Portfolio</button>
          <a class="btn btn-lg hero-btn-secondary" href="https://www.linkedin.com/in/teck-yew/" target="_blank" style="padding: 12px 32px; font-size: 1rem; background: linear-gradient(135deg, #0A66C2, #005a9c); color: white; border: none; border-radius: 24px; font-weight: 600; box-shadow: 0 4px 12px rgba(10, 102, 194, 0.35); transition: all 0.3s ease;">LinkedIn</a>
        </div>
        <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 15px;">
          <a class="btn btn-lg hero-btn-tertiary" href="https://github.com/TeckYew" target="_blank" style="padding: 12px 32px; font-size: 1rem; background: linear-gradient(135deg, #333333, #1f2937); color: white; border: none; border-radius: 24px; font-weight: 600; box-shadow: 0 4px 12px rgba(51, 51, 51, 0.35); transition: all 0.3s ease;">Github</a>
          <a class="btn btn-lg hero-btn-accent" href="https://public.tableau.com/app/profile/thong.teck.yew/vizzes" target="_blank" style="padding: 12px 32px; font-size: 1rem; background: linear-gradient(135deg, #FBBC04, #f57f17); color: white; border: none; border-radius: 24px; font-weight: 600; box-shadow: 0 4px 12px rgba(251, 188, 4, 0.35); transition: all 0.3s ease;">Tableau</a>
        </div>
      </div>
    </div>

    <!-- Projects Showcase Section -->
    <div id="featuredProjects" style="margin-top: 40px; padding: 40px 20px;">
      <h2 class="projects-title" style="font-size: 1.8rem; font-weight: 600; color: #202124; margin-bottom: 40px; text-align: center;">Featured Projects</h2>
      
      <!-- Featured Projects Grid -->
      <div class="featured-projects-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-bottom: 60px;">
      
      <!-- Project 1: HandsUP -->
      <!-- First Project -->
      <RouterLink to="/project/handsup" class="project-card-link">
        <div class="project-image-wrapper">
          <img 
            src="../assets/idp-handsup.png" 
            alt="HandsUP Project" 
          />
        </div>
        <div class="project-card-overlay">
          <h3>HandsUP - Interaction Design and Prototyping Project</h3>
          <p><strong>Duration:</strong> ~12 weeks | <strong>Role:</strong> UX Designer</p>
        </div>
      </RouterLink>

      <!-- Second Project -->
      <RouterLink to="/project/hackathon" class="project-card-link">
        <div class="project-image-wrapper">
          <img 
            src="../assets/googlemaps-carspots.png" 
            alt="Hackathon Project" 
          />
        </div>
        <div class="project-card-overlay">
          <h3>Project Management Experience Hackathon</h3>
          <p><strong>Duration:</strong> 48-hour Hackathon | <strong>Role:</strong> Project Lead</p>
        </div>
      </RouterLink>

      <!-- Third Project -->
      <RouterLink to="/project/gis-solar" class="project-card-link">
        <div class="project-image-wrapper">
          <img 
            src="../assets/gis-solar-farm.png" 
            alt="GIS Solar Farm Project" 
          />
        </div>
        <div class="project-card-overlay">
          <h3>GIS-based Multi-criteria Analysis for Urban Planning</h3>
          <p><strong>Duration:</strong> ~12 weeks | <strong>Role:</strong> Spatial Analysis Lead</p>
        </div>
      </RouterLink>

      <!-- Fourth Project -->
      <RouterLink to="/project/kunyah" class="project-card-link">
        <div class="project-image-wrapper">
          <img 
            src="../assets/kunyah-project.png" 
            alt="Kunyah Bites Cafe POS System" 
          />
        </div>
        <div class="project-card-overlay">
          <h3>Kunyah Bites Cafe POS System</h3>
          <p><strong>Duration:</strong> ~18 weeks | <strong>Role:</strong> UX Designer</p>
        </div>
      </RouterLink>
      
      </div>

      <!-- Other Design Projects Section -->
      <div class="other-projects-section">
        <h3 class="other-projects-title" style="font-size: 1.8rem; font-weight: 600; color: #202124; margin-bottom: 40px; text-align: center;">Other Design Projects</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
          <!-- Design Project Card 1 -->
          <div class="design-project-card" :class="{ mobileExpanded: expandedCards[0] }" style="padding: 24px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border-radius: 16px; border: 1px solid #e8eaed; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s ease;" onmouseover="!this.classList.contains('mobileExpanded') && (this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)', this.style.transform='translateY(-4px)')" onmouseout="!this.classList.contains('mobileExpanded') && (this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)', this.style.transform='translateY(0)')">
            <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 12px;">
              <img src="../assets/ellipsis.png" alt="SMU Ellipsis" style="width: 40px; height: 40px; object-fit: contain;">
              <h4 style="font-size: 1.1rem; font-weight: 600; color: #202124; margin: 0;">SMU Ellipsis Marketing</h4>
            </div>
            <p class="design-description" style="font-size: 0.95rem; line-height: 1.5; color: #5f6368; margin-bottom: 15px;">
              As part of the Singapore Management University's biggest club representing the Information Systems faculty, also known as SMU Ellipsis, I was placed in charge of the Tech Series event, one of the biggest technology event that we organise in SMU, inviting guest speakers from various companies for networking sessions with the students. The event include workshops, coffee chats, networking night, and hackathon.
              <br><br>
              Another design project is the launch of our new School of Computing and Information Systems (SCIS) shirts.
              <br><br>
              These Instagram posts have been designed by me (more can be viewed on SMU Ellipsis profile), along with the planning and execution of the programs.
            </p>
            <div style="text-align: center; margin: 18px 0 24px 0;">
              <button class="read-more-btn" :class="{ expanded: expandedCards[0] }" @click="toggleCard(0)">
                <span>{{ expandedCards[0] ? 'Show less' : 'Show more' }}</span>
                <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="https://www.instagram.com/p/CvyWet7O45H/" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #17a2b8, #0e7a94); color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: all 0.2s ease;" onmouseover="this.style.boxShadow='0 4px 12px rgba(23,162,184,0.4)'" onmouseout="this.style.boxShadow='none'">
                Tech Series
              </a>
              <a href="https://www.instagram.com/p/CvwkaR-vxZk/?img_index=1" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #9C27B0, #7B1FA2); color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: all 0.2s ease;" onmouseover="this.style.boxShadow='0 4px 12px rgba(156,39,176,0.4)'" onmouseout="this.style.boxShadow='none'">
                SCIS launch
              </a>
            </div>
          </div>

          <!-- Design Project Card 2 - Tableau Projects -->
          <div class="design-project-card" :class="{ mobileExpanded: expandedCards[1] }" style="padding: 24px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border-radius: 16px; border: 1px solid #e8eaed; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s ease;" onmouseover="!this.classList.contains('mobileExpanded') && (this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)', this.style.transform='translateY(-4px)')" onmouseout="!this.classList.contains('mobileExpanded') && (this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)', this.style.transform='translateY(0)')">
            <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 12px;">
              <img src="../assets/tableau-projects.png" alt="Tableau Projects" style="width: 40px; height: 40px; object-fit: contain;">
              <h4 style="font-size: 1.1rem; font-weight: 600; color: #202124; margin: 0;">Tableau Projects</h4>
            </div>
            <p class="design-description" style="font-size: 0.95rem; line-height: 1.5; color: #5f6368; margin-bottom: 15px;">
              Being a part of the wider Tableau community, I was elected as the Tableau Academic Ambassador representing Singapore Management University. I had the chance to visit several schools to introduce Tableau to the students, along with attending Tableau workshops hosted by the Tableau community. I also post my dashboards on Tableau Public whenever I get the chance to.
            </p>
            <div style="text-align: center; margin: 18px 0 24px 0;">
              <button class="read-more-btn" :class="{ expanded: expandedCards[1] }" @click="toggleCard(1)">
                <span>{{ expandedCards[1] ? 'Show less' : 'Show more' }}</span>
                <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="https://www.linkedin.com/posts/wenbin-y_datafam-activity-7342050561489256448-OnTe?utm_source=share&utm_medium=member_desktop&rcm=ACoAABPCGQ8BLzk9s9gW5mp8UMP3vihOYV2qCt4" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #0A66C2, #005a9c); color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: all 0.2s ease;" onmouseover="this.style.boxShadow='0 4px 12px rgba(10,102,194,0.4)'" onmouseout="this.style.boxShadow='none'">
                LinkedIn Post
              </a>
              <a href="https://public.tableau.com/app/profile/thong.teck.yew/vizzes" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #FBBC04, #f57f17); color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: all 0.2s ease;" onmouseover="this.style.boxShadow='0 4px 12px rgba(251,188,4,0.4)'" onmouseout="this.style.boxShadow='none'">
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
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  data() {
    return {
      pastEvents: [],
      upcomingEvents: [],
      expandedCards: [false, false]
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
  },
  methods: {
    scrollToProjects() {
      const element = document.getElementById('featuredProjects')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    toggleCard(index) {
      this.expandedCards[index] = !this.expandedCards[index]
    }
  }
}
</script>

<style scoped>
/* Hero Section - Responsive Typography */
.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  letter-spacing: -1px;
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
  width: 170%;
  height: 170%;
  max-width: 750px;
  max-height: 750px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
  animation: gentleRotateDesktop 50s linear infinite;
  will-change: transform;
}

/* Mobile adjustment for animation alignment */
@media (max-width: 768px) {
  .profile-decoration {
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    top: 0;
    left: 0;
    transform: none;
    animation: gentleRotateMobile 50s linear infinite;
  }
}

.profile-image {
  position: relative;
  z-index: 2;
  cursor: pointer;
  border-radius: 20px;
  border: 5px solid #17a2b8;
  box-shadow: 0 10px 40px rgba(23, 162, 184, 0.3), 0 0 0 15px rgba(23, 162, 184, 0.1);
  transition: transform 0.3s ease;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
}

.profile-image:hover {
  transform: scale(1.1);
}

/* Responsive profile image for mobile */
@media (max-width: 768px) {
  .profile-image {
    width: 85%;
    max-width: 280px;
    border: 4px solid #17a2b8;
    box-shadow: 0 8px 24px rgba(23, 162, 184, 0.25);
  }
}

/* SVG Background Animations - Colored & Clean */
@keyframes gentleRotateDesktop {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes gentleRotateMobile {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Primary Orbit dots - colored and pulsing */
.orbit-dot {
  animation: orbitGlow 3s ease-in-out infinite;
  transform-origin: 250px 250px;
}

.orbit-dot-1 {
  animation-delay: 0s;
}

.orbit-dot-2 {
  animation-delay: 0.75s;
}

.orbit-dot-3 {
  animation-delay: 1.5s;
}

.orbit-dot-4 {
  animation-delay: 2.25s;
}

@keyframes orbitGlow {
  0%, 100% {
    r: 10px;
    opacity: 0.7;
    filter: drop-shadow(0 0 5px currentColor);
  }
  50% {
    r: 14px;
    opacity: 0.95;
    filter: drop-shadow(0 0 12px currentColor);
  }
}

/* Secondary smaller orbit dots */
.orbit-dot-small {
  animation: orbitSmallGlow 3s ease-in-out infinite;
}

.orbit-small-1 {
  animation-delay: 0.3s;
}

.orbit-small-2 {
  animation-delay: 1.05s;
}

.orbit-small-3 {
  animation-delay: 1.8s;
}

.orbit-small-4 {
  animation-delay: 2.55s;
}

@keyframes orbitSmallGlow {
  0%, 100% {
    r: 5px;
    opacity: 0.5;
  }
  50% {
    r: 9px;
    opacity: 0.8;
  }
}

/* Center glow effect */
.center-glow {
  animation: centerGlow 2.5s ease-in-out infinite;
}

@keyframes centerGlow {
  0%, 100% {
    r: 5px;
    opacity: 0.5;
  }
  50% {
    r: 8px;
    opacity: 0.8;
  }
}

/* Center pulse ring expansion */
.center-pulse-ring {
  animation: pulseRing 2s ease-out infinite;
}

@keyframes pulseRing {
  0% {
    r: 1px;
    opacity: 0.8;
  }
  100% {
    r: 30px;
    opacity: 0;
  }
}

/* Hero Button Styles with Hover Effects */
.hero-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(66, 133, 244, 0.5) !important;
}

.hero-btn-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(10, 102, 194, 0.5) !important;
}

.hero-btn-tertiary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(51, 51, 51, 0.5) !important;
}

.hero-btn-accent:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(251, 188, 4, 0.5) !important;
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

/* Featured Project Card Links */
.project-card-link {
  display: block;
  position: relative;
  margin-bottom: 0;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  height: 200px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.project-card-link:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.project-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.project-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card-link:hover .project-image-wrapper img {
  transform: scale(1.05);
}

.project-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4) 50%, transparent);
  color: white;
  padding: 40px 40px 30px;
  transition: all 0.3s ease;
  z-index: 2;
}

.project-card-link:hover .project-card-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
}

.project-card-overlay h3 {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.3;
  color: #ffffff !important;
}

.project-card-overlay p {
  font-size: clamp(0.75rem, 1.8vw, 0.85rem);
  margin: 0;
  opacity: 0.95;
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

/* Design Cards - Default (Desktop) */
.design-description {
  display: block;
  -webkit-line-clamp: unset;
  max-height: none;
  overflow: visible;
}

.read-more-btn {
  display: none;
}

.chevron-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: #17a2b8;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.read-more-btn:hover .chevron-icon {
  color: #0e7a94;
}

.read-more-btn.expanded .chevron-icon {
  transform: rotate(180deg);
}

/* Mobile and Tablet Responsiveness */
@media (max-width: 992px) {
  .project-card {
    padding: 30px 20px;
    gap: 30px;
  }

  .project-card-link {
    height: 180px;
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

  .project-card-link {
    height: 160px;
    margin-bottom: 0;
  }

  .project-card-overlay {
    padding: 40px 20px 20px;
  }

  .project-card-overlay h3 {
    font-size: 1.3rem;
  }

  .other-projects-section {
    padding: 20px;
  }

  .design-description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .design-project-card.mobileExpanded .design-description {
    display: block;
    -webkit-line-clamp: unset;
    overflow: visible;
  }

  .read-more-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    background: rgba(23, 162, 184, 0.08);
    border: 1px solid rgba(23, 162, 184, 0.2);
    border-radius: 8px;
    color: #17a2b8;
    font-weight: 500;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .read-more-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(23, 162, 184, 0.12);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  .read-more-btn:hover {
    background: rgba(23, 162, 184, 0.12);
    border-color: rgba(23, 162, 184, 0.35);
    color: #0e7a94;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(23, 162, 184, 0.15);
  }

  .read-more-btn:active {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(23, 162, 184, 0.1);
  }

  .read-more-btn span {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .read-more-btn:hover span {
    color: #0e7a94;
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

  .project-card-link {
    height: 200px;
    margin-bottom: 15px;
  }

  .project-card-overlay {
    padding: 30px 15px 15px;
  }

  .project-card-overlay h3 {
    font-size: 1.1rem;
  }

  .project-card-overlay p {
    font-size: 0.8rem;
  }
}

/* Responsive Grid for Featured Projects */
@media (max-width: 768px) {
  .featured-projects-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 15px !important;
  }
}

@media (max-width: 576px) {
  .featured-projects-grid {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
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
