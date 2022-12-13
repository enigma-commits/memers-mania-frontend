import React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
export const Comment = (props) => {
    return (
        <Box component="div">
            <Box
                sx={{
                    color: "white",
                    display: "flex",
                    minHeight: "10vh",
                    width: "50%",
                    ml: "25%",
                    mt: "2%",
                    border: "15px",
                    bgcolor: "#1a1a1b",
                    padding: "10px 0px",
                }}
            >
                <Box>
                    <Box
                        sx={{
                            mr: "10px",
                            ml: "15px",
                            pb: "15px",
                        }}
                    >
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                            <Box sx={{ pr: "10px" }}>
                                <Avatar
                                    sx={{ bgcolor: "deepOrange[500]" }}
                                    src={props.imageUrl}
                                />
                            </Box>
                            <Typography variant="h5">
                                {props.userName}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                mt: "15px",
                                pl: "15px",
                                display: "flex",
                                flexWrap: "wrap",
                            }}
                        >
                            <Typography variant="p">{props.body}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
