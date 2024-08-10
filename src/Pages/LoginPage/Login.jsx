import { Helmet } from "react-helmet-async"
import loginImage from "../../assets/Images/login-image.svg"
import useAuth from "../../Hooks/useAuth"
import { Link, useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import SocialLogin from "../../Component/Shared/SocialLogin"
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import useRole from "../../Hooks/useRole"

const Login = () => {
  const { userSignIn, googleSignIn } = useAuth()
  const [isLoading] = useRole()

  const axiosSecure = useAxiosSecure()

  const navigate = useNavigate()
  const location = useLocation()

  // Form login
  const handleSignIn = async (e) => {
    e.preventDefault()

    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      await userSignIn(email, password)

      navigate(location?.state ? location?.state : "/dashboard", {
        replace: true,
      })

      // if (role === "user") {
      //   navigate(location?.state ? location?.state : "/dashboard/u", {
      //     replace: true,
      //   })
      //   toast.success("Login successful", { position: "top-center" })
      // }

      // if (role === "member") {
      //   navigate(location?.state ? location?.state : "/dashboard/m", {
      //     replace: true,
      //   })
      //   toast.success("Login successful", { position: "top-center" })
      // }

      // if (role === "admin") {
      //   navigate(location?.state ? location?.state : "/dashboard/a", {
      //     replace: true,
      //   })
      //   toast.success("Login successful", { position: "top-center" })
      // }
    } catch (err) {
      if (err.message.includes("invalid-credential")) {
        toast.error("User not found, please sign up.", {
          position: "bottom-center",
        })
      }
    }
  }

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const { user } = await googleSignIn()

      // store user in bd
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        role: "user",
      }
      // await putUser(userInfo)
      await axiosSecure.put("/users", userInfo)
      toast.success("Login successful", { position: "top-center" })

      navigate(location?.state ? location?.state : "/dashboard", {
        replace: true,
      })

      // if (role === "user")
      //   navigate(location?.state ? location?.state : "/dashboard/u", {
      //     replace: true,
      //   })
      // if (role === "member")
      //   navigate(location?.state ? location?.state : "/dashboard/m", {
      //     replace: true,
      //   })
      // if (role === "admin")
      //   navigate(location?.state ? location?.state : "/dashboard/a", {
      //     replace: true,
      //   })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-20 md:py-20 p-5">
      <Helmet>
        <title>Login | Taj Apart</title>
      </Helmet>
      <div className="w-1/2 hidden md:flex">
        <img src={loginImage} />
      </div>
      <div className="card shrink-0 w-full max-w-md border bg-base-100">
        <h1 className="uppercase text-4xl text-center text-secondary font-ostt font-bold mt-10">
          Login
        </h1>
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
              {isLoading ? "Loading..." : "Login"}
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
          <SocialLogin handleGoogleLogin={handleGoogleLogin} />
        </div>
      </div>
    </div>
  )
}

export default Login
