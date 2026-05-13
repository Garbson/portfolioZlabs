<template>
  <div class="app-container relative">
    <BigBangLoader />
    <SpaceBackground />
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
import BigBangLoader from './components/BigBangLoader.vue'
import SpaceBackground from './components/SpaceBackground.vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>
