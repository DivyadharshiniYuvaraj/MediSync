
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const enteredEmail = email.trim();
    const enteredPassword = password.trim();

    // Dummy Admin 
    if (enteredEmail === "admin@hospital.com" && enteredPassword === "admin") {
      const dummyAdmin = {
        id: 0,
        name: "Super Admin",
        email: "admin@hospital.com",
        role: "ADMIN"
      };
      localStorage.setItem("role", dummyAdmin.role);
      localStorage.setItem("email", dummyAdmin.email);
      localStorage.setItem("userId", dummyAdmin.id);
      localStorage.setItem("name", dummyAdmin.name);
      navigate("/admin");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: enteredEmail, password: enteredPassword })
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("role", user.role);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("name", user.name);

        if (user.role === "ADMIN") navigate("/admin");
        else if (user.role === "DOCTOR") navigate("/doctor");
        else if (user.role === "PATIENT") navigate("/patient");
      } else {
        let errorMsg = "Invalid credentials";
        try {
          const errData = await response.json();
          errorMsg = errData.message || errorMsg;
        } catch (e) {
          const raw = await response.text();
          if (raw && raw.length < 100) errorMsg = raw;
        }
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Network error. Is the backend running?");
    }
  };

  return (
    <div className="auth-page">
      <div className="mesh-gradient"></div>
      <div className="auth-container">
        <div className="auth-brand" onClick={() => navigate("/")}>
          Medi<span>cose</span>
        </div>
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue to Medicose</p>

          <div className="auth-form">
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="auth-btn" onClick={handleLogin}>
              Sign In
            </button>
          </div>

          <div className="auth-footer">
            Don't have an account?{" "}
            <span className="auth-link" onClick={() => navigate("/signup")}>
              Create one now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;