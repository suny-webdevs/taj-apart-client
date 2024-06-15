import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner"

import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai"
import toast from "react-hot-toast"
import { format } from "date-fns"
import useAgreementStatus from "../../../Hooks/useAgreementStatus"

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure()
  const [status] = useAgreementStatus()
  console.log(status)

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

  const handleAccept = async (agreement) => {
    try {
      const updateAgreement = {
        apartment_no: agreement.apartment_no,
        user_email: agreement.user_email,
        status: "checked",
        accept_date: format(new Date(), "PPP"),
      }

      const { data: updateStatus } = await axiosSecure.put(
        "/agreements",
        updateAgreement
      )
      console.log(updateStatus)
      refetch()
      if (updateStatus.modifiedCount > 0) {
        const updateUser = {
          email: agreement.user_email,
          role: "member",
        }

        const { data } = await axiosSecure.put(
          `/users/${agreement.user_email}`,
          updateUser
        )
        console.log(data)
        toast.success("Agreement is checked!")
        refetch()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleRemove = async (id) => {
    try {
      await axiosSecure.delete(`/agreements/${id}`)

      refetch()
      toast.success("Agreement removed successfully!")
    } catch (error) {
      console.log(error.message)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="z-10 px-2 md:px-10">
      <Helmet>
        <title>Agreements Requests | Taj Apart</title>
      </Helmet>
      <div className="md:my-10">
        <h1 className="text-center text-3xl text-primary font-bold my-5">
          Agreement Requests
        </h1>
        <div className="overflow-x-auto">
          <table className="table overflow-hidden">
            {/* head */}
            <thead className="bg-primary text-white text-base">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Floor No</th>
                <th>Block Name</th>
                <th>Apartment No</th>
                <th>Rent/Year</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {agreements.map((agreement, index) => (
                <tr key={agreement._id}>
                  <th>{index + 1}</th>
                  <td>{agreement?.user_name}</td>
                  <td>{agreement?.user_email}</td>
                  <td>{agreement?.floor_no}</td>
                  <td>{agreement?.block_name}</td>
                  <td>{agreement?.apartment_no}</td>
                  <td>${agreement?.rent_per_year}</td>
                  <td>{agreement?.request_date}</td>
                  <td>
                    <span
                      className={`${
                        agreement.status === "pending"
                          ? "bg-yellow-50 text-yellow-500"
                          : "bg-green-50 text-green-500"
                      } capitalize py-1 px-3 rounded-full`}
                    >
                      {agreement.status}
                    </span>
                  </td>
                  <td className="flex items-center justify-center gap-3">
                    {/* Accept button */}
                    <div
                      className="tooltip"
                      data-tip="Accept"
                    >
                      <button
                        onClick={() => handleAccept(agreement)}
                        className="text-2xl text-success disabled:text-gray-500"
                      >
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
