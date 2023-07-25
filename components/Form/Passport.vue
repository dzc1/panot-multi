<template>
  <div class="flex justify-between mb-4 md:mb-8 items-center">
    <div class="flex justify-center w-full">
      <span
        class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full"
        >passport or id number</span
      >
    </div>
    <span @click="emitCloseUp">
      <XCircleIcon class="h-8 w-8 text-black"
    /></span>
  </div>

  <div class="mb-6 w-[40vh]">
    <label
      class="block mb-1.5 text-sm text-gray-900 font-semibold"
      for="passport"
      >Passport or ID number</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.passportNumber"
      type="text"
      placeholder="1234567890"
      id="passport"
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
  "update:passportNumber",
]);
const formSteps = reactive({
  passportNumber: "",
});

const isFullNameFilled = computed(() => {
  return formSteps.passportNumber === "";
});

watch(formSteps, (newFormSteps) => {
  emits("update:passportNumber", newFormSteps.passportNumber);
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
