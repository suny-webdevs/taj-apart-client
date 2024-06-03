import { Helmet } from "react-helmet-async"
import googleIcon from "../../assets/Icons/google.svg"
import signUpImage from "../../assets/Images/signup-image.svg"
import useAuth from "../../Hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import "./styles.css"

const SignUp = () => {
  const { googleSignIn } = useAuth()
  const navigate = useNavigate()

  const redirect = "/"

  const handleGoogleLogin = async () => {
    const res = await googleSignIn()
    if (res) {
      toast.success("Login successful", { position: "top-center" })
      navigate(redirect)
    }
  }

  return (
    <div className="w-full h-full flex flex-row-reverse items-center justify-center gap-20 py-20">
      <Helmet>
        <title>Sign up | Taj Apart</title>
      </Helmet>
      <div className="w-1/2">
        <h1 className="uppercase text-5xl text-center text-secondary font-ostt font-bold mb-10">
          Sign up
        </h1>
        <img
          src={signUpImage}
          className="p-20"
        />
      </div>
      <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              placeholder="Photo"
              className="file-input file-input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
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
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="bg-primary py-3 text-white rounded-lg">
              Sign up
            </button>
          </div>
        </form>
        <p className="text-center text-primary mb-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold"
          >
            Goto Login
          </Link>
        </p>
        <p className="text-center mb-5">or sign up with</p>
        <div className="px-10 mb-10 flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="bg-white flex items-center text-gray-700 justify-center gap-x-3 text-sm sm:text-base rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5"
          >
            <img
              src={googleIcon}
              className="w-7 h-7"
            />
            <span>Sign up with Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
