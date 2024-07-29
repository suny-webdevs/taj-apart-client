import MenuLinks from "../MenuLinks/MenuLinks"
import { FaCircleUser } from "react-icons/fa6"
import { FaUsers } from "react-icons/fa"
import { GrAnnounce, GrDocumentTime } from "react-icons/gr"
import { RiCoupon3Fill } from "react-icons/ri"

const AdminMenu = () => {
  return (
    <>
      <MenuLinks
        link={"/dashboard/a"}
        label={"My Profile"}
        icon={FaCircleUser}
      />
      <MenuLinks
        link={"/dashboard/a/manage-members"}
        label={"Manage Members"}
        icon={FaUsers}
      />
      <MenuLinks
        link={"/dashboard/a/make-announcement"}
        label={"Make Announcement"}
        icon={GrAnnounce}
      />
      <MenuLinks
        link={"/dashboard/a/agreement-requests"}
        label={"Agreement Requests"}
        icon={GrDocumentTime}
      />
      <MenuLinks
        link={"/dashboard/a/manage-coupons"}
        label={"Manage Coupons"}
        icon={RiCoupon3Fill}
      />
    </>
  )
}

export default AdminMenu
