import useAuth from "../../Hooks/useAuth"
import avatar from "/avatar.png"

const MyProfile = () => {
  const { user } = useAuth()

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-1 justify-center items-center">
      {/* Profile details */}
      <div className="bg-[#f7f7f7] backdrop-blur-xl px-14 py-10 rounded-t-md md:rounded-l-md">
        <img
          src={user?.photoURL || avatar}
          className="w-40 h-40 object-cover rounded"
        />
        <h3 className="text-xl mt-2">{user?.email}</h3>
        <h1 className="text-3xl text-primary font-bold">{user?.displayName}</h1>
      </div>

      {/* Agreement details */}
      <div className="bg-[#f7f7f7] backdrop-blur-xl px-14 py-10 rounded-b-md md:rounded-r-md space-y-3">
        <h1 className="text-3xl text-primary font-bold mb-11">
          Agreement details
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          Agreement accept date:{" "}
          <span className="text-gray-700 font-bold">{"none"}</span>
        </p>
        <p className="text-xl text-gray-500 font-medium">
          Floor no: <span className="text-gray-700 font-bold">{"none"}</span>
        </p>
        <p className="text-xl text-gray-500 font-medium">
          Block name: <span className="text-gray-700 font-bold">{"none"}</span>
        </p>
        <p className="text-xl text-gray-500 font-medium">
          Apartment no:{" "}
          <span className="text-gray-700 font-bold">{"none"}</span>
        </p>
      </div>
    </div>
  )
}

export default MyProfile
