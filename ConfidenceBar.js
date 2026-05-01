import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ConfidenceBar({ confidence }) {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="body2" color="textSecondary">
        Confidence: {confidence.toFixed(2)}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={confidence}
        sx={{
          height: 12,
          borderRadius: 6,
          backgroundColor: "#2c2c2c", // Track color
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#4caf50", // Green bar
          },
        }}
      />
    </Box>
  );
}
