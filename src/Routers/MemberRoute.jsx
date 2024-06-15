import PropTypes from "prop-types"
import LoadingSpinner from "../Component/Shared/LoadingSpinner"
import { Navigate } from "react-router-dom"
import useRole from "../Hooks/useRole"

const MemberRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === "member") return children

  return <Navigate to={"/"} />
}

MemberRoute.propTypes = {
  children: PropTypes.element,
}

export default MemberRoute
