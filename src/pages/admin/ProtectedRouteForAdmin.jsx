import { Navigate } from "react-router-dom"
export const ProtectedRouteForAdmin = ({ children }) => {
    const user = localStorage.getItem('role')
    if (user === "admin") {
      return children
    }
    return <Navigate to={'/adminlogin'}/>
  }