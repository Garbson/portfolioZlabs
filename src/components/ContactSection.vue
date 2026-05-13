<template>
  <section id="contato" class="py-24 md:py-32 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="glass-card p-10 md:p-20 relative overflow-hidden text-center contact-card">
        <div class="absolute inset-0 bg-gradient-to-br from-zblue/5 via-transparent to-zpurple/5"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-zblue/5 blur-[100px] rounded-full"></div>

        <div class="relative z-10">
          <p class="text-sm font-semibold text-zblue uppercase tracking-widest mb-6">Contato</p>
          <h2 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Vamos tirar sua ideia <br class="hidden sm:block" />
            <span class="text-gradient">do papel?</span>
          </h2>
          <p class="text-lg md:text-xl text-gray-400 mb-12 max-w-xl mx-auto">
            Estamos prontos para transformar sua visão em um produto digital de alta performance.
          </p>

          <a
            href="https://wa.me/5527999705214"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 glass-strong px-10 py-5 text-lg font-bold hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            <svg class="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
            <svg
              class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <footer class="mt-20 pt-8 border-t border-white/5 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>&copy; {{ new Date().getFullYear() }} Zlabs. Todos os direitos reservados.</div>
        <div class="flex gap-8">
          <a href="#" class="hover:text-white transition-colors duration-300">Termos</a>
          <a href="#" class="hover:text-white transition-colors duration-300">Privacidade</a>
        </div>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.from('.contact-card', {
    scrollTrigger: { trigger: '.contact-card', start: 'top 85%' },
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 1.2,
    ease: 'power3.out',
  })
})
</script>
