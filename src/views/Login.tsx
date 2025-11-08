"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion } from "framer-motion";
import Image from "next/image";
import { useApp } from "@/app/providers";
import logo from "../assets/icon.png";

export function Login() {
  const { handleLogin } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate .edu email
    if (!email.endsWith('.edu')) {
      setError('Please use your university email (.edu)');
      return;
    }
    
    setError("");
    handleLogin(email);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative w-20 h-20"
          >
            <Image 
              src={logo} 
              alt="UListed Logo" 
              fill
              className="rounded-2xl object-cover"
            />
          </motion.div>
          <div className="text-center">
            <h1 className="text-blue-600">
              UListed
            </h1>
            <p className="text-gray-600 mt-2">
              Student marketplace for your campus
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">
                University Email
              </label>
              <Input
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                required
                className={`w-full h-12 rounded-xl border-2 transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${
                  error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-600 hover:border-gray-300'
                }`}
              />
              {error && (
                <p className="text-red-500 mt-2">{error}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 rounded-xl border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 hover:border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Sign In
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-600 pt-4">
          By continuing, you agree to our Terms & Privacy Policy
        </div>
      </motion.div>
    </div>
  );
}
