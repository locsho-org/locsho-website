import { motion } from 'framer-motion';
import Button from './ui/Button';
import Badge from './ui/Badge';
import PhoneMockup from './ui/PhoneMockup';

const phoneScreen = (
  <div className="bg-[#F0FBF5] h-full flex flex-col">
    {/* App header */}
    <div className="bg-white px-3 py-2 flex items-center gap-2 shadow-sm">
      <div className="w-5 h-5 bg-[#1AAB6D] rounded flex items-center justify-center">
        <span className="text-white text-[8px] font-black">L</span>
      </div>
      <span className="text-[#1AAB6D] text-xs font-black">LocSho</span>
    </div>
    <div className="flex-1 p-3 space-y-2">
      <p className="text-[9px] text-gray-400 font-medium">Nearby Shops</p>
      {['Rajesh General', 'Lakshmi Provisions', 'Al-Farhan Mart'].map((shop) => (
        <div key={shop} className="bg-white rounded-xl p-2 flex items-center gap-2 shadow-sm">
          <div className="w-6 h-6 bg-[#E8F5EE] rounded-lg flex items-center justify-center text-[10px]">🏪</div>
          <div>
            <p className="text-[9px] font-semibold text-gray-800">{shop}</p>
            <p className="text-[8px] text-[#1AAB6D]">● Open • 0.4 km</p>
          </div>
        </div>
      ))}
      <div className="mt-2 bg-[#1AAB6D] rounded-xl p-2 text-center">
        <p className="text-white text-[9px] font-bold">🎤 Speak your order</p>
      </div>
    </div>
  </div>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#F0FBF5] flex items-center overflow-hidden">
      {/* Concentric circle decorations — matching user app */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[600, 480, 360, 260].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-[#1AAB6D]/10"
            style={{
              width: size,
              height: size,
              top: -size / 2,
              left: -size / 2,
            }}
          />
        ))}
      </div>

      {/* Background blobs */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#1AAB6D]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1AAB6D]/6 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 py-24 md:py-32 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <motion.div variants={fadeUp}>
              <Badge color="green" className="mb-6">
                🚀 Greater Noida Pilot — Now Live
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A2E] leading-tight mb-6"
            >
              Hyperlocal Delivery{' '}
              <span className="text-[#1AAB6D]">at Your Doorstep</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-500 mb-8 max-w-lg mx-auto md:mx-0"
            >
              Order from your neighbourhood shops in your language — delivered in{' '}
              <strong className="text-[#1A1A2E]">30 minutes</strong> for just{' '}
              <strong className="text-[#1AAB6D]">₹2</strong>. Supporting local shops.
            </motion.p>

            {/* Regional language tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
              {['नमस्ते 🇮🇳', 'నమస్కారం 🌿', 'வணக்கம் 🌺', 'ನಮಸ್ಕಾರ 🏵️'].map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 bg-white border border-[#1AAB6D]/20 text-gray-600 rounded-full text-sm shadow-sm"
                >
                  {lang}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button variant="primary" size="lg" href="/download">
                📱 Download App
              </Button>
              <Button variant="outline" size="lg" href="/partner">
                🏪 List Your Shop
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-center gap-6 justify-center md:justify-start text-sm text-gray-400"
            >
              <span className="flex items-center gap-1"><span className="text-yellow-400">⭐</span> 4.8 Rating</span>
              <span>•</span>
              <span>78+ Shops</span>
              <span>•</span>
              <span>500+ Orders</span>
            </motion.div>
          </motion.div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneMockup screenContent={phoneScreen} />
              </motion.div>

              {/* Floating badge — Fast Delivery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -left-14 top-16 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 border border-gray-100"
              >
                <span className="text-lg">🚚</span>
                <div>
                  <p className="text-xs font-bold text-[#1A1A2E]">Fast Delivery</p>
                  <p className="text-xs text-[#1AAB6D] font-semibold">30 min</p>
                </div>
              </motion.div>

              {/* Floating badge — ₹2 fee */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -right-14 bottom-20 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 border border-gray-100"
              >
                <span className="text-lg">💰</span>
                <div>
                  <p className="text-xs font-bold text-[#1A1A2E]">₹2 delivery</p>
                  <p className="text-xs text-gray-400">Flat fee</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#1AAB6D]/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#1AAB6D]/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
