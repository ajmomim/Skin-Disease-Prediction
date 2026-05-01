import React, { useRef } from "react";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function GalleryPicker({ onPick }) {
  const inputRef = useRef(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
          e.target.value = "";
        }}
      />
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={() => inputRef.current?.click()}
      >
        Gallery
      </Button>
    </>
  );
}
