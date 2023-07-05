<template>
  <div class="overflow-y-auto">
    <div class="text-center">
      <span
        class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-black bg-gray-50 rounded-full"
        >Summary</span
      >
      <h2 class="font-monserrat text-2xl font-semibold text-gray-800">
        Form Summary
      </h2>
      <div class="text-left py-2">
        <p class="font-monserrat text-gray-900 mb-2">
          City
          <span class="font-semibold block">{{ formSteps.selectedCity }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          Days
          <span class="font-semibold block">{{
            formSteps.selectedBike.name
          }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          Name
          <span class="font-semibold block">{{ formSteps.fullName }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          Email <span class="font-semibold block">{{ formSteps.email }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          Passport or ID Number
          <span class="font-semibold block">{{
            formSteps.passportNumber
          }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          Phone Number
          <span class="font-semibold block">{{ formSteps.phoneContact }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          Address
          <span class="font-semibold block"
            >{{ formSteps.address.address.address }},
            {{ formSteps.address.address.city }},
            {{ formSteps.address.address.state }},
            {{ formSteps.address.address.country }},
            {{ formSteps.address.address.postalCode }}.
          </span>
        </p>
      </div>
      <div class="text-left">
        <p class="font-semibold text-gray-900">I Declare:</p>
        <p class="text-sm font-montserrat font-light mb-2">
          I. That I take responsibility for the eBike PANOT and the accompanying
          accessories (basket and mobile holder) from the moment of delivery
          until its return.
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          II. That I commit to using it with due diligence, in accordance with
          its intended characteristics and use (urban) and complying with
          traffic regulations, being obligated to compensate PANOT, the
          establishment, and/or third parties who provided the eBike to the
          establishment for any damages that may arise from my failure to comply
          with such obligations.
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          III. - That I have confirmed the condition of the eBike prior to
          signing this document and that it is in perfect aesthetic and
          technical condition, having verified its proper functioning.
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          IV. That I declare that I am aware that the eBike can only be used by
          the person designated for that purpose by the establishment.
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          V. - That I declare that
          <b class="font-bold"
            >I am aware that the risk associated with the use of the eBike is
            not covered by any insurance, and I will be solely responsible for
            any damages or injuries that I may suffer or cause to third parties
            during its use, releasing the establishment, PANOT, and third
            parties who provided the eBike to the establishment from any
            liability in this regard.</b
          >
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          VI. - That I declare that I am aware of the obligation to return the
          eBike (and accessories) in the same condition in which it was
          delivered to me, and that damages, loss, or theft of the eBike are not
          covered by any insurance. I commit to assuming the costs of its repair
          in case of return in poor condition, and the full price of the bike in
          case of return in unserviceable conditions or non-return.
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          VII. - That I declare that I am aware that the eBike is equipped with
          a GPS mobile system, which I authorize so that PANOT can locate it in
          case of loss or theft.
        </p>
      </div>
      <button
        v-show="!signatureDisplay"
        @click="signatureDisplay = !signatureDisplay"
        class="w-full bg-black text-white rounded-md px-4 py-2 hover:border hover:text-black hover:bg-transparent my-4"
      >
        SIGN
      </button>
    </div>
    <div>
      <!-- <p>Signature</p> -->
      <div v-if="signatureDisplay">
        <vue3-signature
          class="border"
          ref="signature"
          :w="'100%'"
          :h="'250px'"
          :penColor="penColor"
        ></vue3-signature>
        <div class="flex flex-col py-8">
          <button
            class="border text-black rounded-md px-4 py-2 hover:border hover:text-white hover:bg-black mb-4"
            @click="clearSignature"
          >
            Clear
          </button>
          <button
            class="rounded-md px-4 py-2 mb-4"
            @click="emitSignature"
            :class="
              buttonHide
                ? 'bg-gray-200 text-gray-300'
                : 'bg-black text-white  hover:bg-transparent hover:text-black cursor-pointer '
            "
          >
            Download Confirmation Form
          </button>
          <button
            class="bg-black text-white rounded-md px-4 py-2 hover:text-black hover:bg-transparent mb-8"
            @click="pay"
            :disabled="buttonHide"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Vue3Signature from "vue3-signature";
import { ref, reactive } from "vue";

let emits = defineEmits(["signatureCaptured", "payButton"]);

defineProps({
  formSteps: {
    type: Object,
    required: true,
  },
});

//PDF LOGIC
const penColor = ref("#000000");

// Display Signature Box
let signatureDisplay = ref(false);

const signature = ref(null);
// let test = ref(false);

// Watch the signature variable for changes
// watch(signature, (newValue) => {
//   if (newValue) {
//     // Signature display has changed, do something...
//     // For example, enable buttons or perform any necessary logic.
//     // You can access the signature component using `signature.value`.
//     alert("hello");
//   }
// });

// Clear Signature Prop Values
const clearSignature = () => {
  signature.value.clear();
};
// Emit signature
const emitSignature = () => {
  const signatureData = signature.value.save("signatue/png");
  emits("signatureCaptured", signatureData);
};

const pay = () => {
  emits("payButton");
};
</script>

<style scoped></style>
