import { createBrowserRouter } from "react-router-dom"
import Main from "../Layouts/Main"
import Home from "../Pages/HomePage/Home"
import Error from "../Pages/ErrorPage/Error"
import Login from "../Pages/LoginPage/Login"
import SignUp from "../Pages/SignUpPage/SignUp"
import Apartments from "../Pages/Apartments/Apartments"
import Announcements from "../Pages/Dashboard/Announcements"
import DashboardLayout from "../Layouts/DashboardLayout"
import UserProfile from "../Pages/Dashboard/User/UserProfile"
import MemberProfile from "../Pages/Dashboard/Member/MemberProfile"
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "apartments",
        element: <Apartments />,
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "sign-up", element: <SignUp /> },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "user",
        element: <UserProfile />,
      },
      {
        path: "member",
        element: <MemberProfile />,
      },
      {
        path: "admin",
        element: <AdminProfile />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },
    ],
  },
])

export default router
