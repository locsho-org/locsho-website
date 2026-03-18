import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { demoVideos } from '../data/media';

const ORDER_ITEMS = [
  { name: 'Aata (1 kg)', price: '₹52' },
  { name: 'Toor Dal (500g)', price: '₹75' },
  { name: 'Milk (2 pkt)', price: '₹56' },
];

// ── State durations (ms) ──────────────────────────────────────────────────────
const DURATIONS = [2800, 2200, 2500]; // incoming → accepted → ready → loop

// ── Phone shell ───────────────────────────────────────────────────────────────
function PhoneFrame({ children }) {
  return (
    <div
      className="w-[252px] bg-[#1A1A2E] rounded-[44px] p-[10px] shadow-2xl shadow-black/30 ring-1 ring-white/10 mx-auto"
      aria-hidden="true"
    >
      <div className="bg-white rounded-[36px] overflow-hidden">
        {/* Status bar */}
        <div className="bg-[#1A1A2E] flex items-center justify-between px-5 py-2">
          <span className="text-white/70 text-[10px] font-medium">9:41</span>
          <div className="w-16 h-[18px] bg-black rounded-full" />
          <span className="text-white/70 text-[10px]">●●●</span>
        </div>
        {/* App header */}
        <div className="bg-[#1AAB6D] px-4 py-2.5 flex items-center justify-between">
          <span className="text-white font-black text-sm">LocSho Partner</span>
          <span className="text-white/80 text-xs">🟢 Online</span>
        </div>
        {/* Screen content */}
        <div className="min-h-[380px] bg-[#F8F9FA] relative overflow-hidden">
          {children}
        </div>
        {/* Home indicator */}
        <div className="bg-white flex justify-center py-2">
          <div className="w-20 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ── Screen: Incoming order ────────────────────────────────────────────────────
function IncomingScreen() {
  return (
    <motion.div
      key="incoming"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4"
    >
      <div className="bg-[#FF6B35] rounded-2xl p-3 mb-4 flex items-center gap-3">
        <motion.span
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="text-2xl"
        >
          🔔
        </motion.span>
        <div>
          <p className="text-white font-black text-sm leading-tight">New Order!</p>
          <p className="text-white/80 text-xs">Ananya S. • Sector 62</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 mb-3 space-y-2 shadow-sm">
        {ORDER_ITEMS.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <span className="text-[#1A1A2E] text-xs">{item.name}</span>
            <span className="text-[#1AAB6D] text-xs font-bold">{item.price}</span>
          </div>
        ))}
        <div className="border-t border-gray-100 pt-2 flex justify-between">
          <span className="text-xs font-bold text-[#1A1A2E]">Total</span>
          <span className="text-xs font-black text-[#1AAB6D]">₹183</span>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 bg-[#1AAB6D] text-white text-xs font-bold py-2.5 rounded-xl text-center">
          ✅ Accept
        </div>
        <div className="flex-1 bg-gray-100 text-gray-400 text-xs font-bold py-2.5 rounded-xl text-center">
          ✕ Decline
        </div>
      </div>
    </motion.div>
  );
}

// ── Screen: Order accepted ────────────────────────────────────────────────────
function AcceptedScreen() {
  return (
    <motion.div
      key="accepted"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4"
    >
      <div className="bg-[#E8F5EE] rounded-2xl p-3 mb-4 flex items-center gap-3">
        <span className="text-2xl">✅</span>
        <div>
          <p className="text-[#1AAB6D] font-black text-sm leading-tight">Order Accepted</p>
          <p className="text-gray-500 text-xs">Ananya S. • Sector 62</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 mb-3 space-y-2 shadow-sm">
        {ORDER_ITEMS.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <span className="text-[#1A1A2E] text-xs">{item.name}</span>
            <span className="text-[#1AAB6D] text-xs font-bold">{item.price}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="flex gap-1"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#1AAB6D] rounded-full" />
          ))}
        </motion.div>
        <span className="text-xs text-gray-500">Preparing order...</span>
      </div>
    </motion.div>
  );
}

// ── Screen: Ready ─────────────────────────────────────────────────────────────
function ReadyScreen() {
  return (
    <motion.div
      key="ready"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[380px] p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="w-16 h-16 bg-[#E8F5EE] rounded-full flex items-center justify-center text-3xl mb-4"
      >
        🎉
      </motion.div>
      <p className="text-[#1AAB6D] font-black text-lg mb-1">Order Confirmed</p>
      <p className="text-gray-500 text-sm mb-4">Customer notified ✅</p>
      <div className="bg-[#F0FBF5] rounded-xl px-4 py-3 w-full">
        <p className="text-xs text-gray-500">Ananya S. has been notified</p>
        <p className="text-xs text-[#1AAB6D] font-bold mt-0.5">
          Payment via UPI — ₹183
        </p>
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function OrderNotificationDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [state, setState] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!inView) {
      clearTimeout(timerRef.current);
      setState(0);
      return;
    }
    timerRef.current = setTimeout(
      () => setState((prev) => (prev === 2 ? 0 : prev + 1)),
      DURATIONS[state],
    );
    return () => clearTimeout(timerRef.current);
  }, [inView, state]);

  const labels = [
    'New order arriving...',
    'Shopkeeper accepted',
    'Customer notified ✅',
  ];

  // ── Video mode (swap null in media.js to enable) ──────────────────────────
  if (demoVideos.partner) {
    return (
      <div className="max-w-2xl mx-auto">
        <iframe
          src={demoVideos.partner}
          title="LocSho Partner App Demo"
          className="w-full aspect-video rounded-2xl shadow-lg"
          loading="lazy"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <PhoneFrame>
        <AnimatePresence mode="wait">
          {state === 0 && <IncomingScreen />}
          {state === 1 && <AcceptedScreen />}
          {state === 2 && <ReadyScreen />}
        </AnimatePresence>
      </PhoneFrame>

      {/* Progress dots */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              state === i ? 'w-6 bg-[#1AAB6D]' : 'w-1.5 bg-gray-200'
            }`}
          />
        ))}
      </div>

      <p className="text-gray-400 text-xs">{labels[state]}</p>
    </div>
  );
}
