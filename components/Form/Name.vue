<template>
  <div class="text-center">
    <span
      class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full mb-8"
      >name</span
    >
  </div>

  <div class="mb-6">
    <div class="max-w-full">
      <label class="block mb-1.5 text-sm text-gray-900 font-semibold" for="name"
        >Full Name</label
      >
      <input
        class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
        v-model="formSteps.fullName"
        type="text"
        placeholder="I.E Michael Scott"
        id="name"
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
  </div>
</template>

<script setup>
let emits = defineEmits(["prevStep", "closeUp", "nextStep", "update:fullName"]);
const formSteps = reactive({
  fullName: "",
});

watch(formSteps, (newFormSteps) => {
  emits("update:fullName", newFormSteps.fullName);
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
