import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Footer from '../components/Footer';
import Badge from '../components/ui/Badge';
import { testimonials } from '../data/testimonials';
import OrderNotificationDemo from '../components/OrderNotificationDemo';
import PhoneMockup from '../components/ui/PhoneMockup';
import { demoVideos } from '../data/media';

const partnerSteps = [
  { step: 1, icon: '📝', title: 'Register in Seconds',         desc: 'Create your shop account using just your mobile number. No complex paperwork.' },
  { step: 2, icon: '📦', title: 'Smart Catalog Setup',               desc: 'Use AI to auto-populate your items or bulk upload your existing price list.' },
  { step: 3, icon: '🔔', title: 'Real-time Alerts',             desc: 'Receive instant notifications when customers in your area place an order.' },
  { step: 4, icon: '✅', title: 'Direct Management', desc: 'Confirm prices and availability. Prepare orders for rapid pickup or delivery.' },
  { step: 5, icon: '💳', title: 'Zero Wait Payouts',          desc: 'Get paid instantly to your shop UPI. No weekly settlement delays.' },
];

const pricingPlans = [
  { 
    name: 'Growth', 
    price: '₹0', 
    period: 'forever',
    desc: 'Best for shops just starting their digital journey.',
    features: ['Up to 50 items', 'Standard visibility', 'Direct UPI payments', 'Basic analytics'],
    cta: 'Start Free',
    highlight: false
  },
  { 
    name: 'Professional', 
    price: '₹499', 
    period: 'per month',
    desc: 'Power your shop with full digital tools and reach.',
    features: ['Unlimited items', 'Priority local visibility', 'Advanced AI catalog', 'Full sales reports', 'Marketing banners'],
    cta: 'Get Started',
    highlight: true
  }
];

export default function Partner() {
  useEffect(() => {
    document.title = 'LocSho Partner — Digital Growth for Your Local Shop';
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[90vh] flex items-center bg-[#F0FBF5]">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="#1AAB6D" />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge color="green" className="mb-6 py-1.5 px-4 text-xs font-black uppercase tracking-[0.2em]">Business Growth Platform</Badge>
            <h1 className="text-5xl md:text-6xl font-black text-[#1A1A2E] mb-6 uppercase leading-[1.1] tracking-tighter">
              Put your shop <br/>
              <span className="text-[#1AAB6D] underline decoration-[#1AAB6D]/20 underline-offset-8">Online in 8 mins</span>
            </h1>
            <p className="text-gray-600 text-lg mb-10 max-w-xl leading-relaxed font-medium">
              Join the network of 500+ local shops receiving digital orders without high commissions. Reach more customers, manage inventory easily, and grow your revenue.
            </p>
            
            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                '0% Marketplace Commission',
                'Payment Direct to Your QR',
                'AI-Powered Product Setup',
                'Instant Customer Alerts',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-[#1A1A2E] font-bold text-sm">
                  <span className="w-6 h-6 bg-[#1AAB6D] rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="h-16 px-10 rounded-2xl text-base tracking-widest uppercase font-black" href="/download">
                Register Your Shop
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-base tracking-widest uppercase font-black" href="/download">
                Download App
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="absolute inset-0 bg-[#1AAB6D]/10 rounded-full blur-[120px] transform scale-125" />
            <PhoneMockup 
              className="relative z-10 drop-shadow-3xl"
              screenContent={
                <div className="h-full bg-white flex flex-col">
                  <div className="bg-[#1AAB6D] p-6 text-white pt-10">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Today's Sales</p>
                    <p className="text-3xl font-black mt-1 tracking-tight">₹12,450</p>
                    <div className="mt-4 flex gap-2">
                      <div className="bg-white/20 px-2 py-1 rounded text-[8px] font-black uppercase tracking-wider">24 Orders</div>
                      <div className="bg-white/20 px-2 py-1 rounded text-[8px] font-black uppercase tracking-wider">+12% vs yesterday</div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Active Orders</p>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-900">Order #882{i}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Ananya S. • ₹183</p>
                        </div>
                        <div className="bg-green-50 text-green-600 px-2 py-1 rounded-lg text-[8px] font-black uppercase">Ready</div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* Trust & Discovery */}
      <SectionWrapper background="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div>
            <Badge color="green" className="mb-4">Digital Transformation</Badge>
            <h2 className="text-4xl font-black text-[#1A1A2E] mb-6 uppercase tracking-tight leading-tight">
              Bring your shop to <br/>
              <span className="text-[#1AAB6D]">Their Fingertips</span>
            </h2>
            <p className="text-gray-500 text-lg mb-6 leading-relaxed">
              Customers in your area are already looking for nearby shops online. Don't let them go to high-commission apps.
            </p>
            <div className="space-y-4">
              {[
                { title: 'Zero Commisions', desc: 'Keep 100% of your product price. No hidden cuts.' },
                { title: 'Direct Marketing', desc: 'Promote your shop directly to locals through our platform.' },
                { title: 'AI Catalog', desc: 'Auto-generate professional photos and descriptions for your items.' },
              ].map(f => (
                <div key={f.title} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#1AAB6D]/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#1AAB6D]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A2E] text-base">{f.title}</p>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#F0FBF5] rounded-[3rem] p-12 border border-[#1AAB6D]/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-[0.03] group-hover:scale-110 transition-transform">🏪</div>
            <div className="text-center">
              <p className="text-5xl font-black text-[#1AAB6D] mb-2 tracking-tighter">500+</p>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Registered Shops</p>
              <p className="text-gray-600 font-medium italic">"I was live in 8 minutes! My sales have doubled in 2 months. Technology is finally easy."</p>
              <p className="mt-4 font-bold text-[#1A1A2E]">— Rajesh Kumar, Shop Owner</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Interactive Demo */}
      <SectionWrapper background="mint">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Badge color="green" className="mb-4">One-Tap Efficiency</Badge>
          <h2 className="text-4xl font-black text-[#1A1A2E] mb-6 uppercase tracking-tight">
            See How <span className="text-[#1AAB6D]">Orders Arrive</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium">
            No complex management. Every order pings you instantly. One tap to accept, one tap to notify the customer.
          </p>
        </div>
        <OrderNotificationDemo />
      </SectionWrapper>

      {/* Steps Section */}
      <SectionWrapper background="white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#1A1A2E] uppercase tracking-tight">
            The Path to <span className="text-[#1AAB6D]">Digital Growth</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {partnerSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border border-gray-50 hover:border-[#1AAB6D]/20 hover:shadow-2xl hover:shadow-green-900/5 p-8 rounded-[2rem] text-center flex flex-col">
                <div className="w-16 h-16 bg-[#F0FBF5] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="font-black text-[#1A1A2E] mb-3 uppercase text-sm tracking-widest">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium flex-1">{step.desc}</p>
                <div className="mt-6 font-black text-[10px] text-[#1AAB6D] bg-[#1AAB6D]/10 py-1 rounded-lg">STEP 0{step.step}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper background="gray">
        <div className="max-w-5xl mx-auto text-center">
          <Badge color="green" className="mb-4">Simple Pricing</Badge>
          <h2 className="text-4xl font-black text-[#1A1A2E] mb-6 uppercase tracking-tight">
            Built for <span className="text-[#1AAB6D]">Local Profit</span>
          </h2>
          <p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto">
            Stop giving away your hard-earned margins. LocSho keeps pricing simple and transparent.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map(plan => (
              <Card key={plan.name} className={`text-left p-10 rounded-[2.5rem] flex flex-col relative ${plan.highlight ? 'border-4 border-[#1AAB6D] shadow-2xl shadow-green-900/10' : 'border border-gray-100'}`}>
                {plan.highlight && (
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#1AAB6D] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Recommended</div>
                )}
                <h3 className="text-xl font-black text-[#1A1A2E] uppercase tracking-widest mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-[#1A1A2E] tracking-tighter">{plan.price}</span>
                  <span className="text-gray-400 text-sm font-bold">{plan.period}</span>
                </div>
                <p className="text-gray-500 text-sm font-medium mb-8">{plan.desc}</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-bold text-[#1A1A2E]">
                      <span className="text-[#1AAB6D]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlight ? 'primary' : 'outline'} size="lg" className="w-full h-14 rounded-2xl uppercase tracking-widest font-black text-xs">
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Real Results Testimonials */}
      <SectionWrapper background="white">
        <div className="text-center mb-16">
          <Badge color="green" className="mb-4">Partner Success</Badge>
          <h2 className="text-4xl font-black text-[#1A1A2E] uppercase tracking-tight">
            Real Shops, <span className="text-[#1AAB6D]">Real Results</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border border-gray-50 p-8 rounded-[2rem] hover:shadow-xl transition-all">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#1AAB6D]/10">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-[#1A1A2E] text-base uppercase tracking-tight">{t.name}</p>
                    <p className="text-[10px] font-black text-[#1AAB6D] uppercase tracking-widest">{t.shop}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1">{t.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 font-medium italic leading-relaxed text-base mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-[#1A1A2E] tracking-tight">{t.ordersPerDay}</span>
                    <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Orders / Day</span>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-[#1AAB6D] tracking-tight">{t.monthlyEarnings}</span>
                    <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Monthly Growth</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper background="dark" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1AAB6D] opacity-[0.05] rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-[#1AAB6D]/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner shadow-white/10">
            🏪
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">
            Claim Your Local <br/>
            <span className="text-[#1AAB6D]">Digital Territory</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-md mx-auto font-medium">
            Join 500+ neighborhood stores already receiving orders. Be the first choice for nearby customers.
          </p>
          <Button variant="primary" size="xl" className="h-20 px-12 rounded-[2rem] text-lg tracking-[0.2em] uppercase font-black shadow-2xl shadow-[#1AAB6D]/20" href="/download">
            Register Your Shop
          </Button>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-8">Limited visibility slots for new areas</p>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
