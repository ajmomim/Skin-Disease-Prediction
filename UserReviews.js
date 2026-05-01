// src/components/UserReviews.js

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Rating,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const reviewsData = [
  {
    id: 1,
    name: "Ayaan Shaikh",
    text: "Fast results with excellent information regarding what the skin condition is...app very easy to use.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Misbah Ansari",
    text: "Last week I downloaded the app and took a picture of a concerning growth on my head. It came back with 92% confidence on the diagnosis. Went to the dermatologist this morning and received the same diagnosis. I told the derm about the app diagnosis after. I love what AI can do for healthcare and look forward to having this app be a supplemental tool to my dermatologist.",
    rating: 5,
  },
  {
    id: 3,
    name: "Abdal Nafi Morak",
    text: "This app is a game-changer! I used it for a rash, and the prediction was very accurate. It saved me a trip to the clinic.",
    rating: 4.0,
  },
  {
    id: 4,
    name: "Waquar Ansari",
    text: "As a busy professional in Mumbai, this app is incredibly convenient. Quick, reliable, and easy to use. Highly recommend!",
    rating: 4.0,
  },
];

// Styled component for the card-like review
const ReviewCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: 180, // Ensure a consistent height for the card
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4], // Slightly stronger shadow for prominence
  backgroundColor: theme.palette.background.paper,
}));

// Main component for the user reviews section with carousel functionality
const UserReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
    );
  };

  const currentReview = reviewsData[activeIndex];

  return (
    <Box sx={{ py: 8, bgcolor: "#f9f9f9", position: "relative" }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
          84% of our users find AI Dermatologist helpfull.
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 6, color: "text.secondary" }}
        >
          Hear what our community has to say.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            position: "relative",
          }}
        >
          {/* Previous Button */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: { xs: 0, md: -60 }, // Adjust position for different screen sizes
              zIndex: 1,
              bgcolor: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 1)",
              },
            }}
            aria-label="previous review"
          >
            <ArrowBackIosIcon />
          </IconButton>

          {/* Current Review Card */}
          <Box sx={{ flexGrow: 1, mx: { xs: 0, md: 8 } }}>
            <ReviewCard elevation={6}>
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {currentReview.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {currentReview.text}
                </Typography>
                <Rating
                  name="read-only"
                  value={currentReview.rating}
                  precision={0.5}
                  readOnly
                  sx={{ mt: "auto" }} 
                />
              </Box>
            </ReviewCard>
          </Box>

          {/* Next Button */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: { xs: 0, md: -60 }, // Adjust position for different screen sizes
              zIndex: 1,
              bgcolor: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 1)",
              },
            }}
            aria-label="next review"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Optional: Dot indicators for carousel (if desired) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            gap: 1,
          }}
        >
          {reviewsData.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: index === activeIndex ? "primary.main" : "grey.400",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default UserReviews;