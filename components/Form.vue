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
      <Summary
        :formSteps="formSteps"
        @signatureCaptured="submitForm"
        @payButton="testPayment"
      />
    </template>
  </div>

  <!-- <div>
    <h1>Summary of Form</h1>
  </div> -->
</template>

<script setup>
import { loadStripe } from "@stripe/stripe-js";
import { useRuntimeConfig } from "nuxt/app";
import { ref, reactive } from "vue";
import { exportToPDF } from "#imports";
import { jsPDF } from "jspdf";
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
      {
        id: 1,
        name: "½ day (4 hours) for 30€",
        timeFrame: "½ day",
        paymentLink: "https://pay.panotmobility.com/b/6oEg1i8GOfL5cQE9B3",
      },
      {
        id: 2,
        name: "1 day (8 hours) for €40",
        timeFrame: "1 day",
        paymentLink: "https://pay.panotmobility.com/b/bIY8yQ5uC7ezaIw6oQ",
      },
      {
        id: 3,
        name: "7 days (20% off) for €32/day",
        timeFrame: "7 days",
        paymentLink: "https://pay.panotmobility.com/b/bIY16o0aifL517WaF5",
      },
      {
        id: 4,
        name: "14 days or more (30% off) for €28/day",
        timeFrame: "14 days",
        paymentLink: "https://pay.panotmobility.com/b/dR67uM6yGeH1aIwdRg",
      },
    ],
    Fuerteventura: [
      {
        id: 1,
        name: "½ day (4 hours) for 24€",
        timeFrame: "½ day",
        paymentLink: "https://pay.panotmobility.com/b/28o9CU8GO0Qb17W6oK",
      },
      {
        id: 2,
        name: "1 day (8 hours) for €29",
        timeFrame: "1 day",
        paymentLink: "https://pay.panotmobility.com/b/8wM3ew0aicyTeYMcN9",
      },
      {
        id: 3,
        name: "7 days (20% off) for €23/day",
        timeFrame: "7 days",
        paymentLink: "https://pay.panotmobility.com/b/eVa6qI0ai0QbdUI5kI",
      },
      {
        id: 4,
        name: "14 days or more (30% off) for €20/day",
        timeFrame: "14 days",
        paymentLink: "https://pay.panotmobility.com/b/aEUdTa8GOdCX4k87sR",
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

const testPayment = () => {
  const selectedCity = formSteps.selectedCity;
  const selectedBikeId = formSteps.selectedBike.id;
  console.log(selectedBikeId);

  // Check if a bike is selected
  if (selectedBikeId) {
    // Find the corresponding payment link based on the selected city and bike ID
    const bikeOptions = formSteps.bikeOptions[selectedCity];
    console.log(bikeOptions);
    const bike = bikeOptions.find((option) => option.id === selectedBikeId);
    console.log(bike);

    // Check if a matching bike is found
    if (bike) {
      // Open the payment link in a new tab or window
      window.open(bike.paymentLink, "_blank");
    }
  }
};

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

const emits = defineEmits("closeFunction");

let emitCloseUp = () => {
  emits("closeFunction");
};

let date = ref(new Date().toISOString().slice(0, 10));

const submitForm = async (signature) => {
  const formStepsData = { ...formSteps };
  let formSignature = (formSteps.signature = signature);

  // remove white space
  function removeWhiteSpace(str) {
    return str.replace(/\s/g, "-");
  }

  // Create a new instance of jsPDF
  const doc = new jsPDF();

  // Set the font size and type
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  // Add content to the document
  doc.text("Panot Mobility Rental Form", 105, 10, null, null, "center");
  doc.text(
    `
  I, ${formStepsData.fullName}, of legal age, residing at ${formStepsData.address.address.address}, ${formStepsData.address.address.city} ${formStepsData.address.address.state}, ${formStepsData.address.address.country} ${formStepsData.address.address.postalCode}.
  With ID/Passport Number ${formStepsData.passportNumber}, contact telephone number ${formStepsData.phoneContact}
  and email address  ${formStepsData.email}.

  I Declare

  I. That I take responsibility for the eBike PANOT and the accompanying accessories
  (basket and mobile holder) from the moment of delivery until its return.

  II. That I commit to using it with due diligence, in accordance with its intended characteristics
  and use (urban) and complying with traffic regulations, being obligated to compensate PANOT,
  the establishment, and/or third parties who provided the eBike to the establishment for any
  damages that may arise from my failure to comply with such obligations.

  III. - That I have confirmed the condition of the eBike prior to signing
  this document and that it is in perfect aesthetic and technical condition, having verified
  its proper functioning.

  IV. That I declare that I am aware that the eBike can only
  be used by the person designated for that purpose by the establishment.

  V. - That I declare that I am aware that the risk associated with
  the use of the eBike is not covered by any insurance, and I will
  be solely responsible for any damages or injuries that
  I may suffer or cause to third parties during its use, releasing
  the establishment, PANOT, and third parties who provided
  the eBike to the establishment from any liability in this regard.

  VI. - That I declare that I am aware of the obligation
  to return the eBike (and accessories) in the same condition in
  which it was delivered to me, and that damages, loss, or theft
  of the eBike are not covered by any insurance. I commit
  to assuming the costs of its repair in case of return
  in poor condition, and the full price of the bike in
  case of return in unserviceable conditions or non-return.

  VII. - That I declare that I am aware that the
  eBike is equipped with a GPS mobile system,
  which I authorize so that PANOT can locate
  it in case of loss or theft.

  `,
    20,
    20
  );

  doc.addImage(formSignature, "png", 20, 220, 50, 50);
  doc.text(
    `Signed by ${formStepsData.fullName} on ${formStepsData.selectedCity}, Spain on the date of ${date.value}.`,
    20,
    250
  );

  // Save the PDF document
  doc.save(
    `panot-rental-form-${removeWhiteSpace(formStepsData.fullName)}${
      date.value
    }.pdf`
  );
};
</script>
