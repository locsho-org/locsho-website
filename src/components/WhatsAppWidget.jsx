import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const whatsappNumber = '919876543210'; // Dummy number — swap with real
  const message = encodeURIComponent('Hi! I want to know more about LocSho.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl p-5 w-72 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold text-lg">
                W
              </div>
              <div>
                <p className="font-bold text-[#1A1A2E] text-sm">LocSho Support</p>
                <p className="text-xs text-green-500">● Online now</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                👋 Hi! Need help with LocSho? Ask us anything — we respond within minutes!
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-semibold py-3 rounded-xl hover:bg-[#20ba5a] transition-colors text-sm"
            >
              <span>💬</span> Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#25D366] rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:bg-[#20ba5a] transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={!open ? { scale: [1, 1.1, 1] } : {}}
        transition={!open ? { duration: 2, repeat: Infinity, repeatDelay: 3 } : {}}
        aria-label="Chat on WhatsApp"
      >
        💬
      </motion.button>
    </div>
  );
}
