import React from "react";
import { Mail, 
  Phone, 
  Instagram, 
  MessageCircle, 
  ThumbsUp 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Section 1 - About */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">About Us</h2>
          <p className="text-sm">
            This AI-powered skin disease prediction tool helps detect conditions early
            and provides useful insights. Always consult a doctor for medical advice.
          </p>
        </div>

        {/* Section 2 - Contact Info (Corrected) */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
          {/* We'll apply the styling to the <a> tag instead of the <li> */}
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:support@skindetect.com" className="flex items-center gap-2 hover:underline">
                <Mail size={18} /> support@skindetect.com
              </a>
            </li>
            <li>
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:underline">
                <Phone size={18} /> +91 12345 67890
              </a>
            </li>
            <li>
              <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </li>
            <li>
              <a href="https://instagram.com/skindetect" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                <Instagram size={18} /> Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3 - Feedback / Extra */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Feedback</h2>
          <p className="text-sm mb-2">We value your feedback! Help us improve this tool.</p>
          <a
            href="https://forms.gle/feedbackform"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-md transition"
          >
            <ThumbsUp size={18} /> Give Feedback
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} SkinDetect AI. All rights reserved.
      </div>
    </footer>
  );
}