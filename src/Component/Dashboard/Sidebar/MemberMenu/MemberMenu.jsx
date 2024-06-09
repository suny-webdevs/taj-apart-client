import MenuLinks from "../MenuLinks/MenuLinks"
import { FaCircleUser } from "react-icons/fa6"
import { MdPayment } from "react-icons/md"
import { FaHistory } from "react-icons/fa"
import { GrAnnounce } from "react-icons/gr"

const MemberMenu = () => {
  return (
    <>
      <MenuLinks
        link={"/dashboard/member"}
        label={"My Profile"}
        icon={FaCircleUser}
      />
      <MenuLinks
        link={"/dashboard/payment"}
        label={"Make Payment"}
        icon={MdPayment}
      />
      <MenuLinks
        link={"/dashboard/payment-history"}
        label={"Payment History"}
        icon={FaHistory}
      />
      <MenuLinks
        link={"/dashboard/announcements"}
        label={"Announcements"}
        icon={GrAnnounce}
      />
    </>
  )
}

export default MemberMenu
