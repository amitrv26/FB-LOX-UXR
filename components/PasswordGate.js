"use client";

import { useState, useEffect, useCallback } from "react";

const SESSION_KEY = "site_authenticated";

export default function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      setAuthenticated(true);
    }
    setChecked(true);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const sitePassword = process.env.NEXT_PUBLIC_SITE_PASSWORD;

      if (!sitePassword || password === sitePassword) {
        sessionStorage.setItem(SESSION_KEY, "true");
        setAuthenticated(true);
      } else {
        setError(true);
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      }
    },
    [password]
  );

  if (!checked) return null;
  if (authenticated) return children;

  return (
    <div style={styles.backdrop}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 8 }}>
          <path
            d="M12 2C9.24 2 7 4.24 7 7v3H5.5A1.5 1.5 0 004 11.5v9A1.5 1.5 0 005.5 22h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0018.5 10H17V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v3H9V7c0-1.66 1.34-3 3-3zm0 10a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
            fill="#0866ff"
          />
        </svg>

        <h1 style={styles.title}>Enter password</h1>
        <p style={styles.subtitle}>This site is password-protected.</p>

        <div
          style={{
            ...styles.inputWrapper,
            borderColor: error ? "#e74c3c" : "#e4e6eb",
            animation: shaking ? "gate-shake 0.4s ease" : "none",
          }}
        >
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Password"
            autoFocus
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>Incorrect password</p>}

        <button type="submit" style={styles.button}>
          Continue
        </button>
      </form>

      <style>{`
        @keyframes gate-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 999999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f5",
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "340px",
    padding: "40px 24px 32px",
    margin: "0 16px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    lineHeight: "28px",
    color: "#050505",
    margin: "0 0 4px",
  },
  subtitle: {
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: "20px",
    color: "#65686c",
    margin: "0 0 24px",
  },
  inputWrapper: {
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #e4e6eb",
    overflow: "hidden",
    transition: "border-color 0.15s ease",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "17px",
    fontWeight: 400,
    lineHeight: "22px",
    color: "#050505",
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    boxSizing: "border-box",
  },
  error: {
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: "18px",
    color: "#e74c3c",
    margin: "8px 0 0",
    alignSelf: "flex-start",
  },
  button: {
    width: "100%",
    marginTop: "16px",
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#0866ff",
    color: "#fff",
    fontSize: "17px",
    fontWeight: 600,
    lineHeight: "22px",
    cursor: "pointer",
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
};
