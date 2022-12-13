import "./App.css";
import React, { useState, useEffect } from "react";
import HomeScreen from "./Screens/HomeScreen.js";
import CreatePostScreen from "./Screens/CreatePostScreen.js";
import DashBoardScreen from "./Screens/DashBoardScreen.js";
import { Box } from "@mui/system";
import ResponsiveAppBar from "./Components/Navbar/ResponsiveAppBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SinglePostScreen } from "./Screens/SinglePostScreen";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import { Typography } from "@mui/material";
import axios from "axios";
import NoMediaComment from "./Components/NoMediaComment";

// App Component.
export default function App() {
    // Create PostId to store the state.
    const [postId, setPostId] = useState();
    console.log(postId);
    console.log(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_BACKEND_URL)
    // Image (not used anywhere).
    const [image, changeImage] = useState();

    // Access the jwt token from the local storage If exists.
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("loginData")
            ? JSON.parse(localStorage.getItem("loginData")).user.jwtToken
            : null,
    );
    // Get data from the localStorage regarding the login
    const [loginData, setLoginData] = useState(
        localStorage.getItem("loginData")
            ? JSON.parse(localStorage.getItem("loginData"))
            : null,
    );
    // Setup axios with auth authorization header;
    const authAxios = axios.create({
        baseURL:process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    // Handle login Failure function
    const handleFailure = (result) => {
        console.log(result);
    };
    // Handle login function to call the api.
    const handleLogin = async (googleData) => {
        async function fetchUser() {
            try {
                const response = await authAxios.post(
                    "/api/users/google-login",
                    {
                        token: googleData.credential,
                        headers: { "Content-Type": "application/json" },
                    },
                );
                const foundUser = response.data;
                setAccessToken(response.data.user.jwtToken);
                localStorage.setItem("loginData", JSON.stringify(foundUser));
                setLoginData(foundUser);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    };
   
    useEffect(()=>{
        // If we found some access token then verify if it is valid.
        if (accessToken) {
            async function verifyToken() {
                await authAxios.post("/api/users/verify", accessToken).then(
                    (response) => {
                        setLoginData(response.data.name);
                    },
                    (error) => {
                        console.log(error);
                        setLoginData();
                        setAccessToken();
                    },
                );
            }
            verifyToken();
        }

    }, [accessToken, authAxios])

    // Render the correct page.
    return (
        <Box>
            {accessToken ? (
                <Router>
                    <Box
                        sx={{
                            backgroundColor: "#1c1f20",
                            minHeight: "100vh",
                        }}
                    >
                        <Box
                            component="header"
                            sx={{ position: "sticky", top: 0, zIndex: 50 }}
                        >
                            <ResponsiveAppBar />
                        </Box>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <HomeScreen
                                        changeImage={changeImage}
                                        setPostId={setPostId}
                                    />
                                }
                            />
                            <Route
                                path="/api/users/profile"
                                element={<DashBoardScreen />}
                            />
                            <Route
                                path="/api/posts/create"
                                element={<CreatePostScreen />}
                            />
                            <Route
                                path="/api/posts/comment"
                                element={<SinglePostScreen image={image} />}
                            />
                            <Route
                                path="/api/posts/comment/:postId"
                                element={<NoMediaComment postId={postId} />}
                            />
                        </Routes>
                    </Box>
                </Router>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        minHeight: "100vh",
                        alignItems: "center",
                        backgroundColor: "#A5C9CA",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h2" component="h2">
                        Login with Google
                    </Typography>
                    <br />

                    <GoogleLogin
                        onSuccess={handleLogin}
                        onError={handleFailure}
                        useOneTap
                        cookiePolicy={"https://memers-mania.onrender.com"}
                    />
                </Box>
            )}
        </Box>
    );
}
