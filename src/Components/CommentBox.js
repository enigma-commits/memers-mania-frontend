import React from "react";
import { Container, Avatar, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
export const CommentBox = () => {
	return (
		<Box
			sx={{
				maxWidth: "50%",
				ml: "25%",
				mt: "2%",
				border: "15px",
				backgroundColor: "#1a1a1b",
				borderRadius: "5px",
        padding:"10px 0px"
			}}>
			<Container sx={{ display: "flex" }}>
				<Avatar
					sx={{
						marginTop: "8px",
						mr: "8px",
					}}
				/>
				<TextField
					fullWidth
					id='fullWidth-multiline'
					size='small'
					placeholder='Body'
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
					sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
					<Button
						variant='contained'
						sx={{
							mt: "10px",
							height: "5%",
						}}>
						Comment
					</Button>
				</Container>
		</Box>
	);
};
