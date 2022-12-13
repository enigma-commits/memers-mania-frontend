import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePostScreen = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [postImage, setPostImage] = useState({});
    const [imageUrl, setImageUrl] = useState("");
    const func = (e) => {
        setPostImage(e);
    };
    // Fetch the access token to verify.
    const accessToken = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).user.jwtToken
        : null;
    const _id = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).user._id
        : null;
    const user = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).user
        : null;
    // Setup axios with auth authorization header;
    const authAxios = axios.create({
        baseURL:process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const upLoadImage = async () => {
        const data = new FormData();
        data.append("file", postImage);
        data.append("upload_preset", process.env.REACT_APP_IMAGE_ID);
        // data.append("cloud_name", "de9xw1upe");
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/de9xw1upe/image/upload/",
            data,
        );
        setImageUrl(response.data.url);
        console.log(response.data.url);
        console.log(imageUrl);
    };
    const handlePost = async () => {
        if (!postTitle || !(postBody || imageUrl)) {
            return;
        }
        try {
            const post = await authAxios.post("/api/posts/create", {
                title: postTitle,
                body: postBody,
                user: _id,
                image: imageUrl,
                upVote: [],
                downVote: [],
                comments: [],
                numComments: 0,
                userName: user.name,
                userImage: user.imageUrl,
            });
            console.log(post.data);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <Container
                sx={{
                    width: "50%",
                    ml: "25%",
                    mt: "2%",
                    color: "white",
                    border: "15px",
                    borderColor: "red",
                    backgroundColor: "#242424",
                    borderRadius: "5px",
                    padding: "10px",
                }}
            >
                <h2>Create Post</h2>
                <Divider sx={{ backgroundColor: "white" }} />
                <Container
                    sx={{
                        border: "15px",
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <container>
                        <h3
                            onClick={() => {
                                setTab(0);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            Text
                        </h3>
                        {tab === 0 && (
                            <Divider sx={{ backgroundColor: "white" }} />
                        )}
                    </container>
                    <container>
                        <h3
                            onClick={() => {
                                setTab(1);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            Image
                        </h3>
                        {tab === 1 && (
                            <Divider sx={{ backgroundColor: "white" }} />
                        )}
                    </container>
                </Container>
                <Container>
                    <TextField
                        fullWidth
                        id="fullWidth"
                        size="small"
                        placeholder="Title"
                        value={postTitle}
                        sx={{
                            marginTop: "8px",
                            height: "100%",
                            width: "100%",
                            borderRadius: "5px",
                            backgroundColor: "#948f8f",
                        }}
                        onChange={(e) => {
                            setPostTitle(e.target.value);
                        }}
                    />
                    {tab === 0 && (
                        <TextField
                            fullWidth
                            id="fullWidth-multiline"
                            size="small"
                            placeholder="Body"
                            multiline
                            rows={4}
                            value={postBody}
                            sx={{
                                marginTop: "10px",
                                height: "100%",
                                width: "100%",
                                borderRadius: "5px",
                                backgroundColor: "#948f8f",
                            }}
                            onChange={(e) => {
                                setPostBody(e.target.value);
                            }}
                        />
                    )}
                    {tab === 1 && (
                        <>
                            <input
                                type="file"
                                className="custom-file-input"
                                onChange={(e) => {
                                    setPostImage(e.target.files[0]);
                                }}
                                id="inputGroupFile01"
                            />
                            <button onClick={upLoadImage}>submit</button>
                        </>
                    )}

                    <Container
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                width: "5%",
                                mt: "10px",
                                height: "5%",
                            }}
                            onClick={handlePost}
                        >
                            Post
                        </Button>
                    </Container>
                </Container>
            </Container>
        </>
    );
};

export default CreatePostScreen;
