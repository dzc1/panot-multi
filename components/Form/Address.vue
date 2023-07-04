<template>
  <div class="max-w-2xl">
    <span
      class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full mb-8"
      >Address</span
    >
  </div>

  <div class="mb-4 max-w-full">
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
  <div class="flex justify-between mt-8">
    <div>
      <button
        class="border text-black rounded-md px-4 py-2 hover:bg-black hover:text-white"
        @click="prevStep"
      >
        Previous
      </button>
      <button
        class="ml-4 border text-black rounded-md px-4 py-2 hover:bg-black hover:text-white"
        @click="emitCloseUp"
      >
        Close
      </button>
    </div>

    <button
      class="bg-black text-white rounded-md px-4 py-2 hover:border hover:text-black hover:bg-transparent"
      @click="nextStep"
    >
      Next
    </button>
  </div>
</template>

<script setup>
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
