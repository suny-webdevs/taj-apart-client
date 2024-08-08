import MenuLinks from "../MenuLinks/MenuLinks"
import { FaCircleUser } from "react-icons/fa6"
import { GrAnnounce } from "react-icons/gr"
import useAnnounce from "../../../../Hooks/useAnnounce"

const UserMenu = () => {
  const [announcements] = useAnnounce()

  const announceBadge = (
    <>
      <div className="bg-primary text-secondary text-sm rounded-full badge border-none tracking-wide">
        {announcements.length < 10 ? "0" : ""}
        {announcements.length}
      </div>
    </>
  )

  return (
    <>
      <MenuLinks
        link={"/dashboard/u"}
        label={"My Profile"}
        icon={FaCircleUser}
      />
      <MenuLinks
        link={"/dashboard/announcements"}
        label={"Announcements"}
        icon={GrAnnounce}
        badge={announceBadge}
      />
    </>
  )
}

export default UserMenu
