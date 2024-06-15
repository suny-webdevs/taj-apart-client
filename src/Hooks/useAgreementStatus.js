import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"
import useAuth from "./useAuth"

const useAgreementStatus = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: status, isLoading: statusLoading } = useQuery({
    queryKey: ["status", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/agreements/${user?.email}`)
      return data.status
    },
  })
  console.log(status)
  return [status, statusLoading]
}

export default useAgreementStatus
