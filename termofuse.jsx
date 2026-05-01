import React from "react";
import { Link } from "react-router-dom";

export default function TermsOfUse() {
  return (
    <main style={{ maxWidth: 980, margin: "40px auto", padding: 24 }}>
      <h1>Terms of Use</h1>

      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <section>
        <h2>1. Acceptance of terms</h2>
        <p>
          By using AI Dermatologist (the "Service") you agree to these Terms of Use. If you do not agree, do not use the Service.
        </p>
      </section>

      <section>
        <h2>2. Use of the Service</h2>
        <p>
          The Service provides AI-powered skin condition predictions for informational purposes only. It is not a medical diagnosis. Always consult a qualified healthcare professional for diagnosis and treatment.
        </p>
      </section>

      <section>
        <h2>3. User responsibilities</h2>
        <ul>
          <li>Provide clear, accurate images and information.</li>
          <li>Do not use the Service for unlawful purposes.</li>
          <li>Keep your account credentials secure (if applicable).</li>
        </ul>
      </section>

      <section>
        <h2>4. Disclaimer & limitations</h2>
        <p>
          The Service is provided "as is". We do not guarantee accuracy, completeness, or that results will be error-free. We are not responsible for decisions made based on the Service.
        </p>
      </section>

      <section>
        <h2>5. Privacy</h2>
        <p>
          Our <Link to="/privacy-policy">Privacy Policy</Link> explains how we collect and use information.
        </p>
      </section>

      <section>
        <h2>6. Changes to these terms</h2>
        <p>
          We may update these Terms from time to time. Continued use after changes constitutes acceptance.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          For questions about these terms contact <a href="mailto:dermoai@gmail.com">dermoai@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}