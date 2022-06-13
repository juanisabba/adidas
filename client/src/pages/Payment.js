import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";
import "../styles/payment.css";
import CheckoutForm from '../components/CheckoutForm'

const stripePromise = loadStripe(
  process.env.STRIPE_PASSWORD,{
    locale: 'en'
  }
);

function Payment() {
  return (
    <div className="payment">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Payment;
