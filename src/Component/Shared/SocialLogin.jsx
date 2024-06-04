import toast from "react-hot-toast"
import useAuth from "../../Hooks/useAuth"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import googleIcon from "../../assets/Icons/google.svg"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

const SocialLogin = ({ root }) => {
  const { googleSignIn } = useAuth()
  const axiosPublic = useAxiosPublic()

  const navigate = useNavigate()

  const redirect = location?.state ? location?.state : "/"

  const handleGoogleLogin = async () => {
    try {
      const { user } = await googleSignIn()

      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        role: "user",
      }

      try {
        const { data } = await axiosPublic.post("/users", userInfo)
        if (data.insertedId) {
          toast.success("Login successful", { position: "top-center" })
          navigate(root ? root : redirect, { replace: true })
        }
      } catch (err) {
        console.log(err.message)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="bg-white flex items-center text-gray-700 justify-center gap-x-3 text-sm sm:text-base rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5"
      >
        <img
          src={googleIcon}
          className="w-7 h-7"
        />
        <span>{root ? "Sign up" : "Login"} with Google</span>
      </button>
    </div>
  )
}

SocialLogin.propTypes = {
  root: PropTypes.string,
}

export default SocialLogin
