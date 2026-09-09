import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone, X, Send, Sparkles, User, RotateCcw, Zap
} from "lucide-react";

// Official WhatsApp Logo SVG
function WhatsAppLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.115-.527-1.748-.724-2.862-2.489-2.948-2.604-.087-.116-.708-.941-.708-1.796 0-.855.449-1.277.608-1.451.16-.174.348-.217.464-.217.116 0 .232.001.333.006.106.005.249-.04.39.298.144.347.491 1.2.535 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.086.159.058 1.011.477 1.184.564.174.087.289.13.333.202.044.073.044.419-.1.824z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.395A9.95 9.95 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.63 0-3.15-.47-4.44-1.28l-.32-.2-3.28.92.93-3.2-.21-.34A8.16 8.16 0 0 1 3.8 12c0-4.52 3.68-8.2 8.2-8.2 4.52 0 8.2 3.68 8.2 8.2 0 4.52-3.68 8.2-8.2 8.2z" />
    </svg>
  );
}

// Compact & Sleek Animated Transparent Robo Character
function RoboCharacter({ isHovered = false, isTalking = false, size = "md" }: { isHovered?: boolean; isTalking?: boolean; size?: "sm" | "md" }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3600);
    return () => clearInterval(blinkInterval);
  }, []);

  const dim = size === "sm" ? "size-6" : "size-8.5";

  return (
    <div className={`relative ${dim} select-none flex items-center justify-center bg-transparent`}>
      <motion.div
        animate={{
          y: isHovered ? [0, -2.5, 0] : [0, -3, 0],
          rotate: isHovered ? [0, -2, 2, 0] : [0, 0, 0]
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full flex flex-col items-center justify-center filter drop-shadow-[0_2px_8px_rgba(6,182,212,0.35)]"
      >
        {/* Antenna */}
        <div className="flex flex-col items-center -mb-0.5 z-10">
          <motion.span
            animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="size-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_6px_#FF6B00] border border-amber-200"
          />
          <span className="w-0.5 h-1 bg-gradient-to-b from-[#FF6B00] to-slate-600" />
        </div>

        {/* Head Shell */}
        <div className="relative w-[90%] h-[76%] rounded-lg bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#090D18] border border-slate-600/70 shadow-xs flex items-center justify-center overflow-hidden">
          {/* Ear Bolts */}
          <span className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-0.5 h-2 rounded-l-xs bg-[#FF6B00]/90" />
          <span className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-2 rounded-r-xs bg-[#FF6B00]/90" />

          {/* Visor Screen */}
          <div className="w-[82%] h-[70%] rounded-md bg-[#030712] border border-cyan-500/40 flex flex-col items-center justify-center relative shadow-inner">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.04)_50%)] bg-[length:100%_2px] pointer-events-none" />

            {/* Glowing Eyes */}
            <div className="flex items-center gap-1 z-10">
              <motion.div
                animate={{ scaleY: blink ? 0.1 : 1, scale: isHovered ? 1.15 : 1 }}
                transition={{ duration: 0.12 }}
                className="w-1 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee] flex items-center justify-center"
              >
                <span className="size-0.5 rounded-full bg-white opacity-90" />
              </motion.div>
              <motion.div
                animate={{ scaleY: blink ? 0.1 : 1, scale: isHovered ? 1.15 : 1 }}
                transition={{ duration: 0.12 }}
                className="w-1 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee] flex items-center justify-center"
              >
                <span className="size-0.5 rounded-full bg-white opacity-90" />
              </motion.div>
            </div>

            {/* Mouth LED */}
            <div className="mt-0.5 flex items-center gap-0.5">
              {isTalking ? (
                <>
                  <motion.span animate={{ height: [1, 2.5, 1] }} transition={{ repeat: Infinity, duration: 0.35 }} className="w-0.5 bg-[#FF6B00] rounded-full" />
                  <motion.span animate={{ height: [1, 3.5, 1] }} transition={{ repeat: Infinity, duration: 0.35, delay: 0.1 }} className="w-0.5 bg-[#FF6B00] rounded-full" />
                  <motion.span animate={{ height: [1, 2.5, 1] }} transition={{ repeat: Infinity, duration: 0.35, delay: 0.2 }} className="w-0.5 bg-[#FF6B00] rounded-full" />
                </>
              ) : (
                <div className="w-2 h-0.5 rounded-full bg-cyan-500/50 shadow-[0_0_2px_#06b6d4]" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

const INITIAL_WELCOME: ChatMessage = {
  id: "welcome",
  sender: "bot",
  text: "Hello! 🤖 I am your SAP DigiTech AI Concierge. How can I help you grow your brand or automate your business today?",
  time: "Just now",
};

const SYSTEM_CONTEXT = `
You are the official AI Robo Concierge for "SAP DigiTech Solutions" (Innovate · Integrate · Elevate).
About SAP DigiTech Solutions:
- Modern digital growth studio blending strategy, performance marketing, AI automation, and custom software.
- Presence / Hubs: Pune, Nashik, Mumbai.
- Official Contact: Phone / WhatsApp: +91 77458 68073, Email: sapdigitechsolutions@gmail.com.
- Key Products & Solutions:
  1. WhatsApp Automation System: Official Meta Cloud API compliant, 24/7 lead qualification, automated drips, multi-agent inbox.
  2. AI Lead Generation Engine: Predictive audience targeting, machine-learning lead scoring, CRM integration, verified 4.8x ROAS.
  3. CareOS Hospital Management: Smart OPD queue, digital EMR, IPD bed occupancy, pharmacy & billing sync, ABDM ready.
  4. Services: Performance Marketing (Meta & Google Ads), AI Automation, Web Engineering, Brand Strategy.

Tone: Enthusiastic, intelligent, professional, concise, and helpful. Suggest booking a strategy call or contacting the team at +91 77458 68073.
`;

export function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [roboHovered, setRoboHovered] = useState(false);
  const [speechBubbleText, setSpeechBubbleText] = useState("Hi! Need growth help?");
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";

  // Cycle speech bubbles every 5.5 seconds
  useEffect(() => {
    const bubblePhrases = [
      "Hi! Need growth help? 🚀",
      "WhatsApp Automation demo 💬",
      "Ask our Gemini AI ✨",
      "Explore Hospital CareOS 🏥",
    ];
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % bubblePhrases.length;
      setSpeechBubbleText(bubblePhrases[idx]);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatOpen) {
      scrollToBottom();
    }
  }, [messages, chatOpen, loading]);

  const quickPrompts = [
    "What services do you offer?",
    "WhatsApp Automation demo",
    "Hospital CareOS features",
    "Book a strategy call",
  ];

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: "bot",
        text: "Chat cleared. What else can I assist you with regarding SAP DigiTech solutions?",
        time: "Just now",
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      if (apiKey && apiKey.trim().length > 10 && apiKey !== "your_gemini_api_key_here") {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${SYSTEM_CONTEXT}\n\nUser Question: ${messageText}` }],
                },
              ],
              generationConfig: {
                maxOutputTokens: 250,
                temperature: 0.7,
              },
            }),
          }
        );

        const data = await response.json();
        const botReply =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Thank you for reaching out! You can speak directly with our team at +91 77458 68073 or sapdigitechsolutions@gmail.com.";

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: botReply,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        setTimeout(() => {
          let reply = "";
          const lower = messageText.toLowerCase();

          if (lower.includes("whatsapp") || lower.includes("automation")) {
            reply =
              "Our WhatsApp Automation System uses the official Meta Business Cloud API to qualify leads 24/7, trigger automated catalog sequences, and sync appointments directly to your CRM. Would you like a live demo or custom quote?";
          } else if (lower.includes("hospital") || lower.includes("careos") || lower.includes("clinic") || lower.includes("doctor")) {
            reply =
              "Our CareOS Hospital Management System features smart OPD queue management, digital EMR records, live bed occupancy tracking, and automated WhatsApp appointment reminders (ABDM aligned).";
          } else if (lower.includes("service") || lower.includes("marketing") || lower.includes("lead") || lower.includes("growth")) {
            reply =
              "We provide 4 core growth engines: 1) Performance Marketing (Meta & Google Ads), 2) Conversational WhatsApp AI, 3) AI Lead Generation, and 4) High-performance Web & Product Engineering.";
          } else if (lower.includes("contact") || lower.includes("call") || lower.includes("book") || lower.includes("phone")) {
            reply =
              "You can reach us directly at +91 77458 68073 (Phone & WhatsApp) or email sapdigitechsolutions@gmail.com. We operate across Pune, Nashik, and Mumbai.";
          } else {
            reply =
              "Thank you for reaching out to SAP DigiTech Solutions! We engineer high-performance marketing and AI systems for ambitious businesses. Speak directly with our strategy team at +91 77458 68073.";
          }

          if (!apiKey || apiKey === "your_gemini_api_key_here") {
            reply +=
              "\n\n*(💡 Tip: Add your Gemini API key in `.env` as VITE_GEMINI_API_KEY for live AI generation)*";
          }

          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: "bot",
              text: reply,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        }, 400);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "I\'m having trouble connecting right now. Please call or WhatsApp us directly at +91 77458 68073 for immediate assistance!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Vertical Floating Action Stack (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 pointer-events-auto select-none">
        {/* 1. Direct Phone Call Button */}
        <div className="relative group flex items-center justify-end">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute right-12 whitespace-nowrap bg-[#0B0F19]/95 text-white text-[0.7rem] font-semibold px-2.5 py-1 rounded-lg shadow-lg border border-white/10 backdrop-blur-md">
            Call +91 77458 68073
          </span>
          <a
            href="tel:+917745868073"
            aria-label="Call +91 77458 68073"
            className="size-9.5 rounded-full bg-[#0B0F19]/90 hover:bg-[#151D2E] text-white border border-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
          >
            <Phone className="size-3.5 text-slate-200 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* 2. Official WhatsApp Button */}
        <div className="relative group flex items-center justify-end">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute right-12 whitespace-nowrap bg-[#075E54]/95 text-white text-[0.7rem] font-semibold px-2.5 py-1 rounded-lg shadow-lg border border-emerald-500/30 backdrop-blur-md">
            Chat on WhatsApp
          </span>
          <a
            href="https://wa.me/917745868073?text=Hi%20SAP%20DigiTech%20Solutions%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="size-9.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-[0_8px_20px_rgba(37,211,102,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
          >
            <WhatsAppLogo className="size-4.5 text-white" />
          </a>
        </div>

        {/* 3. Sleek Transparent AI Robo Widget (Zero Background, Reduced Size) */}
        <div className="relative flex items-center justify-end">
          {/* Floating Speech Bubble Teaser */}
          <AnimatePresence>
            {!chatOpen && showSpeechBubble && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.92 }}
                className="absolute right-11 whitespace-nowrap bg-[#0B0F19]/95 text-slate-100 text-[0.72rem] font-semibold px-2.5 py-1.5 rounded-xl shadow-xl border border-cyan-500/30 backdrop-blur-xl flex items-center gap-1.5"
              >
                <span>{speechBubbleText}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSpeechBubble(false);
                  }}
                  className="size-3.5 rounded-full text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="size-2.5" />
                </button>
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-y-3 border-y-transparent border-l-4 border-l-[#0B0F19]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transparent AI Robo Trigger */}
          <button
            type="button"
            onClick={() => {
              setChatOpen(!chatOpen);
              setShowSpeechBubble(false);
            }}
            onMouseEnter={() => setRoboHovered(true)}
            onMouseLeave={() => setRoboHovered(false)}
            aria-label="Toggle AI Robo Assistant"
            className="relative bg-transparent border-none p-0 transition-all duration-300 hover:scale-115 active:scale-95 cursor-pointer flex items-center justify-center outline-none shadow-none"
          >
            {chatOpen ? (
              <div className="size-9 rounded-full bg-[#0B0F19]/90 border border-white/20 text-white shadow-lg grid place-items-center backdrop-blur-md">
                <X className="size-4 text-white" />
              </div>
            ) : (
              <RoboCharacter isHovered={roboHovered} isTalking={false} size="md" />
            )}
          </button>
        </div>
      </div>

      {/* AI Robo Concierge Chat Section (Reduced Size, No Scrollbar, Ultra-Clean UX) */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: "spring", damping: 28, stiffness: 360 }}
            className="fixed bottom-20 right-4 sm:right-5 z-50 w-[calc(100vw-2rem)] sm:w-[350px] h-[450px] max-h-[76vh] rounded-2xl bg-[#090D18]/95 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden text-slate-100 font-sans backdrop-blur-xl"
          >
            {/* Header */}
            <div className="px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <RoboCharacter isHovered={false} isTalking={loading} size="sm" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-white tracking-tight">SAP DigiTech AI</h3>
                    <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <p className="text-[0.62rem] text-slate-400 font-medium">
                    {apiKey ? "Gemini 1.5 Flash • Active" : "AI Assistant • Instant"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Clear Chat"
                  className="size-6.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white grid place-items-center transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  title="Close"
                  className="size-6.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white grid place-items-center transition-colors cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body (Scrollbar Hidden) */}
            <div
              className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-[#060A13] no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={["flex gap-2", m.sender === "user" ? "justify-end" : "justify-start"].join(" ")}
                >
                  {m.sender === "bot" && (
                    <div className="size-5 rounded-md bg-slate-800 text-cyan-400 grid place-items-center shrink-0 mt-0.5 border border-cyan-500/30">
                      <Sparkles className="size-2.5" />
                    </div>
                  )}

                  <div
                    className={[
                      "max-w-[84%] rounded-xl px-3 py-2 text-[0.74rem] leading-relaxed shadow-xs",
                      m.sender === "user"
                        ? "bg-gradient-to-r from-[#FF6B00] to-[#E05300] text-white rounded-tr-xs font-medium"
                        : "bg-[#0E1526] text-slate-200 rounded-tl-xs border border-slate-800/90 whitespace-pre-line"
                    ].join(" ")}
                  >
                    <p>{m.text}</p>
                    <span className="text-[0.58rem] text-slate-500 mt-1 block text-right font-mono">{m.time}</span>
                  </div>

                  {m.sender === "user" && (
                    <div className="size-5 rounded-md bg-slate-800 text-slate-300 grid place-items-center shrink-0 mt-0.5">
                      <User className="size-2.5" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-1.5 text-[0.7rem] text-slate-400 bg-[#0E1526] rounded-xl rounded-tl-xs px-3 py-1.5 w-fit border border-slate-800">
                  <span className="size-1 rounded-full bg-cyan-400 animate-ping" />
                  <span className="size-1 rounded-full bg-cyan-400 animate-pulse delay-100" />
                  <span className="size-1 rounded-full bg-cyan-400 animate-pulse delay-200" />
                  <span className="text-[0.68rem] text-slate-400 ml-1">Robo is replying...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Carousel (Scrollbar Hidden) */}
            <div
              className="px-3 py-1.5 bg-slate-950 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[0.65rem]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {quickPrompts.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#10172A] hover:bg-[#1E293B] text-slate-300 hover:text-white border border-slate-800 transition-colors shrink-0 cursor-pointer font-medium"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2.5 bg-slate-900/95 border-t border-slate-800 flex items-center gap-1.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AI, WhatsApp, CareOS..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="size-7.5 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white grid place-items-center transition-all shrink-0 cursor-pointer shadow-xs"
              >
                <Send className="size-3" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
