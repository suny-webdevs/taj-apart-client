// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { FaRegCreditCard } from "react-icons/fa6"
import PropTypes from "prop-types"

import "./CheckoutForm.css"
import useAuth from "../../../Hooks/useAuth"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const CheckoutForm = ({ totalAmount, clientSecret, payAbleMonth }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

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
      console.log("[PaymentMethod]")
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
      console.log("Confirm error")
    } else {
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          user_email: user?.email,
          wallet: paymentMethod.card.brand,
          trnxID: paymentIntent.id,
          amount: totalAmount,
          month: payAbleMonth,
          date: format(new Date(), "PP"),
        }
        const { data } = await axiosPublic.post("/payments", paymentInfo)
        if (data.insertedId) {
          navigate("/dashboard/m/payment-history")
          toast.success("Payment successful!")
        }
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
    </form>
  )
}

CheckoutForm.propTypes = {
  totalAmount: PropTypes.number,
  clientSecret: PropTypes.string,
  payAbleMonth: PropTypes.string,
}

export default CheckoutForm
