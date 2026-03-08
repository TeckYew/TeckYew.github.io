<template>
  <footer @mouseenter="showGame = true" @mouseleave="showGame = false" style="position: relative;">
    <!-- Copyright Footer -->
    <div style="padding: 15px 20px; background: var(--footer-bg, #ffffff); border-top: 1px solid var(--footer-border, #e0e0e0);">
      <p style="margin: 0; color: var(--footer-text, #999); font-size: 0.85rem; text-align: left;">
        © Thong Teck Yew 2026 🇸🇬
      </p>
    </div>
    
    <!-- Dinosaur Game -->
    <div v-if="showGame" style="padding: 30px 20px; background: var(--game-bg, #f0f0f0); border-top: 2px solid #17a2b8; cursor: pointer;">
      <div style="max-width: 800px; margin: 0 auto; text-align: center;">
        <p style="margin-bottom: 20px; color: var(--game-text, #666); font-size: 0.95rem;">
          🎮 Press SPACEBAR to jump! Avoid obstacles! (Press ESC to exit)
        </p>
        <canvas 
          ref="gameCanvas" 
          style="display: block; margin: 0 auto; border: 1px solid var(--game-border, #ddd); max-width: 100%; height: auto;"
          @keydown="handleKeyDown"
          @keyup="handleKeyUp"
          tabindex="1"
        ></canvas>
      </div>
    </div>
    <div v-else style="padding: 20px; text-align: center; cursor: pointer; background: var(--game-hover-bg, transparent);">
      <p style="color: var(--game-hover-text, #999); font-size: 0.9rem; margin: 0;">
        Hover over with your mouse to play a classic Goo-gly dinosaur game 🦕
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBanner',
  data() {
    return {
      showGame: false,
      gameInstance: null,
      canvas: null,
      ctx: null,
      gameRunning: false,
      gameOver: false,
      score: 0,
      dino: {
        x: 50,
        y: 250,
        width: 40,
        height: 50,
        velocityY: 0,
        jumping: false,
        jumpPower: 15
      },
      obstacles: [],
      keys: {},
      gameSpeed: 6,
      obstacleChance: 0.02
    }
  },
  watch: {
    showGame(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.initGame()
        })
      } else {
        this.stopGame()
      }
    }
  },
  methods: {
    initGame() {
      this.canvas = this.$refs.gameCanvas
      if (!this.canvas) return
      
      this.ctx = this.canvas.getContext('2d')
      this.canvas.width = Math.min(800, window.innerWidth - 40)
      this.canvas.height = 300
      
      this.gameRunning = true
      this.gameOver = false
      this.score = 0
      this.obstacles = []
      this.dino = {
        x: 50,
        y: 250,
        width: 40,
        height: 50,
        velocityY: 0,
        jumping: false,
        jumpPower: 15
      }
      
      this.canvas.focus()
      this.gameLoop()
    },
    
    stopGame() {
      this.gameRunning = false
    },
    
    gameLoop() {
      if (!this.gameRunning) return
      
      // Detect dark mode
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark'
      const bgColor = isDarkMode ? '#3a3a3a' : 'white'
      const groundColor = isDarkMode ? '#e0e0e0' : '#000'
      const dinoColor = isDarkMode ? '#17a2b8' : '#2ecc71'
      const eyeColor = isDarkMode ? '#1a1a1a' : '#000'
      const obstacleColor = isDarkMode ? '#ff6b7a' : '#e74c3c'
      const textColor = isDarkMode ? '#e0e0e0' : '#000'
      
      // Clear canvas
      this.ctx.fillStyle = bgColor
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      
      // Draw ground
      this.ctx.strokeStyle = groundColor
      this.ctx.lineWidth = 2
      this.ctx.beginPath()
      this.ctx.moveTo(0, this.canvas.height - 10)
      this.ctx.lineTo(this.canvas.width, this.canvas.height - 10)
      this.ctx.stroke()
      
      // Update dinosaur
      this.dino.velocityY += 0.6 // gravity
      this.dino.y += this.dino.velocityY
      
      if (this.dino.y + this.dino.height >= this.canvas.height - 10) {
        this.dino.y = this.canvas.height - 10 - this.dino.height
        this.dino.velocityY = 0
        this.dino.jumping = false
      }
      
      // Handle jumping
      if (this.keys[' '] && !this.dino.jumping) {
        this.dino.velocityY = -this.dino.jumpPower
        this.dino.jumping = true
      }
      
      // Draw dinosaur
      this.ctx.fillStyle = dinoColor
      this.ctx.fillRect(this.dino.x, this.dino.y, this.dino.width, this.dino.height)
      // Draw eyes
      this.ctx.fillStyle = eyeColor
      this.ctx.fillRect(this.dino.x + 10, this.dino.y + 10, 5, 5)
      this.ctx.fillRect(this.dino.x + 20, this.dino.y + 10, 5, 5)
      
      // Spawn obstacles
      if (Math.random() < this.obstacleChance) {
        this.obstacles.push({
          x: this.canvas.width,
          y: this.canvas.height - 10 - 30,
          width: 20,
          height: 30
        })
      }
      
      // Update obstacles
      for (let i = this.obstacles.length - 1; i >= 0; i--) {
        this.obstacles[i].x -= this.gameSpeed
        
        // Draw obstacle
        this.ctx.fillStyle = obstacleColor
        this.ctx.fillRect(this.obstacles[i].x, this.obstacles[i].y, this.obstacles[i].width, this.obstacles[i].height)
        
        // Collision detection
        if (this.checkCollision(this.dino, this.obstacles[i])) {
          this.gameOver = true
          this.gameRunning = false
        }
        
        // Remove obstacle if off screen
        if (this.obstacles[i].x + this.obstacles[i].width < 0) {
          this.obstacles.splice(i, 1)
          this.score++
        }
      }
      
      // Increase difficulty
      this.gameSpeed = 6 + (this.score * 0.2)
      this.obstacleChance = 0.02 + (this.score * 0.001)
      
      // Draw score
      this.ctx.fillStyle = textColor
      this.ctx.font = '20px Arial'
      this.ctx.fillText(`Score: ${this.score}`, 10, 30)
      
      // Draw game over
      if (this.gameOver) {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark'
        const overlayColor = isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'
        const textColor = isDarkMode ? '#ffffff' : '#fff'
        
        this.ctx.fillStyle = overlayColor
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = textColor
        this.ctx.font = 'bold 30px Arial'
        this.ctx.textAlign = 'center'
        this.ctx.fillText('GAME OVER!', this.canvas.width / 2, this.canvas.height / 2 - 20)
        this.ctx.font = '20px Arial'
        this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20)
      } else {
        requestAnimationFrame(() => this.gameLoop())
      }
    },
    
    checkCollision(rect1, rect2) {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y
    },
    
    handleKeyDown(e) {
      this.keys[e.key] = true
      if (e.key === 'Escape') {
        this.showGame = false
      }
      e.preventDefault()
    },
    
    handleKeyUp(e) {
      this.keys[e.key] = false
    }
  }
}
</script>

<style scoped>
</style>
