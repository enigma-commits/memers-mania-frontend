import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { CreatePost } from "../Components/CreatePost.js";
import Post from "../Components/Post.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SinglePost from "../Components/SinglePost.js";
import NoMediaPost from "../Components/NoMediaPost.js";

const HomeScreen = (props) => {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("loginData")
            ? JSON.parse(localStorage.getItem("loginData")).user.jwtToken
            : null,
    );
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const sendToSingleScreen = (event) => {
        props.changeImage("./tempimages/1116286.jpg");
        navigate("/comment");
    };
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
            setPosts(data);
        };
        fetchPosts();
        posts.reverse();
        console.log(posts);
    }, []);
    return (
        <>
            <Box component="body">
                <CreatePost />
                {/* <NoMediaPost /> */}
                {posts
                    .slice(0)
                    .reverse()
                    .map((post) => {
                        return (
                            <NoMediaPost
                                title={post.title}
                                body={post.body}
                                id={post._id}
                                setPostId={props.setPostId}
                                upVote={post.upVote}
                                downVote={post.downVote}
                                comments={post.comments}
                                image={post.image}
                                userImage={post.userImage}
                                user={post.userName}
                            />
                        );
                    })}
            </Box>
        </>
    );
};

export default HomeScreen;
