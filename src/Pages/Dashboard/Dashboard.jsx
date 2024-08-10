import { FaCircleInfo } from "react-icons/fa6"
import useAuth from "../../Hooks/useAuth"

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2 md:gap-5 p-2 md:p-0">
      <h1 className="text-4xl md:text-6xl text-secondary text-center md:text-left font-semibold uppercase">
        Hello,{" "}
        <span className="text-primary font-bold">{user?.displayName}</span>🥳
      </h1>
      <h1 className="text-2xl md:text-6xl text-secondary text-center font-black uppercase">
        Welcome to Dashboard🎉
      </h1>
      <p className="text-sm md:text-lg text-secondary text-center md:text-left font-semibold tracking-wide flex items-center gap-2">
        <FaCircleInfo className="hidden md:flex" /> Please! Choose menus from
        sidebar to visit pages and fulfill your needs😊
      </p>
    </div>
  )
}

export default Dashboard
