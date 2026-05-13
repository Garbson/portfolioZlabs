<template>
  <div ref="canvasContainer" class="fixed inset-0 z-0 pointer-events-none overflow-hidden"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'

const canvasContainer = ref(null)
let animationId = null
let renderer = null
let scene = null
let camera = null

const stars = []
const planets = []
const shootingStars = []

onMounted(() => {
  // Scene Setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 15

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  // Starfield
  const starCount = 3000
  const starGeom = new THREE.BufferGeometry()
  const starPositions = new Float32Array(starCount * 3)
  const starColors = new Float32Array(starCount * 3)

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 100
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100

    const color = new THREE.Color()
    const rand = Math.random()
    if (rand > 0.8) color.setHex(0x00d2ff) // zblue
    else if (rand > 0.6) color.setHex(0x925cff) // zpurple
    else color.setHex(0xffffff)

    starColors[i * 3] = color.r
    starColors[i * 3 + 1] = color.g
    starColors[i * 3 + 2] = color.b
  }

  starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  starGeom.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

  const starMat = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  })

  const starPoints = new THREE.Points(starGeom, starMat)
  scene.add(starPoints)

  // Planets (Floating Orbs)
  const createPlanet = (radius, color, x, y, z, opacity = 0.1) => {
    const geom = new THREE.IcosahedronGeometry(radius, 2)
    const mat = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: opacity,
    })
    const mesh = new THREE.Mesh(geom, mat)
    mesh.position.set(x, y, z)
    scene.add(mesh)
    return {
      mesh,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      },
      floatSpeed: Math.random() * 0.002,
      floatOffset: Math.random() * Math.PI * 2
    }
  }

  planets.push(createPlanet(3, 0x00d2ff, -15, 10, -20, 0.05))
  planets.push(createPlanet(5, 0x925cff, 20, -15, -30, 0.03))
  planets.push(createPlanet(2, 0xffffff, 10, 15, -15, 0.04))
  planets.push(createPlanet(4, 0x00d2ff, -25, -10, -40, 0.02))

  // Saturn-like planet
  const saturnGroup = new THREE.Group()
  const saturnBody = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x925cff, wireframe: true, transparent: true, opacity: 0.1 })
  )
  const saturnRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.5, 0.05, 2, 64),
    new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.2 })
  )
  saturnRing.rotation.x = Math.PI / 2
  saturnGroup.add(saturnBody)
  saturnGroup.add(saturnRing)
  saturnGroup.position.set(-10, -20, -25)
  scene.add(saturnGroup)
  planets.push({
    mesh: saturnGroup,
    rotationSpeed: { x: 0.005, y: 0.01, z: 0 },
    floatSpeed: 0.001,
    floatOffset: 0
  })

  // Hero Rings
  const ring1 = new THREE.Mesh(
    new THREE.RingGeometry(12, 12.05, 128),
    new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.1, side: THREE.DoubleSide })
  )
  ring1.rotation.x = Math.PI / 2.5
  scene.add(ring1)

  const ring2 = new THREE.Mesh(
    new THREE.RingGeometry(15, 15.05, 128),
    new THREE.MeshBasicMaterial({ color: 0x925cff, transparent: true, opacity: 0.05, side: THREE.DoubleSide })
  )
  ring2.rotation.x = Math.PI / 3
  ring2.rotation.y = Math.PI / 4
  scene.add(ring2)

  // Add rings to animation
  const animateRings = () => {
    const time = Date.now() * 0.0005
    ring1.rotation.z = time * 0.1
    ring2.rotation.z = -time * 0.08
  }

  // Shooting Stars
  const createShootingStar = () => {
    const geom = new THREE.BufferGeometry()
    const pos = new Float32Array(2 * 3) // 2 points
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    
    const mat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    })
    
    const line = new THREE.Line(geom, mat)
    scene.add(line)
    
    return {
      line,
      active: false,
      speed: 0.5 + Math.random() * 0.5,
      length: 2 + Math.random() * 3
    }
  }

  for (let i = 0; i < 5; i++) {
    shootingStars.push(createShootingStar())
  }

  const spawnShootingStar = () => {
    const star = shootingStars.find(s => !s.active)
    if (!star) return

    star.active = true
    const startX = (Math.random() - 0.5) * 60
    const startY = (Math.random() - 0.5) * 60
    const startZ = -20 - Math.random() * 20

    const dirX = (Math.random() - 0.5) * 20
    const dirY = (Math.random() - 0.5) * 20
    
    star.currentPos = new THREE.Vector3(startX, startY, startZ)
    star.targetPos = new THREE.Vector3(startX + dirX, startY + dirY, startZ)
    
    gsap.to(star.line.material, {
      opacity: 0.8,
      duration: 0.2,
      onComplete: () => {
        gsap.to(star.line.material, {
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          onComplete: () => {
            star.active = false
          }
        })
      }
    })

    const moveStar = { t: 0 }
    gsap.to(moveStar, {
      t: 1,
      duration: 1.2,
      ease: "none",
      onUpdate: () => {
        const p1 = star.currentPos.clone().lerp(star.targetPos, moveStar.t)
        const p2 = star.currentPos.clone().lerp(star.targetPos, Math.max(0, moveStar.t - 0.1))
        
        const posAttr = star.line.geometry.attributes.position
        posAttr.setXYZ(0, p1.x, p1.y, p1.z)
        posAttr.setXYZ(1, p2.x, p2.y, p2.z)
        posAttr.needsUpdate = true
      }
    })
  }

  const shootInterval = setInterval(() => {
    if (Math.random() > 0.7) spawnShootingStar()
  }, 2000)

  // Interactivity
  let mouseX = 0
  let mouseY = 0
  let scrollY = window.scrollY

  const handleMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }

  const handleScroll = () => {
    scrollY = window.scrollY
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll)

  // Animation Loop
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const time = Date.now() * 0.001

    // Parallax & Scroll effects
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05
    
    // Move camera based on scroll
    const targetZ = 15 - (scrollY * 0.005)
    camera.position.z += (targetZ - camera.position.z) * 0.1
    
    camera.lookAt(0, 0, 0)

    // Rotate starfield
    starPoints.rotation.y = time * 0.02
    starPoints.rotation.x = time * 0.01

    // Update planets
    planets.forEach(p => {
      p.mesh.rotation.x += p.rotationSpeed.x
      p.mesh.rotation.y += p.rotationSpeed.y
      p.mesh.rotation.z += p.rotationSpeed.z
      
      p.mesh.position.y += Math.sin(time * 0.5 + p.floatOffset) * 0.005
    })

    animateRings()

    renderer.render(scene, camera)
  }
  animate()

  // Handle Resize
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', handleResize)

  // Cleanup
  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
    clearInterval(shootInterval)
    
    // Dispose resources
    starGeom.dispose()
    starMat.dispose()
    planets.forEach(p => {
      p.mesh.geometry.dispose()
      p.mesh.material.dispose()
    })
    shootingStars.forEach(s => {
      s.line.geometry.dispose()
      s.line.material.dispose()
    })
    renderer.dispose()
  })
})
</script>

<style scoped>
canvas {
  display: block;
}
</style>
