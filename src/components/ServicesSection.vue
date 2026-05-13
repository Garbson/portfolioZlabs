<template>
  <section id="servicos" class="py-24 md:py-32 px-6 relative">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16 services-title">
        <p class="text-sm font-semibold text-zblue uppercase tracking-widest mb-4">Serviços</p>
        <h2 class="text-4xl md:text-5xl font-bold mb-4">O que fazemos</h2>
        <p class="text-gray-400 max-w-lg mx-auto">Soluções digitais pensadas para o seu crescimento.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="perspective-1000 service-card"
        >
          <div
            class="glass-card p-10 md:p-12 h-full relative overflow-hidden group cursor-default"
            @mousemove="handleHover($event)"
            @mouseleave="resetHover($event)"
          >
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              :class="service.gradientClass"
            ></div>

            <div class="relative z-10">
              <div
                class="w-14 h-14 glass-strong mb-8 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                :class="service.iconColor"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7" v-html="service.iconPath"></svg>
              </div>

              <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ service.title }}</h3>
              <p class="text-gray-400 leading-relaxed text-base md:text-lg">
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Sites',
    description:
      'Landing pages e sites institucionais que atraem clientes e transmitem credibilidade. Focados em conversão, performance e presença de marca.',
    gradientClass: 'bg-gradient-to-br from-zblue/5 to-transparent',
    iconColor: 'text-zblue',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />',
  },
  {
    title: 'Sistemas',
    description:
      'Soluções digitais personalizadas para organizar e melhorar a gestão do seu negócio. Sistemas robustos, escaláveis e feitos sob medida.',
    gradientClass: 'bg-gradient-to-br from-zpurple/5 to-transparent',
    iconColor: 'text-zpurple',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />',
  },
  {
    title: 'Apps',
    description:
      'Aplicativos mobile sob medida para levar o seu negócio para o bolso do cliente. Experiência nativa, rápida e integrada com seus sistemas.',
    gradientClass: 'bg-gradient-to-br from-zblue/5 to-zpurple/5',
    iconColor: 'text-zblue',
    iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />',
  },
]

const handleHover = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 25
  const rotateY = (centerX - x) / 25

  gsap.to(card, {
    rotateX,
    rotateY,
    scale: 1.02,
    duration: 0.4,
    ease: 'power2.out',
    transformPerspective: 1000,
  })
}

const resetHover = (e) => {
  gsap.to(e.currentTarget, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.6,
    ease: 'power2.out',
  })
}

onMounted(() => {
  gsap.from('.services-title', {
    scrollTrigger: { trigger: '.services-title', start: 'top 85%' },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.from('.service-card', {
    scrollTrigger: { trigger: '.service-card', start: 'top 85%' },
    opacity: 0,
    y: 60,
    rotateX: 10,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
  })
})
</script>
