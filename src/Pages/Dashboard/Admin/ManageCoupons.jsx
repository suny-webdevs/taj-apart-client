import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner"
import { AiFillCloseCircle } from "react-icons/ai"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"
import toast from "react-hot-toast"
import CouponModal from "../../../Component/Dashboard/Modal/CouponModal"
import { useState } from "react"

const ManageCoupons = () => {
  const axiosPublic = useAxiosPublic()

  let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

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
    const desc = form.desc.value
    const code = form.code.value
    const discount = form.discount.value

    try {
      const savedInfo = {
        desc,
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
      <button
        onClick={open}
        className="px-6 py-2 bg-primary text-white rounded"
      >
        Create coupon
      </button>
      <div>
        <CouponModal
          handleSaveCoupon={handleSaveCoupon}
          isOpen={isOpen}
          close={close}
        />
      </div>
      <div>
        <h1 className="text-3xl text-primary font-bold my-5">Manage coupons</h1>
        <div className="overflow-x-auto">
          <table className="table overflow-hidden">
            {/* head */}
            <thead className="text-white text-base bg-primary">
              <tr>
                <th></th>
                <th>Coupon Description</th>
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
                  <td className="capitalize">{coupon.desc}</td>
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
