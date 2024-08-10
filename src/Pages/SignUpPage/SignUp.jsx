import { Helmet } from "react-helmet-async"
import signUpImage from "../../assets/Images/signup-image.svg"
import useAuth from "../../Hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import SocialLogin from "../../Component/Shared/SocialLogin"
import { imageUpload } from "../../Utilities"
import "./styles.css"
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import useRole from "../../Hooks/useRole"

const SignUp = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [role] = useRole()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const signUpHandler = async ({ name, photo, email, password }) => {
    try {
      const photo_url = await imageUpload(photo[0])

      await createUser(email, password)
      await updateUserProfile(name, photo_url)

      // store user in bd
      const userInfo = {
        name: name,
        email: email,
        photo: photo_url,
        role: "user",
      }
      await axiosSecure.put("/users", userInfo)

      toast.success("Sign up successful", { position: "top-center" })
      if (role === "user") return navigate("/dashboard/u", { replace: true })
      if (role === "member") return navigate("/dashboard/m", { replace: true })
      if (role === "admin") return navigate("/dashboard/a", { replace: true })
      // }
    } catch (err) {
      console.log(err.message)
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

      // store user in bd
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        role: "user",
      }
      await axiosSecure("/users", userInfo)

      toast.success("Sign up successful", { position: "top-center" })
      if (role === "user") return navigate("/dashboard/u", { replace: true })
      if (role === "member") return navigate("/dashboard/m", { replace: true })
      if (role === "admin") return navigate("/dashboard/a", { replace: true })
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
              {...register("photo", { required: true })}
              className="file-input file-input-bordered"
            />

            {errors.photo && (
              <span className="text-error">Photo is required</span>
            )}
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
            {errors.email && (
              <span className="text-error">Email is required</span>
            )}
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
            {errors.password && (
              <span className="text-error">Password is required</span>
            )}
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
