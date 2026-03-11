"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{
      minHeight: "100vh",
      minHeight: "100dvh",
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
    }}>
      {/* Status bar spacer */}
      <div style={{ height: "20px", width: "100%", flexShrink: 0 }} />

      {/* Body */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "86px",
        width: "100%",
        maxWidth: "375px",
        padding: "0 16px",
      }}>
        {/* Facebook logo */}
        <img
          src="/images/fb-logo-circle.png"
          alt="Facebook"
          style={{ width: "60px", height: "60px" }}
        />

        {/* Input fields and CTA */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "12px",
          width: "100%",
        }}>
          {/* Email input */}
          <input
            type="text"
            placeholder="Mobile number or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              height: "60px",
              padding: "20px 16px",
              border: "1px solid #ccd3db",
              borderRadius: "16px",
              background: "#ffffff",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "19px",
              letterSpacing: "0px",
              color: "#1c2b33",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              height: "60px",
              padding: "20px 16px",
              border: "1px solid #ccd3db",
              borderRadius: "16px",
              background: "#ffffff",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "19px",
              letterSpacing: "0px",
              color: "#1c2b33",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />

          {/* Log in button */}
          <button
            style={{
              width: "100%",
              minHeight: "44px",
              padding: "12px 20px",
              background: "#0064e0",
              border: "none",
              borderRadius: "9999px",
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "19px",
              letterSpacing: "0px",
              color: "#ffffff",
              cursor: "pointer",
              textAlign: "center",
              fontFamily: "inherit",
            }}
          >
            Log in
          </button>

          {/* Forgot password */}
          <button
            style={{
              width: "100%",
              minHeight: "36px",
              padding: "6px 16px",
              background: "none",
              border: "none",
              borderRadius: "9999px",
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "20px",
              letterSpacing: "-0.08px",
              color: "#1c2b33",
              cursor: "pointer",
              textAlign: "center",
              fontFamily: "inherit",
            }}
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "100%",
        maxWidth: "375px",
        padding: "0 16px",
        paddingBottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
      }}>
        {/* Create new account button */}
        <button
          style={{
            width: "100%",
            minHeight: "44px",
            padding: "12px 20px",
            background: "none",
            border: "1px solid #0064e0",
            borderRadius: "9999px",
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: "19px",
            letterSpacing: "0px",
            color: "#0064e0",
            cursor: "pointer",
            textAlign: "center",
            fontFamily: "inherit",
          }}
        >
          Create new account
        </button>

        {/* Meta logo */}
        <img
          src="/images/meta-logo.png"
          alt="Meta"
          style={{ width: "60px", height: "12px", opacity: 0.5 }}
        />
      </div>
    </div>
  );
}
