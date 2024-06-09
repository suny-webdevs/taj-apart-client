import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"

const MenuLinks = ({ link, label, icon: Icon }) => {
  return (
    <NavLink
      to={link}
      end
      className={({ isActive }) =>
        isActive
          ? "text-primary py-2 flex items-center gap-3"
          : "text-white hover:text-primary py-2 flex items-center gap-3"
      }
    >
      <Icon className="text-xl" /> {label}
    </NavLink>
  )
}

MenuLinks.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default MenuLinks
