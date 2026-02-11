<template>
  <div class="about-me-container">
    <!-- Hero Section with Image and Overlay -->
    <div class="hero-section">
      <img 
        src="../assets/about-me-hero.jpg" 
        alt="Profile" 
        class="hero-image"
      />
      <div class="hero-overlay"></div>
      <div class="hero-text">
        <p class="overlay-quote">Love whenever, and wherever.</p>
      </div>
    </div>

    <!-- Interests Section -->
    <div class="interests-container">
      <div class="interests-content">
        <h2 class="section-title">When I'm Free, I Love To ...</h2>
        
        <!-- Story Section -->
        <div class="story-section">
          <p class="story-text">
            Love is not just about caring or admiring. For me, love is about human connection. Be it in school, workshops, public spaces, I love to talk to different humans and connect with everyone and anyone. One of my favourite professors, Professor Tamas Makany, once said, <span class="story-quote">"Sub pondere crescit palma"</span>, which means the palm tree grows under pressure. For me, when I am out of work, I love to explore new experiences, meet interesting people, and find joy in meaningful conversations and creative pursuits.
          </p>
        </div>
        
        <!-- Interest Cards -->
        <div class="interests-grid">
          <div class="interest-card">
            <div class="interest-icon">🌍</div>
            <h3>Explore & Travel</h3>
            <p>Back in January 2025, I went on a class trip to United Kingdom, London and a solo travel to Manchester and different parts of Europe (Belgium, Germany and Netherlands). The people, bookstores, food, and experience, all of these changed my point of view of the world.</p>
            <a href="https://www.linkedin.com/posts/smu-scis-technopreneurship-study-mission_tsm-london-2025-activity-7419562776085409794-Q_n6?utm_source=share&utm_medium=member_desktop&rcm=ACoAABPCGQ8BLzk9s9gW5mp8UMP3vihOYV2qCt4" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #0A66C2; color: white; padding: 8px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: all 0.3s ease; margin-top: 10px;">
              LinkedIn Post
            </a>
          </div>

          <div class="interest-card">
            <div class="interest-icon">🎨</div>
            <h3>Design & Create</h3>
            <p>My love for design took shape during my secondary school days, where I enjoyed designing and drawing different artwork, and even managed to score a distinction for my art subject. Since then, the exploration of design thinking and user experience has always been part of my journey to apply design not just to UI/UX, but to many other fields like Business Analytics.</p>
          </div>

          <div class="interest-card">
            <div class="interest-icon">🎯</div>
            <h3>Make an Impact</h3>
            <p>Creating a platform that contribute positively to society. I love to help out with elderly care and providing children with the necessary support, such as under SMU's SSUpport program, which provide underpriviledge children with tuition. I have recently created a TikTok channel to connect with people as well, and it is still a Work-In-Progress! Who knows, I might even start an official YouTube channel as well!</p>
            <a href="https://www.tiktok.com/@amoretyyyy" target="_blank" rel="noopener noreferrer" class="tiktok-button">
              <svg viewBox="0 0 24 24" class="tiktok-icon">
                <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.9 2.9 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.26 6.26 0 0 0-1-.1A6.15 6.15 0 0 0 5 20.94a6.16 6.16 0 0 0 10.86-4.43v-7a8.13 8.13 0 0 0 4.73 1.44v-3.6a4.75 4.75 0 0 1-.46-.04z" />
              </svg>
              Follow on TikTok
            </a>
          </div>

          <div class="interest-card">
            <div class="interest-icon">📚</div>
            <h3>Starting a New Venture</h3>
            <p>I always have an idea in me to start a business venture, be it a startup or a company. The dream is big, but nothing is ever too big if we put dreams into action. Oh, and I love reading books too!</p>
          </div>

          <div class="interest-card">
            <div class="interest-icon">🤝</div>
            <h3>Collaborate & Connect</h3>
            <p>Working with amazing people and building meaningful connections. Schools, Co-cirricular activity clubs, community service, workshops. All these help shape me into becoming who I am today.</p>
          </div>

          <div class="interest-card">
            <div class="interest-icon">💻</div>
            <h3>Build & Design</h3>
            <p>Ever since polytechnic, I have always enjoyed working with technologies. Building innovative products and solving problems through technology is my passion, and I will always cherish it.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMeView',
  data() {
    return {}
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.about-me-container {
  width: 100%;
  overflow: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -80px;
  padding-top: 80px;
}

.hero-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.3) 80%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

.hero-text {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  margin-bottom: 100px;
}

.overlay-quote {
  font-size: 3.5rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-shadow: 6px 6px 20px rgba(0, 0, 0, 0.9), 3px 3px 10px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.7);
  animation: fadeInUp 1s ease-out;
  font-style: italic;
  font-family: 'Georgia', 'Garamond', serif;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Interests Section */
.interests-container {
  padding: 80px 20px;
  background: #ffffff;
}

.interests-content {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 300;
  text-align: center;
  margin-bottom: 60px;
  color: #1a1a1a;
  letter-spacing: -1px;
}

/* Story Section */
.story-section {
  max-width: 900px;
  margin: 0 auto 60px;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 12px;
  border-left: 4px solid #28a745;
}

.story-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  font-family: 'Georgia', 'Garamond', serif;
  text-align: justify;
}

.story-quote {
  font-style: italic;
  color: #28a745;
  font-weight: 500;
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.interest-card {
  padding: 40px 30px;
  border-radius: 12px;
  background: #f9f9f9;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.interest-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  border-color: #28a745;
}

.interest-icon {
  font-size: 3.5rem;
  margin-bottom: 20px;
  display: block;
}

.interest-card h3 {
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.interest-card p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 15px;
}

.tiktok-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.tiktok-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
}

.tiktok-icon {
  width: 20px;
  height: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    height: 70vh;
  }

  .overlay-quote {
    font-size: 1.8rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }

  .interests-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .interests-container {
    padding: 60px 20px;
  }

  .interest-card {
    padding: 30px 20px;
  }

  .interest-icon {
    font-size: 2.5rem;
  }

  .interest-card h3 {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 60vh;
  }

  .overlay-quote {
    font-size: 1.4rem;
    letter-spacing: 1px;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .interest-card {
    padding: 25px 15px;
  }
}
</style>
