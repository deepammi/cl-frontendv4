"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./LoginForm.style.css";
import Image from "next/image";
import EmailIcon from "../../../public/Image/EmailIcon.svg";
import PasswordIcon from "../../../public/Image/PasswordIcon.svg";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const payload = { email, password };
      const endpoint = `${process.env.NEXT_PUBLIC_API_BASEURL}/login`;
      const response = await axios.post(endpoint, payload);
      if (response.status === 200) {
        await createSession(response.data);
        router.push("/caller-dashboard");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Login");
    }
  };

  const createSession = async (accessToken: any) => {
    try {
      await axios
        .post("/api/login", null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          localStorage.setItem("accessToken", accessToken);
        });
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handler}
      style={{
        marginTop: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "center",
        width: "25rem",
      }}
    >
      <div className="input-container">
        <Image
          className="icon"
          src={EmailIcon}
          alt="logo"
          width={20}
          height={20}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-container">
        <Image
          className="icon"
          src={PasswordIcon}
          alt="logo"
          width={20}
          height={20}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <a href="#" style={{ color: "#0070f3", fontSize: "0.875rem" }}>
          Forgot Password?
        </a>
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "#4F73FF",
          padding: "0.75rem 2rem",
          borderRadius: "9999px",
          color: "#fff",
          fontWeight: "bold",
          width: "fit-content",
          border: "none",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
