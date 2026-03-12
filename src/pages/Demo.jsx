import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/ui/SectionWrapper';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Footer from '../components/Footer';

const voiceCartSteps = [
  { id: 1, lang: 'Hindi', flag: '🇮🇳', speech: '"Ek kg aata, 500gm dal, aur doodh do packet"', items: [] },
  { id: 2, lang: 'Processing...', flag: '🤖', speech: 'AI is understanding your request...', items: [] },
  {
    id: 3,
    lang: 'Added to Cart!',
    flag: '✅',
    speech: 'Found 3 items from Rajesh General Store',
    items: [
      { name: 'Aata (Wheat Flour)', qty: '1 kg', price: '₹52' },
      { name: 'Dal (Toor)', qty: '500 gm', price: '₹75' },
      { name: 'Milk Packet', qty: '2×500ml', price: '₹56' },
    ],
  },
];

function VoiceCartDemo() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const runDemo = () => {
    if (running) return;
    setRunning(true);
    setStep(0);
    setTimeout(() => setStep(1), 500);
    setTimeout(() => setStep(2), 2000);
    setTimeout(() => { setStep(3); setRunning(false); }, 3500);
  };

  const current = voiceCartSteps[step - 1];

  return (
    <div className="bg-white border border-[#1AAB6D]/20 rounded-3xl p-6 md:p-8 max-w-lg mx-auto shadow-sm">
      <h3 className="text-xl font-black text-[#1A1A2E] mb-6 text-center">
        🎤 AI Voice Cart — Live Demo
      </h3>

      {/* Phone-like interface */}
      <div className="bg-[#F0FBF5] rounded-2xl p-5 mb-6 min-h-[200px] flex flex-col border border-[#1AAB6D]/10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-[#E8F5EE] rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">🎤</span>
              </div>
              <p className="text-gray-400 text-sm">Tap the button below to speak your grocery list</p>
            </motion.div>
          )}

          {current && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{current.flag}</span>
                <span className="text-[#1AAB6D] text-sm font-bold">{current.lang}</span>
              </div>

              <div className="bg-white border border-[#1AAB6D]/20 rounded-xl p-3 mb-3 shadow-sm">
                <p className="text-sm text-gray-700">{current.speech}</p>
              </div>

              {current.items?.length > 0 && (
                <div className="space-y-2 flex-1">
                  {current.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-center justify-between bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100"
                    >
                      <div>
                        <p className="text-xs font-semibold text-[#1A1A2E]">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.qty}</p>
                      </div>
                      <p className="text-[#1AAB6D] font-bold text-sm">{item.price}</p>
                    </motion.div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-[#1AAB6D]/10">
                    <span className="text-xs text-gray-400">Total + ₹2 delivery</span>
                    <span className="text-[#1AAB6D] font-black text-sm">₹185</span>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex items-center gap-2 mt-4">
                  <motion.div
                    className="flex gap-1"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 bg-[#1AAB6D] rounded-full" />
                    ))}
                  </motion.div>
                  <span className="text-xs text-gray-400">AI processing...</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={runDemo}
        disabled={running}
        className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
          running
            ? 'bg-[#E8F5EE] text-[#1AAB6D]/50 cursor-not-allowed'
            : 'bg-[#1AAB6D] text-white hover:bg-[#148A57]'
        }`}
        whileHover={!running ? { scale: 1.02 } : {}}
        whileTap={!running ? { scale: 0.98 } : {}}
      >
        {running ? '🎙️ Listening...' : step === 3 ? '🔄 Try Again' : '🎤 Speak Your Order (Demo)'}
      </motion.button>
    </div>
  );
}

export default function Demo() {
  useEffect(() => {
    document.title = 'LocSho Demo — See It in Action';
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#F0FBF5] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge color="green" className="mb-6">Interactive Demo</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-6">
            See LocSho <span className="text-[#1AAB6D]">in Action</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
            Try our AI voice cart, explore the app flow, and see why 500+ orders have been placed.
          </p>
        </div>
      </section>

      {/* Video placeholder */}
      <SectionWrapper background="white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Badge color="green" className="mb-4">Product Walkthrough</Badge>
            <h2 className="text-3xl font-black text-[#1A1A2E] mb-4">
              3-Minute <span className="text-[#1AAB6D]">App Tour</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F0FBF5] rounded-3xl overflow-hidden aspect-video flex items-center justify-center relative group cursor-pointer border border-[#1AAB6D]/15"
          >
            <img
              src="https://placehold.co/800x450/F0FBF5/1AAB6D?text=LocSho+App+Demo+Video"
              alt="LocSho Demo Video"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-20 h-20 bg-[#1AAB6D] rounded-full flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-white text-3xl ml-1">▶</span>
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur text-[#1A1A2E] text-sm px-3 py-1 rounded-full">
              3:24
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Voice Cart Demo */}
      <SectionWrapper background="mint">
        <div className="text-center mb-12">
          <Badge color="green" className="mb-4">Try It Now</Badge>
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-4">
            AI Voice Cart <span className="text-[#1AAB6D]">Interactive Demo</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-10">
            This simulates how our AI voice cart works. Tap the button and watch the magic.
          </p>
          <VoiceCartDemo />
        </div>
      </SectionWrapper>

      {/* Feature highlights */}
      <SectionWrapper background="white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-4">
            Feature <span className="text-[#1AAB6D]">Highlights</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'User App Demo',
              screens: ['Home Feed', 'Voice Order', 'Cart', 'Tracking'],
            },
            {
              title: 'Partner App Demo',
              screens: ['Orders Dashboard', 'Inventory', 'Analytics', 'Payouts'],
            },
          ].map((app) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-sm border border-[#1AAB6D]/10 overflow-hidden"
            >
              <div className="p-6 pb-4">
                <h3 className="font-black text-[#1A1A2E] text-lg mb-4">{app.title}</h3>
                <div className="flex gap-2 flex-wrap">
                  {app.screens.map((screen) => (
                    <span
                      key={screen}
                      className="px-3 py-1 bg-[#E8F5EE] text-[#1AAB6D] rounded-full text-xs font-semibold"
                    >
                      {screen}
                    </span>
                  ))}
                </div>
              </div>
              <img
                src={`https://placehold.co/600x240/F0FBF5/1AAB6D?text=${encodeURIComponent(app.title)}`}
                alt={app.title}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper background="mint">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl p-10 border border-[#1AAB6D]/15 shadow-sm">
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-4">
            Ready to <span className="text-[#1AAB6D]">Get Started?</span>
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Download the app or list your shop — both take under 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/download">
              📱 Download App
            </Button>
            <Button variant="outline" size="lg" href="/partner">
              🏪 Become a Partner
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </>
  );
}
