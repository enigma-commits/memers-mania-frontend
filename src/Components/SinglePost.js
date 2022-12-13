import React, { useRef, useCallback } from "react";
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
import "../App.css";
import Tooltip from "@mui/material/Tooltip";
export default function SinglePost(props) {
  const focusOnCommentBox = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);
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
          <CardMedia
            component="img"
            image={props.image}
            maxHeight="400"
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
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
              <IconButton onClick={focusOnCommentBox}>
                <ModeCommentOutlinedIcon fontSize="large" />
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
            />
            <TextField
              fullWidth
              inputRef={focusOnCommentBox}
              id="fullWidth-multiline"
              size="small"
              placeholder="Body"
              multiline
              rows={4}
              sx={{
                marginTop: "10px",
                height: "100%",
                width: "100%",
                borderRadius: "5px",
                backgroundColor: "#948f8f",
              }}
            />
          </Container>

          <Container
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              variant="contained"
              sx={{
                mt: "10px",
                height: "5%",
              }}
            >
              Comment
            </Button>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
