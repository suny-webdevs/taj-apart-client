import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useApartments = () => {
  const axiosPublic = useAxiosPublic()
  const {
    data: apartments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/apartments")
      return data
    },
  })

  return [apartments, isLoading, refetch]
}

export default useApartments
