import { useState } from "react"
import useAuth from "../../../Hooks/useAuth"
import toast from "react-hot-toast"
import { FaRegCreditCard } from "react-icons/fa6"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"

const Payment = () => {
  const { preview } = useAuth()
  const axiosPublic = useAxiosPublic()

  const [coupon, setCoupon] = useState("")
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
        code: coupon,
      })

      if (data.valid) {
        calcTotalAmount(
          parseInt(preview?.rent_per_month),
          parseInt(data?.discount)
        )
        toast.success("Coupon claimed")
      } else {
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

  return (
    <div className="p-5">
      <h1 className="text-4xl text-primary uppercase font-bold">
        payment here
      </h1>
      <div className="card-body w-full md:max-w-5xl border rounded-xl mt-10">
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
        <form
          onSubmit={handleCouponSubmit}
          className="flex items-end gap-5 my-5"
        >
          <div className="form-control">
            <label
              htmlFor="coupon"
              className="mb-1 text-sm font-medium tracking-wide"
            >
              Use Coupon (If you have) :
            </label>
            <input
              type="text"
              id="coupon"
              name="coupon"
              value={coupon}
              onChange={handleCouponChange}
              className="input input-bordered input-sm font-mono font-bold lowercase"
            />
          </div>
          <button
            disabled={!coupon}
            className="py-1.5 px-8 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed bg-primary rounded-md text-white text-sm font-semibold"
          >
            Claim
          </button>
        </form>
        <p className="text-2xl font-bold tracking-wide text-primary">
          Total Amount :{" "}
          <span className="font-mono font-semibold text-2xl ml-1">
            ${totalAmount}
          </span>
        </p>
        <button className="py-3 bg-primary text-white text-base font-medium rounded-md mt-5 flex items-center justify-center gap-2">
          <FaRegCreditCard className="text-xl" /> Pay Now
        </button>
      </div>
    </div>
  )
}

export default Payment
