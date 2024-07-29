import { useEffect, useState } from "react"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"
import CouponCard from "./CouponCard"

const Coupons = () => {
  const [coupons, setCoupons] = useState([])
  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    const getCoupon = async () => {
      const { data } = await axiosPublic("/coupons")
      setCoupons(data)
    }
    getCoupon()
  }, [axiosPublic])

  return (
    <div
      className={`container mx-auto px-2 md:px-20 w-full min-h-[50vh] mt-2 pt-20 grid grid-cols-1 gap-10`}
    >
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon._id}
          coupon={coupon}
        />
      ))}
    </div>
  )
}

export default Coupons
