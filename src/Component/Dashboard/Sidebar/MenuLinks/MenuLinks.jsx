import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"

const MenuLinks = ({ link, label, icon: Icon, badge }) => {
  return (
    <NavLink
      to={link}
      end
      className={({ isActive }) =>
        isActive
          ? "text-white font-medium py-2 flex items-center gap-3"
          : "text-primary hover:text-white font-medium py-2 flex items-center gap-3"
      }
    >
      <Icon className="text-xl" /> {label} {badge}
    </NavLink>
  )
}

MenuLinks.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.elementType,
  badge: PropTypes.number,
}

export default MenuLinks
