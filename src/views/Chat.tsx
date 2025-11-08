"use client";

import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Search, Send, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ChatConversation } from "@/app/types";

interface ChatProps {
  conversations: ChatConversation[];
  onMarkAsRead: (conversationId: number) => void;
}

export function Chat({ conversations, onMarkAsRead }: ChatProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "them",
      text: "Hi! Is this still available?",
      time: "2:34 PM",
    },
    {
      id: 2,
      sender: "me",
      text: "Yes, it is! Would you like to see it?",
      time: "2:35 PM",
    },
    {
      id: 3,
      sender: "them",
      text: "Great! When are you free to meet?",
      time: "2:36 PM",
    },
    {
      id: 4,
      sender: "me",
      text: "I'm available tomorrow afternoon at the library",
      time: "2:37 PM",
    },
  ]);

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    onMarkAsRead(chatId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "me",
        text: message,
        time: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  // Chat List View
  if (!selectedChat) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="max-w-lg mx-auto px-6 py-4">
            <h1 className="text-gray-900">Messages</h1>
            <p className="text-gray-600 mt-1">
              {conversations.filter(c => c.unread).length} unread
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-lg mx-auto px-6 py-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-full border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 hover:border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="max-w-lg mx-auto">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="text-gray-400 mb-2">No messages found</div>
              <p className="text-gray-500">Start chatting with sellers!</p>
            </div>
          ) : (
            filteredConversations.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => handleChatSelect(chat.id)}
              >
                <Card
                  className={`m-4 mx-6 p-4 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
                    chat.unread ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {chat.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {chat.unread && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                          1
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-gray-900">
                          {chat.name}
                        </h3>
                        <span className="text-gray-500">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.listing && (
                        <p className="text-blue-600 mt-1">
                          Re: {chat.listing}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Chat Detail View
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setSelectedChat(null)}
              className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-blue-600 text-white">
                {selectedConversation?.name.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-gray-900">
                {selectedConversation?.name}
              </h2>
              {selectedConversation?.listing && (
                <p className="text-gray-500">
                  Re: {selectedConversation.listing}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-lg mx-auto w-full px-6 py-6 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.sender === "me"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white text-gray-900 shadow-sm rounded-bl-sm"
              }`}
            >
              <p className="break-words">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "me" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-lg mx-auto px-6 py-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 h-12 rounded-full border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 hover:border-gray-300"
            />
            <motion.button
              type="submit"
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!message.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
