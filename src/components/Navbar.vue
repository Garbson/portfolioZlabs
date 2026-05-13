<template>
  <div class="fixed top-4 left-4 right-4 z-50 flex justify-center">
    <nav
      class="w-full max-w-5xl px-6 flex justify-between items-center rounded-2xl transition-all duration-500 border border-white/[0.06]"
      :class="scrolled
        ? 'py-3 bg-white/[0.04] backdrop-blur-2xl border-white/[0.1] shadow-lg shadow-black/20'
        : 'py-4 bg-white/[0.02] backdrop-blur-xl'"
    >
      <a href="#" class="text-2xl font-black tracking-tight text-white">
        Z<span class="text-gradient">labs</span>
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"
        >
          {{ link.label }}
        </a>
        <a
          href="#contato"
          class="glass px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-all duration-300"
        >
          Contato
        </a>
      </div>

      <button
        class="md:hidden flex flex-col gap-1.5 p-2"
        @click="menuOpen = !menuOpen"
      >
        <span
          class="w-6 h-0.5 bg-white transition-all duration-300 origin-center"
          :class="menuOpen ? 'rotate-45 translate-y-2' : ''"
        ></span>
        <span
          class="w-6 h-0.5 bg-white transition-all duration-300"
          :class="menuOpen ? 'opacity-0 scale-0' : ''"
        ></span>
        <span
          class="w-6 h-0.5 bg-white transition-all duration-300 origin-center"
          :class="menuOpen ? '-rotate-45 -translate-y-2' : ''"
        ></span>
      </button>
    </nav>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="menuOpen"
        class="md:hidden absolute top-full mt-2 left-0 right-0 bg-zdark/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl px-6 py-6 flex flex-col gap-4"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-lg font-medium text-gray-300 hover:text-white transition-colors"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </a>
        <a
          href="#contato"
          class="glass text-center px-5 py-3 text-base font-semibold hover:bg-white/10 transition-all"
          @click="menuOpen = false"
        >
          Contato
        </a>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const links = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Sobre', href: '#sobre' },
]

const scrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
