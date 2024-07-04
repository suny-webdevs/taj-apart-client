import { Helmet } from "react-helmet-async"
import useAgreement from "../../../Hooks/useAgreement"
import { useEffect, useState } from "react"
import { FaArrowRightLong } from "react-icons/fa6"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import useAuth from "../../../Hooks/useAuth"
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner"

const MakePayment = () => {
  const { setPreview } = useAuth()
  const [agreement, agreementLoading] = useAgreement()

  const navigate = useNavigate()

  const [months, setMonths] = useState([])

  // console.log(preview)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    getMonth()
  }, [])
  const getMonth = async () => {
    const { data } = await axios.get("/months.json")
    return setMonths(data)
  }

  const handleSubmitPayment = async ({
    user_email,
    floor_no,
    block_name,
    apartment_no,
    rent_per_year,
    rent_per_month,
    month,
  }) => {
    const previewInfo = {
      user_email,
      floor_no,
      block_name,
      apartment_no,
      rent_per_year,
      rent_per_month,
      month,
    }

    setPreview(previewInfo)
    navigate("/dashboard/payment")

    // const { data } = await axiosPublic.post("/payments  ", previewInfo)
    // if (data.insertedId) {
    //   toast.success("preview saved")
    //   navigate("/dashboard/payment")
    // }
    // if (data.isExist) {
    //   return toast.error("Already paid in this month!")
    // }
  }

  const currentYear = new Date().getFullYear()

  if (agreementLoading) return <LoadingSpinner />

  return (
    <div className="p-5 w-full">
      <Helmet>
        <title>Make Payment</title>
      </Helmet>
      <h1 className="text-3xl text-primary font-bold uppercase">
        make payment
      </h1>
      <div className="card bg-base-100 w-full md:max-w-3xl shrink-0">
        <form
          onSubmit={handleSubmit(handleSubmitPayment)}
          className="card-body grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <div className="form-control">
            <label
              htmlFor="user_email"
              className="label"
            >
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              defaultValue={agreement?.user_email}
              {...register("user_email")}
              className="input input-bordered"
              readOnly={true}
              required
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="floor_no"
              className="label"
            >
              <span className="label-text">Floor No</span>
            </label>
            <input
              type="text"
              placeholder="Floor number"
              defaultValue={agreement?.floor_no}
              {...register("floor_no")}
              className="input input-bordered"
              readOnly
              required
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="block_name"
              className="label"
            >
              <span className="label-text">Block Name</span>
            </label>
            <input
              type="text"
              placeholder="Block name"
              defaultValue={agreement?.block_name}
              {...register("block_name")}
              className="input input-bordered"
              readOnly
              required
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="apartment_no"
              className="label"
            >
              <span className="label-text">Apartment No</span>
            </label>
            <input
              type="text"
              placeholder="Apartment no"
              defaultValue={agreement?.apartment_no}
              {...register("apartment_no")}
              className="input input-bordered"
              readOnly
              required
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="rent_per_year"
              className="label"
            >
              <span className="label-text">Rent per year ($)</span>
            </label>
            <input
              type="number"
              placeholder="Rent per year"
              value={agreement?.rent_per_year}
              {...register("rent_per_year")}
              className="input input-bordered"
              readOnly
              required
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="rent_per_month"
              className="label"
            >
              <span className="label-text">Rent per month ($)</span>
            </label>
            <input
              type="number"
              placeholder="Rent per month"
              value={(agreement?.rent_per_year / 12).toFixed(2)}
              {...register("rent_per_month")}
              className="input input-bordered"
              readOnly
              required
            />
          </div>
          <div className="form-control md:col-span-2">
            <label
              htmlFor="month"
              className="label"
            >
              <span className="label-text">Select month</span>
            </label>
            <select
              {...register("month", { required: true })}
              className="select select-bordered text-base"
              required
            >
              <option
                disabled
                value={""}
              >
                Select month
              </option>
              <>
                {months.map((month, index) => (
                  <option
                    key={index}
                    value={`${month?.value} - ${currentYear}`}
                  >
                    {month?.label} - {currentYear}
                  </option>
                ))}
              </>
            </select>
            {errors.month && <span className="text-error">Select a month</span>}
          </div>
          <div className="form-control mt-6 md:col-span-2">
            <button className="px-6 py-3 text-white bg-primary rounded-md uppercase flex gap-2 items-center justify-center">
              Next <FaArrowRightLong />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MakePayment
