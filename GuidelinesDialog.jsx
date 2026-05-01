import React from "react";
import { Dialog, DialogTitle, IconButton, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DiseaseGuidelines from "./DiseaseGuidelines";

export default function GuidelinesDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 800, pr: 6 }}>Do’s, Don’ts, Diet & Precautions</DialogTitle>
      <IconButton onClick={onClose} sx={{ position: "absolute", right: 12, top: 12 }} aria-label="close">
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <DiseaseGuidelines />
      </DialogContent>
    </Dialog>
  );
}

