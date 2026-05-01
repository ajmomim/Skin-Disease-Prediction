// src/components/WhyUsSection.js

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider
} from "@mui/material";
import { styled } from "@mui/system";

// Import icons
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";

const benefitCards = [
  {
    id: 1,
    title: "Smart",
    icon: <LightbulbOutlinedIcon />,
    description:
      "AI Dermatologist is created on the basis of artificial intelligence as a result of joint work of IT specialists and doctors. Our app has the same accuracy as a professional dermatologist.",
  },
  {
    id: 2,
    title: "Simple",
    icon: <AccessTimeOutlinedIcon />,
    description:
      "Place your phone near a mole or other formation on the skin and within 1 minute you will find out if there is cause for concern.",
  },
  {
    id: 3,
    title: "Accessible",
    icon: <PhoneAndroidOutlinedIcon />,
    description:
      "AI Dermatologist is available anytime, anywhere. Keep your health in check at your fingertips even when you are on the go.",
  },
];

// Styled component for the benefit cards
const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "row", // Horizontal layout for icon and text
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  minWidth: 60,
  minHeight: 60,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.light,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(3), // Space between icon and text
  "& .MuiSvgIcon-root": {
    fontSize: "2rem",
    color: theme.palette.primary.main,
  },
}));

const WhyUsSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: "transparent" }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom sx={{ mb: 6 }}>
          Why is AI Dermatologist worth using?
        </Typography>
        
        {/* Vertical Stack of Cards */}
        <Grid container direction="column" spacing={4} alignItems="stretch">
          {benefitCards.map((card, index) => (
            <Grid item xs={12} key={card.id}>
              <BenefitCard>
                <IconWrapper>{card.icon}</IconWrapper>
                <Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </Box>
              </BenefitCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyUsSection;