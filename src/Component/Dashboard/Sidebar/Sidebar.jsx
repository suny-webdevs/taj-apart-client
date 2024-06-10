import { useState } from "react"
import logo from "../../../assets/logo.png"

import { PiSidebarFill, PiSidebarDuotone, PiBuildingFill } from "react-icons/pi"
import { IoLogOutSharp, IoHome } from "react-icons/io5"

import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import MenuLinks from "./MenuLinks/MenuLinks"
import useAuth from "../../../Hooks/useAuth"
import useRole from "../../../Hooks/useRole"
import UserMenu from "./UserMenu/UserMenu"
import MemberMenu from "./MemberMenu/MemberMenu"
import AdminMenu from "./AdminMEnu/AdminMenu"

const Sidebar = () => {
  const { userSignOut } = useAuth()
  const [role] = useRole()

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
    <div className="z-50">
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
            {/* Dynamic nav */}
            {role === "user" && <UserMenu />}
            {role === "member" && <MemberMenu />}
            {role === "admin" && <AdminMenu />}
          </nav>
        </div>
        <div>
          <nav className="flex flex-col pl-2">
            <MenuLinks
              link={"/"}
              label={"Home"}
              icon={IoHome}
            />
            <MenuLinks
              link={"/apartments"}
              label={"Apartments"}
              icon={PiBuildingFill}
            />

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
