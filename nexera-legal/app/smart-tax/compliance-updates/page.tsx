"use client";

import { motion } from "framer-motion";

export default function ComplianceUpdates() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold">Tax Compliance Updates</h1>
        <p className="text-gray-400">Latest Compliance Notifications</p>
      </header>

      {/* Compliance Updates List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Update 1 */}
        <div className="bg-gray-900 p-6 rounded-lg mb-6 shadow-lg">
          <h2 className="text-xl font-bold">New Tax Regulations Implemented</h2>
          <p className="text-gray-400 mt-2">
            The government has introduced new tax regulations affecting small businesses. 
            Ensure your tax documents reflect these changes by November 30, 2024.
          </p>
          <div className="mt-4 flex justify-between items-center">
            <a href="#" className="text-blue-400 hover:underline">
              View Details
            </a>
            <span className="text-gray-500 text-sm">October 15, 2024</span>
          </div>
        </div>

        {/* Update 2 */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Changes in Tax Deductions</h2>
          <p className="text-gray-400 mt-2">
            Certain tax deductions for freelancers have been updated. Review the new limits 
            to maximize your deductions.
          </p>
          <div className="mt-4 flex justify-between items-center">
            <a href="#" className="text-blue-400 hover:underline">
              View Details
            </a>
            <span className="text-gray-500 text-sm">October 15, 2024</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
