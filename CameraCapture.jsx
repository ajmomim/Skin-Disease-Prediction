import React, { useRef, useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import Webcam from "react-webcam";

export default function CameraCapture({ onShot }) {
  const webcamRef = useRef(null);
  const [open, setOpen] = useState(false);

  const capture = () => {
    const shot = webcamRef.current?.getScreenshot();
    if (shot) onShot(shot);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<PhotoCameraOutlinedIcon />}
        onClick={() => setOpen(true)}
      >
        Camera
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Camera</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              style={{ borderRadius: 12, width: "100%" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={capture}>Capture</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
