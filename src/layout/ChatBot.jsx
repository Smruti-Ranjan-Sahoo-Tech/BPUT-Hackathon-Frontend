import React, { useState, useEffect, useRef } from "react";
import * as FramerMotion from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hello 👋! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [dots, setDots] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        if (!isTyping) return;
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 500);
        return () => clearInterval(interval);
    }, [isTyping]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { from: "user", text: input }];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        const botReply = await fakeBotAPI(input);
        setMessages([...newMessages, { from: "bot", text: botReply }]);
        setIsTyping(false);
        setDots("");
    };

    const fakeBotAPI = async (message) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(`You said: "${message}" 😊`), 2000);
        });
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Chat Button */}
            <FramerMotion.motion.button
                onClick={toggleChat}
                className="p-3 rounded-full bg-blue-600 text-white shadow-lg focus:outline-none cursor-pointer"
                animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <FramerMotion.AnimatePresence mode="wait">
                    {isOpen ? (
                        <FramerMotion.motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={26} />
                        </FramerMotion.motion.div>
                    ) : (
                        <FramerMotion.motion.div
                            key="chat"
                            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle size={26} />
                        </FramerMotion.motion.div>
                    )}
                </FramerMotion.AnimatePresence>
            </FramerMotion.motion.button>

            {/* Chat Window */}
            <FramerMotion.AnimatePresence>
                {isOpen && (
                    <FramerMotion.motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col"
                        style={{ height: "500px" }} // 👈 Fixed height
                    >
                        {/* Header */}
                        <div className="bg-blue-600 text-white px-4 py-2 font-semibold">
                            AI Chatbot 🤖
                        </div>

                        {/* Messages (scrollable) */}
                        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 bg-gray-50"
                            style={{ height: "400px" }} // 👈 Fixed internal height
                        >
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${msg.from === "user"
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-200 px-3 py-2 rounded-xl text-sm">
                                        Bot is typing{dots}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef}></div>
                        </div>

                        {/* Input */}
                        <div className="p-2 border-t flex gap-2 bg-white">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                className="w-full p-2 border rounded"
                            />
                            <button
                                onClick={handleSend}
                                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700"
                            >
                                Send
                            </button>
                        </div>
                    </FramerMotion.motion.div>
                )}
            </FramerMotion.AnimatePresence>
        </div>
    );
};

export default ChatBot;
