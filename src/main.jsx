import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import AuthProvider from "./Provider/AuthProvider"
import { RouterProvider } from "react-router-dom"
import router from "./Routers/Routes"
import { HelmetProvider } from "react-helmet-async"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
        <Toaster reverseOrder="false" />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
)
