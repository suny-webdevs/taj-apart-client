import MenuLinks from "../MenuLinks/MenuLinks"
import { FaCircleUser } from "react-icons/fa6"
import { GrAnnounce } from "react-icons/gr"

const UserMenu = () => {
  return (
    <>
      <MenuLinks
        link={"/dashboard"}
        label={"My Profile"}
        icon={FaCircleUser}
      />
      <MenuLinks
        link={"/dashboard/announcements"}
        label={"Announcements"}
        icon={GrAnnounce}
      />
    </>
  )
}

export default UserMenu
