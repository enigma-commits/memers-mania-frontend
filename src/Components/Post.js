import * as React from "react";
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
export default function Post(props) {
    return (
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
                <CardMedia
                    component="img"
                    image={props.image}
                    maxHeight="400"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Data Here
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
                        <IconButton>
                            <ArrowUpwardOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="downvote">
                        <IconButton>
                            <ArrowDownwardOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box>
                    <Tooltip title="comment">
                        <IconButton>
                            <ModeCommentOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardActions>
        </Card>
    );
}
