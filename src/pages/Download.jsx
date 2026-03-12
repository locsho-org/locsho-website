import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/ui/SectionWrapper';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Footer from '../components/Footer';

const appLinks = [
  {
    store: 'App Store',
    icon: '🍎',
    subtitle: 'iOS 13+',
    href: '#',
  },
  {
    store: 'Google Play',
    icon: '🤖',
    subtitle: 'Android 5+',
    href: '#',
  },
];

export default function Download() {
  useEffect(() => {
    document.title = 'Download LocSho — App Store & Google Play';
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#F0FBF5] pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Concentric decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[700, 540, 380].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-[#1AAB6D]/8"
              style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center w-full relative z-10">
          <Badge color="green" className="mb-6">Available Now</Badge>

          {/* Big icon — matching user app splash */}
          <div className="w-24 h-24 bg-[#1AAB6D] rounded-3xl flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl">
            🛍️
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            Download <span className="text-[#1AAB6D]">LocSho</span>
          </h1>
          <p className="text-gray-500 text-lg mb-3 max-w-xl mx-auto">
            Hyperlocal delivery at your doorstep
          </p>

          {/* Floating info chips */}
          <div className="flex items-center justify-center gap-4 mb-10 flex-wrap">
            <span className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-4 py-1.5 text-sm text-gray-600 shadow-sm">
              🚚 Fast Delivery
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-4 py-1.5 text-sm text-gray-600 shadow-sm">
              ⏱️ 30 min
            </span>
          </div>

          {/* App store buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {appLinks.map((app) => (
              <motion.a
                key={app.store}
                href={app.href}
                className="bg-[#1AAB6D] text-white px-8 py-4 rounded-2xl flex items-center gap-4 hover:bg-[#148A57] transition-colors shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-3xl">{app.icon}</span>
                <div className="text-left">
                  <p className="text-xs text-white/70">Download on</p>
                  <p className="text-lg font-bold">{app.store}</p>
                  <p className="text-xs text-white/60">{app.subtitle}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <p className="text-gray-400 text-sm mb-10">
            By downloading, you agree to our{' '}
            <span className="text-[#1AAB6D] cursor-pointer">Terms</span> and{' '}
            <span className="text-[#1AAB6D] cursor-pointer">Privacy Policy</span>
          </p>

          {/* QR codes */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            {['User App', 'Partner App'].map((label) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="bg-white p-4 rounded-2xl shadow-md border border-[#1AAB6D]/10">
                  <img
                    src={`https://placehold.co/160x160/F0FBF5/1AAB6D?text=QR+${label.split(' ')[0]}`}
                    alt={`QR code for ${label}`}
                    className="w-36 h-36"
                  />
                </div>
                <p className="text-gray-400 text-sm">Scan for {label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features quick list */}
      <SectionWrapper background="white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-4">
            What's in the <span className="text-[#1AAB6D]">App?</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { icon: '🎤', title: 'AI Voice Cart', desc: 'Order by speaking in Hindi, Telugu, Tamil, or Kannada' },
            { icon: '📍', title: 'Find Local Shops', desc: 'GPS-based shop discovery within 2km' },
            { icon: '💰', title: '₹2 Delivery', desc: 'Flat fee for orders above ₹199' },
            { icon: '🛒', title: 'Multi-shop Cart', desc: 'Order from multiple shops at once' },
            { icon: '🚴', title: 'Live Tracking', desc: 'Real-time GPS tracking of your delivery' },
            { icon: '💬', title: 'WhatsApp Updates', desc: 'Order status updates on WhatsApp' },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 p-4 bg-[#F0FBF5] rounded-2xl border border-[#1AAB6D]/10"
            >
              <div className="w-10 h-10 bg-[#E8F5EE] rounded-xl flex items-center justify-center text-xl shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A2E] text-sm">{f.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Partner download CTA */}
      <SectionWrapper background="mint">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl p-8 md:p-10 border border-[#1AAB6D]/15 shadow-sm">
          <div className="w-14 h-14 bg-[#E8F5EE] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
            🏪
          </div>
          <h3 className="text-2xl font-black text-[#1A1A2E] mb-3">Are you a shop owner?</h3>
          <p className="text-gray-500 mb-6 text-sm">
            Download the LocSho Partner App and start selling online in 10 minutes.
          </p>
          <Button variant="primary" size="lg" href="/partner">
            Get Partner App →
          </Button>
        </div>
      </SectionWrapper>

      <Footer />
    </>
  );
}
