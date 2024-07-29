import useAuth from "./useAuth"

const useUsername = () => {
  const { user } = useAuth()

  const email = user?.email
  const username = email.split("@")[0]

  return username
}

export default useUsername
