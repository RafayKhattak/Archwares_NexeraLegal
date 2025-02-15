"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mic, FileText, User, Gavel, RefreshCcw, Menu } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function LegalGuardian() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[][]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() && !file) return;
    
    const newMessage: Message = { role: "user", content: input || "Uploaded a file" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        role: "ai",
        content: file ? "Processing your document..." : "I am analyzing your query. Please wait...",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const newChat = () => {
    if (messages.length > 0) {
      setChatHistory((prev) => [...prev, messages]);
    }
    setMessages([]);
    setInput("");
    setFile(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white relative">
      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-64 h-full bg-gray-800 p-4 shadow-lg z-50"
      >
        <button onClick={() => setSidebarOpen(false)} className="text-white p-2">✖</button>
        <h2 className="text-lg font-semibold mb-4">Chat History</h2>
        <div className="overflow-y-auto max-h-[80vh] space-y-2">
          {chatHistory.map((chat, index) => (
            <button
              key={index}
              className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              onClick={() => setMessages(chat)}
            >
              Chat {index + 1}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Header */}
      <header className="bg-gray-800 p-4 text-center text-lg font-semibold shadow-md flex justify-between items-center w-full">
        <button onClick={() => setSidebarOpen(true)} className="text-white p-2">
          <Menu size={24} />
        </button>
        <span className="text-sm sm:text-lg">Legal Insight & Compliance Guardian</span>
        <button onClick={newChat} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white shadow-md flex items-center gap-2">
          <RefreshCcw size={18} /> New Chat
        </button>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && <Gavel className="text-yellow-500" size={24} />}
            <div
              className={`px-4 py-2 max-w-xs sm:max-w-md md:max-w-lg rounded-2xl shadow-md text-sm flex items-center gap-2 ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && <User className="text-blue-400" size={24} />}
          </motion.div>
        ))}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-gray-400 text-sm"
          >
            AI is typing...
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      <div className="text-gray-400 text-xs sm:text-sm p-3 text-center">
        ⚠️ Disclaimer: This AI system is still in development and may make mistakes. For serious legal matters, consult a professional.
      </div>

      {/* Input Box */}
      <div className="bg-gray-800 p-2 sm:p-4 flex items-center gap-2 sm:gap-3 w-full max-w-4xl mx-auto mb-4 rounded-lg shadow-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a legal question..."
          className="flex-1 bg-gray-700 text-white p-2 sm:p-3 rounded-lg outline-none shadow-md w-full"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="bg-gray-700 p-2 sm:p-3 rounded-lg text-white shadow-md">
          <Mic size={20} />
        </button>
        <input type="file" onChange={handleFileUpload} className="hidden" id="fileUpload" />
        <label htmlFor="fileUpload" className="bg-gray-700 p-2 sm:p-3 rounded-lg text-white shadow-md cursor-pointer">
          <FileText size={20} />
        </label>
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 p-2 sm:p-3 rounded-lg text-white shadow-md"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
