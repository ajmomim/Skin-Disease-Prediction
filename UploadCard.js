import { useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

function UploadCard({ onImageUpload }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Upload Skin Image
        </Typography>

        <Button
          variant="contained"
          component="label"
          sx={{ bgcolor: '#1976d2', mb: 2 }}
        >
          Choose File
          <input hidden type="file" accept="image/*" onChange={handleFileChange} />
        </Button>

        {preview && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', borderRadius: 10 }} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default UploadCard;
