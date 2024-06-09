import { Outlet } from "react-router-dom"
import Sidebar from "../Component/Dashboard/Sidebar/Sidebar"

const DashboardLayout = () => {
  return (
    <div className="relative md:flex">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Outlet */}
      <div className="flex-1 md:ml-64">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
