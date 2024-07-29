import LoadingSpinner from "../../../Component/Shared/LoadingSpinner"
import useAuth from "../../../Hooks/useAuth"
import avatar from "/avatar.png"
import useAgreement from "../../../Hooks/useAgreement.jsx"
import useRole from "../../../Hooks/useRole.jsx"

const MemberProfile = () => {
  const { user, loading } = useAuth()
  const [agreement] = useAgreement()
  const [role] = useRole()

  if (loading) return <LoadingSpinner />

  return (
    <div className="w-full min-h-screen flex flex-col p-5 justify-center items-center">
      <div className="w-full h-52 bg-primary rounded-md"></div>
      {/* Profile details */}
      <div className="p-5 md:px-14 md:py-10 rounded-t-md w-full flex flex-col justify-start md:flex-row md:items-end gap-4 transform -translate-y-32">
        <div className="p-2 md:border">
          <img
            src={user?.photoURL || avatar}
            className="w-40 h-40 object-cover rounded"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl text-primary font-medium">
            {user?.displayName}
          </span>
          <span className="text-lg">
            {user?.email} {role === "admin" ? "(Admin)" : "(Member)"}
          </span>
        </div>
      </div>

      {/* Agreement details */}
      <div className="border backdrop-blur-xl p-5 md:px-14 md:py-10 rounded-md space-y-2 w-full transform -translate-y-24">
        <h1 className="text-3xl text-primary font-bold font-ostt mb-5">
          Agreement details
        </h1>
        <div className="pl-2">
          <p className="text-xl text-gray-500 font-normal">
            Accept date:{" "}
            <span className="text-gray-700 font-bold">
              {agreement?.accept_date || "none"}
            </span>
          </p>
          <p className="text-xl text-gray-500 font-normal">
            Floor no:{" "}
            <span className="text-gray-700 font-bold">
              {agreement?.floor_no || "none"}
            </span>
          </p>
          <p className="text-xl text-gray-500 font-normal">
            Block name:{" "}
            <span className="text-gray-700 font-bold">
              {agreement?.block_name || "none"}
            </span>
          </p>
          <p className="text-xl text-gray-500 font-normal">
            Apartment no:{" "}
            <span className="text-gray-700 font-bold">
              {agreement?.apartment_no || "none"}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MemberProfile
