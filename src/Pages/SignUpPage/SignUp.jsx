import { Helmet } from "react-helmet-async"
import signUpImage from "../../assets/Images/signup-image.svg"
import useAuth from "../../Hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import "./styles.css"
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import SocialLogin from "../../Component/Shared/SocialLogin"
import axios from "axios"

const SignUp = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth()
  const axiosPublic = useAxiosPublic()

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const signUpHandler = async ({ name, photo, email, password }) => {
    const formData = new FormData()
    formData.append("image", photo[0])

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      )

      await createUser(email, password)
      await updateUserProfile(name, data.data.display_url)

      const userInfo = {
        name: name,
        email: email,
        photo: data.data.display_url,
        role: "user",
      }

      const res = await axiosPublic.post("/users", userInfo)
      if (res.data.insertedId || data.insertedId === null) {
        toast.success("Sign up successful", { position: "top-center" })
        navigate("/")
      }
    } catch (err) {
      if (err.message.includes("email-already-in-use")) {
        toast.error("User already exists, please login", {
          position: "bottom-center",
        })
      }
    }
  }

  // Google sign up
  const handleGoogleSignUp = async () => {
    try {
      const { user } = await googleSignIn()
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "user",
      }
      const { data } = await axiosPublic.post("/users", userInfo)
      if (data.insertedId || data.insertedId === null) {
        toast.success("Sign up successful", { position: "top-center" })
        navigate("/")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-row-reverse items-center justify-center gap-20 md:py-20 p-5">
      <Helmet>
        <title>Sign up | Taj Apart</title>
      </Helmet>
      <div className="w-1/2 hidden md:flex">
        <img
          src={signUpImage}
          className="p-20"
        />
      </div>
      <div className="card shrink-0 w-full max-w-md border bg-base-100">
        <h1 className="uppercase text-4xl text-center text-secondary font-ostt font-bold mt-10">
          Sign up
        </h1>
        <form
          onSubmit={handleSubmit(signUpHandler)}
          className="card-body"
        >
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-error">Name is required</span>
            )}
          </div>
          {/* Photo */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              placeholder="Photo"
              {...register("photo")}
              className="file-input file-input-bordered"
            />
          </div>
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              {...register("email", { required: true })}
              className="input input-bordered"
            />
            {errors.email && <span>This field is required</span>}
          </div>
          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
              className="input input-bordered"
            />
            {errors.password && <span>This field is required</span>}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="bg-primary py-3 text-white rounded-lg"
            >
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
          <SocialLogin handleGoogleSignUp={handleGoogleSignUp} />
        </div>
      </div>
    </div>
  )
}

export default SignUp
