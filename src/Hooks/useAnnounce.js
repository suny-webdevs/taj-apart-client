import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useAnnounce = () => {
  const axiosPublic = useAxiosPublic()

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosPublic("/announcements")
      return data
    },
  })

  return [announcements, isLoading]
}

export default useAnnounce
