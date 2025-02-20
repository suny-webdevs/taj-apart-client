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
import PrivateRoute from "./PrivateRoute"
import AdminRoute from "./AdminRoute"
import MemberRoute from "./MemberRoute"
import ManageMembers from "../Pages/Dashboard/Admin/ManageMembers"
import MakeAnnouncements from "../Pages/Dashboard/Admin/MakeAnnouncements"
import AgreementRequests from "../Pages/Dashboard/Admin/AgreementRequests"
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons"
import MakePayment from "../Pages/Dashboard/Member/MakePayment"
import PaymentHistory from "../Pages/Dashboard/Member/PaymentHistory"
import Payment from "../Pages/Dashboard/Member/Payment"
import Dashboard from "../Pages/Dashboard/Dashboard"

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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: `u`,
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },

      // Member routes
      {
        path: `m`,
        element: (
          <PrivateRoute>
            <MemberRoute>
              <MemberProfile />
            </MemberRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "m/make-payment",
        element: (
          <PrivateRoute>
            <MemberRoute>
              <MakePayment />
            </MemberRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "m/payment",
        element: (
          <PrivateRoute>
            <MemberRoute>
              <Payment />
            </MemberRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "m/payment-history",
        element: (
          <PrivateRoute>
            <MemberRoute>
              <PaymentHistory />
            </MemberRoute>
          </PrivateRoute>
        ),
      },

      // Admin routes
      {
        path: `a`,
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "a/manage-members",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageMembers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "a/make-announcement",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <MakeAnnouncements />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "a/agreement-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AgreementRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "a/manage-coupons",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCoupons />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "announcements",
        element: (
          <PrivateRoute>
            <Announcements />
          </PrivateRoute>
        ),
      },
    ],
  },
])

export default router
