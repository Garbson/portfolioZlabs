<template>
  <div 
    class="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
    @mousemove="handleMouseMove"
  >
    <!-- Main Cursor -->
    <div 
      ref="cursorRef"
      class="fixed w-4 h-4 bg-white rounded-full mix-blend-difference transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    ></div>
    
    <!-- Outer Ring / Nebula Trail -->
    <div 
      ref="followerRef"
      class="fixed w-10 h-10 border border-white/20 rounded-full transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <div class="absolute inset-0 bg-zblue/10 blur-xl rounded-full scale-150"></div>
    </div>

    <!-- Click Particles Container -->
    <div ref="particlesContainer" class="fixed inset-0 pointer-events-none"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursorRef = ref(null)
const followerRef = ref(null)
const particlesContainer = ref(null)

const createBurst = (x, y) => {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div')
    p.className = 'absolute w-1 h-1 bg-white rounded-full'
    p.style.left = `${x}px`
    p.style.top = `${y}px`
    particlesContainer.value.appendChild(p)

    const angle = Math.random() * Math.PI * 2
    const dist = Math.random() * 100 + 50
    
    gsap.to(p, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => p.remove()
    })
  }
}

const handleMouseMove = (e) => {
  const { clientX, clientY } = e
  
  // Move main cursor instantly
  gsap.set(cursorRef.value, {
    x: clientX,
    y: clientY
  })
  
  // Move follower with delay
  gsap.to(followerRef.value, {
    x: clientX,
    y: clientY,
    duration: 0.5,
    ease: 'power2.out'
  })
}

const handleMouseDown = (e) => {
  createBurst(e.clientX, e.clientY)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mousedown', handleMouseDown)
})
</script>

<style scoped>
/* Mix blend difference makes the cursor white on dark and black on light */
</style>
