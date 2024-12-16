import React from "react";
import {
    Navbar,
    Typography,
    IconButton,
    Avatar,
    Collapse,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShareAlt, AiOutlineSearch } from 'react-icons/ai'
import myContext from "../../context/data/myContext";
import SearchDialog from "../searchdialog/SearchDialog";
import ShareDialogBox from "../sharedialogbox/ShareDialogBox";
import { IoIosLogOut } from "react-icons/io";
import { account } from "../../appwrite/AppWriteConfig";
import { useNavigate } from "react-router-dom";


export default function Nav() {
    const [openNav, setOpenNav] = React.useState(false);
    const navigate=useNavigate()

    const context = useContext(myContext);
    const { mode, toggleMode } = context;
  const role = localStorage.getItem('role');


  const logout = async () => {
    try {
      await account.deleteSessions("current");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

    // All NavList 
    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal transition-transform duration-200 lg:hover:scale-110 "
                style={{ color: mode === 'dark' ? 'black' : 'white' }}
            >
                <Link to={'/'} className="flex items-center hover:text-red-700">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal transition-transform duration-200 lg:hover:scale-110"
                style={{ color: mode === 'dark' ? 'black' : 'white' }}
            >
                <Link to={'/allblogs'} className="flex items-center hover:text-red-700">
                    Blogs
                </Link>
            </Typography>
            {!role?
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal transition-transform duration-200 lg:hover:scale-110"
                style={{ color: mode === 'dark' ? 'black' : 'white' }}
            >
              <Link to={'/adminlogin'} className="flex items-center hover:text-red-700">
                    Login
                </Link>
            </Typography>:''}
        </ul>
    );

    return (
        <>
            {/* Navbar  */}
            <Navbar
                className="sticky inset-0 z-20 h-max max-w-full border-none rounded-none py-2 px-4 lg:px-8 lg:py-2 "
                style={{ background: mode === 'dark' ? 'white' : 'black' }}>

                {/* Desktop View  */}
                <div className="flex items-center justify-between text-blue-gray-900 ">

                    {/* Home Page Link  */}
                    <Link to={'/'}>
                        <Typography
                            as="a"
                            className="mr-4 cursor-pointer py-1.5 text-xl font-bold flex gap-2 items-center transition-shadow duration-200 hover:scale-105"
                            style={{ color: mode === 'dark' ? 'black' : 'white' }}
                        >
                            {/* Logo Image  */}
                            {/* <img
                                className=' w-10 h-10 '
                                src='https://cdn-icons-png.flaticon.com/128/3685/3685253.png'
                            /> */}
                            {/* Logo Text  */}
                            {/* <span className="text-4xl font-serif">
                                <img  className='w-20 h-10' src='/omoilogo.jpeg'/>
                            </span> */}
                            {
                                mode==='dark'?<img className='w-28 h-12 rounded-lg' src='/omoilight.png'/>:<img className='w-28 h-12 rounded-lg' src='/omoidark.png'/>
                            }
                        </Typography>
                    </Link>

                    {/* All Items  */}
                    <div className="flex items-center gap-4">

                        {/* Navlist  */}
                        <div className="hidden lg:block">
                            {navList}
                        </div>

                        {/* Search Icon */}
                        <div>
                            {/* <AiOutlineSearch size={20} color={mode==='dark'?'black':'white'} className="transition-transform duration-200 hover:scale-110" /> */}
                            <SearchDialog/>
                        </div>

                        {/* Share Icon */}
                        <div className="hidden lg:block">
                            {/* <AiOutlineShareAlt size={20}  color={mode==='dark'?'black':'white'} className="transition-transform duration-200 hover:scale-110"/> */}
                            <ShareDialogBox/>
                        </div>

                        {/* Admin Profile Pic */}
                       {role==='admin'?<div>
                            <Link to={'/dashboard'}>
                                <div className="">
                                    <Avatar
                                        key={1}
                                        src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                                        alt="avatar"
                                        withBorder={true}
                                        className="p-0.5 text-red-500 w-10 h-10 transition-transform duration-200 hover:scale-110"
                                        style={{
                                            border:
                                                mode === 'dark'
                                                    ?
                                                    '2px solid rgb(226, 232, 240)'
                                                    :
                                                    '2px solid rgb(30, 41, 59)'
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>:(role==='user')?<>
                        <IoIosLogOut className={'text-pink-500 text-2xl'} onClick={logout}/>
                        </>:''} 

                        {/* dark And Light Button */}
                        <div className="transition-transform duration-200 hover:scale-110">
                            {mode === 'light'
                                ?
                                <>
                                    {/* Light Button  */}
                                    <IconButton onClick={toggleMode} className=" lg:inline-block rounded-full" style={{ background: mode === 'light' ? '#ced6e0' : '#57606f', color: mode === 'dark' ? 'white' : 'black' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                        </svg>
                                    </IconButton>
                                </>
                                :
                                <>
                                    {/* Dark Button  */}
                                    <IconButton onClick={toggleMode} className=" lg:inline-block rounded-full" style={{ background: mode === 'light' ? '#ced6e0' : '#57606f' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                        </svg>
                                    </IconButton>
                                </>}
                        </div>

                        {/* Mobile Toggle  */}
                        <div>
                            <IconButton
                                className="ml-auto h-10 w-10 text-inherit rounded-lg lg:hidden"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                                style={{ background: mode === 'light' ? '#ced6e0' : '#57606f', color: mode === 'dark' ? 'white' : 'black' }}
                            >
                                {openNav ?
                                    (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    )
                                    :
                                    (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                            </IconButton>
                        </div>

                    </div>
                </div>

                {/* Mobile View */}
                <Collapse open={openNav}>
                    {/* NavList  */}
                    {navList}
                </Collapse>
            </Navbar>
        </>
    );
}