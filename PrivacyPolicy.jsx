import React from "react";

const PrivacyPolicy = () => (
  <div style={{ maxWidth: 800, margin: "40px auto", padding: 24 }}>
    <h2>Privacy Policy</h2>
    <p>
      <b>Skin Disease Predictor</b> respects your privacy. We do not store your uploaded images or personal data on our servers. All predictions are processed securely and confidentially.
    </p>
    <h3>Information Collection</h3>
    <p>
      We only collect information necessary for providing our services. Uploaded images are used solely for prediction and are not retained.
    </p>
    <h3>Use of Information</h3>
    <p>
      Your data is used exclusively for generating predictions and improving our AI models. We do not share your information with third parties.
    </p>
    <h3>Contact</h3>
    <p>
      For any privacy concerns, contact us at <a href="mailto:support@skindiseaseapp.com">support@skindiseaseapp.com</a>.
    </p>
  </div>
);

export default PrivacyPolicy;