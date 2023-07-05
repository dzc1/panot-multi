// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@sidebase/nuxt-pdf",
    // "nuxt-stripe-module",
  ],
  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PUBLISHABLE_KEY,
      appUrl: "http://localhost:3000",
    },
  },
  googleFonts: {
    families: {
      Monserrat: [100, 300, 400, 700],
    },
  },
});
