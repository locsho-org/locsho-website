import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Footer from '../components/Footer';
import UserFeatures from '../components/UserFeatures';
import { demoVideos } from '../data/media';

const voiceCartSteps = [
  { id: 1, lang: 'Hindi', flag: '🇮🇳', speech: '"Ek kg aata, 500gm dal, aur doodh do packet"', items: [] },
  { id: 2, lang: 'Processing...', flag: '🤖', speech: 'AI is understanding your request...', items: [] },
  {
    id: 3,
    lang: 'Added to Cart!',
    flag: '✅',
    speech: 'Found 3 items from Rajesh General Store',
    items: [
      { name: 'Aata (Wheat Flour)', qty: '1 kg',    price: '₹52' },
      { name: 'Dal (Toor)',         qty: '500 gm',  price: '₹75' },
      { name: 'Milk Packet',        qty: '2×500ml', price: '₹56' },
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
        🎤 AI Voice Cart — Try It
      </h3>

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
                    <span className="text-xs text-gray-400">Order Total</span>
                    <span className="text-[#1AAB6D] font-black text-sm">₹183</span>
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

const userSteps = [
  { step: 1, icon: '📍', title: 'Find Nearby Shops',        desc: 'Browse grocery stores, vegetable vendors, dairy shops and other nearby stores available on the platform.' },
  { step: 2, icon: '🛒', title: 'Add Items to Your Order',  desc: 'Search products easily or quickly create your order list in seconds.' },
  { step: 3, icon: '📲', title: 'Send Order to Shop',       desc: 'Send your order directly to the shop. The shopkeeper will confirm the price and prepare your order.' },
  { step: 4, icon: '🚚', title: 'Pickup or Local Delivery', desc: 'Collect your order from the shop or receive it through local delivery if available.' },
];

export default function User() {
  useEffect(() => {
    document.title = 'LocSho For Users — Order Local, In Your Language';
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#F0FBF5] pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 pointer-events-none">
          {[400, 300, 200].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-[#1AAB6D]/10"
              style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-[#1A1A2E] mb-6 leading-tight">
            Order Directly From{' '}
            <span className="text-[#1AAB6D]">Local Shops</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            Groceries, vegetables, dairy and local stores — now available online from shops you already trust.
          </p>
          <div className="flex flex-wrap justify-center gap-10 mb-8">
            {[
              { value: '500+', label: 'Local Shops' },
              { value: '2km',  label: 'Radius Coverage' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-black text-[#1AAB6D]">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-8">
            {['No Extra Charges', 'Better Prices', 'Fast Pickup or Local Delivery', 'Direct Payment to Shop'].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-[#1A1A2E] font-medium text-sm">
                <span className="w-5 h-5 bg-[#1AAB6D] rounded-full flex items-center justify-center text-white text-xs">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
          <Button variant="primary" size="lg" href="/download">Start Ordering</Button>
          <p className="text-gray-400 text-sm mt-4">Trusted by local shops and growing every week.</p>
        </div>
      </section>

      {/* Features */}
      <UserFeatures />

      {/* How it works */}
      <SectionWrapper background="mint">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
            How It <span className="text-[#1AAB6D]">Works</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {userSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-full"
            >
              <Card className="text-center bg-white border border-[#1AAB6D]/10 relative h-full">
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#1AAB6D] text-white text-xs font-black rounded-full flex items-center justify-center shadow-md">
                  {s.step}
                </div>
                <div className="w-14 h-14 bg-[#E8F5EE] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {s.icon}
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* AI Voice Cart Demo */}
      <SectionWrapper background="white">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-3">
            Order by <span className="text-[#1AAB6D]">Voice</span>
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto">
            Speak your grocery list in Hindi, Telugu, Tamil, or Kannada — we'll build your cart instantly.
          </p>
        </div>
        <VoiceCartDemo />
      </SectionWrapper>

      {/* See it in Action */}
      <SectionWrapper background="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-3">
            See It in <span className="text-[#1AAB6D]">Action</span>
          </h2>
          <p className="text-gray-500 mb-8">
            Watch how easy it is to order from local shops near you.
          </p>

          {demoVideos.user ? (
            <iframe
              src={demoVideos.user}
              title="LocSho User App Demo"
              className="w-full aspect-video rounded-2xl shadow-lg mb-8"
              loading="lazy"
              allowFullScreen
            />
          ) : (
            <div className="bg-[#F0FBF5] rounded-3xl aspect-video flex flex-col items-center justify-center border-2 border-dashed border-[#1AAB6D]/20 mb-8">
              <div className="w-14 h-14 bg-[#1AAB6D]/10 rounded-full flex items-center justify-center mb-3">
                <span className="text-3xl">▶️</span>
              </div>
              <p className="text-gray-400 text-sm">Demo video coming soon</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/download">
              Download & Try Free
            </Button>
            <p className="text-gray-400 text-sm">Join 50K+ users already ordering locally</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Request Your Shop */}
      <SectionWrapper id="request-shop" background="white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">🏪</div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
            Request Your <span className="text-[#1AAB6D]">Shop</span>
          </h2>
          <p className="text-gray-500 text-lg mb-4">
            Can't find your nearby shop on the platform?
          </p>
          <p className="text-gray-500 mb-8">
            Tell us the shop name and location, and we will invite them to join LocSho
            so you can order from them in the future.
          </p>
          <Button variant="primary" size="lg" href="/contact">Request a Shop</Button>
        </div>
      </SectionWrapper>

      {/* Community Support */}
      <SectionWrapper id="community-support" background="dark">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">🤝</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Community <span className="text-[#1AAB6D]">Support</span>
          </h2>
          <p className="text-gray-300 text-lg mb-4">
            LocSho connects customers directly with nearby shopkeepers.
          </p>
          <p className="text-gray-400">
            By ordering from local businesses, you help support neighbourhood shops
            and strengthen the local economy.
          </p>
        </div>
      </SectionWrapper>

      <Footer />
    </>
  );
}
