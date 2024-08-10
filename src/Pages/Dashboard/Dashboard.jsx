import { FaCircleInfo } from "react-icons/fa6"

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-6xl text-primary font-bold uppercase">
        Hello sir🥳,
      </h1>
      <h1 className="text-6xl text-primary font-bold uppercase">
        Welcome to Dashboard🎉
      </h1>
      <p className="text-lg text-secondary font-semibold tracking-wide flex items-center gap-2">
        <FaCircleInfo /> Please! Choose menus from sidebar to visit pages and
        fulfill your needs😊
      </p>
    </div>
  )
}

export default Dashboard
