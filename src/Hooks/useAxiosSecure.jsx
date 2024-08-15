import axios from "axios"
import useAuth from "./useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { userSignOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        console.log("Axios interceptors error", error.response)
        if (error.response.status === 401 || error.response.status === 403) {
          await userSignOut()
          navigate("/login")
        }
        return Promise.reject(error)
      }
    )
  }, [navigate, userSignOut])

  return axiosSecure
}

export default useAxiosSecure
