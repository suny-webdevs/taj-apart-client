// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { FaRegCreditCard } from "react-icons/fa6"
import PropTypes from "prop-types"

import "./CheckoutForm.css"

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement)

    if (card == null) {
      return
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    })

    if (error) {
      console.log("[error]", error)
    } else {
      console.log("[PaymentMethod]", paymentMethod)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe}
        className="py-2 px-7 bg-primary text-white text-base font-medium rounded-md mt-5 flex items-center justify-center gap-2"
      >
        <FaRegCreditCard className="text-lg" /> Pay{" "}
        <span className="ml-1">${totalAmount || 0}</span>
      </button>
    </form>
  )
}

CheckoutForm.propTypes = {
  totalAmount: PropTypes.number,
}

export default CheckoutForm
