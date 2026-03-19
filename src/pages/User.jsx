import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Footer from '../components/Footer';
import UserFeatures from '../components/UserFeatures';
import PhoneMockup from '../components/ui/PhoneMockup';
import Badge from '../components/ui/Badge';
import { demoVideos } from '../data/media';
import { userTestimonials } from '../data/testimonials';

const cn = (...classes) => classes.filter(Boolean).join(' ');

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
    <div className="bg-white border border-[#1AAB6D]/20 rounded-[2.5rem] p-6 md:p-8 max-w-xl mx-auto shadow-xl shadow-green-900/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#1AAB6D]/10 rounded-xl flex items-center justify-center text-xl">🎤</div>
        <h3 className="text-xl font-black text-[#1A1A2E]">AI Voice Cart</h3>
      </div>

      <div className="bg-[#F8FDF9] rounded-3xl p-6 mb-8 min-h-[240px] flex flex-col border border-[#1AAB6D]/5 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-8"
            >
              <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center mb-6 text-4xl animate-bounce">
                🎤
              </div>
              <p className="text-gray-400 font-medium max-w-[200px]">Tap the button below to speak your grocery list</p>
            </motion.div>
          )}

          {current && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{current.flag}</span>
                  <span className="text-[#1AAB6D] font-black uppercase tracking-widest text-[10px] bg-[#1AAB6D]/10 px-2 py-1 rounded-md">{current.lang}</span>
                </div>
                {step === 2 && (
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-[#1AAB6D] rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border border-[#1AAB6D]/10 rounded-2xl p-4 mb-4 shadow-sm">
                <p className="text-gray-700 font-medium italic">"{current.speech}"</p>
              </div>

              {current.items?.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2 flex-1"
                >
                  {current.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-50"
                    >
                      <div>
                        <p className="text-sm font-bold text-[#1A1A2E]">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.qty}</p>
                      </div>
                      <p className="text-[#1AAB6D] font-black text-sm">{item.price}</p>
                    </motion.div>
                  ))}
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-dashed border-[#1AAB6D]/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Order</span>
                    <span className="text-[#1AAB6D] font-black text-xl tracking-tighter">₹183</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={runDemo}
        disabled={running}
        className={cn(
          "w-full py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.25em] transition-all relative overflow-hidden group shadow-lg",
          running
            ? 'bg-[#F0FBF5] text-[#1AAB6D]/50 cursor-not-allowed border-2 border-[#1AAB6D]/10'
            : 'bg-[#1AAB6D] text-white hover:bg-[#148A57] hover:shadow-[#1AAB6D]/20 active:scale-95'
        )}
      >
        <span className="relative z-10">
          {running ? '🎙️ AI Processing...' : step === 3 ? '🔄 Reset Demo' : '🎤 Try Voice Ordering'}
        </span>
        {!running && (
          <motion.div 
            className="absolute inset-0 bg-white/10"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.button>
    </div>
  );
}

const userSteps = [
  { step: 1, icon: '📍', title: 'Find Nearby Shops',        desc: 'Browse grocery stores, vegetable vendors, dairy shops and more.' },
  { step: 2, icon: '🛒', title: 'Quick Add to Cart',  desc: 'Search products or use voice to build your list in seconds.' },
  { step: 3, icon: '📲', title: 'Direct to Shop',       desc: 'Send orders to shopkeepers directly. Pay via UPI on delivery.' },
  { step: 4, icon: '🚚', title: 'Fast Delivery', desc: 'Get rapid local delivery or skip the queue with store pickup.' },
];

export default function User() {
  useEffect(() => {
    document.title = 'LocSho — Fast Local Delivery from Shops You Trust';
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[90vh] flex items-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F0FBF5] rounded-l-[100px] -z-10 hidden lg:block" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#1AAB6D] opacity-[0.03] rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#1AAB6D] opacity-[0.02] rounded-full blur-3xl -z-10" />

        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <Badge color="green" className="mb-6 py-1.5 px-4 text-xs font-black uppercase tracking-[0.2em]">New Era of Shopping</Badge>
            <h1 className="text-5xl md:text-7xl font-black text-[#1A1A2E] mb-6 leading-[1.1] tracking-tighter">
              Order from shops <br/>
              <span className="text-[#1AAB6D] relative">
                you already trust.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none">
                  <path d="M3 9C118.5 3 239.5 3 355 9" stroke="#1AAB6D" strokeWidth="6" strokeLinecap="round" opacity="0.2"/>
                </svg>
              </span>
            </h1>
            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Groceries, vegetables, and daily essentials delivered from your neighborhood stores. No middleman, direct prices, local trust.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 justify-center lg:justify-start">
              <Button variant="primary" size="lg" className="h-16 px-10 rounded-2xl text-base tracking-widest uppercase font-black" href="/download">
                Start Ordering
              </Button>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://placehold.co/100x100/1AAB6D/ffffff?text=${i}`} alt="" />
                  </div>
                ))}
                <span className="ml-6 text-sm font-bold text-[#1A1A2E]">50k+ Users</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 border-t border-gray-100 pt-10 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-black text-[#1A1A2E]">500+</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Partner Shops</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#1A1A2E]">10min</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Delivery Time</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#1A1A2E]">₹2</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Start Charge</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-[#1AAB6D]/5 rounded-full blur-[100px] scale-150 animate-pulse" />
            <PhoneMockup 
              className="relative z-10 drop-shadow-2xl"
              screenContent={
                <div className="h-full bg-white p-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                    <div className="flex gap-2">
                      <div className="w-16 h-4 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-32 bg-[#F0FBF5] rounded-2xl border border-[#1AAB6D]/10 p-4">
                      <div className="w-1/2 h-4 bg-[#1AAB6D]/20 rounded-full mb-2" />
                      <div className="w-3/4 h-3 bg-gray-200 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 bg-gray-50 rounded-2xl border border-gray-100" />
                      <div className="h-24 bg-gray-50 rounded-2xl border border-gray-100" />
                    </div>
                    <div className="h-40 bg-gray-50 rounded-2xl border border-gray-100" />
                  </div>
                </div>
              }
            />
            {/* Floating UI elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white shadow-xl rounded-2xl p-4 border border-gray-100 z-20 hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">Order Confirmed</p>
                  <p className="text-xs font-bold text-gray-900">Arriving in 8 mins</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <UserFeatures />

      {/* Modern How It Works */}
      <SectionWrapper background="mint">
        <div className="text-center mb-16">
          <Badge color="green" className="mb-4">Simplified Process</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A2E] tracking-tight">
            As easy as <span className="text-[#1AAB6D]">1-2-3-4</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {userSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="group relative">
                <div className="absolute -top-10 left-4 text-8xl font-black text-[#1AAB6D]/5 pointer-events-none group-hover:text-[#1AAB6D]/10 transition-colors">
                  0{s.step}
                </div>
                <Card className="h-full bg-white border border-gray-100 hover:border-[#1AAB6D]/20 hover:shadow-2xl hover:shadow-green-900/5 transition-all p-8 rounded-[2rem]">
                  <div className="w-16 h-16 bg-[#F0FBF5] rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-black text-[#1A1A2E] mb-3 uppercase tracking-tight">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{s.desc}</p>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* High-Impact Voice Demo */}
      <SectionWrapper background="white" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1AAB6D] opacity-[0.02] rounded-full blur-3xl" />
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge color="green" className="mb-4">AI-First Experience</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-6 tracking-tight">
            Order with <span className="text-[#1AAB6D]">Your Voice</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium leading-relaxed">
            Speak your grocery list in Hindi, Telugu, Tamil, or English. Our AI parses every item and finds it at your favorite local store instantly.
          </p>
        </div>
        <VoiceCartDemo />
      </SectionWrapper>

      {/* Social Proof Section */}
      <SectionWrapper background="gray">
        <div className="text-center mb-16">
          <Badge color="green" className="mb-4">Happy Customers</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A2E] tracking-tight">
            What our <span className="text-[#1AAB6D]">Users say</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {userTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1AAB6D]/20 p-0.5">
                    <img src={t.avatar} alt={t.name} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div>
                    <p className="font-black text-[#1A1A2E] text-sm uppercase tracking-wider">{t.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 font-medium italic leading-relaxed text-base flex-1">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center gap-1 text-[#1AAB6D]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Video Demo Section */}
      <SectionWrapper background="white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-16">
            <Badge color="green" className="mb-4">Visual Tour</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-6 tracking-tight">
              See the <span className="text-[#1AAB6D]">App in Action</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-4xl mx-auto font-medium">
              Join 50,000+ users who have discovered a better way to shop local.
            </p>
          </div>

          <div className="relative group max-w-3xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/10 border-8 border-white bg-white">
            {demoVideos.user ? (
              <iframe
                src={demoVideos.user}
                title="LocSho User App Demo"
                className="w-full aspect-video"
                loading="lazy"
                allowFullScreen
              />
            ) : (
              <div className="bg-[#F0FBF5] aspect-video flex flex-col items-center justify-center border-2 border-dashed border-[#1AAB6D]/20">
                <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center mb-4 scale-110 group-hover:scale-125 transition-transform">
                  <span className="text-4xl">▶️</span>
                </div>
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Video coming soon</p>
              </div>
            )}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="primary" size="lg" className="h-16 px-12 rounded-2xl text-base tracking-widest uppercase font-black shadow-xl shadow-[#1AAB6D]/20" href="/download">
              Download App Now
            </Button>
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Free forever for users</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Shop Request CTA */}
      <SectionWrapper id="request-shop" background="dark" className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-white rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-6xl mb-8">🏪</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Missing Your <span className="text-[#1AAB6D]">Favorite Shop?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 font-medium leading-relaxed">
            Tell us which shop you want to see on LocSho. We'll invite them to join the digital revolution.
          </p>
          <Button variant="white" size="lg" className="h-16 px-12 rounded-2xl text-base tracking-widest uppercase font-black" href="/contact">
            Request a Shop
          </Button>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
