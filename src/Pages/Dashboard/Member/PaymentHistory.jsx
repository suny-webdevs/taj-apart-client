import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../Hooks/useAuth"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"

const PaymentHistory = () => {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()

  const { data: PaymentHistory = [] } = useQuery({
    queryKey: ["PaymentHistory"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/payments/${user?.email}`)
      return data
    },
  })

  console.log(PaymentHistory)

  return (
    <div className="p-5">
      <h1 className="text-3xl text-primary uppercase font-bold">
        payment history
      </h1>
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr className="text-sm">
                <th></th>
                <th className="font-semibold">Wallet</th>
                <th className="font-semibold">TrxID</th>
                <th className="font-semibold">Amount</th>
                <th className="font-semibold">Month</th>
                <th className="font-semibold">User Email</th>
                <th className="font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {PaymentHistory.map((payment, index) => (
                <tr
                  className="text-sm"
                  key={payment._id}
                >
                  <th className="font-semibold">{index + 1}</th>
                  <th className="font-semibold">{payment?.wallet}</th>
                  <th className="font-semibold">{payment?.trxID}</th>
                  <th className="font-semibold">{payment?.amount}</th>
                  <th className="font-semibold">{payment?.month}</th>
                  <th className="font-semibold">{payment?.user_email}</th>
                  <th className="font-semibold">{payment?.date}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PaymentHistory
