import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";
import "../styles/payment.css";
import CheckoutForm from '../components/CheckoutForm'

const stripePromise = loadStripe(
  "pk_test_51Kz436DI2220fX2RtumW2sUt7bucyWSzFE0n3RVHBso218kqOrADlOxQzY7r2GgM3GMWyPHNiRTvwADx0HUOjUrj00jS73sFOz",{
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
