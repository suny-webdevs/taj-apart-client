import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner"
import { AiFillCloseCircle } from "react-icons/ai"
import toast from "react-hot-toast"
import { Helmet } from "react-helmet-async"
import useUsers from "../../../Hooks/useUsers"

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure()
  const [users, isLoading, refetch] = useUsers()

  const members = users.filter((user) => user.role === "member")

  const handleRemove = async (member) => {
    try {
      const updateInfo = {
        email: member.email,
        role: "user",
      }
      await axiosSecure.put("/users", updateInfo)
      toast.success("Member removed successfully!")
      refetch()
    } catch (error) {
      console.log(error.message)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>Manage Members | Taj Apart</title>
      </Helmet>
      <div className="overflow-x-auto p-5">
        <h1 className="text-3xl text-primary my-6">Manage Members</h1>
        <table className="table overflow-hidden">
          {/* head */}
          <thead className="bg-primary text-white">
            <tr className="text-base">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {members.map((member, index) => (
              <tr key={member._id}>
                <th>{index + 1}</th>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td className="text-center">
                  <div
                    className="tooltip"
                    data-tip="Remove"
                  >
                    <button
                      onClick={() => handleRemove(member)}
                      className="text-error text-2xl"
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
    </>
  )
}

export default ManageMembers
