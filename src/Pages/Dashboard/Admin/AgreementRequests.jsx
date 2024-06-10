import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner"

import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai"
import toast from "react-hot-toast"

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure()

  const {
    data: agreements = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const { data } = await axiosSecure("/agreements")
      return data
    },
  })

  const handleRemove = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/agreements/${id}`)
      if (data.deletedCount > 0) {
        toast.success("Agreement delete successfully!")
      }
      refetch()
    } catch (error) {
      console.log(error.message)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <Helmet>
        <title>Manage Agreements | Taj Apart</title>
      </Helmet>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Floor No</th>
                <th>Block Name</th>
                <th>Apartment No</th>
                <th>Rent</th>
                <th>Request Date</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {agreements.map((agreement, index) => (
                <tr key={agreement._id}>
                  <th>{index + 1}</th>
                  <td>{agreement.user.name}</td>
                  <td>{agreement.user.email}</td>
                  <td>{agreement.floor_no}</td>
                  <td>{agreement.block_name}</td>
                  <td>{agreement.apartment_no}</td>
                  <td>${agreement.rent_per_year}</td>
                  <td>{agreement.request_date}</td>
                  <td>{agreement.user.payment_status}</td>
                  <td className="flex items-center gap-3">
                    {/* Accept button */}
                    <div
                      className="tooltip"
                      data-tip="Accept"
                    >
                      <button className="text-2xl text-success">
                        <AiFillCheckCircle />
                      </button>
                    </div>
                    {/* Remove button */}
                    <div
                      onClick={() => handleRemove(agreement._id)}
                      className="tooltip"
                      data-tip="Remove"
                    >
                      <button className="text-2xl text-error">
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

export default AgreementRequests
