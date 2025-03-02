import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createCheckoutSession } from "../api/stripe";

const Checkout = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const session = await createCheckoutSession({
      venueId: booking.venueId,
      eventId: booking.eventId,
      date: booking.date,
      totalPrice: booking.totalPrice,
    });

    // Redirect to Stripe Checkout
    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div>
      <h2>Complete Payment</h2>
      <form onSubmit={handlePayment}>
        <CardElement />
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
