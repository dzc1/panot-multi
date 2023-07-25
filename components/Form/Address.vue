<template>
  <div class="flex justify-between mb-4 md:mb-8 items-center w-[40vh]">
    <div class="flex justify-center w-full">
      <span
        class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full"
        >Address</span
      >
    </div>
    <span @click="emitCloseUp">
      <XCircleIcon class="h-8 w-8 text-black"
    /></span>
  </div>

  <div class="mb-4">
    <label
      class="block mb-1.5 text-sm text-gray-900 font-semibold"
      for="address"
      >Address</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.address.address"
      type="text"
      placeholder="123 Sagrada Familia Rd"
      id="address"
    />
  </div>
  <div class="mb-4">
    <label class="block mb-1.5 text-sm text-gray-900 font-semibold" for="city"
      >City</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.address.city"
      type="text"
      placeholder="Barcelona"
      id="city"
    />
  </div>
  <div class="mb-4">
    <label class="block mb-1.5 text-sm text-gray-900 font-semibold" for="state"
      >State</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.address.state"
      type="text"
      placeholder="Catalonia"
      id="state"
    />
  </div>
  <div class="mb-4">
    <label
      class="block mb-1.5 text-sm text-gray-900 font-semibold"
      for="country"
      >Country</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.address.country"
      type="text"
      placeholder="Spain"
      id="country"
    />
  </div>
  <div class="mb-4">
    <label class="block mb-1.5 text-sm text-gray-900 font-semibold" for="zip"
      >Postal Code</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.address.postalCode"
      type="text"
      placeholder="08011"
      id="zip"
    />
  </div>
  <div class="">
    <button
      class="w-full rounded-md px-4 py-2 mb-4"
      :class="
        isFullNameFilled ? 'bg-gray-200 text-gray-300' : 'bg-black text-white'
      "
      @click="nextStep"
      :disabled="isFullNameFilled"
    >
      Next
    </button>
    <button
      class="w-full border text-black rounded-md px-4 py-2 hover:bg-black hover:text-white"
      @click="prevStep"
    >
      Previous
    </button>
  </div>
</template>

<script setup>
import { XCircleIcon } from "@heroicons/vue/24/solid";
let emits = defineEmits([
  "prevStep",
  "closeUp",
  "nextStep",
  "update:address",
  "",
]);
const formSteps = reactive({
  address: {
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },
});

const isFullNameFilled = computed(() => {
  return formSteps.address.postalCode === "";
});

watch(formSteps, (newAddress) => {
  emits("update:address", newAddress);
});

const prevStep = () => {
  emits("prevStep");
};

const emitCloseUp = () => {
  emits("closeUp");
};

const nextStep = () => {
  emits("nextStep");
};
</script>

<style scoped></style>
