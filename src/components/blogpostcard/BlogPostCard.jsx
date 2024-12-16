import myContext from "../../context/data/myContext";
import { useContext } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function BlogPostCard() {
  const context = useContext(myContext);
  const { mode,getAllBlog } = context;
  const navigate=useNavigate()

  function createMarkup(c){
    return {__html:c};
  }

  return (
    <div>
      <section className="text-gray-600 body-font max-w-full">
        <div className="container px-5 py-10 mx-auto max-w-37xl ">
          {/* Main Content  */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {/* Card 1  */}
            {getAllBlog.length>0?<>{getAllBlog.map((item,idx)=>{
              const {thumbnail,date,title,content,id}=item
              // const trimcontent = content.length>150? content.slice(0,50)+'...':content

              return (<div className="p-4 h-[60vh] w-full lg:w-96 md:w-1/3 sm:w-1/2" key={idx} >
                <div 
                  style={{
                    background: mode === 'dark'
                      ? 'black'
                      : 'white',
                    borderBottom: mode === 'dark'
                      ?
                      ' 4px solid rgb(226, 232, 240)'
                      : ' 4px solid rgb(30, 41, 59)'
                  }}
                  className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                 rounded-xl overflow-hidden`} 
                >
                  {/* Blog Thumbnail  */}
                  <img  onClick={()=>{navigate(`/bloginfo/${id}`)}} className="h-60 w-full object-cover"  src={thumbnail} alt="blog" />
                  {/* Top Items  */}
                  <div className="p-6">
                    {/* Blog Date  */}
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{
                      color: mode === 'dark'
                        ? 'rgb(226, 232, 240)'
                        : ' rgb(30, 41, 59)'
                    }}>
                      {date}
                    </h2>
                    {/* Blog Title  */}
                    <h1 className="title-font text-lg font-bold text-gray-900 mb-3" style={{
                      color: mode === 'dark'
                        ? 'rgb(226, 232, 240)'
                        : ' rgb(30, 41, 59)'
                    }}>
                      {title}
                    </h1>
                    {/* Blog Description  */}
                    <p className="leading-relaxed mb-3 truncate"  style={{
                      color: mode === 'dark'
                        ? 'rgb(226, 232, 240)'
                        : ' rgb(30, 41, 59)'
                    }}
                    dangerouslySetInnerHTML={createMarkup(content)}
                    >
                    </p>
                  </div>
                </div>
              </div>)
            })}</>:<h1>Not Found</h1>}
           
          </div>
          {/* See More Button  */}
          <div className="flex justify-center my-5">
            <Button
            onClick={()=>navigate('/allblogs')}
              style={{
                background: mode === 'dark'
                  ? 'white'
                  : 'black',
                color: mode === 'dark'
                  ?
                  'black'
                  : 'white'
              }}>View More
            </Button>
          </div>
        </div>
      </section >
    </div >
  )
}

