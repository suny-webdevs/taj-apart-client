import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import useRole from "../Hooks/useRole"
import LoadingSpinner from "../Component/Shared/LoadingSpinner"

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === "admin") return children

  return <Navigate to={"/"} />
}

AdminRoute.propTypes = {
  children: PropTypes.element,
}

export default AdminRoute
