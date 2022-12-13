import React, { useState } from "react";
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
import { CardActions } from "@mui/material";
import "../App.css";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Route } from "react-router-dom";
import NoMediaComment from "./NoMediaComment";
import { Avatar } from "@mui/material";

export default function NoMediaPost(props) {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).user.jwtToken
        : null;
    const userId = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).user._id
        : null;
    const id = localStorage.getItem("commentId")
        ? JSON.parse(localStorage.getItem("commentId"))
        : null;
    const authAxios = axios.create({
        baseURL:process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    // Initialize Upvote, Down votes and Comments.
    const [upVote, setUpVote] = useState(props.upVote.length);
    const [downVote, setDownVote] = useState(props.downVote.length);
    const [commentNumber, setCommentNumber] = useState(props.comments.length);
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
    const toCommentSection = async () => {
        try {
            const id = props.id;
            localStorage.setItem("commentId", JSON.stringify(id));
            navigate(`/api/posts/comment/${id}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box variant="div">
            <Card
                sx={{
                    maxWidth: "50%",
                    ml: "25%",
                    mt: "2%",
                    border: "15px",
                    backgroundColor: "#e6ebe7",
                }}
                onClick={props.sender}
            >
                <CardActionArea sx={{ padding: "5px", borderRadius: "5px" }}>
                    <CardContent>
                        <Box variant="div">
                            <Avatar
                                sx={{
                                    bgcolor: "deepOrange[500]",
                                    display: "inline-block",
                                }}
                                src={props.userImage}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    marginLeft: "2%",
                                    display: "inline",
                                }}
                            >
                                {props.user}
                            </Typography>
                        </Box>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.title}
                        </Typography>
                        {props.image ? (
                            <CardMedia
                                component="img"
                                image={props.image}
                                maxHeight="400"
                                alt="green iguana"
                            />
                        ) : (
                            <Box />
                        )}
                        <Typography variant="body2" color="text.secondary">
                            {props.body}
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
                            <IconButton onClick={toCommentSection}>
                                <ModeCommentOutlinedIcon fontSize="large" />
                                <Typography variant="p">
                                    {commentNumber}
                                </Typography>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}
