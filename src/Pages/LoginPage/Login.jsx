import { Helmet } from "react-helmet-async"
import googleIcon from "../../assets/Icons/google.svg"
import loginImage from "../../assets/Images/login-image.svg"
import useAuth from "../../Hooks/useAuth"
import { Link, useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Login = () => {
  const { googleSignIn, userSignIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirect = location?.state ? location?.state : "/"

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn()
      toast.success("Login successful", { position: "top-center" })
      navigate(redirect, { replace: true })
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()

    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      await userSignIn(email, password)
      toast.success("Login successful", { position: "top-center" })
      navigate(redirect, { replace: true })
    } catch (err) {
      if (err.message.includes("invalid-credential")) {
        toast.error("User not found, please sign up.", {
          position: "bottom-center",
        })
      }
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center gap-20 py-20">
      <Helmet>
        <title>Login | Taj Apart</title>
      </Helmet>
      <div className="w-1/2">
        <h1 className="uppercase text-5xl text-center text-secondary font-ostt font-bold mb-10">
          Login
        </h1>
        <img
          src={loginImage}
          className=""
        />
      </div>
      <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
        <form
          onSubmit={handleSignIn}
          className="card-body"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="bg-primary py-3 text-white rounded-lg"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-primary mb-5">
          New here?{" "}
          <Link
            to="/sign-up"
            className="font-semibold"
          >
            Create a new account
          </Link>
        </p>
        <p className="text-center mb-5">or login with</p>
        <div className="px-10 mb-10 flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="bg-white flex items-center text-gray-700 justify-center gap-x-3 text-sm sm:text-base rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5"
          >
            <img
              src={googleIcon}
              className="w-7 h-7"
            />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
