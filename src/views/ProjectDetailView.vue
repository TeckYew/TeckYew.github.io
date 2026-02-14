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
    </div>

    <!-- Project Header with Image -->
    <div class="project-header">
      <img 
        :src="getImageUrl(project.image)" 
        :alt="project.title"
        class="project-header-image"
      />
    </div>

    <!-- Project Description -->
    <div class="project-description-container">
      <div class="description-content">
        <h2 class="section-header">Overview</h2>
        <div class="description-text" v-html="formattedDescription"></div>
        
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
    },
    formattedDescription() {
      if (!this.project.description) return ''
      return this.project.description
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          if (line.startsWith('•')) {
            return `<li>${line.substring(1).trim()}</li>`
          } else if (line.startsWith('**') && line.endsWith('**')) {
            return `<p><strong>${line.substring(2, line.length - 2)}</strong></p>`
          } else {
            return `<p>${line}</p>`
          }
        })
        .join('')
        .replace(/<li>/g, '<li style="margin-left: 20px; margin-bottom: 8px;">')
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
  color: #28a745;
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
  color: #000000 !important;
  padding: 0 20px;
}

.project-meta-info {
  text-align: center;
  max-width: 900px;
  margin: 0 auto 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
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

.description-content {
  max-width: 800px;
  margin: 0 auto;
}

.section-header {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 30px;
  margin-top: 0;
  color: #000000 !important;
}

.description-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 50px;
}

.description-text p {
  margin-bottom: 20px;
}

.description-text strong {
  color: #1a1a1a;
  font-weight: 600;
}

.description-text li {
  margin-bottom: 8px;
  color: #555;
}

.project-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 40px;
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
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
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

.other-projects-nav {
  background: #f9f9f9;
  padding: 80px 20px;
  margin-top: 100px;
}

.other-projects-nav h3 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 50px;
  color: #28a745 !important;
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

  .description-text {
    font-size: 1rem;
  }

  .section-header {
    font-size: 1.4rem;
  }

  .other-projects-nav {
    padding: 60px 20px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
