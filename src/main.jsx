import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import AuthProvider from "./Provider/AuthProvider"
import { RouterProvider } from "react-router-dom"
import router from "./Routers/Routes"
import { HelmetProvider } from "react-helmet-async"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
          <Toaster reverseOrder="false" />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
