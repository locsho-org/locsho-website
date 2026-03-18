import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Footer from '../components/Footer';
import { testimonials } from '../data/testimonials';
import OrderNotificationDemo from '../components/OrderNotificationDemo';

const partnerSteps = [
  { step: 1, icon: '📝', title: 'Register Your Shop',         desc: 'Create your shop account in less than 30 seconds using your mobile number.' },
  { step: 2, icon: '📦', title: 'Add Products',               desc: 'Select products from the catalog or upload your shop items and set your own prices.' },
  { step: 3, icon: '🔔', title: 'Receive Orders',             desc: 'Customers nearby will send orders directly to your shop through the app.' },
  { step: 4, icon: '✅', title: 'Confirm and Prepare Orders', desc: 'Confirm the order and prepare it for pickup or local delivery.' },
  { step: 5, icon: '💳', title: 'Get Paid Directly',          desc: 'Customers pay directly to your shop using your UPI QR code.' },
];

export default function Partner() {
  useEffect(() => {
    document.title = 'LocSho Partner — Grow Your Local Shop Online';
  }, []);

  return (
    <>
      {/* Hero */}
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
          <h1 className="text-5xl md:text-6xl font-black text-[#1A1A2E] mb-6 uppercase leading-tight">
            Put Your Shop Online and Receive Orders From{' '}
            <span className="text-[#1AAB6D]">Nearby Customers</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            Accept orders from customers in your area without paying high commissions.
          </p>
          <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-8">
            {[
              'No 20–30% Commission',
              'Small Platform Support Fee Per Order',
              'Payment Directly to Your QR',
              'Reach Nearby Customers Easily',
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-[#1A1A2E] font-medium text-sm">
                <span className="w-5 h-5 bg-[#1AAB6D] rounded-full flex items-center justify-center text-white text-xs">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/download">Start Receiving Orders</Button>
            <Button variant="outline" size="lg" href="/download">Download Partner App</Button>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Many nearby shops are already joining LocSho. Make sure your shop appears when customers place their next order.
          </p>
        </div>
      </section>

      {/* Grow Your Business */}
      <SectionWrapper background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-6">
            Grow Your Business with{' '}
            <span className="text-[#1AAB6D]">Digital Orders</span>
          </h2>
          <p className="text-gray-500 text-lg mb-4">
            LocSho helps nearby customers discover your shop and place orders easily.
          </p>
          <p className="text-gray-500 mb-4">
            Bring your shop online, reach more local customers and manage orders from your mobile.
            No complicated setup, no high commissions — just simple digital ordering for your shop.
          </p>
          <p className="text-gray-500">
            Customers in your area are looking for nearby shops to order from.
            Listing your shop on LocSho helps them find you quickly.
          </p>
        </div>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper background="mint">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
            Live in <span className="text-[#1AAB6D]">Under 10 Minutes</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {partnerSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-full"
            >
              <Card className="text-center bg-white border border-[#1AAB6D]/10 relative h-full">
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

      {/* Order Notification Demo */}
      <SectionWrapper background="white">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-3">
            See How <span className="text-[#1AAB6D]">Orders Arrive</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Every order pings you instantly. One tap to accept — that's it.
          </p>
        </div>
        <OrderNotificationDemo />
      </SectionWrapper>

      {/* Features for Shop Owners */}
      <SectionWrapper background="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-10 text-center">
            Features for <span className="text-[#1AAB6D]">Shop Owners</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Easy Product Catalog Management',
              'Receive Instant Order Notifications',
              'Manage Customer Orders Easily',
              'Share Your Shop Link with Customers',
              'Download QR Poster to Promote Your Shop',
              'Increase Visibility to Nearby Customers',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 bg-[#F0FBF5] rounded-2xl px-5 py-4 border border-[#1AAB6D]/15">
                <span className="w-6 h-6 bg-[#1AAB6D] rounded-full flex items-center justify-center text-white text-xs shrink-0">✓</span>
                <span className="text-[#1A1A2E] font-medium text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Simple Pricing */}
      <SectionWrapper background="brand-light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
            Simple <span className="text-[#1AAB6D]">Pricing</span>
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            No large commissions like other platforms.
          </p>
          <p className="text-gray-500 mb-6">
            LocSho only charges a small platform support fee per order.
          </p>
        </div>
      </SectionWrapper>

      {/* Start Receiving Orders CTA */}
      <SectionWrapper background="dark" id="join">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-[#1AAB6D]/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🏪
          </div>
          <h2 className="text-3xl font-black text-white mb-4">
            Start Receiving Orders
          </h2>
          <p className="text-gray-300 mb-4 max-w-md mx-auto">
            Join LocSho and connect with customers near your shop.
          </p>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            Register your shop today and start receiving orders from nearby customers.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Early registered shops get better visibility when customers search nearby stores.
          </p>
          <Button variant="primary" size="xl" href="/download">
            Register Your Shop
          </Button>
        </div>
      </SectionWrapper>

      {/* Real Shops, Real Results */}
      <SectionWrapper background="white">
        <div className="text-center mb-12">
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

      <Footer />
    </>
  );
}
