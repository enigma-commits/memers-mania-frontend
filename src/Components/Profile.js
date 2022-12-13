import { Box } from "@mui/system";
import { IconButton, Typography, Divider, Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import UserPost from "./UserPost";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoMediaPost from "./NoMediaPost";
import axios from "axios";
export function Profile() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).user._id
        : null;
    const logout = () => {
        localStorage.removeItem("loginData");
        localStorage.removeItem("accessToken");
        alert("You have successfully Logged out.");
        navigate("/");
        window.location.reload();
    };
    const accessToken = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).user.jwtToken
        : null;
    const [posts, setPosts] = useState([]);
    // Add the token.
    const authAxios = axios.create({
        baseURL:process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    // Fetch All the Posts.
    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await authAxios.get("/api/posts/");

            const copyPosts = data.filter((e) => {
                return e.user === userId;
            });

            setPosts(copyPosts);
        };
        fetchPosts();
    }, []);
    console.log(posts);
    let picture = JSON.parse(localStorage.getItem("loginData"));
    if (picture) picture = picture.user.imageUrl;
    return (
        <Box
            variant="div"
            sx={{
                ml: "25%",
                mr: "25%",
                mt: "1%",
                pt: "1%",
                pb: "5%",
                backgroundColor: "#242424",
            }}
        >
            <Box
                component="header"
                sx={{
                    display: "flex",
                    mt: "5%",
                    ml: "10%",
                    mr: "0%",
                    mb: "4%",
                }}
            >
                <Box
                    component="div"
                    sx={{ flexGrow: "1", flexBasis: "0%", mr: "15%" }}
                >
                    <img
                        src={picture}
                        alt="profile"
                        width="150px"
                        height="150px"
                        style={{ borderRadius: "75px" }}
                    />
                </Box>
                <Box component="section" sx={{ pl: "0%", flexGrow: "2" }}>
                    <Typography variant="h4" sx={{ color: "#e6ebe7" }}>
                        This is{" "}
                        {
                            JSON.parse(localStorage.getItem("loginData")).user
                                .name
                        }
                    </Typography>
                </Box>
                <Box>
                    <IconButton
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        <LogoutIcon
                            fontSize="large"
                            sx={{ color: "#e6ebe7" }}
                            onClick={logout}
                        />
                        <br />
                        <Typography
                            variant="p"
                            sx={{ color: "#e6ebe7", fontSize: "50%" }}
                        >
                            Logout
                        </Typography>
                    </IconButton>
                </Box>
            </Box>
            <Divider sx={{ backgroundColor: "#e6ebe7" }} />
            <Box>
                {posts
                    .slice(0)
                    .reverse()
                    .map((post) => {
                        return (
                            <NoMediaPost
                                title={post.title}
                                body={post.body}
                                id={post._id}
                                // setPostId={props.setPostId}
                                upVote={post.upVote}
                                downVote={post.downVote}
                                comments={post.comments}
                                image={post.image}
                                userImage={post.userImage}
                                user={post.userName}
                            />
                        );
                    })}
                {/* <Grid
                    container
                    columnGap={3}
                    rowGap={2}
                    sx={{ mt: "3%", ml: "15%" }}
                >
                    <Grid item xs={4}>
                        <UserPost />
                    </Grid>
                </Grid> */}
            </Box>
        </Box>
    );
}
