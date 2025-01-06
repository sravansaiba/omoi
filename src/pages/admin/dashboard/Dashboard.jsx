import { useContext } from "react";
import Layout from "../../../components/layout/Layout";
import myContext from "../../../context/data/myContext";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../../appwrite/AppWriteConfig";
import { useEffect } from "react";

function Dashboard() {
  const context = useContext(myContext);
  const { mode, getAllBlog,setLoading,deleteBlogs } = context;
  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
    setLoading(false)
    },1000)
  })
console.log(getAllBlog)

  const logout = async () => {
    try {
      await account.deleteSessions("current");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout Error", error);
    }
  };
  return (
    <Layout>
      <div className="py-10">
        <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="left">
            <img
              className=" w-40 h-40  object-cover rounded-full border-2 border-pink-600 p-1"
              src={"https://cdn-icons-png.flaticon.com/128/3135/3135715.png"}
              alt="profile"
            />
          </div>
          <div className="right">
            <h1
              className="text-center font-bold text-2xl mb-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Sravan Saiba
            </h1>

            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              Software Developer
            </h2>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              sravansaiba@gmail.com
            </h2>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              <span>Total Blog : {getAllBlog.length} </span> 
            </h2>
            <div className=" flex gap-2 mt-2">
              <Link to={"/createblog"}>
                <div className=" mb-2">
                  <Button
                    style={{
                      background: mode === "dark" ? "white" : "black",
                      color: mode === "dark" ? "black" : "white",
                    }}
                    className="px-8 py-2"
                  >
                    Create Blog
                  </Button>
                </div>
              </Link>
              <div className="mb-2">
                <Button
                  style={{
                    background: mode === "dark" ? "white" : "black",
                    color: mode === "dark" ? "black" : "white",
                  }}
                  onClick={logout}
                  className="px-8 py-2"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Line  */}
        <hr
          className={`border-2
                 ${mode === "dark" ? "border-gray-300" : "border-gray-400"}`}
        />

        {/* Table  */}
        <div className="">
          <div className=" container mx-auto px-4 max-w-7xl my-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
              {/* table  */}
              <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                {/* thead  */}
                <thead
                  style={{
                    background: mode === "dark" ? "white" : "black",
                  }}
                  className="text-xs "
                >
                  <tr>
                    <th
                      style={{ color: mode === "dark" ? "black" : "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      S.No
                    </th>
                    <th
                      style={{ color: mode === "dark" ? "black" : "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Thumbnail
                    </th>
                    <th
                      style={{ color: mode === "dark" ? "black" : "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Title
                    </th>
                    <th
                      style={{ color: mode === "dark" ? "black" : "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Category
                    </th>
                    <th
                      style={{ color: mode === "dark" ? "black" : "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Date
                    </th>
                    <th
                      style={{ color: mode === "dark" ? "black" : "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                {/* tbody  */}
                {getAllBlog.length > 0 ? 
                  <>
                    {getAllBlog.map((item, index) => {
                        console.log(item);
                        const {thumbnail,date,id}=item
                        
                      return (
                        <tbody key={index}>
                          <tr
                            className=" border-b-2"
                            style={{
                              background:
                                mode === "dark" ? "black   " : "white",
                            }}
                          >
                            {/* S.No   */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {index+1}.
                            </td>

                            {/* Blog Thumbnail  */}
                            <th
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              scope="row"
                              className="px-6 py-4 font-medium "
                            >
                              {/* thumbnail  */}
                              <img
                                className="w-16 rounded-lg"
                                src={
                                  thumbnail
                                }
                                alt="thumbnail"
                              />
                            </th>

                            {/* Blog Title  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {item.title}
                            </td>

                            {/* Blog Category  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {item.category}
                            </td>

                            {/* Blog Date  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {date}
                            </td>

                            {/* Delete Blog  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              <button 
                              onClick={()=>deleteBlogs(id)}
                              className=" px-4 py-1 rounded-lg text-white font-bold bg-red-500">
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </>
                : (
                  <h1>Not Found</h1>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
