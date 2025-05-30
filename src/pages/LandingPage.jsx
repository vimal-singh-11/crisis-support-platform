import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full px-6 py-4 bg-gray-900 shadow-md flex items-center justify-between"
      >
        <h1 className="text-3xl font-extrabold text-cyan-400 tracking-wide">CrisisConnect</h1>
        <div className="space-x-4 text-cyan-300 font-medium">
          <Link to="/login" className="hover:text-white transition duration-200">
            Login
          </Link>
          <Link to="/register" className="hover:text-white transition duration-200">
            Register
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4"
        >
          Empowering Communities in Crisis
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
        >
          A secure and responsive platform to report, manage, and resolve community crises quickly and safely.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/login"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-500 bg-gray-900 py-4 shadow-inner">
        &copy; {new Date().getFullYear()} CrisisConnect. United for Community Support.
      </footer>
    </div>
  );
};

export default LandingPage;
