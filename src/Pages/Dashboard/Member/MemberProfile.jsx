import { useState } from "react"
import useAuth from "../../../Hooks/useAuth"
import avatar from "/avatar.png"

const MemberProfile = () => {
  const { user } = useAuth()
  const [member, setMember] = useState([])

  if (user?.role === "member") {
    setMember(user)
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-1 p-5 justify-center items-center">
      <div className="w-full h-52 bg-primary rounded-md"></div>
      {/* Profile details */}
      <div className="p-5 md:px-14 md:py-10 rounded-t-md w-full flex flex-col justify-center md:flex-row md:items-end gap-4 transform -translate-y-28">
        <div className="p-2 border">
          <img
            src={member?.photoURL || avatar}
            className="w-40 h-40 object-cover rounded"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl text-primary font-medium">
            {member?.displayName}
          </span>
          <span className="text-lg">{member?.email}</span>
        </div>
      </div>

      {/* Agreement details */}
      <div className="border backdrop-blur-xl p-5 md:px-14 md:py-10 rounded-md space-y-2 w-full">
        <h1 className="text-3xl text-primary font-bold font-ostt mb-5">
          Agreement details
        </h1>
        <div className="pl-2">
          <p className="text-xl text-gray-500 font-normal">
            Agreement accept date:{" "}
            <span className="text-gray-700 font-bold">{"none"}</span>
          </p>
          <p className="text-xl text-gray-500 font-normal">
            Floor no: <span className="text-gray-700 font-bold">{"none"}</span>
          </p>
          <p className="text-xl text-gray-500 font-normal">
            Block name:{" "}
            <span className="text-gray-700 font-bold">{"none"}</span>
          </p>
          <p className="text-xl text-gray-500 font-normal">
            Apartment no:{" "}
            <span className="text-gray-700 font-bold">{"none"}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MemberProfile
