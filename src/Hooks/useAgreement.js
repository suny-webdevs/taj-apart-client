import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

const useAgreement = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: agreement, isLoading: agreementLoading } = useQuery({
    queryKey: ["agreement", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/agreements/${user?.email}`)
      return data
    },
  })
  return [agreement, agreementLoading]
}
export default useAgreement
