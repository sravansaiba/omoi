import { Button } from "@material-tailwind/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import Blog from "./pages/blog/Blog";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import Nopage from "./pages/nopage/Nopage";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import MyState from "./context/data/myState";
import {Toaster} from "react-hot-toast"
import CreateBlog from "./pages/admin/createblog/CreateBlog";
import { ProtectedRouteForAdmin } from "./pages/admin/ProtectedRouteForAdmin";

export default function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<ProtectedRouteForAdmin><Dashboard/></ProtectedRouteForAdmin>} />
          <Route path="/createblog" element={<CreateBlog/>} />
          <Route path="/*" element={<Nopage />} />
        </Routes>
        <Toaster/>
      </Router>
    </MyState>
  );
}
