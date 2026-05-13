<template>
  <section id="trabalhos" class="py-24 md:py-32 px-6 relative">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">
      <div class="text-center mb-16 portfolio-title">
        <p class="text-sm font-semibold text-zpurple uppercase tracking-widest mb-4">Portfólio</p>
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Nossos Trabalhos</h2>
        <p class="text-gray-400 max-w-lg mx-auto">Projetos que entregam valor real.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="perspective-1000 portfolio-card"
          @mousemove="handleHover($event)"
          @mouseleave="resetHover($event)"
        >
          <div class="glass-card p-6 h-full flex flex-col preserve-3d cursor-default group">
            <div
              class="h-48 rounded-xl mb-6 overflow-hidden relative flex items-center justify-center"
              :class="project.gradient"
            >
              <div class="absolute inset-0 bg-white/[0.03]"></div>
              <span class="text-xs font-bold uppercase tracking-[0.2em] relative z-10" :class="project.tagColor">
                {{ project.category }}
              </span>
            </div>

            <div class="flex-1 flex flex-col">
              <h4 class="text-xl font-bold mb-2 group-hover:text-white transition-colors">{{ project.title }}</h4>
              <p class="text-sm text-gray-400 leading-relaxed flex-1">{{ project.description }}</p>

              <div class="mt-6 flex items-center justify-between">
                <div class="flex gap-2">
                  <span
                    v-for="tech in project.techs"
                    :key="tech"
                    class="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-gray-400"
                  >
                    {{ tech }}
                  </span>
                </div>
                <div class="w-8 h-8 rounded-full glass flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
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

const projects = [
  {
    title: 'E-commerce Next-Gen',
    category: 'Sistema',
    description: 'Plataforma de vendas com gestão de estoque em tempo real e relatórios inteligentes.',
    gradient: 'bg-gradient-to-br from-zblue/10 to-zpurple/5',
    tagColor: 'text-zblue',
    techs: ['Vue', 'Node', 'AWS'],
  },
  {
    title: 'Portal Clínica Vida',
    category: 'Site',
    description: 'Landing page focada em conversão para clínica de alta performance com agendamento online.',
    gradient: 'bg-gradient-to-br from-zpurple/10 to-zblue/5',
    tagColor: 'text-zpurple',
    techs: ['React', 'Tailwind'],
  },
  {
    title: 'Fintech Dashboard',
    category: 'Sistema',
    description: 'Painel administrativo para controle financeiro e auditoria automatizada de transações.',
    gradient: 'bg-gradient-to-br from-zblue/10 to-emerald-500/5',
    tagColor: 'text-zblue',
    techs: ['Vue', 'Python', 'GCP'],
  },
  {
    title: 'Imobiliária Digital',
    category: 'Site',
    description: 'Site institucional com catálogo de imóveis, filtros avançados e integração com CRM.',
    gradient: 'bg-gradient-to-br from-zpurple/10 to-rose-500/5',
    tagColor: 'text-zpurple',
    techs: ['Next.js', 'Prisma'],
  },
  {
    title: 'ERP Logístico',
    category: 'Sistema',
    description: 'Sistema de gestão logística com rastreamento em tempo real e otimização de rotas.',
    gradient: 'bg-gradient-to-br from-emerald-500/10 to-zblue/5',
    tagColor: 'text-zblue',
    techs: ['React', 'Go', 'AWS'],
  },
  {
    title: 'Studio Criativo',
    category: 'Site',
    description: 'Portfólio digital interativo para estúdio de design com animações 3D e galeria.',
    gradient: 'bg-gradient-to-br from-rose-500/10 to-zpurple/5',
    tagColor: 'text-zpurple',
    techs: ['Vue', 'Three.js'],
  },
]

const handleHover = (e) => {
  const wrapper = e.currentTarget
  const card = wrapper.firstElementChild
  const rect = wrapper.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 15
  const rotateY = (centerX - x) / 15

  gsap.to(card, {
    rotateX,
    rotateY,
    scale: 1.03,
    z: 30,
    duration: 0.3,
    ease: 'power2.out',
    transformPerspective: 1000,
    boxShadow: '0 25px 60px rgba(0, 210, 255, 0.08)',
  })
}

const resetHover = (e) => {
  const card = e.currentTarget.firstElementChild
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    z: 0,
    duration: 0.5,
    ease: 'power2.out',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
  })
}

onMounted(() => {
  gsap.from('.portfolio-title', {
    scrollTrigger: { trigger: '.portfolio-title', start: 'top 85%' },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.from('.portfolio-card', {
    scrollTrigger: { trigger: '.portfolio-card', start: 'top 90%' },
    opacity: 0,
    y: 80,
    rotateX: 15,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
  })
})
</script>
