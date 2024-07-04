import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure.jsx"
import useAuth from "./useAuth.jsx"

const useAgreement = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: agreement = [], isLoading: agreementLoading } = useQuery({
    queryKey: ["agreement", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/agreements/${user?.email}`)
      return data
    },
  })
  return [agreement, agreementLoading]
}
export default useAgreement
