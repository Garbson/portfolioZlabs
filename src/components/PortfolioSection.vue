<template>
  <section id="trabalhos" class="py-24 md:py-32 px-6 relative">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">
      <div class="text-center mb-16 portfolio-title">
        <p class="text-sm font-semibold text-zpurple uppercase tracking-widest mb-4">Portfólio</p>
        <h2 class="text-4xl md:text-5xl font-bold mb-8">Nossos Trabalhos</h2>
        
        <!-- Filter Tabs -->
        <div class="flex justify-center gap-4 mb-12">
          <button
            v-for="filter in ['Todos', 'Sites', 'Sistemas']"
            :key="filter"
            @click="activeFilter = filter"
            class="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border"
            :class="activeFilter === filter 
              ? 'bg-zblue/10 border-zblue/30 text-white shadow-lg shadow-zblue/10' 
              : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'"
          >
            {{ filter }}
          </button>
        </div>
        
        <p class="text-gray-400 max-w-lg mx-auto">Projetos que entregam valor real.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <TransitionGroup
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in absolute"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <component
            :is="project.type === 'Sistemas' ? 'div' : 'a'"
            v-for="(project, index) in filteredProjects"
            :key="project.title"
            :href="project.type === 'Sistemas' ? undefined : (project.url || '#')"
            :target="project.type === 'Sistemas' ? undefined : (project.url ? '_blank' : '_self')"
            class="perspective-1000 portfolio-card block"
            :class="project.type === 'Sistemas' ? 'cursor-default' : 'cursor-pointer'"
            @mousemove="project.type !== 'Sistemas' && handleHover($event)"
            @mouseleave="project.type !== 'Sistemas' && resetHover($event)"
          >
            <div class="glass-card p-6 h-full flex flex-col preserve-3d group">
              <div
                class="h-48 rounded-xl mb-6 overflow-hidden relative flex items-center justify-center"
                :class="!project.image ? project.gradient : ''"
              >
                <img
                  v-if="project.image"
                  :src="project.image"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt=""
                />
                <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
              </div>

              <div class="flex-1 flex flex-col">
                <h4 class="text-xl font-bold mb-2 transition-colors" :class="project.type !== 'Sistemas' ? 'group-hover:text-white' : ''">{{ project.title }}</h4>
                <p class="text-sm text-gray-400 leading-relaxed flex-1">{{ project.description }}</p>

                <div class="mt-6 flex items-center justify-between">
                  <div class="flex gap-2">
                    <span v-if="project.type === 'Sistemas'" class="text-[10px] font-bold uppercase tracking-wider text-zpurple/60 border border-zpurple/20 px-2 py-1 rounded">
                      Sistema Privado
                    </span>
                  </div>
                  <div v-if="project.type !== 'Sistemas'" class="w-8 h-8 rounded-full glass flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </component>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const activeFilter = ref('Todos')

const projects = [
  {
    title: "Leo's Barbearia",
    category: 'Site Institucional',
    type: 'Sites',
    description: 'Site sofisticado para rede de barbearias com agendamento online, apresentação de unidades e portfólio de serviços com design atemporal.',
    gradient: 'bg-gradient-to-br from-yellow-600/20 to-green-900/5',
    tagColor: 'text-yellow-500',
    url: 'https://Leosbarbearia.com.br',
    image: '/projects/leosbarbearia.jpg',
  },
  {
    title: 'Fernando Pegoraro',
    category: 'Portal Imobiliário',
    type: 'Sites',
    description: 'Experiência premium para o mercado imobiliário de Porto Belo, com galeria imersiva e navegação sofisticada.',
    gradient: 'bg-gradient-to-br from-emerald-500/20 to-teal-600/5',
    tagColor: 'text-emerald-400',
    url: 'https://fernandoimoveis.garbsonsouza2602.workers.dev/',
    image: '/projects/fernando.png',
  },
  {
    title: 'Gutthierry Mariano',
    category: 'Landing Page Luxo',
    type: 'Sites',
    description: 'Plataforma de alto padrão para consultoria imobiliária, focada em investimentos de luxo e pré-lançamentos exclusivos.',
    gradient: 'bg-gradient-to-br from-gray-500/20 to-slate-900/5',
    tagColor: 'text-slate-300',
    url: 'https://gutthierryimoveis.com/',
    image: '/projects/gutthierry.png',
  },
  {
    title: 'Garbson Souza',
    category: 'Portfólio Pessoal',
    type: 'Sites',
    description: 'Portfólio interativo com design futurista simulando ambiente de desenvolvimento front-end com visual de console.',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-indigo-600/5',
    tagColor: 'text-blue-400',
    url: 'https://garbson.dev/',
    image: '/projects/garbson.png',
  },
  {
    title: 'GuiaZ',
    category: 'Plataforma Digital',
    type: 'Sites',
    description: 'Guia comercial digital que conecta moradores aos comércios e serviços da cidade, com busca por categoria, atendimento via WhatsApp e um bot inteligente.',
    gradient: 'bg-gradient-to-br from-emerald-500/20 to-green-600/5',
    tagColor: 'text-emerald-400',
    url: 'https://oguiaz.com.br/',
    image: '/projects/guiaz.jpg',
  },
  {
    title: 'Kalo',
    category: 'Aplicativo IA',
    type: 'Sites',
    description: 'Seu app de nutrição com inteligência artificial. Analise refeições por foto, acompanhe metas de água, peso e calorias de forma simples e leve.',
    gradient: 'bg-gradient-to-br from-teal-500/20 to-emerald-600/5',
    tagColor: 'text-teal-400',
    url: 'https://kalo.zlabs.com.br',
    image: '/projects/kalo.jpg',
  },
  {
    title: 'DecoreFácil',
    category: 'Plataforma SaaS',
    type: 'Sites',
    description: 'Plataforma mobile-first para locação de festas com catálogo interativo, orçamentos rápidos e gestão de pedidos via painel administrativo.',
    gradient: 'bg-gradient-to-br from-rose-400/20 to-orange-500/5',
    tagColor: 'text-rose-400',
    url: 'https://festivo.zlabs.com.br',
    image: '/projects/decorefacil.jpg',
  },
  {
    title: 'Universo 360 Graus',
    category: 'Ecossistema Digital',
    type: 'Sites',
    description: 'Gestão completa de planetários itinerantes com multi-tenant, venda de ingressos online, controle financeiro e sorteios interativos em tempo real.',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-blue-600/5',
    tagColor: 'text-indigo-400',
    url: 'https://universo360graus.com.br',
    image: '/projects/universo360.jpg',
  },
  {
    title: 'Barber Credits',
    category: 'Sistema de Gestão',
    type: 'Sistemas',
    description: 'Plataforma completa para barbearias com controle de créditos, agendamento online e automação de marketing via WhatsApp API.',
    gradient: 'bg-gradient-to-br from-slate-700/20 to-slate-900/5',
    tagColor: 'text-slate-400',
    url: '#',
    image: '/projects/barbercredits.jpg',
  },
  {
    title: 'Minha Tesouraria',
    category: 'Ecossistema de RH',
    type: 'Sistemas',
    description: 'Gestão completa de RH multi-escolas com admissão digital, SmartMail com IA e auditoria de processos automatizada.',
    gradient: 'bg-gradient-to-br from-blue-700/20 to-indigo-900/5',
    tagColor: 'text-blue-400',
    url: '#',
    image: '/projects/minhatesouraria.jpg',
  },
  {
    title: 'PizzaGest',
    category: 'SaaS para Gastronomia',
    type: 'Sistemas',
    description: 'Gestão completa para pizzarias com PDV, KDS, app do garçom, delivery integrado e controle de estoque em tempo real.',
    gradient: 'bg-gradient-to-br from-orange-600/20 to-red-900/5',
    tagColor: 'text-orange-400',
    url: '#',
    image: '/projects/pizzagest.jpg',
  },
  {
    title: 'Z-Talk',
    category: 'Comunicação Omnichannel',
    type: 'Sistemas',
    description: 'Central de atendimento multi-agente para WhatsApp com distribuição de chats, métricas em tempo real e controle de acesso granular.',
    gradient: 'bg-gradient-to-br from-indigo-600/20 to-purple-900/5',
    tagColor: 'text-indigo-400',
    url: '#',
    image: '/projects/ztalk.jpg',
  },
  {
    title: 'ZConecta',
    category: 'CRM & Automação',
    type: 'Sistemas',
    description: 'Sistema completo para vendas e atendimento com bot de WhatsApp IA, CRM integrado e gestão de assinaturas recorrentes.',
    gradient: 'bg-gradient-to-br from-blue-600/20 to-blue-900/5',
    tagColor: 'text-blue-400',
    url: '#',
    image: '/projects/zconecta.jpg',
  },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'Todos') return projects
  return projects.filter(p => p.type === activeFilter.value)
})

const handleHover = (e) => {
  const wrapper = e.currentTarget
  const card = wrapper.firstElementChild
  if (!card) return
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
  if (!card) return
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

