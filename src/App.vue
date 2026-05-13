<template>
  <div class="app-container relative">
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-zpurple/[0.03] rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-zblue/[0.03] rounded-full blur-[120px]"></div>
    </div>
    <div class="relative z-10">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>
