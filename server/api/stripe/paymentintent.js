import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const body = JSON.parse(req.body);
    const stripe = new Stripe(process.env.STRIPE_SK_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(body.amount),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    // Return the client_secret to the client
    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Failed to create PaymentIntent" });
  }
}
