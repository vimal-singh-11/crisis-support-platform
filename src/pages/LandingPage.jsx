import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="p-6 flex justify-between items-center bg-white shadow-md"
      >
        <h1 className="text-2xl font-bold text-blue-700">Crisis Support</h1>
        <nav className="space-x-4">
          <Link to="/login" className="text-blue-700 hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-blue-700 hover:underline">
            Register
          </Link>
        </nav>
      </motion.header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-blue-900"
        >
          Local Community Crisis Support
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-blue-800 mb-6 max-w-xl"
        >
          Connect with people, resources, and real-time help during times of crisis in your community.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            to="/Login"
            className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl shadow hover:bg-blue-800 transition"
          >
            Get Started
          </Link>
        </motion.div>
      </main>

      <footer className="p-4 text-center text-sm text-blue-700 bg-white shadow-inner">
        &copy; {new Date().getFullYear()} Crisis Support Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
