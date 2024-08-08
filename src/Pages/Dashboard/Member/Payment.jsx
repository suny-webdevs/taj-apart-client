import { useEffect, useState } from "react"
import useAuth from "../../../Hooks/useAuth"
import toast from "react-hot-toast"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const Payment = () => {
  const { preview } = useAuth()
  const axiosPublic = useAxiosPublic()
  const { user } = useAuth()

  const [coupon, setCoupon] = useState("")
  const [disableCoupon, setDisableCoupon] = useState(false)
  const [invalidCoupon, setInvalidCoupon] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(
    parseFloat(preview?.rent_per_month).toFixed(2)
  )

  // Take coupon code
  const handleCouponChange = (e) => {
    setCoupon(e.target.value)
  }

  // Verify and submit coupon
  const handleCouponSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axiosPublic.post("/verify-coupon", {
        code: coupon.toLowerCase(),
      })

      if (data.valid) {
        setDiscount(parseInt(data?.discount))
        setDisableCoupon(true)
        calcTotalAmount(
          parseInt(preview?.rent_per_month),
          parseInt(data?.discount)
        )
        toast.success("Coupon claimed")
      } else {
        setInvalidCoupon(true)
        calcTotalAmount(parseInt(preview?.rent_per_month), 0)
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }

    setCoupon("")
  }

  // Calculate discounted amount
  const calcTotalAmount = (amount, discount) => {
    const total = amount * (discount / 100)
    if (discount === 0) {
      setTotalAmount(amount.toFixed(2))
    } else {
      setTotalAmount(total.toFixed(2))
    }
  }

  const [clientSecret, setClientSecret] = useState("")
  console.log(clientSecret)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (totalAmount > 0) {
      axiosPublic
        .post("/create-payment-intent", { total_amount: totalAmount })
        .then((res) => {
          console.log(res.data)
          setClientSecret(res.data.clientSecret)
        })
    }
  }, [axiosPublic, totalAmount])

  const appearance = {
    theme: "stripe",
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="p-2 md:p-5">
      <h1 className="text-4xl text-primary uppercase font-bold">
        payment here
      </h1>
      <div className="w-full mt-5">
        <div className="border rounded-xl p-5">
          <p className="font-medium tracking-wide">
            Name :{" "}
            <span className="font-mono font-semibold tracking-normal text-lg ml-1">
              {user?.displayName || "[Member Name]"}
            </span>
          </p>
          <p className="font-medium tracking-wide">
            Email :{" "}
            <span className="font-mono font-semibold tracking-normal text-lg ml-1">
              {preview?.user_email || "[Member email]"}
            </span>
          </p>
          <p className="font-medium tracking-wide">
            Apartment No :{" "}
            <span className="font-mono font-semibold tracking-normal text-lg ml-1">
              {preview?.apartment_no || "[Apartment number]"}
            </span>
          </p>
          <p className="font-medium tracking-wide">
            Month :{" "}
            <span className="font-mono font-semibold tracking-normal text-lg ml-1">
              {preview?.month || "[Payment month]"}
            </span>
          </p>
          <p className="font-medium tracking-wide">
            Payable Rent Amount :{" "}
            <span className="font-mono font-semibold text-lg ml-1">
              ${preview?.rent_per_month || 0}
            </span>
          </p>
          {/* Coupon field */}
          {(!disableCoupon || !invalidCoupon) && (
            <form
              onSubmit={handleCouponSubmit}
              className="flex items-end gap-5 my-5"
            >
              <div className="form-control">
                <label
                  htmlFor="coupon"
                  className="mb-1 text-sm font-medium tracking-wide"
                >
                  Use Coupon <span className="text-gray-400">(optional)</span> :
                </label>
                <input
                  type="text"
                  id="coupon"
                  name="coupon"
                  value={coupon}
                  onChange={handleCouponChange}
                  className="input input-bordered input-sm font-mono font-bold uppercase"
                />
              </div>
              <button
                disabled={!coupon}
                className="py-1.5 px-8 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed bg-primary rounded-md text-white text-sm font-semibold"
              >
                Claim
              </button>
            </form>
          )}
          <p className="text-2xl font-bold tracking-wide text-primary">
            Total Amount :{" "}
            <span className="font-bold text-2xl ml-1">
              ${totalAmount}{" "}
              {disableCoupon && (
                <span className="text-base ml-2 text-secondary">{`(${discount}% discount claimed)`}</span>
              )}
            </span>
          </p>
        </div>
        <div className="mt-2 w-full border p-5 rounded-xl">
          {clientSecret && (
            <Elements
              options={options}
              stripe={stripePromise}
            >
              <CheckoutForm
                totalAmount={totalAmount}
                clientSecret={clientSecret}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}

export default Payment
