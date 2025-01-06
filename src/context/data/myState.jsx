import  { useState,useEffect } from 'react'
import MyContext from './myContext';
import { databases } from '../../appwrite/AppWriteConfig';
import { Query } from 'appwrite';
import toast from 'react-hot-toast';


function MyState(props) {

  
  //  Constants for Appwrite
   const STORAGE_BUCKET_ID = import.meta.env.VITE_STORAGE_BUCKET_ID;
   const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
   const BlogCOLLECTION_ID = import.meta.env.VITE_BLOG_COLLECTION_ID;

   const Editior_Key = import.meta.env.VITE_EDITIOR_KEY;

    const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'black';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }
    const [searchkey, setSearchkey] = useState('')
    const [loading, setLoading] = useState(false);
    const [getAllBlog, setGetAllBlog] = useState([]);
    


    function getAllBlogs() {
    
      
      
        setLoading(true);
        try {
          const promise = databases.listDocuments(
            DATABASE_ID, // Replace with your database ID
            BlogCOLLECTION_ID, // Replace with your collection ID
            [Query.orderAsc("time")] // Sorting by 'time' field in ascending order
          );
      
          promise.then(
            (response) => {
              const blogArray = response.documents.map((doc) => ({
                ...doc,
                id: doc.$id, // Appwrite uses $id for document IDs
              }));
      
              setGetAllBlog(blogArray);
              setLoading(false);
            },
            (error) => {
              console.error(error);
              setLoading(false);
            }
          );
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      
      useEffect(() => {
        getAllBlogs();
        window.scrollTo(0, 0)
      }, []);

      // console.log('this is get all blogs',getAllBlog);


const deleteBlogs = async (id) => {


  try {
      await databases.deleteDocument(DATABASE_ID, BlogCOLLECTION_ID, id); // Delete the document using its ID
      await getAllBlogs(); // Refresh the blog list
      toast.success("Blog deleted successfully");
  } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error("Failed to delete the blog");
  }
};
      


    return (
        <MyContext.Provider value={{ mode, toggleMode,searchkey,setSearchkey,loading,setLoading,getAllBlog,deleteBlogs }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState