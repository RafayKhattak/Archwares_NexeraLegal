"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TaxReturns() {
  const [form, setForm] = useState({
    income: "",
    deductible: "",
    otherDeductions: "",
    prepaidTax: "",
    taxYear: "",
    taxpayerType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold">Tax Filing</h1>
        <p className="text-gray-400">Automate your tax filing with accuracy.</p>
      </header>

      {/* Form Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-bold mb-4">Financial Summary Details</h2>
        <p className="text-gray-400 mb-6">Prepare and file your tax returns with automated accuracy.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="text" name="income" placeholder="Enter your total income" className="bg-gray-800 p-3 rounded-md" onChange={handleChange} />
          <input type="text" name="deductible" placeholder="Enter your deductible expenses" className="bg-gray-800 p-3 rounded-md" onChange={handleChange} />
          <input type="text" name="otherDeductions" placeholder="Enter any additional tax deductions" className="bg-gray-800 p-3 rounded-md" onChange={handleChange} />
          <input type="text" name="prepaidTax" placeholder="Enter prepaid tax amounts" className="bg-gray-800 p-3 rounded-md" onChange={handleChange} />
          <select name="taxYear" className="bg-gray-800 p-3 rounded-md" onChange={handleChange}>
            <option value="">Select Tax Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2024">2025</option>
          </select>
          <select name="taxpayerType" className="bg-gray-800 p-3 rounded-md" onChange={handleChange}>
            <option value="">Select Taxpayer Type</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </div>
      </motion.div>

      {/* Buttons */}
      <div className="mt-8">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md">Get Assistance</button>
      </div>
      
    </div>
  );
}
