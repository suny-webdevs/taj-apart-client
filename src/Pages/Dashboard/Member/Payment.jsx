import { useState } from "react"
import useAuth from "../../../Hooks/useAuth"
import toast from "react-hot-toast"
import { FaRegCreditCard } from "react-icons/fa6"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"

const Payment = () => {
  const { preview } = useAuth()
  const axiosPublic = useAxiosPublic()

  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)

  const handleCouponChange = (e) => {
    setCoupon(e.target.value)
  }

  const handleCouponSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axiosPublic.post("/verify-coupon", {
        code: coupon,
      })
      if (data.success) {
        setDiscount(data?.discount)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }

    toast.success("Coupon claimed")
    setCoupon("")
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
            {preview?.month}
          </span>
        </p>
        <p className="font-medium tracking-wide">
          Payable Rent Amount :{" "}
          <span className="font-mono font-semibold text-lg ml-1">
            ${preview?.rent_per_month}
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
            $
            {discount
              ? parseFloat(
                  preview?.rent_per_month * (parseInt(discount) / 100)
                ).toFixed(2)
              : preview?.rent_per_month}
          </span>
        </p>
        <button className="py-3 bg-primary text-white text-base font-medium rounded-md mt-5 flex items-center justify-center gap-2">
          <FaRegCreditCard className="text-xl" /> Pay
        </button>
      </div>
    </div>
  )
}

export default Payment
