import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Query, ID } from 'appwrite'; // Ensure ID is imported
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import Comment from '../../components/comment/Comment';
import toast from 'react-hot-toast';
import { databases } from '../../appwrite/AppWriteConfig';
import { BiCategory } from 'react-icons/bi';

function BlogInfo() {
  const context = useContext(myContext);
  const { mode, loading, getAllBlog } = context;
  const { id } = useParams(); // Get the blog ID from URL params
  const blogPost = getAllBlog?.find((blog) => blog.id === id);

  const [fullName, setFullName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [allComment, setAllComment] = useState([]);

  const addComment = async () => {
    const databaseId = '673cc4bb001a61a37f34'; // Replace with your database ID
    const collectionId = '673eb4df0034cc88add2'; // Replace with your collection ID

    try {
      await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(), // Generate a unique ID for the comment
        {
          fullName,
          commentText,
          time: new Date().toISOString(),
          date: new Date().toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }),
          blogId: id // Ensure the comment is linked to the correct blog post
        }
      );

      toast.success('Comment Added Successfully');
      setFullName('');
      setCommentText('');
      getcomment(); // Refresh comments after adding a new one
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const getcomment = async () => {
    const databaseId = '673cc4bb001a61a37f34';
    const collectionId = '673eb4df0034cc88add2';

    try {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [
          Query.equal('blogId', id), // Filter comments by blog ID
          Query.orderDesc('time'), // Order by time (descending)
        ]
      );
      const comments=response.documents.map((doc)=>({...doc,id:doc.$id,}))

      setAllComment(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    if(id){
      getcomment();
    }
     // Fetch comments on component load
     },[]); 

  return (
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
        <div className="py-4 lg:py-8">
          {loading ? (
            <Loader />
          ) : (
            <>
              {blogPost ? (
                <div>
                  <img
                    alt="content"
                    className="mb-3 rounded-lg h-full w-full"
                    src={blogPost.thumbnail}
                  />
                  <div className="flex justify-between items-center mb-3">
                    <h1
                      style={{ color: mode === 'dark' ? 'white' : 'black' }}
                      className="text-xl md:text-2xl mt-5 mb-5 lg:text-2xl font-semibold"
                    >
                      {blogPost.title}
                    </h1>
                    <p style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                      {blogPost.date}
                    </p>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                    className={`border-b mb-5  ${
                      mode === 'dark'
                        ? 'border-white text-white'
                        : 'border-black text-black'
                    }`}
                  />
                </div>
              ) : (
                <h1>No Blogs Found</h1>
              )}
            </>
          )}
        </div>
      </section>
      <Comment
        addComment={addComment}
        commentText={commentText}
        setCommentText={setCommentText}
        allComment={allComment}
        fullName={fullName}
        setFullName={setFullName}
      />
    </Layout>
  );
}

export default BlogInfo;
