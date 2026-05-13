<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
    <div ref="canvasContainer" class="absolute inset-0 z-0"></div>

    <div class="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-zdark pointer-events-none"></div>

    <div class="relative z-10 text-center max-w-4xl hero-content" style="opacity: 0; transform: translateY(40px)">
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
        Sua empresa merece uma
        <span class="text-gradient"> presença digital</span>
        que gera resultado.
      </h1>
      <p class="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        A Zlabs cria sites e sistemas para empresas que querem crescer de verdade
        e gerenciar melhor o seu negócio — com qualidade, prazo e sem enrolação.
      </p>
      <a
        href="#contato"
        class="inline-flex items-center gap-3 glass px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-all duration-300 active:scale-95 group"
      >
        Fale com a gente
        <svg
          class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <div class="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
        <div class="w-1 h-2 bg-white/40 rounded-full animate-bounce"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'

const canvasContainer = ref(null)
let animationId = null
let renderer = null
let removeMouse = null
let removeResize = null

onMounted(() => {
  gsap.to('.hero-content', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power4.out',
    delay: 0.3,
  })

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  const sphereGeom = new THREE.IcosahedronGeometry(3, 4)
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0x00d2ff,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  })
  const sphere = new THREE.Mesh(sphereGeom, sphereMat)
  scene.add(sphere)

  const sphere2Geom = new THREE.IcosahedronGeometry(3.5, 2)
  const sphere2Mat = new THREE.MeshBasicMaterial({
    color: 0x925cff,
    wireframe: true,
    transparent: true,
    opacity: 0.05,
  })
  const sphere2 = new THREE.Mesh(sphere2Geom, sphere2Mat)
  scene.add(sphere2)

  const particleCount = 1500
  const particleGeom = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const radius = 4 + Math.random() * 12
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    const isBlue = Math.random() > 0.5
    colors[i * 3] = isBlue ? 0 : 0.57
    colors[i * 3 + 1] = isBlue ? 0.82 : 0.36
    colors[i * 3 + 2] = isBlue ? 1 : 1
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const particleMat = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  })
  const particles = new THREE.Points(particleGeom, particleMat)
  scene.add(particles)

  const ringGeom = new THREE.RingGeometry(4.5, 4.55, 128)
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00d2ff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
  })
  const ring = new THREE.Mesh(ringGeom, ringMat)
  ring.rotation.x = Math.PI / 2.5
  scene.add(ring)

  const ring2 = new THREE.Mesh(
    new THREE.RingGeometry(5.5, 5.55, 128),
    new THREE.MeshBasicMaterial({
      color: 0x925cff,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    })
  )
  ring2.rotation.x = Math.PI / 3
  ring2.rotation.y = Math.PI / 4
  scene.add(ring2)

  camera.position.z = 8

  let mouseX = 0
  let mouseY = 0

  const handleMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', handleMouseMove)
  removeMouse = () => window.removeEventListener('mousemove', handleMouseMove)

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const time = Date.now() * 0.0005

    sphere.rotation.y = time * 0.5
    sphere.rotation.x = time * 0.3
    sphere2.rotation.y = -time * 0.3
    sphere2.rotation.z = time * 0.2

    particles.rotation.y = time * 0.15
    particles.rotation.x = time * 0.1

    ring.rotation.z = time * 0.2
    ring2.rotation.z = -time * 0.15

    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02
    camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.02
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
  }
  animate()

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', handleResize)
  removeResize = () => window.removeEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) renderer.dispose()
  if (removeMouse) removeMouse()
  if (removeResize) removeResize()
})
</script>
