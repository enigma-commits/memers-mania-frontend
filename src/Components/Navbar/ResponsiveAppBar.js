import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
const ResponsiveAppBar = () => {
    const navigate = useNavigate();
    let picture = JSON.parse(localStorage.getItem("loginData"));
    if (picture) picture = picture.user.imageUrl;
    const handleOpenUserProfile = (event) => {
        navigate("/api/users/profile");
    };
    const sendUserToDashboard = (even) => {
        navigate("/");
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
            <Container maxWidth="xl">
                <Toolbar
                    sx={{ justifyContent: "space-between" }}
                    disableGutters
                >
                    <Box sx={{ display: "flex" }}>
                        <Avatar
                            src="./logo/logo.png"
                            alt="logo-memers-mania"
                            onClick={sendUserToDashboard}
                            sx={{ cursor: "pointer" }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                color: "#d7d3ce",
                                cursor: "pointer",
                            }}
                            onClick={sendUserToDashboard}
                        >
                            Memers Mania
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open Profile">
                            <IconButton
                                onClick={handleOpenUserProfile}
                                sx={{ p: 0 }}
                            >
                                <Avatar alt="Remy Sharp" src={picture} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
