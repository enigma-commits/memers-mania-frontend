import { Box } from "@mui/system";
import React from "react";
import SinglePost from "../Components/SinglePost";
import { Comment } from "../Components/Comment";
import { CommentBox } from "../Components/CommentBox";
import useFocus from "react";
export const SinglePostScreen = (props) => {
  //const [inputRef, setInputFocus] = useFocus();
  return (
    <Box component="div">
      <SinglePost image={props.image} />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Box>
  );
};
