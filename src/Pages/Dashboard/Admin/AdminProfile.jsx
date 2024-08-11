import { useEffect, useState } from "react"
import useAuth from "../../../Hooks/useAuth"
import AdminProfileModal from "../../../Component/Dashboard/Modal/AdminProfileModal"
import useApartments from "../../../Hooks/useApartments"
import useUsers from "../../../Hooks/useUsers"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"

const AdminProfile = () => {
  const { user } = useAuth()
  const [apartments] = useApartments()
  const [users] = useUsers()
  const axiosPublic = useAxiosPublic()

  const [agreements, setAgreements] = useState([])
  const members = users.filter((user) => user.role === "member")

  let [isOpen, setIsOpen] = useState(false)
  function open() {
    setIsOpen(true)
  }
  function close() {
    setIsOpen(false)
  }

  useEffect(() => {
    getAgreements()
  }, [])

  const getAgreements = async () => {
    const { data } = await axiosPublic("/agreements")
    setAgreements(data)
  }

  return (
    <div>
      <div className="flex justify-end md:justify-between items-center bg-gray-800 text-primary p-2 border-b-4 border-primary shadow-xl">
        <h1 className="hidden md:flex text-lg font-semibold">
          Welcome (Admin), to your profile🎉
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-sm font-medium">
            <span className="text-right">{user?.displayName}</span>
            <span className="text-right">{user?.email}</span>
          </div>
          <div
            onClick={open}
            className="border-2 border-primary rounded-full cursor-pointer"
          >
            <img
              src={user?.photoURL}
              alt="admin"
              className="w-[35px] h-[35px] rounded-full"
            />
          </div>
        </div>
      </div>
      <div>
        <AdminProfileModal
          isOpen={isOpen}
          close={close}
        />
      </div>
      <div className="w-full h-[200px] p-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="w-full h-[250px] md:h-[200px] bg-gradient-to-br hover:from-gray-800 from-secondary hover:to-secondary to-gray-800 text-primary flex flex-col justify-center items-center gap-3 rounded">
            <span className="text-xl font-bold uppercase">Total</span>
            <span className="text-7xl font-bold uppercase">
              {apartments.length < 11 && "0"}
              {apartments.length}
            </span>
            <span className="text-xl font-bold uppercase">Apartments</span>
          </div>
          <div className="w-full h-[250px] md:h-[200px] bg-gradient-to-br hover:from-gray-800 from-secondary hover:to-secondary to-gray-800 text-primary flex flex-col justify-center items-center gap-3 rounded">
            <span className="text-xl font-bold uppercase">Available</span>
            <span className="text-7xl font-bold uppercase">
              {(
                ((apartments.length - agreements.length) / apartments.length) *
                100
              ).toFixed(1)}
              %
            </span>
            <span className="text-xl font-bold uppercase">Apartments</span>
          </div>
          <div className="w-full h-[250px] md:h-[200px] bg-gradient-to-br hover:from-gray-800 from-secondary hover:to-secondary to-gray-800 text-primary flex flex-col justify-center items-center gap-3 rounded">
            <span className="text-xl font-bold uppercase">Unavailable</span>
            <span className="text-7xl font-bold uppercase">
              {((agreements.length / apartments.length) * 100).toFixed(1)}%
            </span>
            <span className="text-xl font-bold uppercase">Apartments</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          <div className="w-full h-[250px] md:h-[200px] bg-gradient-to-br hover:from-gray-800 from-secondary hover:to-secondary to-gray-800 text-primary flex flex-col justify-center items-center gap-3 rounded">
            <span className="text-xl font-bold uppercase">Total</span>
            <span className="text-7xl font-bold uppercase">
              {users.length < 11 && "0"}
              {users.length}
            </span>
            <span className="text-xl font-bold uppercase">Users</span>
          </div>
          <div className="w-full h-[250px] md:h-[200px] bg-gradient-to-br hover:from-gray-800 from-secondary hover:to-secondary to-gray-800 text-primary flex flex-col justify-center items-center gap-3 rounded mb-2 md:mb-0">
            <span className="text-xl font-bold uppercase">Total</span>
            <span className="text-7xl font-bold uppercase">
              {members.length < 11 && "0"}
              {members.length}
            </span>
            <span className="text-xl font-bold uppercase">Members</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
