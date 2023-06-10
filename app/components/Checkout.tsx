import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";
import { useState, useEffect } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const cartStroe = useCartStore();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    //   create a payment as asoon as the page loads up
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartStroe.cart,
        payment_intent_id: cartStroe.paymentIntent,
      }),
    });
  });
}
