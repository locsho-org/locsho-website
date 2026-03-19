import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  MessageSquare, 
  Mail, 
  Instagram, 
  Twitter, 
  Facebook,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* CTA strip — matching partner dashboard "Activate Subscription" banner style */}
      <div className="bg-[#F0FBF5] border-b border-[#1AAB6D]/15 py-12 px-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-3xl font-black text-[#1A1A2E] mb-2 tracking-tight uppercase">
              Ready to join the local revolution?
            </h3>
            <p className="text-gray-500 font-medium max-w-lg">
              Greater Noida pilot — expanding soon. Be an early adopter and put your shop on the map today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/download"
              className="px-8 py-4 bg-[#1AAB6D] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#148A57] transition-all text-xs shadow-xl shadow-green-900/10 active:scale-95"
            >
              📱 Download App
            </Link>
            <Link
              to="/partner"
              className="px-8 py-4 bg-white text-[#1AAB6D] font-black uppercase tracking-widest rounded-2xl border-2 border-[#1AAB6D] hover:bg-[#E8F5EE] transition-all text-xs active:scale-95"
            >
              🏪 Partner With Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#1AAB6D] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-green-900/10">
                L
              </div>
              <span className="font-black text-2xl text-[#1A1A2E] tracking-tighter">
                Loc<span className="text-[#1AAB6D]">sho</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs font-medium">
              Hyperlocal delivery at your doorstep. We are bridging the gap between local shopkeepers and digital customers using smart technology.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Mail, label: 'Email' },
              ].map((social, i) => (
                <button
                  key={i}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#1AAB6D] hover:bg-[#E8F5EE] hover:border-[#1AAB6D]/20 transition-all shadow-sm group"
                >
                  <social.icon size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Download */}
          <div className="lg:pl-8">
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
              Download
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'App Store', href: '/download' },
                { label: 'Google Play', href: '/download' },
                { label: 'QR Code', href: '/download' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-gray-500 hover:text-[#1AAB6D] text-sm font-bold transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#1AAB6D] transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
              For Partners
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Join as Partner', href: '/partner' },
                { label: 'Partner Login', href: '/partner' },
                { label: 'Pricing Plans', href: '/partner' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-gray-500 hover:text-[#1AAB6D] text-sm font-bold transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#1AAB6D] transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Privacy Policy', href: '/' },
                { label: 'Terms of Service', href: '/' },
                { label: 'Support Center', href: '/' },
                { label: 'Contact Us', href: '/' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-gray-500 hover:text-[#1AAB6D] text-sm font-bold transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#1AAB6D] transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
            © 2026 LocSho. Greater Noida Pilot. Built with ❤️ for local India.
          </p>
          <div className="flex items-center gap-6 text-gray-400 text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-2">🇮🇳 <span className="opacity-60">Made in India</span></span>
            <span className="opacity-20">•</span>
            <span className="opacity-60">Greater Noida, Uttar Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
