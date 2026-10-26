"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
  Bot,
  RefreshCw,
} from "lucide-react";
import {
  queryVaidyaKnowledgeBase,
  SUGGESTED_QUICK_QUESTIONS,
  VAIDYA_DISCLAIMER,
} from "@/data/vaidyaKnowledge";
import {
  buildBotEscalationWhatsAppUrl,
  WHATSAPP_CONFIG,
} from "@/lib/whatsapp";

interface ChatMessage {
  id: string;
  sender: "vaidya" | "user";
  text: string;
  time: string;
  canEscalate?: boolean;
  relatedProduct?: string;
  suggestedFollowUps?: string[];
  isFallback?: boolean;
}

/**
 * Tasteful custom SVG Illustration for the Female Ayurvedic Practitioner
 * Designed to align seamlessly with SARVA NATURAL's Forest Green & Gold aesthetic.
 */
function FemaleVaidyaAvatar({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative rounded-full overflow-hidden bg-gradient-to-br from-[#184E3B] to-[#0E382B] p-0.5 border-2 border-[#C59B4E] shadow-sm flex items-center justify-center flex-shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Soft background glow */}
        <circle cx="50" cy="50" r="48" fill="#F4EFE6" />
        
        {/* Traditional Green / Gold Doctor Attire & Collar */}
        <path
          d="M20 95 C20 74 35 68 50 68 C65 68 80 74 80 95 Z"
          fill="#184E3B"
        />
        {/* Doctor Lab Coat V-neck */}
        <path
          d="M38 72 L50 92 L62 72 Z"
          fill="#FFFFFF"
        />
        {/* Gold Border on Collar */}
        <path
          d="M36 70 L50 94 L64 70"
          stroke="#C59B4E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Gold Ayurvedic Stethoscope / Herb Pendant */}
        <path
          d="M44 76 C44 84 56 84 56 76"
          stroke="#C59B4E"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="50" cy="85" r="3" fill="#C59B4E" />

        {/* Neck */}
        <rect x="44" y="58" width="12" height="15" rx="3" fill="#E6BA95" />

        {/* Head & Face */}
        <ellipse cx="50" cy="46" rx="19" ry="21" fill="#ECC3A0" />

        {/* Traditional Hair Bun / Volume */}
        <ellipse cx="50" cy="28" rx="20" ry="12" fill="#2C241E" />
        <ellipse cx="50" cy="20" rx="10" ry="7" fill="#2C241E" />
        {/* Hair Strands framing face */}
        <path
          d="M31 42 C31 30 38 27 50 27 C62 27 69 30 69 42 C69 46 68 52 68 52 C65 37 60 34 50 34 C40 34 35 37 32 52 Z"
          fill="#2C241E"
        />

        {/* Serene Eyes */}
        <ellipse cx="43" cy="44" rx="2.5" ry="1.6" fill="#2C241E" />
        <ellipse cx="57" cy="44" rx="2.5" ry="1.6" fill="#2C241E" />
        <circle cx="44" cy="43.5" r="0.7" fill="#FFFFFF" />
        <circle cx="58" cy="43.5" r="0.7" fill="#FFFFFF" />

        {/* Eyebrows */}
        <path d="M39 40 C41 38 45 38 47 40" stroke="#2C241E" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M53 40 C55 38 59 38 61 40" stroke="#2C241E" strokeWidth="1.2" strokeLinecap="round" />

        {/* Red / Maroon Bindi */}
        <circle cx="50" cy="38" r="1.6" fill="#9E2A2B" />

        {/* Gentle Smile */}
        <path
          d="M45 53 Q50 58 55 53"
          stroke="#9E4327"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Gold Ayurvedic Earring Studs */}
        <circle cx="30" cy="47" r="2.2" fill="#C59B4E" />
        <circle cx="70" cy="47" r="2.2" fill="#C59B4E" />
      </svg>
    </div>
  );
}

export function FemaleVaidyaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "vaidya",
      text:
        "Namaste! I am Dr. Ananya Sharma, your SARVA NATURAL Ayurvedic assistant.\n\nHow may I guide you on your wellness journey today? You can ask me about our authentic Moringa, Triphala, and Ashwagandha capsules, dosage timing (Anupana), ingredients, certifications, or delivery.",
      time: "Just now",
      canEscalate: true,
      suggestedFollowUps: SUGGESTED_QUICK_QUESTIONS.slice(0, 3),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsgId = `user-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate natural thinking delay
    setTimeout(() => {
      const response = queryVaidyaKnowledgeBase(query);
      const botMsg: ChatMessage = {
        id: `vaidya-${Date.now()}`,
        sender: "vaidya",
        text: response.answer,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        canEscalate: response.canEscalate,
        relatedProduct: response.relatedProduct,
        suggestedFollowUps: response.suggestedFollowUps,
        isFallback: !response.matched,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: "vaidya",
        text:
          "Namaste! The consultation has been refreshed.\n\nPlease feel free to ask about Moringa, Triphala, Ashwagandha, dosage directions, quality certifications, or order policies.",
        time: "Just now",
        canEscalate: true,
        suggestedFollowUps: SUGGESTED_QUICK_QUESTIONS.slice(0, 3),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right, Accessible & Unobtrusive) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Ask Our Vaidya Ayurvedic Assistant Chat"
            aria-expanded={isOpen}
            className="group relative flex items-center gap-2.5 bg-gradient-to-r from-ayur-primary to-ayur-secondary text-white pl-2 pr-4 py-2 rounded-full shadow-elevated border border-ayur-gold/60 hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ayur-gold focus:ring-offset-2"
          >
            {/* Visual Pulse ring */}
            <span className="absolute -inset-1 rounded-full bg-ayur-gold/30 animate-pulse pointer-events-none" />

            <FemaleVaidyaAvatar className="w-10 h-10 sm:w-11 sm:h-11 ring-2 ring-white/80" />

            <div className="text-left hidden min-[400px]:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-serif font-bold text-white tracking-wide">
                  Ask Our Vaidya
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] text-ayur-sand/90 font-sans block leading-none mt-0.5">
                Free Ayurvedic Guidance
              </span>
            </div>

            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-ayur-accent text-white rounded-full text-[9px] flex items-center justify-center font-bold border-2 border-white shadow-sm" />
            )}
          </button>
        )}
      </div>

      {/* Chat Drawer / Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="vaidya-chat-title"
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[390px] h-[580px] max-h-[85vh] bg-white rounded-2xl border border-ayur-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-ayur-primary via-[#144232] to-ayur-dark p-3.5 sm:p-4 text-white flex items-center justify-between border-b border-ayur-gold/30">
            <div className="flex items-center gap-2.5">
              <FemaleVaidyaAvatar className="w-10 h-10 ring-2 ring-ayur-gold" />
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    id="vaidya-chat-title"
                    className="font-serif text-sm sm:text-base font-bold text-white tracking-wide leading-tight"
                  >
                    Ask Our Vaidya
                  </h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-[9px] text-emerald-300 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-ayur-sand/90 font-serif italic mt-0.5">
                  Dr. Ananya Sharma • Ayurvedic FAQ Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart Chat"
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Restart consultation chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close Vaidya chat window"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Ethical Ayurvedic Disclaimer Banner */}
          <div className="bg-ayur-parchment/80 border-b border-ayur-sand/70 px-3 py-1.5 text-[10px] text-stone-600 flex items-center gap-1.5 font-sans leading-tight">
            <ShieldCheck className="w-3.5 h-3.5 text-ayur-primary flex-shrink-0" />
            <span className="truncate">
              Informational Ayurvedic guidance. Zero artificial treatment claims.
            </span>
          </div>

          {/* Chat Message Scrollable Feed */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 bg-[#FCFAF7]/80 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 sm:p-3.5 text-xs leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-ayur-primary text-white rounded-br-xs font-sans"
                      : "bg-white text-ayur-dark border border-ayur-border/90 rounded-bl-xs font-sans"
                  }`}
                >
                  {/* Sender Tag for Assistant */}
                  {msg.sender === "vaidya" && (
                    <div className="flex items-center gap-1.5 text-[10px] text-ayur-primary font-serif font-bold uppercase tracking-wider mb-1.5">
                      <Sparkles className="w-3 h-3 text-ayur-gold" />
                      <span>Vaidya Guidance</span>
                    </div>
                  )}

                  {/* Message Body */}
                  <p className="whitespace-pre-line text-[11px] sm:text-xs">
                    {msg.text}
                  </p>

                  {/* WhatsApp Escalation CTA for Unresolved / Doctor Requests */}
                  {msg.sender === "vaidya" && msg.canEscalate && (
                    <div className="mt-3 pt-2.5 border-t border-stone-200/80">
                      <a
                        href={buildBotEscalationWhatsAppUrl({
                          userQuestion:
                            messages
                              .filter((m) => m.sender === "user")
                              .slice(-1)[0]?.text || "Ayurvedic Formulation Guidance",
                          productContext: msg.relatedProduct,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-semibold transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-700" />
                        <span>Chat with Our Team on WhatsApp</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                      </a>
                      <span className="block text-[9px] text-stone-500 text-center mt-1">
                        Opens official WhatsApp: {WHATSAPP_CONFIG.displayNumber}
                      </span>
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-stone-400 mt-1 px-1">
                  {msg.time}
                </span>

                {/* Suggested follow-up prompt chips */}
                {msg.sender === "vaidya" &&
                  msg.suggestedFollowUps &&
                  msg.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.suggestedFollowUps.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(prompt)}
                          className="px-2.5 py-1 bg-white hover:bg-ayur-parchment text-ayur-dark hover:text-ayur-primary border border-ayur-border/80 rounded-full text-[10px] font-medium transition-all shadow-xs text-left"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-stone-200 w-fit">
                <FemaleVaidyaAvatar className="w-6 h-6" />
                <div className="flex items-center gap-1 text-[11px] text-stone-500 font-serif italic">
                  <span>Dr. Ananya is reviewing classical references</span>
                  <span className="flex gap-1 ml-1">
                    <span className="w-1.5 h-1.5 bg-ayur-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-ayur-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-ayur-gold rounded-full animate-bounce" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Question Chips Bar */}
          <div className="px-3 py-1.5 bg-stone-50 border-t border-stone-200/80 overflow-x-auto flex gap-1.5 scrollbar-none">
            {SUGGESTED_QUICK_QUESTIONS.slice(0, 4).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-ayur-sageSubtle text-stone-700 hover:text-ayur-primary text-[10px] rounded border border-stone-200 transition-colors flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input & Send Button */}
          <div className="p-3 bg-white border-t border-stone-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Moringa, Triphala, dosage, shipping..."
                className="flex-1 px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-ayur-primary focus:border-ayur-primary bg-stone-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                aria-label="Send question to Vaidya assistant"
                className="p-2.5 bg-ayur-primary hover:bg-ayur-secondary text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[9px] text-stone-400 mt-1.5 px-0.5">
              <span>SARVA NATURAL Verified Knowledge Base</span>
              <a
                href={buildBotEscalationWhatsAppUrl({
                  userQuestion: "I would like direct WhatsApp consultation with an Ayurvedic doctor.",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline flex items-center gap-0.5 font-medium"
              >
                <span>WhatsApp: {WHATSAPP_CONFIG.displayNumber}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
