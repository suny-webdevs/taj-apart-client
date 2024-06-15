import PropTypes from "prop-types"
import useAuth from "../../Hooks/useAuth"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import toast from "react-hot-toast"
import { format } from "date-fns"

import { useLocation, useNavigate } from "react-router-dom"

const Apartment = ({ apartment }) => {
  const { apartment_image, floor_no, block_name, apartment_no, rent_per_year } =
    apartment

  const { user } = useAuth()
  const location = useLocation()

  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()

  const handleAgreement = async (apartment) => {
    if (!user) {
      return navigate("/login", { state: location.pathname, replace: true })
    }

    try {
      const agreementInfo = {
        apartmentId: apartment._id,
        floor_no: apartment.floor_no,
        block_name: apartment.block_name,
        apartment_no: apartment.apartment_no,
        rent_per_year: apartment.rent_per_year,
        status: "pending",
        request_date: format(new Date(), "PPP"),
        request_time: format(new Date(), "ppp"),
        payment_status: "unpaid",
        user_name: user?.displayName,
        user_email: user?.email,
      }
      const { data } = await axiosPublic.put("/agreements", agreementInfo)
      if (data.upsertedCount > 0) {
        toast.success("Agreement done, wait for confirmation of admin.")
      } else {
        toast.error("This agreement already in request")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="">
      <div className="border border-gray-300 hover:border-primary hover:-translate-y-2 transition duration-150 border-b-4 rounded group">
        {/* Card image */}
        <div className="h-72 w-full aspect-square relative overflow-hidden">
          <img
            src={apartment_image}
            className="w-full h-full object-cover group-hover:scale-110 transition rounded-t"
          />
        </div>
        {/* Card content */}
        <div className="px-8 py-5">
          <div className="">
            <p className="py-2 pl-4 border-b uppercase">
              Floor No: <span className="font-bold">{floor_no}</span>
            </p>
            <p className="py-2 pl-4 border-b uppercase">
              Block Name: <span className="font-bold">{block_name}</span>
            </p>
            <p className="py-2 pl-4 border-b uppercase">
              Apartment No: <span className="font-bold">{apartment_no}</span>
            </p>
            <p className="py-2 text-primary text-lg font-bold uppercase pl-4">
              Rent: <span className="">${rent_per_year} /year</span>
            </p>
          </div>
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => handleAgreement(apartment)}
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded"
            >
              Agreement
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Apartment.propTypes = {
  apartment: PropTypes.object,
}

export default Apartment
