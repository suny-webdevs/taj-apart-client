import { useNavigate } from "react-router-dom"
import useAgreement from "../../../Hooks/useAgreement"
import { BsCurrencyDollar } from "react-icons/bs"

const MakePayment = () => {
  const [agreement] = useAgreement()
  const navigate = useNavigate()

  const handlePayment = async (e) => {
    e.preventDefault()

    const form = e.target
    const user_email = form.email.value
    const floor_no = form.floor.value
    const block_name = form.block.value
    const apartment_no = form.apartment.value
    const rent_per_month = form.rent.value
    const month = form.month.value

    const paymentInfo = {
      user_email,
      floor_no,
      block_name,
      apartment_no,
      rent_per_month: parseFloat(rent_per_month),
      month,
    }

    console.log(paymentInfo)
  }

  return (
    <div className="p-5">
      <h1 className="text-4xl text-primary uppercase font-bold">
        make payment
      </h1>
      <div className="card shrink-0 w-full max-w-5xl border bg-base-100 mt-10">
        <form
          onSubmit={handlePayment}
          className="card-body grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              readOnly
              defaultValue={agreement?.user_email}
              placeholder="Your email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Floor No</span>
            </label>
            <input
              type="text"
              name="floor"
              readOnly
              defaultValue={agreement?.floor_no}
              placeholder="Your floor number"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Block Name</span>
            </label>
            <input
              type="text"
              name="block"
              defaultValue={agreement?.block_name}
              placeholder="Your block name"
              className="input input-bordered"
              readOnly
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Apartment No</span>
            </label>
            <input
              type="text"
              name="apartment"
              defaultValue={agreement?.apartment_no}
              placeholder="Your apartment number"
              className="input input-bordered"
              readOnly
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rent Per Month</span>
            </label>
            <label className="input input-bordered flex items-center gap-1">
              <BsCurrencyDollar className="text-xl" />
              <input
                type="number"
                name="rent"
                readOnly
                value={parseFloat((agreement?.rent_per_year / 12).toFixed(2))}
                placeholder="Your rent per month"
                className="grow"
                required
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Month</span>
            </label>
            <select
              name="month"
              className="select select-bordered w-full"
              required
            >
              <option defaultValue="Select month">Select month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="form-control mt-6 md:col-span-2">
            <button
              onClick={() => navigate("/dashboard/payment")}
              className="bg-primary hover:bg-primary-hover text-white py-3 rounded-md"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MakePayment
