import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../Hooks/useAuth"
import LoadingSpinner from "../Component/Shared/LoadingSpinner"
import PropTypes from "prop-types"

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingSpinner />
  if (user) return children

  return (
    <Navigate
      to="/login"
      state={location?.pathname}
      replace="true"
    />
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
}

export default PrivateRoute
