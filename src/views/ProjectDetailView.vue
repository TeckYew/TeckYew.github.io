<template>
  <div class="project-detail-container">
    <!-- Back Button -->
    <div class="back-button-container">
      <RouterLink to="/" class="back-button">
        <span>&larr;</span> Back to Home
      </RouterLink>
    </div>

    <!-- Project Category Label -->
    <div class="project-category-label">
      {{ project.category }}
    </div>

    <!-- Project Title -->
    <h1 class="project-page-title">{{ project.title }}</h1>

    <!-- Project Meta -->
    <div class="project-meta-info">
      <span><strong>Duration:</strong> {{ project.duration }}</span>
      <span><strong>Role:</strong> {{ project.role }}</span>
      <span><strong>Team:</strong> {{ project.team }}</span>
      <span v-if="project.tools"><strong>Skills & Tools:</strong> {{ project.tools.join(', ') }}</span>
    </div>

    <!-- Project Header with Image -->
    <div class="project-header">
      <img 
        :src="getImageUrl(project.image)" 
        :alt="project.title"
        class="project-header-image"
      />
    </div>

    <!-- Main Content Sections -->
    <div class="project-description-container">
      <!-- Opportunity Section -->
      <div v-if="project.opportunity" class="opportunity-section">
        <div class="opportunity-label">Opportunity</div>
        <p class="opportunity-text">{{ project.opportunity }}</p>
        
        <div v-if="project.challenge" class="challenge-box">
          <div class="challenge-label">Design Challenge</div>
          <p class="challenge-text">{{ project.challenge }}</p>
        </div>
      </div>

      <!-- Research Section -->
      <div v-if="project.research" class="research-section">
        <h2 class="section-header">Understanding the Problem</h2>
        <div class="research-content">
          <div class="research-method">
            <h3>Research Method</h3>
            <p>{{ project.research.method }}</p>
          </div>
          <div v-if="project.research.painPoints" class="pain-points">
            <h3>Key Pain Points</h3>
            <ul>
              <li v-for="(point, index) in project.research.painPoints" :key="index">
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Role & Contributions Section -->
      <div class="role-contributions-section">
        <div class="role-box">
          <h3 class="section-header">My Role</h3>
          <ul class="role-list">
            <li v-for="(item, index) in project.roleDetails" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="contributions-box">
          <h3 class="section-header">Key Contributions</h3>
          <ul class="contributions-list">
            <li v-for="(item, index) in project.contributions" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Impact Section -->
      <div v-if="project.impact && project.impact.length > 0" class="impact-section">
        <h2 class="section-header">Impact & Results</h2>
        <div class="impact-cards">
          <div v-for="(item, index) in project.impact" :key="index" class="impact-card">
            <div class="impact-icon">{{ item.icon }}</div>
            <div class="impact-metric">{{ item.metric }}</div>
            <div class="impact-label">{{ item.label }}</div>
          </div>
        </div>
      </div>

      <!-- Key Insight Section -->
      <div v-if="project.keyInsight" class="insight-section">
        <h2 class="section-header">Key Insight</h2>
        <p class="insight-text">{{ project.keyInsight }}</p>
      </div>
      
      <!-- Project Links -->
      <div v-if="project.links && project.links.length > 0" class="project-links">
        <a 
          v-for="(link, index) in project.links" 
          :key="index"
          :href="link.url" 
          target="_blank" 
          rel="noopener noreferrer"
          :class="['btn', 'btn-lg', `btn-${getLinkColor(link.color)}`]"
          :style="{ 
            backgroundColor: link.color && !link.color.includes('success') ? link.color : undefined,
            color: link.color && !link.color.includes('success') ? 'white' : undefined,
            border: link.color && !link.color.includes('success') ? 'none' : undefined
          }"
        >
          {{ link.text }}
        </a>
      </div>
    </div>

    <!-- Other Projects Navigation -->
    <div class="other-projects-nav">
      <h3>Other Featured Projects</h3>
      <div class="projects-grid">
        <RouterLink 
          v-for="p in otherProjects" 
          :key="p.id"
          :to="`/project/${p.id}`"
          class="project-card-link"
        >
          <img :src="getImageUrl(p.image)" :alt="p.title" />
          <p>{{ p.title }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>


<script>
import { RouterLink } from 'vue-router'
import { projects } from '../data/projects.js'

export default {
  name: 'ProjectDetailView',
  components: {
    RouterLink
  },
  data() {
    return {
      projects: projects,
      currentProjectId: null
    }
  },
  computed: {
    project() {
      return this.projects.find(p => p.id === this.currentProjectId) || {}
    },
    otherProjects() {
      return this.projects.filter(p => p.id !== this.currentProjectId)
    }
  },
  methods: {
    getLinkColor(color) {
      if (color === 'success') return 'success'
      return 'light'
    },
    getImageUrl(imagePath) {
      return new URL(`../assets/${imagePath}`, import.meta.url).href
    }
  },
  mounted() {
    this.currentProjectId = this.$route.params.id
    window.scrollTo(0, 0)
  },
  watch: {
    '$route.params.id'(newId) {
      this.currentProjectId = newId
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
.project-detail-container {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
}

.back-button-container {
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #17a2b8;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.back-button:hover {
  gap: 12px;
  color: #1e7e34;
}

.project-category-label {
  text-align: center;
  color: #0066cc;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 15px;
  letter-spacing: 0.5px;
}

.project-page-title {
  text-align: center;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 600;
  margin: 0 auto 30px;
  max-width: 900px;
  line-height: 1.3;
  color: var(--color-heading, #000000);
  padding: 0 20px;
}

.project-meta-info {
  text-align: center;
  max-width: 900px;
  margin: 0 auto 60px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 8px;
  justify-content: center;
  font-size: 0.95rem;
  color: #999;
  padding: 0 20px;
}

.project-meta-info span {
  display: flex;
  gap: 8px;
}

.project-header {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px 80px;
  background-color: #ffffff;
}

.project-header-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.project-description-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 100px;
}

/* Opportunity Section */
.opportunity-section {
  max-width: 900px;
  margin: 0 auto 60px;
  background: #e3f2fd;
  border-radius: 12px;
  padding: 40px;
  color: #1565c0;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.15);
  border-left: 5px solid #1976d2;
}

.opportunity-label {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
  color: #1565c0;
}

.opportunity-text {
  font-size: 1.15rem;
  line-height: 1.7;
  margin-bottom: 30px;
  color: #1565c0;
}

.challenge-box {
  background: rgba(25, 118, 210, 0.1);
  border-left: 4px solid #1976d2;
  padding: 20px;
  border-radius: 6px;
  margin-top: 20px;
}

.challenge-label {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 10px;
  color: #1565c0;
}

.challenge-text {
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 500;
  margin: 0;
  color: #1565c0;
}

/* Research Section */
.research-section {
  max-width: 900px;
  margin: 0 auto 60px;
}

.research-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 30px;
}

.research-method,
.pain-points {
  padding: 25px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.research-method h3,
.pain-points h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.research-method p {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.pain-points ul {
  margin: 0;
  padding-left: 20px;
  list-style-type: none;
}

.pain-points li {
  color: #555;
  line-height: 1.7;
  margin-bottom: 12px;
  padding-left: 8px;
  position: relative;
}

.pain-points li:before {
  content: '•';
  position: absolute;
  left: -8px;
  color: #17a2b8;
  font-weight: bold;
}

/* Role & Contributions Section */
.role-contributions-section {
  max-width: 900px;
  margin: 0 auto 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.role-box,
.contributions-box {
  padding: 30px;
  background: #f8f9fa;
  border-radius: 8px;
  border-top: 3px solid #17a2b8;
}

.role-box h3,
.contributions-box h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.role-list,
.contributions-list {
  margin: 0;
  padding-left: 0;
  list-style-type: none;
}

.role-list li,
.contributions-list li {
  padding: 12px 0;
  padding-left: 25px;
  color: #555;
  line-height: 1.6;
  position: relative;
  font-size: 0.95rem;
}

.role-list li:before,
.contributions-list li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #17a2b8;
  font-weight: bold;
  font-size: 1.1rem;
}

/* Impact Section */
.impact-section {
  max-width: 900px;
  margin: 0 auto 60px;
}

.impact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
  justify-items: center;
}

.impact-cards:has(.impact-card:only-child) {
  grid-template-columns: 1fr;
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
}

.impact-card {
  background: linear-gradient(135deg, #d4f946 0%, #bcf246 100%);
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 250px;
}

.impact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.impact-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.impact-metric {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.impact-label {
  font-size: 0.95rem;
  color: #333;
  font-weight: 600;
}

/* Key Insight Section */
.insight-section {
  max-width: 900px;
  margin: 0 auto 60px;
  padding: 35px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  border-left: 5px solid #d97706;
}

.insight-section .section-header {
  margin-top: 0;
  margin-bottom: 20px;
  color: #92400e;
}

.insight-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #78350f;
  margin: 0;
  font-weight: 500;
}

/* Section Header */
.section-header {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 30px;
  margin-top: 0;
  color: var(--color-heading, #000000);
}

/* Project Links */
.project-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 40px;
  justify-content: center;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.btn {
  padding: 12px 40px !important;
  font-size: 1rem !important;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-success {
  background-color: #17a2b8;
  color: white;
}

.btn-success:hover {
  background-color: #138496;
  transform: translateY(-2px);
}

.btn-light {
  background-color: #f0f0f0;
  color: #1a1a1a;
  border: 1px solid #ddd;
}

.btn-light:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

/* Other Projects Navigation */
.other-projects-nav {
  background: #f9f9f9;
  padding: 80px 20px;
  margin-top: 100px;
}

.other-projects-nav h3 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 50px;
  color: #17a2b8 !important;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  max-width: 800px;
  margin: 0 auto;
}

.project-card-link {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
  aspect-ratio: 1;
}

.project-card-link img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card-link p {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.75);
  color: #ffffff;
  padding: 0;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.3;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 15px;
  opacity: 0;
  letter-spacing: 0.5px;
  font-family: 'Segoe UI', 'Trebuchet MS', sans-serif;
}

.project-card-link:hover img {
  transform: scale(1.05);
}

.project-card-link:hover p {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .project-page-title {
    font-size: 1.8rem;
  }

  .project-meta-info {
    flex-direction: column;
    gap: 12px;
    font-size: 0.9rem;
    margin-bottom: 40px;
  }

  .project-header {
    padding: 0 20px 60px;
  }

  .section-header {
    font-size: 1.4rem;
  }

  .opportunity-section {
    padding: 25px;
  }

  .opportunity-text {
    font-size: 1rem;
  }

  .challenge-text {
    font-size: 1rem;
  }

  .research-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .role-contributions-section {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .impact-cards {
    grid-template-columns: 1fr;
  }

  .insight-section {
    padding: 20px;
  }

  .insight-text {
    font-size: 1rem;
  }

  .other-projects-nav {
    padding: 60px 20px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
