import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import { events } from "../../data/events";



const HF_API_URL = "https://sudharsann-celista-ai.hf.space/run/predict";

const quickPrompts = [
  "Show technical events",
  "Show non technical events",
  "How to register?",
  "Where is the venue?"
];

const Chatbot = () => {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Celista AI 🤖. What can i do for you?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  // 🔍 Search event in events.js
  const findEvent = (message) => {
    return events.find(event =>
      message.toLowerCase().includes(event.name.toLowerCase())
    );
  };

  const sendMessage = async (msg) => {
  if (!msg.trim()) return;

  setMessages(prev => [...prev, { sender: "user", text: msg }]);
  setInput("");

  const text = msg.toLowerCase();

/* ================= EVENT NAME SEARCH ================= */

const event = events.find(e =>
  text.includes(e.name.toLowerCase())
);

if (event) {

  const registerText =
    event.registrationLink === "On Spot  Registration"
      ? "📝 Registration: On-Spot Registration Only"
      : `🔗 Register: ${event.registrationLink}`;

  const reply = `${event.name}

${event.description}

📍 Venue: ${event.venue}

${registerText}`;

  setMessages(prev => [...prev, { sender: "bot", text: reply }]);
  return;
}

/* ================= NON TECHNICAL EVENTS ================= */

if (
  text.includes("non technical") ||
  text.includes("non-technical") ||
  text.includes("nontechnical")
) {

  const nonTechEvents = events
    .filter(e => e.category === "non-technical")
    .map(e => `• ${e.name}`)
    .join("\n");

  setMessages(prev => [
    ...prev,
    {
      sender: "bot",
      text: `Here are the non-technical events:\n\n${nonTechEvents}`
    }
  ]);

  return;
}

/* ================= TECHNICAL EVENTS ================= */

if (text.includes("technical")) {

  const techEvents = events
    .filter(e => e.category === "technical")
    .map(e => `• ${e.name}`)
    .join("\n");

  setMessages(prev => [
    ...prev,
    {
      sender: "bot",
      text: `Here are the technical events:\n\n${techEvents}`
    }
  ]);

  return;
}
/* ================= VENUE QUESTION ================= */

if (text.includes("venue")) {

  const venueList = events
    .map(e => `• ${e.name} → ${e.venue}`)
    .join("\n");

  setMessages(prev => [
    ...prev,
    {
      sender: "bot",
      text: `Event Venues:\n\n${venueList}`
    }
  ]);

  return;
}
/* ================= FOOD QUESTION ================= */

if (text.includes("food")) {

  setMessages(prev => [
    ...prev,
    {
      sender: "bot",
      text: "Complementary food will be provided at the venue. Please contact the event coordinators for confirmation."
    }
  ]);

  return;
}
/* ================= PRIZE QUESTION ================= */

if (text.includes("prize") || text.includes("reward")) {

  setMessages(prev => [
    ...prev,
    {
      sender: "bot",
      text: "Exciting prizes and certificates will be awarded to the winners of each event. Details will be revealed during the symposium."
    }
  ]);

  return;
}
/* ================= SMART EVENT SUGGESTIONS ================= */

if (
  text.includes("coding") ||
  text.includes("programming") ||
  text.includes("algorithm")
) {

  const event = events.find(e =>
    e.name.toLowerCase().includes("AI Arena".toLowerCase())
  );

  if (event) {
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: `You might like:\n\n${event.name}\n${event.description}\n\n📍 Venue: ${event.venue}`
      }
    ]);
  }

  return;
}

if (text.includes("robot")) {

  const event = events.find(e =>
    e.name.toLowerCase().includes("drift")
  );

  if (event) {
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: `You might like:\n\n${event.name}\n${event.description}\n\n📍 Venue: ${event.venue}`
      }
    ]);
  }

  return;
}

if (text.includes("music") || text.includes("sing") || text.includes("dance")) {

  const event = events.find(e =>
    e.name.toLowerCase().includes("rhythm")
  );

  if (event) {
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: `You might enjoy:\n\n${event.name}\n${event.description}\n\n📍 Venue: ${event.venue}`
      }
    ]);
  }

  return;
}

if (
  text.includes("fun") ||
  text.includes("games") ||
  text.includes("sports")
) {

  const event = events.find(e =>
    e.name.toLowerCase().includes("minute")
  );

  if (event) {
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: `A fun event you might enjoy:\n\n${event.name}\n${event.description}\n\n📍 Venue: ${event.venue}`
      }
    ]);
  }

  return;
}
if (
  text.includes("cricket") ||
  text.includes("auction") ||
  text.includes("strategy") || text.includes("team")
  || text.includes("bidding") || text.includes("ipl")
) {

  const event = events.find(e =>
    e.name.toLowerCase().includes("cricket conquest")
  );

  if (event) {
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: `You might like:\n\n${event.name}\n${event.description}\n\n📍 Venue: ${event.venue}`
      }
    ]);
  }

  return;
}
/* ================= REGISTRATION QUESTION ================= */

if (text.includes("register") || text.includes("registration")) {

  const regLinks = events
    .map(e => `• ${e.name}\n${e.registrationLink}`)
    .join("\n\n");

  setMessages(prev => [
    ...prev,
    {
      sender: "bot",
      text: `You can register using these links:\n\n${regLinks}`
    }
  ]);

  return;
}
  /* ================= AI FALLBACK ================= */

  setTyping(true);

  try {
    const res = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [msg]
      })
    });

    const result = await res.json();
    const reply = result?.data?.[0] || "Sorry, I couldn't understand.";

    setMessages(prev => [...prev, { sender: "bot", text: reply }]);

  } catch (error) {
    setMessages(prev => [
      ...prev,
      { sender: "bot", text: "Error connecting to AI." }
    ]);
  }

  setTyping(false);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        Chat 💬
      </button>

      {open && (
        <div className="chatbot-container" onWheel={(e) => e.stopPropagation()} onTouchMove={(e)=>e.stopPropagation()}>
          <div className="chatbot-header">Celista AI Assistant</div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.sender}`}>
                {m.text}
              </div>
            ))}

            {typing && <div className="typing">AI is typing...</div>}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="quick-buttons">
            {quickPrompts.map((q, i) => (
              <button key={i} onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="chatbot-input">
            <input
              type="text"
              placeholder="Ask about events..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;