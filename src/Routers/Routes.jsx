import { createBrowserRouter } from "react-router-dom"
import Main from "../Layouts/Main"
import Home from "../Pages/HomePage/Home"
import Error from "../Pages/ErrorPage/Error"
import Login from "../Pages/LoginPage/Login"
import SignUp from "../Pages/SignUpPage/SignUp"
import Apartments from "../Pages/Apartments/Apartments"

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
])

export default router
