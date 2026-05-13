<template>
  <Transition name="fade">
    <div v-if="!isFinished" class="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      <canvas ref="canvasRef" class="absolute inset-0"></canvas>
      
      <!-- Initial Singularity -->
      <div 
        v-if="stage === 'singularity'" 
        class="relative w-2 h-2 bg-white rounded-full animate-pulse"
      >
        <div class="absolute inset-0 bg-white blur-md rounded-full scale-[3]"></div>
        <div class="absolute inset-0 bg-blue-400 blur-xl rounded-full scale-[6] opacity-50"></div>
        <div class="absolute inset-0 bg-white blur-[2px] rounded-full scale-[1.5]"></div>
      </div>

      <!-- Flash Overlay -->
      <div 
        v-if="stage === 'flash'" 
        class="absolute inset-0 bg-white z-[110]"
        :style="{ opacity: flashOpacity }"
      ></div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const canvasRef = ref(null)
const isFinished = ref(false)
const stage = ref('singularity') // singularity -> flash -> expansion
const flashOpacity = ref(0)
const shakeX = ref(0)
const shakeY = ref(0)

let ctx = null
let particles = []
let shockwaves = []
let animationFrame = null

class Particle {
  constructor(x, y, type = 'star') {
    this.x = x
    this.y = y
    this.type = type
    const angle = Math.random() * Math.PI * 2
    
    if (type === 'nebula') {
      const velocity = Math.random() * 2 + 1
      this.vx = Math.cos(angle) * velocity
      this.vy = Math.sin(angle) * velocity
      this.size = Math.random() * 100 + 50
      this.color = `hsla(${Math.random() * 60 + 240}, 100%, 50%, 0.1)`
      this.life = 1
      this.decay = 0.005
    } else {
      const velocity = Math.random() * 25 + 5
      this.vx = Math.cos(angle) * velocity
      this.vy = Math.sin(angle) * velocity
      this.size = Math.random() * 4 + 1
      this.color = Math.random() > 0.5 ? '#fff' : `hsl(${Math.random() * 60 + 180}, 100%, 70%)`
      this.life = 1
      this.decay = Math.random() * 0.02 + 0.005
    }
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vx *= 0.99
    this.vy *= 0.99
    this.life -= this.decay
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.life
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

class Shockwave {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.radius = 0
    this.velocity = 15
    this.opacity = 1
  }

  update() {
    this.radius += this.velocity
    this.velocity *= 0.98
    this.opacity -= 0.015
  }

  draw() {
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.stroke()
  }
}

const initParticles = () => {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  
  // Stars
  for (let i = 0; i < 600; i++) {
    particles.push(new Particle(centerX, centerY, 'star'))
  }
  
  // Nebula clouds
  for (let i = 0; i < 15; i++) {
    particles.push(new Particle(centerX, centerY, 'nebula'))
  }
  
  // Shockwaves
  shockwaves.push(new Shockwave(centerX, centerY))
  setTimeout(() => shockwaves.push(new Shockwave(centerX, centerY)), 150)
  setTimeout(() => shockwaves.push(new Shockwave(centerX, centerY)), 300)
}

const animate = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  
  if (stage.value === 'expansion') {
    // Apply shake
    ctx.save()
    ctx.translate(shakeX.value, shakeY.value)
    
    particles.forEach((p, index) => {
      p.update()
      p.draw()
      if (p.life <= 0) particles.splice(index, 1)
    });

    shockwaves.forEach((s, index) => {
      s.update()
      s.draw()
      if (s.opacity <= 0) shockwaves.splice(index, 1)
    });
    
    ctx.restore()
  }

  animationFrame = requestAnimationFrame(animate)
}

const startSequence = () => {
  setTimeout(() => {
    stage.value = 'flash'
    
    // Screen Shake Effect
    gsap.to(shakeX, { value: 20, duration: 0.05, repeat: 10, yoyo: true })
    gsap.to(shakeY, { value: 20, duration: 0.05, repeat: 10, yoyo: true, onComplete: () => {
      shakeX.value = 0
      shakeY.value = 0
    }})

    gsap.to(flashOpacity, {
      value: 1,
      duration: 0.05,
      onComplete: () => {
        stage.value = 'expansion'
        initParticles()
        
        gsap.to(flashOpacity, {
          value: 0,
          duration: 1.5,
          ease: 'expo.out',
          onComplete: () => {
            setTimeout(() => {
              isFinished.value = true
            }, 1500)
          }
        })
      }
    })
  }, 1200)
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  
  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  window.addEventListener('resize', resize)
  resize()
  
  animate()
  startSequence()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 1.5s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
</style>
