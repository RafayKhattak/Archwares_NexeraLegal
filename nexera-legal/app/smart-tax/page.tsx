"use client";

import { motion } from "framer-motion";

export default function SmartTax() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 p-6 text-center text-xl font-bold shadow-lg w-full border-b border-gray-800">
        <h1 className="text-2xl font-extrabold text-white">Smart Tax Assistance</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <motion.h2 
          className="text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Welcome to Smart Tax Assistance
        </motion.h2>
        <p className="text-gray-400 mb-6 max-w-3xl text-lg">
          Easily manage your tax filings and stay compliant with automated accuracy. Navigate through tax returns and compliance updates effortlessly.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="flex flex-wrap justify-center gap-6 pb-12">
        <a 
          href="/smart-tax/tax-returns" 
          className="w-80 p-6 bg-gray-800 text-white rounded-xl shadow-lg hover:bg-gray-700 transition duration-300 text-center"
        >
          <h3 className="text-2xl font-bold mb-2">Tax Returns</h3>
          <p className="text-gray-400">File your taxes accurately and efficiently with our automated system.</p>
        </a>
        <a 
          href="/smart-tax/compliance-updates" 
          className="w-80 p-6 bg-gray-800 text-white rounded-xl shadow-lg hover:bg-gray-700 transition duration-300 text-center"
        >
          <h3 className="text-2xl font-bold mb-2">Compliance Updates</h3>
          <p className="text-gray-400">Stay updated with the latest tax compliance regulations.</p>
        </a>
      </div>
    </div>
  );
}