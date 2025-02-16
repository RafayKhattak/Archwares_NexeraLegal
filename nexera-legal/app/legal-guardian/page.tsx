"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mic,
  FileText,
  User,
  Gavel,
  RefreshCcw,
  Menu,
} from "lucide-react";

// Updated Chat interface based on API output.
interface Chat {
  ChatID: number;
  Title: string;
  CreatedAt: string;
}

interface Message {
  role: "user" | "ai";
  content: string;
}

interface GraphChatRequest {
  Query: string;
  ChatID?: number;
  AudioFlag?: boolean;
  AudioFile?: string;
}

export default function LegalGuardian() {
  // Chat and messaging states
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [currentChatID, setCurrentChatID] = useState<number | null>(null);

  // Audio recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    fetchChatList();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch chat list using proxy
  const fetchChatList = async () => {
    try {
      const res = await fetch("/api/proxyChatList");
      if (!res.ok) {
        throw new Error(`Server error: ${res.statusText}`);
      }
      const data = await res.json();
      setChatList(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching chat list:", error.message);
      } else {
        console.error("Unknown error fetching chat list");
      }
    }
  };

  // Load chat history and transform messages from API format
  const loadChat = async (chatID: number) => {
    try {
      const res = await fetch(
        `http://44.203.0.32:8000/api/nexgen/Chat/${chatID}/get_chat_messages/`
      );
      if (!res.ok) {
        throw new Error(`Server error: ${res.statusText}`);
      }
      const data = await res.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transformedMessages: Message[] = data.map((item: any) => ({
        role: item.HumanFlag ? "user" : "ai",
        content: item.Message,
      }));

      setMessages(transformedMessages);
      setCurrentChatID(chatID);
      setSidebarOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error loading chat:", error.message);
      } else {
        console.error("Unknown error loading chat");
      }
    }
  };

  // Upload audio file to S3 via our API route and return the URL
  const uploadAudioToS3 = async (blob: Blob): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", blob, "recording.webm");

      const res = await fetch("/api/uploadAudio", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`);
      }
      const data = await res.json();
      return data.url;
    } catch (error: unknown) {
      console.error("Error uploading audio:", error);
      return null;
    }
  };

  // Updated sendMessage function to support text and audio messages
  const sendMessage = async () => {
    // If no input, file, or audio, do nothing.
    if (!input.trim() && !file && !isAudio) return;

    // Create a user message for display.
    const userMessage: Message = isAudio
      ? { role: "user", content: "Audio message sent" }
      : { role: "user", content: input || "Uploaded a file" };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      let requestBody: GraphChatRequest;
      if (isAudio && audioBlob) {
        // Upload the audio blob to S3
        const audioUrl = await uploadAudioToS3(audioBlob);
        if (!audioUrl) throw new Error("Audio upload failed");

        requestBody = {
          Query: "",
          ...(currentChatID ? { ChatID: currentChatID } : {}),
          AudioFlag: true,
          AudioFile: audioUrl,
        };
      } else {
        requestBody = {
          Query: file ? "Uploaded a file" : input,
          ...(currentChatID ? { ChatID: currentChatID } : {}),
        };
      }

      const response = await fetch("/api/proxyGraphChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const data = await response.json();

      if (!currentChatID && data.chat_id) {
        setCurrentChatID(data.chat_id);
        fetchChatList();
      }

      const aiMessage: Message = {
        role: "ai",
        content: data.results || "AI response not available.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error sending message:", error.message);
      } else {
        console.error("Unknown error sending message");
      }
    } finally {
      setLoading(false);
      setFile(null);
      setIsAudio(false);
      setAudioBlob(null);
    }
  };

  // Handler for non-audio file upload.
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Toggle recording using MediaRecorder API.
  const handleMicClick = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        recordedChunksRef.current = [];

        mediaRecorder.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        });

        mediaRecorder.addEventListener("stop", () => {
          // Combine recorded chunks into a blob.
          const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
          setAudioBlob(blob);
          setIsAudio(true);
        });

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error starting recording:", err);
      }
    } else {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        // Optionally, you can automatically trigger sending the message after a short delay.
        // setTimeout(() => sendMessage(), 500);
      }
    }
  };

  const newChat = () => {
    setMessages([]);
    setInput("");
    setFile(null);
    setCurrentChatID(null);
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
        <button onClick={() => setSidebarOpen(false)} className="text-white p-2">
          ✖
        </button>
        <h2 className="text-lg font-semibold mb-4">Chat History</h2>
        <div className="overflow-y-auto max-h-[80vh] space-y-2">
          {chatList.map((chat) => (
            <button
              key={`chat-${chat.ChatID}`}
              className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              onClick={() => loadChat(chat.ChatID)}
            >
              {chat.Title}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Header */}
      <header className="bg-gray-800 p-4 text-center text-lg font-semibold shadow-md flex justify-between items-center w-full">
        <button onClick={() => setSidebarOpen(true)} className="text-white p-2">
          <Menu size={24} />
        </button>
        <span className="text-sm sm:text-lg">
          Legal Insight &amp; Compliance Guardian
        </span>
        <button
          onClick={newChat}
          className="bg-green-600 hover:bg-green-700 p-1 sm:p-2 rounded-lg text-white shadow-md flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
        >
          <RefreshCcw size={16} className="sm:size-18" /> New Chat
        </button>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((msg, index) => (
          <motion.div
            key={`message-${msg.role}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
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
        ⚠️ Disclaimer: This AI system is still in development and may make
        mistakes. For serious legal matters, consult a professional.
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
        <button
          onClick={handleMicClick}
          className={`bg-gray-700 p-2 sm:p-3 rounded-lg text-white shadow-md ${
            isRecording ? "bg-red-600" : ""
          }`}
        >
          <Mic size={20} />
        </button>
        <input type="file" onChange={handleFileUpload} className="hidden" id="fileUpload" />
        <label
          htmlFor="fileUpload"
          className="bg-gray-700 p-2 sm:p-3 rounded-lg text-white shadow-md cursor-pointer"
        >
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
