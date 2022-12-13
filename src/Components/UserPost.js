import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../App.css";
export default function UserPost({ image }) {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        height: "100%",
        border: "15px",
        backgroundColor: "#e6ebe7",
      }}
    >
      <CardActionArea sx={{ padding: "5px", borderRadius: "5px" }}>
        <CardMedia
          component="img"
          image={image}
          maxHeight="400"
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
