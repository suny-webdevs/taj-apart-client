import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../Hooks/useAuth"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"

const PaymentHistory = () => {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()

  const { data: paymentInfo = [] } = useQuery({
    queryKey: ["paymentInfo"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/payments/${user?.email}`)
      return data
    },
  })

  console.log(paymentInfo)

  return (
    <div className="p-5">
      <h1 className="text-3xl text-primary uppercase font-bold">
        payment history
      </h1>
    </div>
  )
}

export default PaymentHistory
