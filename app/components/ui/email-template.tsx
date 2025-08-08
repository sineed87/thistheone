import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message,
}) => (
  <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#333", maxWidth: 600, margin: "0 auto", padding: 20 }}>
    <header style={{ borderBottom: "2px solid #0070f3", marginBottom: 20 }}>
      <h1 style={{ color: "#0070f3" }}>Hello {firstName},</h1>
    </header>
    <section>
      <p>
        Thank you for considering <strong>BrightWave Web Design</strong> for your project. We’ve received your message and are excited to learn more about how we can help bring your vision to life.
      </p>
      <p>Here’s a copy of your message for your reference:</p>
      <blockquote
        style={{
          padding: "15px",
          backgroundColor: "#f9f9f9",
          borderLeft: "5px solid #0070f3",
          margin: "1em 0",
          fontStyle: "italic",
          color: "#555",
          borderRadius: 4,
        }}
      >
        {message}
      </blockquote>
      <p>
        One of our design specialists will review your request and get back to you shortly with next steps.
      </p>
      <p>In the meantime, feel free to browse our portfolio at <a href="https://brightwavewebdesign.com" style={{ color: "#0070f3", textDecoration: "none" }}>brightwavewebdesign.com</a>.</p>
    </section>
    <footer style={{ borderTop: "1px solid #eaeaea", marginTop: 30, paddingTop: 15, fontSize: 12, color: "#999" }}>
      <p>BrightWave Web Design | Crafting digital experiences that inspire</p>
      <p>Contact us: <a href="mailto:contact@brightwavewebdesign.com" style={{ color: "#0070f3", textDecoration: "none" }}>contact@brightwavewebdesign.com</a></p>
    </footer>
  </div>
);
