import React, { useRef, useCallback, useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { Container, Avatar, TextField, Button } from "@mui/material";
import { CardActions } from "@mui/material";
import { Comment } from "./Comment";
import "../App.css";
import Tooltip from "@mui/material/Tooltip";
export default function NoMediaComment(props) {
    const [comments, setComments] = useState([]);
    const [comment, changeComment] = useState("");
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [image, setImage] = useState();
    const accessToken = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).user.jwtToken
        : null;
    const imageUrl = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).user.imageUrl
        : null;
    const authAxios = axios.create({
        baseURL:process.env.REACT_APP_BACKEND_URL,

        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const id = localStorage.getItem("commentId")
        ? JSON.parse(localStorage.getItem("commentId"))
        : null;
    const userId = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).user._id
        : null;
    // // Initialize Upvote, Down votes and Comments.
    const [upVote, setUpVote] = useState(0);
    const [downVote, setDownVote] = useState(0);
    const [commentNumber, setCommentNumber] = useState(0);
    // Handle the Upvote
    const handleUpVote = async () => {
        try {
            const res = await authAxios.post(`/api/posts/upvote/${id}`, {
                userId,
            });
            // console.log(res.data);
            setUpVote(res.data.upVote);
            setDownVote(res.data.downVote);
        } catch (err) {
            console.log(err);
        }
    };

    // Handle the Downvote
    const handleDownVote = async () => {
        try {
            const res = await authAxios.post(`/api/posts/downvote/${id}`, {
                userId,
            });
            // console.log(res.data);
            setUpVote(res.data.upVote);
            setDownVote(res.data.downVote);
        } catch (err) {
            console.log(err);
        }
    };
    // Fetch all the comments.
    useEffect(() => {
        const fetchComments = async () => {
            const commentData = await authAxios.get(
                `/api/posts/comments/${id}`,
            );
            // console.log(commentData);
            setComments(commentData.data.comments);
            setBody(commentData.data.body);
            setTitle(commentData.data.title);
            setImage(commentData.data.image);
            setCommentNumber(commentData.data.comments.length);
            setDownVote(commentData.data.downVote.length);
            setUpVote(commentData.data.upVote.length);
        };
        fetchComments();
    }, []);
    const focusOnCommentBox = useCallback((inputElement) => {
        if (inputElement) {
            inputElement.focus();
        }
    }, []);

    // Post the comment.
    const postComment = async (props) => {
        if (!comment) {
            return;
        }
        const userName = localStorage.getItem("loginData")
            ? JSON.parse(localStorage.getItem("loginData")).user.name
            : null;

        const user = localStorage.getItem("loginData")
            ? JSON.parse(localStorage.getItem("loginData")).user._id
            : null;
        let finalComments = comments;
        finalComments.push({
            body: comment,
            userName: userName,
            user: user,
            imageUrl: imageUrl,
        });
        setComments(finalComments);
        setCommentNumber(finalComments.length);
        changeComment("");
        // console.log(comments);
        try {
            const postComment = authAxios.post(`/api/posts/comments/${id}`, {
                comments: comments,
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Box>
            <Card
                sx={{
                    maxWidth: "50%",
                    ml: "25%",
                    mt: "2%",
                    border: "15px",
                    backgroundColor: "#e6ebe7",
                }}
            >
                <CardActionArea sx={{ padding: "5px", borderRadius: "5px" }}>
                    <CardContent>
                        <Typography variant="h5">{title}</Typography>
                        {image ? (
                            <CardMedia
                                component="img"
                                image={image}
                                maxHeight="400"
                                alt="green iguana"
                            />
                        ) : (
                            <Box />
                        )}
                        <Typography variant="body2" color="text.secondary">
                            {body}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions
                    sx={{
                        backgroundColor: "#d7d3ce",
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <Box>
                        <Tooltip title="upvote">
                            <IconButton onClick={handleUpVote}>
                                <Typography variant="p">{upVote}</Typography>
                                <ArrowUpwardOutlinedIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="downvote">
                            <IconButton onClick={handleDownVote}>
                                <ArrowDownwardOutlinedIcon fontSize="large" />
                                <Typography variant="p">{downVote}</Typography>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title="comment">
                            <IconButton onClick={focusOnCommentBox}>
                                <ModeCommentOutlinedIcon fontSize="large" />
                                <Typography variant="p">
                                    {commentNumber}
                                </Typography>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardActions>
            </Card>
            <Box>
                <Box
                    sx={{
                        maxWidth: "50%",
                        ml: "25%",
                        mt: "2%",
                        border: "15px",
                        backgroundColor: "#1a1a1b",
                        borderRadius: "5px",
                        padding: "10px 0px",
                    }}
                >
                    <Container sx={{ display: "flex" }}>
                        <Avatar
                            sx={{
                                marginTop: "8px",
                                mr: "8px",
                            }}
                            src={imageUrl}
                        />
                        <TextField
                            fullWidth
                            inputRef={focusOnCommentBox}
                            id="fullWidth-multiline"
                            size="small"
                            placeholder="Body"
                            value={comment}
                            multiline
                            rows={4}
                            sx={{
                                marginTop: "10px",
                                height: "100%",
                                width: "100%",
                                borderRadius: "5px",
                                backgroundColor: "#948f8f",
                            }}
                            onChange={(e) => {
                                changeComment(e.target.value);
                            }}
                        />
                    </Container>

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
                                mt: "10px",
                                height: "5%",
                            }}
                            onClick={postComment}
                        >
                            Comment
                        </Button>
                    </Container>
                </Box>
            </Box>
            {comments
                .slice(0)
                .reverse()
                .map((e) => {
                    return (
                        <Comment
                            userName={e.userName}
                            body={e.body}
                            imageUrl={e.imageUrl}
                        />
                    );
                })}
        </Box>
    );
}
