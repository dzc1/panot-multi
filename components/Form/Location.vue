<template>
  <div class="mx-auto text-center">
    <span
      class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full mb-4 md:mb-8"
      >location</span
    >
  </div>
  <div class="flex flex-wrap justify-center -mx-4">
    <div class="w-full md:w-1/2 lg:w-auto px-4 xl:px-10 mb-4 md:mb-8">
      <div
        class="max-w-sm mx-auto h-full py-6 px-6 bg-white border border-gray-200 rounded-lg"
      >
        <div class="max-w-2xs mx-auto text-center">
          <h5 class="text-2xl font-montserrat text-gray-900">
            Sotogrande, Spain
          </h5>
          <p class="text-black font-monserrat h-24">
            Explore Sotogrande's hidden gems and iconic landmarks with Panot on
            two wheels, creating memories that will last a lifetime.
          </p>
          <button
            @click="selectCity('Sotogrande')"
            class="bg-black text-white w-4/6 rounded-lg p-3 mt-6"
          >
            Sotogrande
          </button>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 lg:w-auto px-4 xl:px-10 mb-4 md:mb-8">
      <div
        class="max-w-sm mx-auto h-full py-6 px-6 bg-white border border-gray-200 rounded-lg"
      >
        <div class="max-w-2xs mx-auto text-center">
          <h5 class="text-2xl font-montserrat text-gray-900 mb-3">
            Fuerteventura, Spain
          </h5>
          <p class="text-black font-monserrat h-24">
            Immerse yourself in Fuerteventura's unique culture and natural
            wonders with Panot as you pedal through stunning nature reserves.
          </p>
          <button
            @click="selectCity('Fuerteventura')"
            class="bg-black text-white w-4/6 rounded-lg p-3 mt-6"
          >
            Fuerteventura
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full flex justify-center">
    <button
      @click="emitCloseUp"
      class="w-full md:w-1/2 border text-black rounded-md px-4 py-2 hover:bg-black hover:text-white"
    >
      Close
    </button>
  </div>
</template>

<script setup>
let emits = defineEmits(["emitChildCity", "emitChildClose"]);

const selectCity = (city) => {
  emits("emitChildCity", city);
};

let emitCloseUp = () => {
  emits("emitChildClose");
};
</script>

<style scoped></style>
