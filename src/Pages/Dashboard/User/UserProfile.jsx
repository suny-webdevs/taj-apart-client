import useAuth from "../../../Hooks/useAuth"
import useRole from "../../../Hooks/useRole"
import avatar from "/avatar.png"
import verify from "../../../assets/blue-tick.png"

const UserProfile = () => {
  const { user } = useAuth()
  const [role] = useRole()

  return (
    <div className="flex justify-center items-center w-full h-screen p-5">
      <div className="w-1/2 h-screen p-5">
        <div className="p-5 md:p-10 rounded-md w-full border">
          <div className="flex justify-center">
            <img
              src={user?.photoURL || avatar}
              className="w-40 h-40 object-cover rounded-md border p-2"
            />
          </div>
          <div className="flex flex-col items-center mt-5">
            <span className="text-2xl md:text-3xl text-primary font-medium flex items-center gap-2">
              {user?.displayName}
              {role === "member" && (
                <img
                  src={verify}
                  width="25px"
                  height="25px"
                />
              )}
            </span>
            <span className="text-lg">{user?.email} </span>
          </div>
          <div className="mt-10 space-y-1">
            <p className="text-xl text-secondary font-normal">
              Agreement accept date:{" "}
              <span className="text-gray-700 font-mono font-bold">
                {"none"}
              </span>
            </p>
            <p className="text-xl text-secondary font-normal">
              Floor no:{" "}
              <span className="text-gray-700 font-mono font-bold">
                {"none"}
              </span>
            </p>
            <p className="text-xl text-secondary font-normal">
              Block name:{" "}
              <span className="text-gray-700 font-mono font-bold">
                {"none"}
              </span>
            </p>
            <p className="text-xl text-secondary font-normal">
              Apartment no:{" "}
              <span className="text-gray-700 font-mono font-bold">
                {"none"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
