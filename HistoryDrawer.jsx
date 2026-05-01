import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Stack
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function HistoryDrawer({ open, onClose, items, onReAnalyze, onClear }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 360, p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>History</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button variant="outlined" size="small" onClick={onClear}>Clear</Button>
        </Stack>

        {items.length === 0 ? (
          <Typography variant="body2">No history yet.</Typography>
        ) : (
          <List dense>
            {items.map((h) => (
              <ListItem
                key={h.id}
                sx={{ borderRadius: 2, mb: 1, border: "1px solid", borderColor: "divider" }}
                secondaryAction={
                  <Button size="small" onClick={() => onReAnalyze(h)}>
                    Use
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar variant="rounded" src={h.preview} />
                </ListItemAvatar>
                <ListItemText
                  primary={h.result?.prediction?.toUpperCase?.() || "Unknown"}
                  secondary={new Date(h.at).toLocaleString()}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
}
