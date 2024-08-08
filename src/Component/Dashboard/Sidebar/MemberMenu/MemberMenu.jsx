import MenuLinks from "../MenuLinks/MenuLinks"
import { FaCircleUser } from "react-icons/fa6"
import { MdPayment } from "react-icons/md"
import { FaHistory } from "react-icons/fa"
import { GrAnnounce } from "react-icons/gr"
import useAnnounce from "../../../../Hooks/useAnnounce"

const MemberMenu = () => {
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
        link={"/dashboard/m"}
        label={"My Profile"}
        icon={FaCircleUser}
      />
      <MenuLinks
        link={"/dashboard/m/make-payment"}
        label={"Make Payment"}
        icon={MdPayment}
      />
      <MenuLinks
        link={"/dashboard/m/payment-history"}
        label={"Payment History"}
        icon={FaHistory}
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

export default MemberMenu
