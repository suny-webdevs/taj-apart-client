import { Link, NavLink, useNavigate } from "react-router-dom"

import logo from "../../assets/logo.png"
import menuIcon from "../../assets/Icons/menu-icon.svg"

import { IoLogInSharp, IoLogOutSharp, IoHome } from "react-icons/io5"
import { MdDashboard } from "react-icons/md"
import { PiBuildingFill } from "react-icons/pi"

import useAuth from "../../Hooks/useAuth"
import toast from "react-hot-toast"

const Navbar = () => {
  const { user, userSignOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const res = await userSignOut()
    if (res) {
      toast.success("Logged out", { position: "top-center" })
      navigate("/")
    }
  }

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-primary flex items-center gap-2"
              : "hover:text-primary flex items-center gap-2"
          }
          to="/"
        >
          <IoHome className="md:hidden" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-primary flex items-center gap-2"
              : "hover:text-primary flex items-center gap-2"
          }
          to="/apartments"
        >
          <PiBuildingFill className="md:hidden" /> Apartments
        </NavLink>
      </li>
    </>
  )

  const userMenu = (
    <>
      <li className="text-sm text-gray-400">{user?.displayName}</li>
      <li className="mt-4">
        <NavLink
          to="/dashboard"
          className="text-base flex items-center gap-2"
        >
          <MdDashboard className="text-xl" /> Dashboard
        </NavLink>
      </li>
      <li className="mt-1.5">
        <button
          onClick={handleSignOut}
          className="text-base text-error flex items-center gap-2"
        >
          {" "}
          <IoLogOutSharp className="text-xl" /> Logout
        </button>
      </li>
    </>
  )

  return (
    <div className="w-full h-full">
      <div className="fixed z-50 left-0 top-0 navbar text-white bg-secondary px-5 md:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="text-xl mr-5 lg:hidden"
            >
              <img
                src={menuIcon}
                className="w-7 h-7"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-secondary text-lg space-y-2 backdrop-blur-xl mt-5 z-[1] py-4 px-5 shadow rounded-xl w-60"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              className="w-10 h-10"
            />
            <span className="text-xl md:text-2xl font-ostt font-normal uppercase">
              Taj Apart
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end">
          <ul className="hidden lg:flex items-center font-medium gap-6 px-1 mr-10">
            {links}
          </ul>
          {user ? (
            <div className="">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      className="w-10 h-10"
                      src={user?.photoURL || "avatar.png"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] py-4 px-5 shadow dropdown-content bg-secondary backdrop-blur-lg rounded-box w-60"
                >
                  {userMenu}
                </ul>
              </div>
            </div>
          ) : (
            <div
              className="tooltip tooltip-left"
              data-tip="Login"
            >
              <Link to="/login">
                <button className="w-10 h-10 flex justify-center items-center text-2xl bg-[#00000033] hover:bg-primary transition-colors duration-300 rounded-full">
                  <IoLogInSharp />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
