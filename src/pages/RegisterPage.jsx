import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadBasic } from "@tsparticles/basic";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const particlesInit = async (main) => {
    await loadBasic(main);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      alert("🎉 Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0f1c]">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          background: { color: "#0f0f1c" },
          particles: {
            number: { value: 70 },
            color: { value: "#14b8a6" },
            links: {
              enable: true,
              color: "#38bdf8",
              distance: 120,
              opacity: 0.4,
              width: 1,
            },
            move: { enable: true, speed: 0.7 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.5 },
          },
        }}
      />

      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-2xl border border-cyan-400/30 text-white p-10 rounded-3xl w-full max-w-md shadow-[0_0_30px_rgba(13,255,245,0.2)]"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
          Create Account
        </h2>
        {error && (
          <p className="text-red-400 bg-red-950 border border-red-500 p-2 rounded mb-4 text-center text-sm">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 bg-white/10 border border-white/20 placeholder-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 bg-white/10 border border-white/20 placeholder-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 bg-white/10 border border-white/20 placeholder-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-cyan-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-white font-semibold text-lg hover:brightness-110 transition duration-200 shadow-md"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-gray-300">
          Already have an account?{" "}
          <span
            className="text-cyan-400 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </Motion.div>
    </div>
  );
};

export default RegisterPage;
