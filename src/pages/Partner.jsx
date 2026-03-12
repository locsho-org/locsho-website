import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../components/ui/SectionWrapper';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Footer from '../components/Footer';
import { testimonials } from '../data/testimonials';

const demoOrder = {
  customer: 'Priya M.',
  items: [
    { name: 'Aata (5kg)', qty: '1 bag', price: '₹245' },
    { name: 'Toor Dal', qty: '500 gm', price: '₹75' },
    { name: 'Sunflower Oil', qty: '1L', price: '₹158' },
  ],
  total: '₹478',
  address: 'Koramangala 4th Block',
};

function OrderDashboardDemo() {
  const [phase, setPhase] = useState(0);
  // phase 0: idle, 1: notification, 2: order details, 3: accepted, 4: complete

  const startDemo = () => setPhase(1);
  const reset = () => setPhase(0);

  return (
    <div className="bg-white border border-[#1AAB6D]/20 rounded-3xl p-6 md:p-8 max-w-lg mx-auto shadow-sm">
      <h3 className="text-xl font-black text-[#1A1A2E] mb-6 text-center">
        📦 Partner Dashboard — Live Demo
      </h3>

      {/* Dashboard mockup */}
      <div className="bg-[#F0FBF5] rounded-2xl p-5 mb-6 min-h-[260px] flex flex-col border border-[#1AAB6D]/10 relative overflow-hidden">

        {/* Notification banner */}
        <AnimatePresence>
          {phase >= 1 && phase < 3 && (
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              className="absolute top-0 left-0 right-0 bg-[#1AAB6D] text-white px-4 py-3 flex items-center gap-3 z-10"
            >
              <span className="text-xl">🔔</span>
              <div className="flex-1">
                <p className="text-sm font-bold">New Order from {demoOrder.customer}!</p>
                <p className="text-xs text-white/80">{demoOrder.total} · {demoOrder.address}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 0 — idle */}
        {phase === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-[#E8F5EE] rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🏪</span>
            </div>
            <p className="text-gray-500 font-semibold text-sm mb-1">Shop is Live</p>
            <p className="text-gray-400 text-xs">Waiting for orders…</p>
            <div className="flex gap-4 mt-4 text-center">
              {[{ label: "Today's Orders", val: '0' }, { label: "Earnings", val: '₹0' }].map((s) => (
                <div key={s.label} className="bg-white rounded-xl px-4 py-2 border border-gray-100">
                  <p className="text-lg font-black text-[#1AAB6D]">{s.val}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 1 — notification shown, reveal order */}
        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex items-end pb-2 pt-12"
          >
            <button
              onClick={() => setPhase(2)}
              className="w-full py-3 bg-[#1AAB6D] text-white rounded-xl font-bold text-sm hover:bg-[#148A57] transition-colors"
            >
              View Order Details →
            </button>
          </motion.div>
        )}

        {/* Phase 2 — order details */}
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col pt-12"
          >
            <div className="space-y-2 mb-3">
              {demoOrder.items.map((item) => (
                <div key={item.name} className="flex justify-between bg-white rounded-xl px-3 py-2 border border-gray-100">
                  <div>
                    <p className="text-xs font-semibold text-[#1A1A2E]">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.qty}</p>
                  </div>
                  <p className="text-[#1AAB6D] font-bold text-xs">{item.price}</p>
                </div>
              ))}
              <div className="flex justify-between pt-1 border-t border-[#1AAB6D]/10 px-1">
                <span className="text-xs font-bold text-[#1A1A2E]">Total</span>
                <span className="text-[#1AAB6D] font-black text-sm">{demoOrder.total}</span>
              </div>
            </div>
            <button
              onClick={() => setPhase(3)}
              className="w-full py-3 bg-[#1AAB6D] text-white rounded-xl font-bold text-sm hover:bg-[#148A57] transition-colors"
            >
              ✅ Accept Order
            </button>
          </motion.div>
        )}

        {/* Phase 3 — accepted, mark ready */}
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center gap-3"
          >
            <div className="w-14 h-14 bg-[#E8F5EE] rounded-full flex items-center justify-center text-3xl">✅</div>
            <p className="font-bold text-[#1A1A2E]">Order Accepted!</p>
            <p className="text-xs text-gray-400">Customer notified · Rider assigned</p>
            <button
              onClick={() => setPhase(4)}
              className="mt-2 px-6 py-3 bg-[#1A1A2E] text-white rounded-xl font-bold text-sm hover:bg-[#2d2d4e] transition-colors"
            >
              📦 Mark as Ready
            </button>
          </motion.div>
        )}

        {/* Phase 4 — complete */}
        {phase === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center gap-3"
          >
            <div className="w-14 h-14 bg-[#1AAB6D] rounded-full flex items-center justify-center text-3xl">🎉</div>
            <p className="font-bold text-[#1A1A2E]">Order Complete!</p>
            <div className="flex gap-4 mt-1">
              {[{ label: "Today's Orders", val: '1' }, { label: 'Earnings', val: '₹22' }].map((s) => (
                <div key={s.label} className="bg-[#E8F5EE] rounded-xl px-4 py-2 text-center">
                  <p className="text-lg font-black text-[#1AAB6D]">{s.val}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">Payout by 9 AM tomorrow via UPI</p>
          </motion.div>
        )}
      </div>

      {phase === 0 ? (
        <motion.button
          onClick={startDemo}
          className="w-full py-4 rounded-2xl font-bold text-base bg-[#1AAB6D] text-white hover:bg-[#148A57] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🚀 Start Demo
        </motion.button>
      ) : phase === 4 ? (
        <motion.button
          onClick={reset}
          className="w-full py-4 rounded-2xl font-bold text-base bg-[#E8F5EE] text-[#1AAB6D] hover:bg-[#d4f0e3] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🔄 Run Again
        </motion.button>
      ) : (
        <div className="w-full py-4 rounded-2xl font-bold text-base bg-[#E8F5EE] text-[#1AAB6D]/40 text-center cursor-default">
          Follow the steps above ↑
        </div>
      )}
    </div>
  );
}

const BASE_EARNING_PER_ORDER = 20;
const DAYS_PER_MONTH = 26;

function EarningsCalculator() {
  const [ordersPerDay, setOrdersPerDay] = useState(20);
  const monthly = ordersPerDay * BASE_EARNING_PER_ORDER * DAYS_PER_MONTH;

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#1AAB6D]/20 shadow-sm" id="calculator">
      <div className="text-center mb-8">
        <Badge color="green" className="mb-4">Earnings Calculator</Badge>
        <h3 className="text-2xl md:text-3xl font-black text-[#1A1A2E] mb-2">
          How Much Can You Earn?
        </h3>
        <p className="text-gray-400 text-sm">
          Based on ₹{BASE_EARNING_PER_ORDER}/order net · {DAYS_PER_MONTH} working days/month
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-gray-600">Orders per day</label>
            <span className="text-2xl font-black text-[#1AAB6D]">{ordersPerDay}</span>
          </div>
          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={ordersPerDay}
            onChange={(e) => setOrdersPerDay(Number(e.target.value))}
            className="w-full h-2 bg-[#E8F5EE] rounded-full appearance-none cursor-pointer accent-[#1AAB6D]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>5 orders</span>
            <span>100 orders</span>
          </div>
        </div>

        {/* Result */}
        <motion.div
          key={monthly}
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          className="bg-[#F0FBF5] border-2 border-[#1AAB6D]/30 rounded-2xl p-6 text-center mb-6"
        >
          <p className="text-gray-500 text-sm mb-1">Estimated Monthly Earnings</p>
          <p className="text-5xl font-black text-[#1AAB6D]">
            ₹{monthly.toLocaleString('en-IN')}
          </p>
          <p className="text-gray-400 text-xs mt-2">
            {ordersPerDay} orders/day × ₹{BASE_EARNING_PER_ORDER} × {DAYS_PER_MONTH} days
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 text-center text-sm mb-8">
          {[
            { label: 'Platform Fee', value: '₹299/mo' },
            { label: 'Net/Order', value: `₹${BASE_EARNING_PER_ORDER}` },
            { label: 'Payout', value: 'Daily UPI' },
          ].map((item) => (
            <div key={item.label} className="bg-[#E8F5EE] rounded-xl p-3">
              <p className="font-bold text-[#1AAB6D]">{item.value}</p>
              <p className="text-gray-500 text-xs">{item.label}</p>
            </div>
          ))}
        </div>

        <Button variant="primary" size="lg" href="#join" className="w-full">
          Start My Free Trial →
        </Button>
      </div>
    </div>
  );
}

const onboardingSteps = [
  { step: 1, icon: '📱', title: 'Download Partner App', desc: 'Available on iOS & Android. Free to download.' },
  { step: 2, icon: '🤖', title: 'AI-guided Setup', desc: 'Our AI asks simple questions and sets up your shop in minutes.' },
  { step: 3, icon: '📦', title: 'Add Your Products', desc: 'Type or bulk upload via Excel/CSV. AI maps and categorises everything.' },
  { step: 4, icon: '✅', title: 'Go Live!', desc: 'Your shop is visible to nearby customers. Start receiving orders immediately.' },
];

const faqs = [
  { q: 'Do I need a smartphone?', a: 'Yes, you need an Android (5.0+) or iPhone (iOS 13+) to use the Partner App. WhatsApp notifications work on any phone.' },
  { q: 'How does the ₹299/month fee work?', a: 'After your 15-day free trial, you pay ₹299/month. No per-order charges. Cancel anytime.' },
  { q: 'When do I receive payments?', a: 'Every morning by 9 AM, orders from the previous day are transferred to your UPI or bank account.' },
  { q: 'What if I have many products?', a: 'Use our bulk upload feature — Excel or CSV. Our AI automatically categorises and prices products.' },
  { q: 'Can I set my own prices?', a: 'Absolutely. You control all your prices and can update them anytime from the app or dashboard.' },
  { q: 'Is there a minimum order requirement?', a: 'No minimum order requirements. Accept as many or as few orders as you want.' },
];

export default function Partner() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = 'LocSho Partner — Grow Your Local Shop Online';
  }, []);

  return (
    <>
      {/* Hero — light mint matching app style */}
      <section className="bg-[#F0FBF5] pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Concentric circle decoration */}
        <div className="absolute -top-40 -right-40 pointer-events-none">
          {[400, 300, 200].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-[#1AAB6D]/10"
              style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge color="green" className="mb-6">For Shop Owners</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-6">
            Turn Your Shop into a{' '}
            <span className="text-[#1AAB6D]">24/7 Online Store</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            Join 78+ Bangalore shop owners already growing with LocSho. AI-powered setup,
            daily UPI payouts, WhatsApp alerts. Start free — no tech experience needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="#calculator">
              💰 Calculate My Earnings
            </Button>
            <Button variant="outline" size="lg" href="#join">
              Start Free Trial
            </Button>
          </div>
          <p className="text-gray-400 text-sm mt-4">15 days free · No credit card · Setup in 10 min</p>
        </div>
      </section>

      {/* Calculator */}
      <SectionWrapper background="white">
        <EarningsCalculator />
      </SectionWrapper>

      {/* Onboarding flow */}
      <SectionWrapper background="mint">
        <div className="text-center mb-12">
          <Badge color="green" className="mb-4">How it works</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
            Live in <span className="text-[#1AAB6D]">Under 10 Minutes</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Our AI guides you at every step — no technical knowledge required.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {onboardingSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center bg-white border border-[#1AAB6D]/10 relative">
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#1AAB6D] text-white text-xs font-black rounded-full flex items-center justify-center shadow-md">
                  {step.step}
                </div>
                <div className="w-14 h-14 bg-[#E8F5EE] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Order dashboard demo */}
      <SectionWrapper background="white">
        <div className="text-center mb-12">
          <Badge color="green" className="mb-4">Interactive Demo</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
            Managing Orders <span className="text-[#1AAB6D]">Made Simple</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-10">
            See how you receive, accept, and complete orders right from the Partner App.
          </p>
          <OrderDashboardDemo />
        </div>
      </SectionWrapper>

      {/* Partner testimonials */}
      <SectionWrapper background="white">
        <div className="text-center mb-12">
          <Badge color="green" className="mb-4">Partner Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
            Real Shops, <span className="text-[#1AAB6D]">Real Results</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <p className="font-bold text-[#1A1A2E] text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.shop}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-[#1AAB6D]">{t.monthlyEarnings}</p>
                    <p className="text-xs text-gray-400">/month avg</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm italic leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="text-yellow-400 text-sm">{'★'.repeat(t.rating)}</span>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-400">{t.ordersPerDay} orders/day</span>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-400">{t.joinedMonthsAgo}mo ago</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="mint" id="faq">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Badge color="green" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl font-black text-[#1A1A2E]">
              Frequently Asked <span className="text-[#1AAB6D]">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-[#1A1A2E] hover:bg-[#F0FBF5] transition-colors text-sm"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#1AAB6D] text-xl ml-4 font-bold">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Join CTA */}
      <SectionWrapper background="white" id="join">
        <div className="max-w-2xl mx-auto text-center bg-[#F0FBF5] border border-[#1AAB6D]/20 rounded-3xl p-10">
          <div className="w-16 h-16 bg-[#E8F5EE] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🚀
          </div>
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-4">
            Join 78+ Shops Already on LocSho
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Your first 15 days are completely free. No credit card, no setup fee.
          </p>
          <Button variant="primary" size="xl" href="/download">
            🏪 Start My Free Trial Today
          </Button>
        </div>
      </SectionWrapper>

      <Footer />
    </>
  );
}
