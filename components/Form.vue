<template>
  <div>
    <template v-if="formSteps.step === 1">
      <button @click="nextStep">Start Form</button>
    </template>
    <!-- Step 2 -->
    <template v-else-if="formSteps.step === 2">
      <Location @emitChildCity="selectCity" @emitChildClose="emitCloseUp" />
    </template>
    <!-- Step 3 -->
    <template v-else-if="formSteps.step === 3">
      <Days
        :formSteps="formSteps"
        @currentBikeEmit="selectBike"
        @prevStep="prevStep"
        @closeUp="emitCloseUp"
        @nextStep="nextStep"
      />
    </template>
    <!-- Step 4 -->
    <template v-else-if="formSteps.step === 4">
      <Name
        v-model:fullName="formSteps.fullName"
        @prevStep="prevStep"
        @closeUp="emitCloseUp"
        @nextStep="nextStep"
      />
    </template>
    <!-- Step 5 -->
    <template v-else-if="formSteps.step === 5">
      <Address
        v-model:address="formSteps.address"
        @prevStep="prevStep"
        @closeUp="emitCloseUp"
        @nextStep="nextStep"
      />
    </template>
    <!-- Step 6 -->
    <template v-else-if="formSteps.step === 6">
      <Passport
        v-model:passportNumber="formSteps.passportNumber"
        @prevStep="prevStep"
        @closeUp="emitCloseUp"
        @nextStep="nextStep"
      />
    </template>
    <!-- Step 7 -->
    <template v-else-if="formSteps.step === 7">
      <Phone
        v-model:phoneContact="formSteps.phoneContact"
        @prevStep="prevStep"
        @closeUp="emitCloseUp"
        @nextStep="nextStep"
      />
    </template>
    <!-- Step 8 -->
    <template v-else-if="formSteps.step === 8">
      <Email
        v-model:email="formSteps.email"
        @prevStep="prevStep"
        @closeUp="emitCloseUp"
        @nextStep="nextStep"
      />
    </template>
    <!-- Step 9 -->
    <template v-else-if="formSteps.step === 9">
      <Summary :formSteps="formSteps" @signatureCaptured="submitForm" />
    </template>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { exportToPDF } from "#imports";
import Location from "../components/Form/Location.vue";
import Days from "../components/Form/Days.vue";
import Name from "../components/Form/Name.vue";
import Address from "../components/Form/Address.vue";
import Passport from "../components/Form/Passport.vue";
import Phone from "../components/Form/Phone.vue";
import Email from "../components/Form/Email.vue";
import Summary from "../components/Form/Summary.vue";

let formSteps = reactive({
  step: 2,
  selectedCity: "",
  selectedBike: null,
  bikeOptions: {
    Sotogrande: [
      { id: 1, name: "½ day (4 hours) for 30€", timeFrame: "½ day" },
      { id: 2, name: "1 day (8 hours) for €40", timeFrame: "1 day" },
      { id: 3, name: "7 days (20% off) for €32/day", timeFrame: "7 days" },
      {
        id: 4,
        name: "14 days or more (30% off) for €28/day",
        timeFrame: "14 days",
      },
    ],
    Fuerteventura: [
      { id: 1, name: "½ day (4 hours) for 24€", timeFrame: "½ day" },
      { id: 2, name: "1 day (8 hours) for €29", timeFrame: "1 day" },
      { id: 3, name: "7 days (20% off) for €23/day", timeFrame: "7 days" },
      {
        id: 4,
        name: "14 days or more (30% off) for €20/day",
        timeFrame: "14 days",
      },
    ],
  },
  fullName: "",
  address: {
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },
  passportNumber: "",
  email: "",
  signature: null,
  phoneContact: "",
});

const nextStep = () => {
  formSteps.step++;
};

const prevStep = () => {
  formSteps.step--;
};

const selectCity = (city) => {
  formSteps.selectedCity = city;
  nextStep();
};

const selectBike = (bike) => {
  formSteps.selectedBike = bike;
  nextStep();
};

let date = ref(new Date().toISOString().slice(0, 10));

const emits = defineEmits("closeFunction");

let emitCloseUp = () => {
  emits("closeFunction");
};

const submitForm = (signature) => {
  console.log(signature);
  let formSignature = (formSteps.signature = signature);
  const {
    fullName,
    selectedCity,
    selectedBike,
    address,
    passportNumber,
    phoneContact,
  } = formSteps;

  // Pass the captured signature data to the exportToPDF function
  const documentOptions = {
    // Options for PDF generation...
    signatureData: formSignature,
    name: fullName,
    city: selectedCity,
    bikeOption: selectedBike.name,
    address: address.address,
    phone: phoneContact,
    passport: passportNumber,
  };
  // Remove whitespace form name variable
  let removeWhiteSpace = (str) => str.replace(/\s/g, "-");

  console.log(documentOptions);

  // exportToPDF(
  //   `${removeWhiteSpace(fullName)}${date.value}-rental-form.pdf`,
  //   pdfSectionElement,
  //   documentOptions
  // );
};
</script>
