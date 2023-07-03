<template>
  <div>
    <template v-if="formSteps.step === 1">
      <button @click="nextStep">Start Form</button>
    </template>
    <!-- Step 2 -->
    <template v-else-if="formSteps.step === 2">
      <div class="relative container px-4 mx-auto">
        <div class="max-w-2xl mx-auto text-center">
          <span
            class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full mb-4 md:mb-8"
            >choose location</span
          >
        </div>
        <div class="flex flex-wrap justify-center -mx-4">
          <div class="w-full md:w-1/2 lg:w-auto px-4 xl:px-10 mb-10 md:mb-0">
            <div
              class="max-w-sm mx-auto h-full py-8 px-6 bg-white border border-gray-200 rounded-lg"
            >
              <div class="max-w-2xs mx-auto text-center">
                <h5 class="text-2xl font-montserrat text-gray-900 mb-3">
                  Sotogrande, Spain
                </h5>
                <p class="text-black font-monserrat mb-4">
                  Explore Sotogrande's hidden gems and iconic landmarks with
                  Panot on two wheels, creating memories that will last a
                  lifetime.
                </p>
                <button
                  @click="selectCity('Sotogrande')"
                  class="bg-black text-white w-4/6 rounded-lg p-3"
                >
                  Select Sotogrande
                </button>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-auto px-4 xl:px-10">
            <div
              class="max-w-sm mx-auto h-full py-8 px-6 bg-white border border-gray-200 rounded-lg"
            >
              <div class="max-w-2xs mx-auto text-center">
                <h5 class="text-2xl font-montserrat text-gray-900 mb-3">
                  Fuerteventura, Spain
                </h5>
                <p class="text-black font-monserrat mb-4">
                  Immerse yourself in Fuerteventura's unique culture and natural
                  wonders with Panot as you pedal through stunning nature
                  reserves.
                </p>
                <button
                  @click="selectCity('Fuerteventura')"
                  class="bg-black text-white w-4/6 rounded-lg p-3"
                >
                  Select Fuerteventura
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- Step 3 -->
    <template v-else-if="formSteps.step === 3">
      <div class="relative container px-4 mx-auto">
        <div class="max-w-2xl mx-auto text-center">
          <span
            class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full mb-4 md:mb-8"
            >choose days</span
          >
        </div>
        <div class="flex flex-wrap justify-center -mx-4">
          <div
            v-for="bike in getCurrentBikeOptions()"
            :key="bike.id"
            class="w-full md:w-1/4 px-2 xl:px-10 md:mb-10 mb-4"
          >
            <div
              class="max-w-full mx-auto h-full py-4 md:py-8 bg-white border border-gray-200 rounded-lg"
            >
              <div class="mx-auto text-center">
                <h5 class="text-2xl font-montserrat text-gray-900 mb-3">
                  {{ bike.timeFrame }}
                </h5>
                <p class="text-black font-monserrat mb-4 md:mb-8">
                  {{ bike.name }}
                </p>
                <button
                  @click="selectBike(bike)"
                  class="bg-black text-white w-4/6 rounded-lg p-2 md:p-3"
                >
                  {{ bike.timeFrame }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <button @click="prevStep">Previous</button>
      <button @click="nextStep">Next</button> -->
    </template>
    <!-- Step 4 -->
    <template v-else-if="formSteps.step === 4">
      <div class="relative container px-4 mx-auto">
        <div class="max-w-2xl mx-auto text-center">
          <span
            class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full mb-8"
            >name</span
          >
        </div>

        <div class="mb-6">
          <label class="block mb-1.5 text-sm text-gray-900 font-semibold" for=""
            >FullName</label
          >
          <input
            class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
            v-model="formSteps.fullName"
            type="text"
            placeholder="I.E Michael Scott"
          />
        </div>
      </div>
      <button @click="prevStep">Previous</button>
      <button @click="nextStep">Next</button>
    </template>
    <!-- Step 5 -->
    <template v-else-if="formSteps.step === 5">
      <div class="relative container px-4 mx-auto">
        <div class="max-w-2xl mx-auto text-center">
          <span
            class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full mb-8"
            >Address</span
          >
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
          <label
            class="block mb-1.5 text-sm text-gray-900 font-semibold"
            for="city"
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
          <label
            class="block mb-1.5 text-sm text-gray-900 font-semibold"
            for="state"
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
          <label
            class="block mb-1.5 text-sm text-gray-900 font-semibold"
            for="zip"
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
      </div>
      <button @click="prevStep">Previous</button>
      <button @click="nextStep">Next</button>
    </template>
    <!-- Step 6 -->
    <template v-else-if="formSteps.step === 6">
      <div class="relative container px-4 mx-auto">
        <div class="max-w-2xl mx-auto text-center">
          <span
            class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full mb-8"
            >passport or id number</span
          >
        </div>

        <div class="mb-6">
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
      </div>

      <button @click="prevStep">Previous</button>
      <button @click="nextStep">Next</button>
    </template>
    <!-- Step 7 -->
    <template v-else-if="formSteps.step === 7">
      <div class="relative container px-4 mx-auto">
        <div class="max-w-2xl mx-auto text-center">
          <span
            class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full mb-8"
            >Phone Number</span
          >
        </div>

        <div class="mb-6">
          <label
            class="block mb-1.5 text-sm text-gray-900 font-semibold"
            for="phone"
            >Phone Number</label
          >
          <input
            class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
            v-model="formSteps.phoneContact"
            type="text"
            placeholder="+34 622 244 532"
            id="phone"
          />
        </div>
      </div>
      <button @click="prevStep">Previous</button>
      <button @click="nextStep">Next</button>
    </template>
    <!-- Step 8 -->
    <template v-else-if="formSteps.step === 8">
      <div class="relative container px-4 mx-auto">
        <div class="max-w-2xl mx-auto text-center">
          <span
            class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full mb-8"
            >email</span
          >
        </div>

        <div class="mb-6">
          <label
            class="block mb-1.5 text-sm text-gray-900 font-semibold"
            for="email"
            >Email</label
          >
          <input
            class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
            v-model="formSteps.email"
            type="email"
            placeholder="carlos@panotmobility.com"
            id="email"
          />
        </div>
      </div>
      <button @click="prevStep">Previous</button>
      <button @click="nextStep">Next</button>
    </template>
    <!-- Step 9 -->
    <template v-else-if="formSteps.step === 9">
      <div class="overflow-y-auto h-screen py-8">
        <div class="text-center">
          <span
            class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-black bg-gray-50 rounded-full"
            >Summary</span
          >
          <h2 class="font-monserrat text-2xl font-semibold text-gray-800">
            Form Summary
          </h2>
          <div class="py-2">
            <p class="text-sm font-monserrat text-gray-900 mb-2">
              City:
              <span class="font-semibold">{{ formSteps.selectedCity }}</span>
            </p>
            <p class="text-sm font-monserrat text-gray-900 mb-2">
              Days:
              <span class="font-semibold">{{
                formSteps.selectedBike.name
              }}</span>
            </p>
            <p class="text-sm font-monserrat text-gray-900 mb-2">
              Name: <span class="font-semibold">{{ formSteps.fullName }}</span>
            </p>
            <p class="text-sm font-monserrat text-gray-900 mb-2">
              Email: <span class="font-semibold">{{ formSteps.email }}</span>
            </p>
            <p class="text-sm font-monserrat text-gray-900 mb-2">
              Passport or ID Number:
              <span class="font-semibold">{{ formSteps.passportNumber }}</span>
            </p>
            <p class="text-sm font-monserrat text-gray-900 mb-2">
              Phone Number:
              <span class="font-semibold">{{ formSteps.phoneContact }}</span>
            </p>
            <p class="text-sm font-monserrat text-gray-900 mb-2">
              Address:
              <span class="font-semibold"
                >{{ formSteps.address.address }}, {{ formSteps.address.city }},
                {{ formSteps.address.state }}, {{ formSteps.address.country }},
                {{ formSteps.address.postalCode }}</span
              >
            </p>
          </div>
          <div class="text-left">
            <p class="text-sm font-semibold text-gray-900 mb-5">I Declare:</p>
            <p class="text-md font-montserrat font-light mb-2">
              I. That I take responsibility for the eBike PANOT and the
              accompanying accessories (basket and mobile holder) from the
              moment of delivery until its return.
            </p>
            <p class="text-md font-montserrat font-light mb-2">
              II. That I commit to using it with due diligence, in accordance
              with its intended characteristics and use (urban) and complying
              with traffic regulations, being obligated to compensate PANOT, the
              establishment, and/or third parties who provided the eBike to the
              establishment for any damages that may arise from my failure to
              comply with such obligations.
            </p>
            <p class="text-md font-montserrat font-light mb-2">
              III. - That I have confirmed the condition of the eBike prior to
              signing this document and that it is in perfect aesthetic and
              technical condition, having verified its proper functioning.
            </p>
            <p class="text-md font-montserrat font-light mb-2">
              IV. That I declare that I am aware that the eBike can only be used
              by the person designated for that purpose by the establishment.
            </p>
            <p class="text-md font-montserrat font-light mb-2">
              V. - That I declare that I am aware that the risk associated with
              the use of the eBike is not covered by any insurance, and I will
              be solely responsible for any damages or injuries that I may
              suffer or cause to third parties during its use, releasing the
              establishment, PANOT, and third parties who provided the eBike to
              the establishment from any liability in this regard.
            </p>
            <p class="text-md font-montserrat font-light mb-2">
              VI. - That I declare that I am aware of the obligation to return
              the eBike (and accessories) in the same condition in which it was
              delivered to me, and that damages, loss, or theft of the eBike are
              not covered by any insurance. I commit to assuming the costs of
              its repair in case of return in poor condition, and the full price
              of the bike in case of return in unserviceable conditions or
              non-return.
            </p>
            <p class="text-md font-montserrat font-light mb-2">
              VII. - That I declare that I am aware that the eBike is equipped
              with a GPS mobile system, which I authorize so that PANOT can
              locate it in case of loss or theft.
            </p>
          </div>
        </div>
        <div>
          <!-- <p>Signature</p> -->
          <vue3-signature
            class="border"
            ref="signature"
            :width="300"
            :height="900"
            :penColor="penColor"
          ></vue3-signature>
          <button @click="clearSignature">Clear</button>
          <button @click="save('image/jpeg')">Save</button>
        </div>
        <button @click="prevStep">Previous</button>
        <button @click="submitForm">Submit Form</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import Vue3Signature from "vue3-signature";
import { ref, reactive } from "vue";

let formSteps = reactive({
  step: 2,
  selectedCity: "",
  selectedBike: null,
  bikeOptions: {
    Sotogrande: [
      { id: 1, name: "½ day (4 hours) for 30€", timeFrame: "½ day" },
      { id: 2, name: "1 day (24 hours) for €40", timeFrame: "1 day" },
      { id: 3, name: "7 days (20% off) for €32/day", timeFrame: "7 days" },
      {
        id: 4,
        name: "14 days or more (30% off) for €28/day",
        timeFrame: "14 days",
      },
    ],
    Fuerteventura: [
      { id: 1, name: "½ day (4 hours) for 24€", timeFrame: "½ day" },
      { id: 2, name: "1 day (24 hours) for €29", timeFrame: "1 day" },
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

const getCurrentBikeOptions = () => {
  return formSteps.bikeOptions[formSteps.selectedCity];
};

const submitForm = () => {
  const {
    fullName,
    address: { address, city, state, country, postalCode },
    passportNumber,
    phoneContact,
    email,
    signature,
    selectedCity,
    selectedBike,
  } = formSteps;

  let message = `Name: ${fullName}\n`;
  message += `Address: ${address}, ${city}, ${state}, ${country}, ${postalCode}\n`;
  message += `Passport # or ID number: ${passportNumber}\n`;
  message += `Phone Number: ${phoneContact}\n`;
  message += `Email: ${email}\n`;
  message += `City: ${selectedCity}\n`;
  message += `Bike Option: ${selectedBike ? selectedBike.name : ""}`;
  message += `Signature: ${signature ? signature.value.getDataURL() : ""}`;

  alert(message);
};

const penColor = ref("#000000");
const signature = ref(null);
const clearSignature = () => {
  signature.value.clear();
};
const save = (t) => {
  console.log(signature.value.save(t));
};
</script>
