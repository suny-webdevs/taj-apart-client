// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { FaRegCreditCard } from "react-icons/fa6"
import { FaCheck } from "react-icons/fa"
import PropTypes from "prop-types"

import "./CheckoutForm.css"
import useAuth from "../../../Hooks/useAuth"
import { useState } from "react"

const CheckoutForm = ({ totalAmount, clientSecret }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()

  const [trnxId, setTrnxId] = useState("")

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

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      })

    if (confirmError) {
      console.log("Confirm error", confirmError)
    } else {
      console.log("Payment intent", paymentIntent)
      if (paymentIntent.status === "succeeded") {
        console.log("TrnxID: ", paymentIntent.id)
        setTrnxId(paymentIntent.id)
      }
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
        disabled={!stripe || !clientSecret}
        className="py-2 px-7 bg-secondary hover:bg-primary text-primary hover:text-secondary text-base font-bold rounded-md mt-5 flex items-center justify-center gap-2 transition-colors duration-150"
      >
        <FaRegCreditCard className="text-lg" /> Pay{" "}
        <span className="ml-1">${totalAmount || 0}</span>
      </button>
      <p className="mt-5">
        {trnxId && (
          <p className="w-full md:w-[70%] text-white font-medium bg-green-600 border-b-4 border-green-700 py-2 px-4 rounded flex items-center gap-3">
            <FaCheck className="text-xl text-green-600 bg-green-100 p-1 rounded-full" />{" "}
            <span>
              Payment successful. Your TrnxID :{" "}
              <code className="font-mono text-green-600 text-lg font-semibold py-1 px-2 rounded bg-green-100 border">
                {trnxId}
              </code>
            </span>
          </p>
        )}
      </p>
    </form>
  )
}

CheckoutForm.propTypes = {
  totalAmount: PropTypes.number,
  clientSecret: PropTypes.string,
}

export default CheckoutForm
