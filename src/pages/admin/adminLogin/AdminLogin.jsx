import { useContext, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import myContext from "../../../context/data/myContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { account } from "../../../appwrite/AppWriteConfig";
import Loader from "../../../components/loader/Loader";
import { ID } from "appwrite";

export default function AdminLogin() {
    const context = useContext(myContext);
    const { mode } = context;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false); // Toggle for signup/login
    const [loading, setLoading] = useState(false);
    const [animate, setAnimate] = useState(false); // Animation trigger
    const [name,setName]=useState('')
    const navigate = useNavigate();
    const isAdmin = email.toLowerCase() === "admin@gmail.com";

    const toggleMode = () => {
        setAnimate(true); // Trigger animation
        setTimeout(() => {
            setEmail("");
            setPassword("");
            setIsSignUp(!isSignUp);
            setAnimate(false); // Reset animation after the transition
        }, 500); // Match animation duration
    };

    const clearActiveSessions = async () => {
        try {
            await account.deleteSessions(); // Deletes all active sessions
        } catch (error) {
            console.error("Error clearing sessions:", error);
        }
    };

    const handleAction = async () => {
        if (!email || !password) {
            return toast.error("Fill all required fields");
        }

        if (password.length < 8) {
            return toast.error("Password must be at least 8 characters long");
        }

        try {
            setLoading(true);

            // Clear any existing sessions to avoid conflicts
            await clearActiveSessions();


            if (isSignUp) {
                // Signup logic
            
                
                const role = isAdmin ? "admin" : "user";

                // Generate a unique user ID
                await account.create(ID.unique(),email, password,name);

                // localStorage.setItem("role", role);
                toast.success("Account Created Successfully");

                setTimeout(() => {
                    setLoading(false);
                    navigate(isAdmin ? "/dashboard" : "/");
                }, 1000);
            } else {
                // Login logic
                const isAdmin = email.toLowerCase() === "admin@gmail.com";
                await account.createEmailPasswordSession(email, password);

                localStorage.setItem("role", isAdmin ? "admin" : "user");
                toast.success("Login Success");

                setTimeout(() => {
                    setLoading(false);
                    navigate(isAdmin ? "/dashboard" : "/");
                }, 1000);
            }
        } catch (error) {
            setLoading(false);

            if (error.code === 401) {
                toast.error("Invalid credentials");
            } else if (error.message.includes("Invalid `password`")) {
                toast.error("Password must be between 8 and 256 characters");
            } else if (error.message.includes("Invalid `userId`")) {
                toast.error("User ID must be at most 36 characters");
            } else if (
                error.message.includes(
                    "Creation of a session is prohibited when a session is active"
                )
            ) {
                toast.error("A session is already active. Please try again.");
            } else {
                toast.error(isSignUp ? "Signup Failed" : "Login Failed");
            }

            console.error("Error:", error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div
                className={`relative w-full max-w-[24rem] p-4 transition-all duration-500 ${
                    animate ? "opacity-0 translate-y-[30px]" : "opacity-100 translate-y-0"
                }`}
            >
                <Card
                    className="relative"
                    style={{
                        background: mode === "dark" ? "white" : "white",
                    }}
                >
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="m-0 grid place-items-center rounded-b-none py-6 px-4"
                        style={{
                            background: mode === "dark" ? "gray" : "black",
                        }}
                    >
                        <div className="mb-4 rounded-full p-2">
                            <div className="flex justify-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/727/727399.png"
                                    className="h-16 w-16"
                                    alt="icon"
                                />
                            </div>
                        </div>
                        <Typography
                            variant="h5"
                            style={{
                                color: mode === "dark" ? "black" : "white",
                            }}
                        >
                            {isSignUp ? "Sign Up" : "Login"}
                        </Typography>
                    </CardHeader>

                    <CardBody>
                        {!isSignUp?<form className="flex flex-col gap-4">
                            <div>
                                <Input
                                    type="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <Input
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleAction}
                                className="w-full"
                                style={{
                                    background: mode === "dark" ? "white" : "black",
                                    color: mode === "dark" ? "black" : "white",
                                }}
                            >
                                {isSignUp ? "Sign Up" : "Login"}
                            </Button>
                            <div className="text-center">
                                <Typography
                                    variant="small"
                                    className="cursor-pointer text-blue-500"
                                    onClick={toggleMode}
                                >
                                    {isSignUp
                                        ? "Already have an account? Login"
                                        : "Don't have an account? Sign Up"}
                                </Typography>
                            </div>
                        </form>:
                        <form className="flex flex-col gap-4">
                            <div>
                            <Input
                                type="text"
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            </div>
                        <div>
                            <Input
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handleAction}
                            className="w-full"
                            style={{
                                background: mode === "dark" ? "white" : "black",
                                color: mode === "dark" ? "black" : "white",
                            }}
                        >
                            {isSignUp ? "Sign Up" : "Login"}
                        </Button>
                        <div className="text-center">
                            <Typography
                                variant="small"
                                className="cursor-pointer text-blue-500"
                                onClick={toggleMode}
                            >
                                {isSignUp
                                    ? "Already have an account? Login"
                                    : "Don't have an account? Sign Up"}
                            </Typography>
                        </div>
                    </form>}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

