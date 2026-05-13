<template>
  <section id="sobre" class="py-24 md:py-32 px-6 overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div class="about-text">
          <p class="text-sm font-semibold text-zblue uppercase tracking-widest mb-4">Sobre</p>
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            Por que a <span class="text-gradient">Zlabs</span>?
          </h2>
          <div class="space-y-5 text-base md:text-lg text-gray-300 leading-relaxed">
            <p>
              Não somos uma agência genérica. Somos uma equipe com experiência em
              projetos reais para empresas em 5 países —
              <span class="text-white font-semibold">Brasil, Grécia, Estados Unidos, Peru e Filipinas.</span>
            </p>
            <p>
              Isso significa que entendemos como negócios funcionam de verdade, e
              sabemos o que um projeto digital precisa ter para gerar resultado —
              não apenas parecer bonito.
            </p>
            <p>
              Cada entrega é feita com o mesmo compromisso que grandes empresas
              exigem: prazo, qualidade e comunicação clara do início ao fim.
              <span class="text-zpurple font-bold">Aqui, o seu projeto é levado a sério.</span>
            </p>
          </div>
        </div>

        <div class="about-stats">
          <div class="glass-card p-10 md:p-12 relative overflow-hidden">
            <div class="absolute -top-20 -right-20 w-60 h-60 bg-zblue/10 blur-[80px] rounded-full"></div>
            <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-zpurple/10 blur-[80px] rounded-full"></div>

            <div class="relative z-10 grid grid-cols-2 gap-8">
              <div class="text-center stat-item">
                <div class="text-5xl font-extrabold text-white mb-2">5</div>
                <div class="text-xs uppercase tracking-[0.2em] text-zblue font-semibold">Países</div>
              </div>
              <div class="text-center stat-item">
                <div class="text-5xl font-extrabold text-white mb-2">+50</div>
                <div class="text-xs uppercase tracking-[0.2em] text-zblue font-semibold">Projetos</div>
              </div>
              <div class="col-span-2 pt-6 border-t border-white/5 text-center stat-item">
                <div class="text-2xl font-bold text-white mb-2">Qualidade Global</div>
                <div class="text-xs uppercase tracking-[0.2em] text-zpurple font-semibold">Padrão de excelência</div>
              </div>
            </div>

            <div class="mt-10 pt-8 border-t border-white/5 relative z-10">
              <div class="flex flex-wrap gap-3 justify-center">
                <span
                  v-for="country in countries"
                  :key="country"
                  class="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-gray-400"
                >
                  {{ country }}
                </span>
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

const countries = ['Brasil', 'Grécia', 'Estados Unidos', 'Peru', 'Filipinas']

onMounted(() => {
  gsap.from('.about-text', {
    scrollTrigger: { trigger: '.about-text', start: 'top 80%' },
    opacity: 0,
    x: -80,
    duration: 1.2,
    ease: 'power3.out',
  })

  gsap.from('.about-stats', {
    scrollTrigger: { trigger: '.about-stats', start: 'top 80%' },
    opacity: 0,
    x: 80,
    duration: 1.2,
    ease: 'power3.out',
  })

  gsap.from('.stat-item', {
    scrollTrigger: { trigger: '.stat-item', start: 'top 85%' },
    opacity: 0,
    y: 30,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.7)',
  })
})
</script>
