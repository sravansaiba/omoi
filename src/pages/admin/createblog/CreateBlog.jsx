import { useContext } from 'react';
import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import myContext from '../../../context/data/myContext';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import { Client, Databases, Storage } from "appwrite";
import { v4 as uuidv4 } from "uuid";
import toast from 'react-hot-toast';




// Initialize Appwrite Client
const client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
    .setProject("omoi-community"); // Replace with your Appwrite Project ID

const databases = new Databases(client);
const storage = new Storage(client);

const CreateBlog = () => {
    const context = useContext(myContext);
    const { mode } = context;
    const navigate = useNavigate();

    // Constants for Appwrite
    const STORAGE_BUCKET_ID = import.meta.env.VITE_STORAGE_BUCKET_ID;
    const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
    const BlogCOLLECTION_ID = import.meta.env.VITE_BLOG_COLLECTION_ID;

    const Editior_Key = import.meta.env.VITE_EDITIOR_KEY;

    // console.log(DATABASE_ID)

    const [blogs, setBlogs] = useState({
        title: "",
        category: "",
        content: "",
        time: new Date().toISOString(),
    });
    const [thumbnail, setThumbnail] = useState();

    const addPost = () => {
        if (!blogs.title || !blogs.category || !blogs.content || !thumbnail) {
            return toast.error("All fields are required");
        }
        uploadImage();
    };

    const uploadImage = () => {
        if (!thumbnail) return;

        
        const fileId = uuidv4(); // Generate a unique ID for the file

        // Step 1: Upload the image to Appwrite storage
        storage.createFile(STORAGE_BUCKET_ID, fileId, thumbnail)
            .then((uploadedFile) => {
                // Step 2: Get the public URL for the uploaded file
                const fileUrl = storage.getFileView(STORAGE_BUCKET_ID, uploadedFile.$id);

                // Step 3: Add the blog post to the Appwrite database
                return databases.createDocument(
                    DATABASE_ID,
                    BlogCOLLECTION_ID,
                    uuidv4(), // Unique ID for the blog post
                    {
                        title:blogs.title,
                        thumbnail: fileUrl, // Store the image URL
                        category: blogs.category,
                        content: blogs.content,
                        time: new Date().toISOString(), // Use ISO string for the timestamp
                        date: new Date().toLocaleString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }),
                    }
                );
            })
            .then(() => {
                toast.success("Post Added Successfully");
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error("Error:", error.message);
                toast.error("Failed to add post");
            });
    };

    return (
        <div className='container mx-auto max-w-5xl py-6'>
            <div className="p-5" style={{
                background: mode === 'dark'
                    ? '#353b48'
                    : 'rgb(226, 232, 240)',
                borderBottom: mode === 'dark'
                    ? '4px solid rgb(226, 232, 240)'
                    : '4px solid rgb(30, 41, 59)'
            }}>
                {/* Top Item */}
                <div className="mb-2 flex justify-between">
                    <div className="flex gap-2 items-center">
                        {/* Dashboard Link */}
                        <Link to={'/dashboard'}>
                            <BsFillArrowLeftCircleFill size={25} />
                        </Link>

                        {/* Text */}
                        <Typography
                            variant="h4"
                            style={{
                                color: mode === 'dark'
                                    ? 'white'
                                    : 'black'
                            }}
                        >
                            Create Blog
                        </Typography>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mb-3">
                    {/* Thumbnail */}
                    {thumbnail && <img className="w-full rounded-md mb-3"
                        src={thumbnail
                            ? URL.createObjectURL(thumbnail)
                            : ""}
                        alt="thumbnail"
                    />}

                    {/* Text */}
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-semibold"
                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                    >
                        Upload Thumbnail
                    </Typography>

                    {/* Thumbnail Input */}
                    <input
                        type="file"
                        className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                </div>

                {/* Title Input */}
                <div className="mb-3">
                    <input
                        placeholder="Enter Your Title"
                        className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 outline-none"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        value={blogs.title}
                        onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
                    />
                </div>

                {/* Category Input */}
                <div className="mb-3">
                    <input
                        placeholder="Enter Your Category"
                        className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 outline-none"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        value={blogs.category}
                        onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
                    />
                </div>

                {/* Editor */}
                <Editor
                    apiKey={Editior_Key}
                    onEditorChange={(newValue, editor) => {
                        setBlogs({ ...blogs, content: newValue });
                    }}
                    init={{
                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                    }}
                />

                {/* Submit Button */}
                <Button className="w-full mt-5"
                    onClick={addPost}
                    style={{
                        background: mode === 'dark'
                            ? 'rgb(226, 232, 240)'
                            : 'rgb(30, 41, 59)',
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default CreateBlog;
