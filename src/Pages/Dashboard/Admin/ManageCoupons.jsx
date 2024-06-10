import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner"
import { AiFillCloseCircle } from "react-icons/ai"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"
import toast from "react-hot-toast"

const ManageCoupons = () => {
  const axiosPublic = useAxiosPublic()

  const {
    data: coupons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const { data } = await axiosPublic("/coupons")
      return data
    },
  })

  const handleSaveCoupon = async (e) => {
    e.preventDefault()

    const form = e.target
    const name = form.name.value
    const code = form.code.value
    const discount = form.discount.value

    try {
      const savedInfo = {
        name,
        code,
        discount,
      }
      const { data } = await axiosPublic.post("/coupons", savedInfo)
      if (data.insertedId) {
        toast.success("Coupon created successfully!")
      }
      form.reset()
      refetch()
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleRemove = async (coupon) => {
    try {
      const { data } = await axiosPublic.delete(`/coupons/${coupon._id}`)
      if (data.deletedCount > 0) {
        toast.success("Coupon remove successfully!")
      }
      refetch()
    } catch (error) {
      console.log(error.message)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-6 w-full min-h-screen">
      <h1 className="text-3xl text-primary font-bold">Create Coupons</h1>
      <div>
        <div className="card shrink-0 w-full bg-base-100">
          <form
            onSubmit={handleSaveCoupon}
            className="card-body !p-5 md:flex-row md:items-center"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coupon Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter coupon name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coupon Code</span>
              </label>
              <input
                type="text"
                name="code"
                placeholder="Enter coupon code"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Discount Amount</span>
              </label>
              <input
                type="number"
                name="discount"
                placeholder="Enter discount amount"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-9 w-full">
              <button
                type="submit"
                className="bg-primary text-white rounded-md py-3"
              >
                Create coupon
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h1 className="text-3xl text-primary font-bold my-5">Manage coupons</h1>
        <div className="overflow-x-auto">
          <table className="table overflow-hidden">
            {/* head */}
            <thead className="text-white text-base bg-primary">
              <tr>
                <th></th>
                <th>Coupon Name</th>
                <th>Coupon Code</th>
                <th>Discount Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {coupons.map((coupon, index) => (
                <tr key={coupon._id}>
                  <th>{index + 1}</th>
                  <td className="capitalize">{coupon.name}</td>
                  <td className="uppercase">{coupon.code}</td>
                  <td>{coupon.discount}%</td>
                  <td>
                    <div
                      className="tooltip"
                      data-tip="Remove"
                    >
                      <button
                        onClick={() => handleRemove(coupon)}
                        className="text-2xl text-error"
                      >
                        <AiFillCloseCircle />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageCoupons
