import { useState } from "react"
import logo from "../../assets/logo.png"

import { PiSidebarFill, PiSidebarDuotone, PiBuildingFill } from "react-icons/pi"
import { IoLogOutSharp, IoHome } from "react-icons/io5"
import { GrAnnounce } from "react-icons/gr"

import { Link, NavLink, useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"
import toast from "react-hot-toast"
import { FaCircleUser } from "react-icons/fa6"

const Sidebar = () => {
  const { userSignOut } = useAuth()
  const [isActive, setIsActive] = useState(false)

  const navigate = useNavigate()

  const handleSidebar = () => {
    setIsActive(!isActive)
  }

  const handleLogout = async () => {
    await userSignOut()
    navigate("/")
    toast.success("Logout successfully")
  }

  const date = new Date()
  const currentYear = date.getFullYear()

  return (
    <div>
      {/* Top navbar for small device */}
      <div className="w-full md:hidden flex justify-between items-center px-5 py-3 bg-secondary">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            className="w-10 h-10"
          />
          <span className="text-xl text-white md:text-2xl font-ostt font-normal uppercase">
            taj apart
          </span>
        </Link>
        <div>
          <button
            className="text-white text-2xl bg-[#00000033] hover:bg-primary w-10 h-10 flex justify-center items-center rounded-full"
            onClick={handleSidebar}
          >
            {isActive ? <PiSidebarDuotone /> : <PiSidebarFill />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 w-64 h-screen py-3 px-5 md:fixed absolute left-0 top-0 bg-secondary flex flex-col justify-between transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              className="w-10 h-10"
            />
            <span className="text-xl text-white md:text-2xl font-ostt font-normal uppercase">
              taj apart
            </span>
          </Link>
          <nav className="flex flex-col mt-10 pl-2">
            <NavLink
              to={"/dashboard"}
              end
              className={({ isActive }) =>
                isActive
                  ? "text-primary py-2 flex items-center gap-3"
                  : "text-white hover:text-primary py-2 flex items-center gap-3"
              }
            >
              <FaCircleUser className="text-xl" /> My Profile
            </NavLink>
            <NavLink
              to={"/dashboard/announcements"}
              className={({ isActive }) =>
                isActive
                  ? "text-primary py-2 flex items-center gap-3"
                  : "text-white hover:text-primary py-2 flex items-center gap-3"
              }
            >
              <GrAnnounce className="text-xl" /> Announcements
            </NavLink>
          </nav>
        </div>
        <div>
          <nav className="flex flex-col pl-2">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-primary py-2 flex items-center gap-3"
                  : "text-white hover:text-primary py-2 flex items-center gap-3"
              }
            >
              <IoHome className="text-xl" /> Home
            </NavLink>
            <NavLink
              to={"/apartments"}
              className={({ isActive }) =>
                isActive
                  ? "text-primary py-2 flex items-center gap-3"
                  : "text-white hover:text-primary py-2 flex items-center gap-3"
              }
            >
              <PiBuildingFill className="text-xl" /> Apartments
            </NavLink>
            <button
              onClick={handleLogout}
              className="text-error py-2 text-left flex items-center gap-3"
            >
              <IoLogOutSharp className="text-xl" /> Logout
            </button>
          </nav>
          <p className="text-gray-400 text-center text-sm capitalize mt-5">
            &copy; {currentYear} taj apart
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
