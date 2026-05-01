import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

function ResultCard({ result }) {
  if (!result) return null;

  return (
    <Card sx={{ mt: 4, p: 2, border: '1px solid #ccc' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Prediction Result
        </Typography>

        <Chip
          label={result.disease}
          color="primary"
          sx={{ fontSize: '1rem', p: 2 }}
        />

        {result.details && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">{result.details}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default ResultCard;
