// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@sidebase/nuxt-pdf",
  ],
  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK_KEY,
    },
  },
  googleFonts: {
    families: {
      Monserrat: [100, 300, 400, 700],
    },
  },
  app: {
    head: {
      script: [{ src: "https://js.stripe.com/v3/", defer: true }],
    },
  },
});
