import  { useContext } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

function AllBlogs() {
    const context = useContext(myContext);
    const { mode,getAllBlog } = context;
    const navigate=useNavigate()

    function createMarkup(c){
        return {__html:c};
    }
    

    return (
        <Layout>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto max-w-7xl ">
                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h1 className=' text-center text-2xl font-bold'
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                            All Blogs
                        </h1>
                    </div>
                    {/* Main Content  */}
                    <div className="flex flex-wrap justify-center -m-4 mb-5">
                        {/* Card 1  */}
                        {getAllBlog.length ? <>{getAllBlog.map((item,idx)=>{
                              const {title,thumbnail,content,date,id}=item

                            return(
                                <div className="p-4 lg:h-[70vh] xs:h-[60vh] w-full lg:w-96 md:w-1/3 sm:w-1/2" key={idx} >
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
                                className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                                ${mode === 'dark'
                                    ? 'shadow-gray-700'
                                    : 'shadow-xl'
                                    } 
                                rounded-xl overflow-hidden`} 
                            >
                                {/* Blog Thumbnail  */}
                                <img className=" w-full h-60 object-fill" src={thumbnail} alt="blog" />

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
                                    <p className="leading-relaxed mb-3 truncate" style={{
                                        color: mode === 'dark'
                                            ? 'rgb(226, 232, 240)'
                                            : ' rgb(30, 41, 59)'
                                    }} dangerouslySetInnerHTML={createMarkup(content)}>
                                       
                                    </p>

                                    <button onClick={()=>navigate(`/bloginfo/${id}`)} className='text-white bg-black p-2 w-full hover:bg-white hover:text-black mt-2 text-center border-2 rounded-lg border-black'>read more</button>
                                </div>
                            </div>
                        </div>
                            )
                        })}</>:<h1>No Blogs Found !!</h1>}
                    </div>
                </div>
            </section >
        </Layout >
    )
}

export default AllBlogs