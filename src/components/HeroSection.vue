<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16">
    <!-- Floating Glass Artifacts (Parallax) -->
    <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div 
        class="artifact absolute top-[20%] left-[15%] w-32 h-32 glass rounded-2xl rotate-12 blur-[1px] opacity-20 hidden md:block"
        data-speed="0.02"
      ></div>
      <div 
        class="artifact absolute bottom-[30%] right-[10%] w-48 h-48 border border-white/10 rounded-full blur-[2px] opacity-10 hidden md:block"
        data-speed="-0.03"
      >
        <div class="absolute inset-4 border border-white/5 rounded-full animate-pulse"></div>
      </div>
      <div 
        class="artifact absolute top-[60%] left-[10%] w-16 h-16 glass rounded-full blur-[1px] opacity-15 hidden md:block"
        data-speed="0.05"
      ></div>
    </div>

    <div class="relative z-10 text-center max-w-4xl hero-content" style="opacity: 0; transform: translateY(40px)">
      <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
        Sua empresa merece uma
        <span class="text-gradient"> presença digital</span>
        que gera resultado.
      </h1>
      <p class="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        A Zlabs cria sites e sistemas para empresas que querem crescer de verdade
        e gerenciar melhor o seu negócio — com qualidade, prazo e sem enrolação.
      </p>
      <a
        href="https://wa.me/5527999705214"
        target="_blank"
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
      <div class="mt-12 flex flex-col items-center gap-2 opacity-30 animate-pulse cursor-default pointer-events-none">
        <span class="text-[10px] uppercase tracking-[0.4em] font-medium">Deslize para explorar</span>
        <div class="w-px h-16 bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.to('.hero-content', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power4.out',
    delay: 0.3,
  })

  // Parallax Logic
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    
    gsap.to('.artifact', {
      x: (i, target) => (clientX - centerX) * target.dataset.speed * 50,
      y: (i, target) => (clientY - centerY) * target.dataset.speed * 50,
      rotate: (i, target) => (clientX - centerX) * target.dataset.speed * 0.5,
      duration: 1,
      ease: 'power2.out'
    })
  })
})
</script>
