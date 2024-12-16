import  { useState,useEffect } from 'react'
import MyContext from './myContext';
import { databases } from '../../appwrite/AppWriteConfig';
import { Query } from 'appwrite';
import toast from 'react-hot-toast';


function MyState(props) {
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
            "673cc4bb001a61a37f34", // Replace with your database ID
            "673cc66000304f95b12b", // Replace with your collection ID
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
  const databaseId = '673cc4bb001a61a37f34'; // Replace with your Appwrite database ID
  const collectionId = '673cc66000304f95b12b'; // Replace with your Appwrite collection ID

  try {
      await databases.deleteDocument(databaseId, collectionId, id); // Delete the document using its ID
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