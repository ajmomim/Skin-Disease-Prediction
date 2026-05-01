// src/components/ResultPanel.jsx
import React from "react";
import {
  Box, Typography,
  Avatar, 
  Card, 
  CardContent, 
  Chip,
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  LinearProgress, 
  Grid, 
  Alert, 
  Skeleton, 
  Stack, 
  Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DISEASE_INFO } from "../data/diseaseInfo";
import { ALIAS_TO_NAME } from "../data/aliases";
import ConfidenceBar from "./ConfidenceBar";
import SafeImg from "./SafeImg";

function riskColor(pct) {         // pct = 0..100
  if (pct >= 80) return "error";
  if (pct >= 50) return "warning";
  return "success";
}

export default function ResultPanel({ preview, result, loading }) {
  // guard
  const confidencePct = Math.max(0, Math.min(100, (result?.confidence ?? 0) * 100));
  const mappedKey = ALIAS_TO_NAME[result?.predicted_class] || result?.predicted_class;
  const info = mappedKey ? DISEASE_INFO[mappedKey] : null;

  return (
    <Box>
      {!preview && !loading && (
        <Alert severity="info">Capture or upload a clear, well-lit close-up of the affected skin area.</Alert>
      )}

      {preview && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Avatar src={preview} alt="Preview" variant="rounded" sx={{ width: 220, height: 220 }} />
        </Box>
      )}

      {loading && (
        <Box sx={{ my: 3 }}>
          <Skeleton variant="rounded" height={30} />
          <Skeleton variant="rounded" height={220} sx={{ my: 2 }} />
          <Skeleton variant="rounded" height={120} />
        </Box>
      )}

      {result && !loading && (
        <Box sx={{ mt: 2 }}>
          <Card sx={{ mb: 2, overflow: "hidden", borderRadius: 2, boxShadow: "0 8px 24px rgba(2,6,23,0.12)" }}>
            <CardContent>
              {mappedKey && (
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>{mappedKey}</Typography>
              )}
              <Typography variant="h6" gutterBottom color="primary">AI Analysis</Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Typography variant="subtitle1">Predicted Condition:</Typography>
                <Chip
                  label={mappedKey || "N/A"}
                  color="primary"
                  variant="outlined"
                />
              </Box>

              {/* Confidence display */}
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Confidence: {confidencePct.toFixed(2)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={confidencePct}
                color={riskColor(confidencePct)}
                sx={{ height: 8, borderRadius: 2, mb: 1 }}
              />

              {/* Extra visual bar */}

              {/* Optional: top candidates */}
              {Array.isArray(result.candidates) && result.candidates.length > 1 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Other possible conditions</Typography>
                  <Grid container spacing={1}>
                    {result.candidates.slice(0, 3).map((c, i) => {
                      const name = ALIAS_TO_NAME[c.label] || c.label;
                      const pct = Math.round((c.prob || 0) * 100);
                      return (
                        <Grid item xs={12} md={4} key={i}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="body2">{name}</Typography>
                              <LinearProgress
                                variant="determinate"
                                value={pct}
                                sx={{ mt: 1, height: 6, borderRadius: 2 }}
                              />
                              <Typography variant="caption">{pct}%</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ borderRadius: 3, background: "linear-gradient(180deg,#ffffff, #f9fbff)" }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>About this condition</Typography>
              <Typography sx={{ mb: 2 }}>{info?.description || "No description available"}</Typography>

              <Grid container spacing={2}>
                {Array.isArray(info?.symptoms) && (
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Common symptoms</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {info.symptoms.map((s, i) => (
                        <Chip key={i} label={s} variant="outlined" sx={{ bgcolor: "#eef2ff" }} />
                      ))}
                    </Stack>
                  </Grid>
                )}
                {Array.isArray(info?.risk_factors) && (
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Risk factors</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {info.risk_factors.map((s, i) => (
                        <Chip key={i} label={s} color="warning" variant="outlined" sx={{ bgcolor: "#fff7ed" }} />
                      ))}
                    </Stack>
                  </Grid>
                )}
              </Grid>

              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Treatment</Typography>
              <Typography sx={{ mb: 1 }}>{info?.treatment || "No treatment info available"}</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Prevention</Typography>
              <Typography sx={{ mb: 1 }}>{info?.prevention || "No prevention info available"}</Typography>
              {info?.when_to_see_doctor && (
                <>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>When to seek medical care</Typography>
                  <Typography>{info.when_to_see_doctor}</Typography>
                </>
              )}
            </CardContent>
          </Card>

          <Alert severity="info" sx={{ mt: 2 }}>
            <strong>Disclaimer:</strong> This AI analysis is for educational purposes only. Please consult a qualified dermatologist.
          </Alert>
        </Box>
      )}
    </Box>
  );
}
