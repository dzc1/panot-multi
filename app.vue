<template>
  <section>
    <img class="bg-img" src="./assets/imgs/bg-2.jpg" alt="" />
    <div class="content-outer-container">
      <div class="content-inner-container">
        <h1 class="font-montserrat">
          Rent a Bike with
          <span
            ><img
              class="inline"
              src="./assets/imgs/panot-black-logo.webp"
              alt=""
            />
          </span>
        </h1>
        <p class="font-monserrat">
          Explore your surroundings with ease by renting a bike from Panot, the
          premier bike rental service exclusively for hotels. Whether you're
          looking to explore the local attractions, enjoy a leisurely ride along
          the beach, or simply commute to nearby destinations, our high-quality
          bikes are here to make your stay more memorable.
        </p>
        <button @click="overlayFunc">Get Started</button>
      </div>
    </div>
    <!-- Overlay Section -->

    <div v-if="showOverlay" class="overlay">
      <div class="container mx-auto p-4">
        <div
          :class="['overlay-content', { 'animate-slide-in': animateOverlay }]"
        >
          <Form @closeFunction="overlayFunc" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { exportToPDF } from "#imports";
const showOverlay = ref(false);
const animateOverlay = ref(false);
const overlayFunc = () => {
  showOverlay.value = !showOverlay.value;
  animateOverlay.value = !animateOverlay.value;
};
</script>

<style>
section {
  @apply h-screen relative py-20 md:py-36 overflow-hidden bg-gray-100;
}

.bg-img {
  @apply absolute top-0 left-0 w-full h-full md:object-top object-cover;
}
.content-outer-container {
  @apply relative container px-4 mx-auto;
}
.content-inner-container {
  @apply max-w-xs sm:max-w-md lg:max-w-xl;
}
.content-inner-container h1 {
  @apply text-4xl sm:text-6xl lg:text-8xl  text-black mb-12;
}
.content-inner-container p {
  @apply max-w-sm lg:max-w-xl mb-12 text-white;
}
.content-inner-container button {
  @apply bg-white text-black hover:bg-transparent hover:border  hover:text-white p-6 py-4 rounded-lg;
}
.overlay {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50;
}

.overlay-content {
  @apply bg-white p-6 rounded-lg;
}
@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-in {
  animation: slide-in 0.5s ease-in-out;
}
</style>
