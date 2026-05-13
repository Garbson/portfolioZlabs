<template>
  <section class="relative min-h-[75vh] sm:min-h-screen flex items-start sm:items-center justify-center overflow-hidden px-6 pt-32 sm:pt-0">
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
})
</script>
