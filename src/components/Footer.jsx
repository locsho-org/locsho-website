import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* CTA strip — matching partner dashboard "Activate Subscription" banner style */}
      <div className="bg-[#F0FBF5] border-b border-[#1AAB6D]/15 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-black text-[#1A1A2E] mb-1">
              Ready to join the local revolution?
            </h3>
            <p className="text-gray-500 text-sm">
              Bangalore pilot — expanding soon. Be an early adopter.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/download"
              className="px-6 py-3 bg-[#1AAB6D] text-white font-semibold rounded-full hover:bg-[#148A57] transition-colors text-sm shadow-md"
            >
              📱 Download App
            </Link>
            <Link
              to="/partner"
              className="px-6 py-3 bg-white text-[#1AAB6D] font-semibold rounded-full border border-[#1AAB6D] hover:bg-[#E8F5EE] transition-colors text-sm"
            >
              🏪 Partner With Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#1AAB6D] rounded-lg flex items-center justify-center text-white font-black text-sm">
                L
              </div>
              <span className="font-black text-xl text-[#1A1A2E]">
                Loc<span className="text-[#1AAB6D]">sho</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Hyperlocal delivery at your doorstep. Supporting local shops with technology.
            </p>
            <div className="flex gap-3">
              {['📱', '💬', '📧'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-[#E8F5EE] rounded-full flex items-center justify-center hover:bg-[#d4eede] transition-colors text-sm"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Download */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">
              Download
            </h4>
            <ul className="space-y-3">
              {[
                { label: '🍎 App Store', href: '/download' },
                { label: '🤖 Google Play', href: '/download' },
                { label: '📲 QR Code', href: '/download' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-gray-500 hover:text-[#1AAB6D] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">
              For Partners
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Join as Partner', href: '/partner' },
                { label: 'Earnings Calculator', href: '/partner#calculator' },
                { label: 'Partner FAQs', href: '/partner#faq' },
                { label: 'Partner Demo', href: '/demo' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-gray-500 hover:text-[#1AAB6D] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About LocSho', href: '/' },
                { label: 'Contact Us', href: '/' },
                { label: 'Privacy Policy', href: '/' },
                { label: 'Terms of Service', href: '/' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-gray-500 hover:text-[#1AAB6D] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">
            © 2026 LocSho. Bangalore Pilot. Built with ❤️ for local India.
          </p>
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <span>🇮🇳 Made in India</span>
            <span>•</span>
            <span>Bangalore, Karnataka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
