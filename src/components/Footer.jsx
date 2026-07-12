import { Link, useLocation } from 'react-router-dom';
import {
  Mail,
  Instagram,
  Facebook,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const openAppStore = (isPartner = false) => {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  // No partner iOS app exists yet — partner always goes to the partner Play Store.
  const url = isPartner
    ? 'https://play.google.com/store/apps/details?id=in.locsho.partner'
    : isIOS
      ? 'https://apps.apple.com/us/app/locsho/id6771481950'
      : 'https://play.google.com/store/apps/details?id=in.locsho.user&hl=en_IN';
  window.open(url, '_blank');
};

export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();
  const isPartnerPage = location.pathname === '/partner';
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* CTA strip — matching partner dashboard "Activate Subscription" banner style */}
      <div className="bg-[#F0FBF5] border-b border-[#1AAB6D]/15 py-12 px-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-3xl font-black text-[#1A1A2E] mb-2 tracking-tight uppercase">
              {t('footer.ctaTitle')}
            </h3>
            <p className="text-gray-500 font-medium max-w-lg">
              {t('footer.ctaSubtitle')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => openAppStore(isPartnerPage)}
              className="px-8 py-4 bg-[#1AAB6D] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#148A57] transition-all text-xs shadow-xl shadow-green-900/10 active:scale-95"
            >
              {t('footer.downloadApp')}
            </button>
            <Link
              to="/partner"
              className="px-8 py-4 bg-white text-[#1AAB6D] font-black uppercase tracking-widest rounded-2xl border-2 border-[#1AAB6D] hover:bg-[#E8F5EE] transition-all text-xs active:scale-95"
            >
              {t('footer.partnerWithUs')}
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
              <img src="/logo.png" alt="Locsho" className="w-10 h-10 rounded-xl shadow-lg shadow-green-900/10" />
              <span className="font-black text-2xl tracking-tighter">
                <span className="text-[#1AAB6D]">Loc</span><span className="text-[#F59E0B]">Sho</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs font-medium">
              {t('footer.brandDesc')}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/locshoapp/' },
                { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/LocShoPartner/' },
                { icon: Mail, label: 'Email', href: 'mailto:admin@folwork.co' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#1AAB6D] hover:bg-[#E8F5EE] hover:border-[#1AAB6D]/20 transition-all shadow-sm group"
                >
                  <social.icon size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* For Users */}
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">{t('footer.forUsers')}</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://user.locsho.in/login" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1AAB6D] text-sm font-bold transition-all flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#1AAB6D] transition-colors" />
                  {t('nav.userLogin')}
                </a>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
              {t('footer.forPartners')}
            </h4>
            <ul className="space-y-4">
              {[
                { label: t('footer.joinAsPartner'), href: '/partner' },
                { label: t('footer.partnerLogin'), href: 'https://partner.locsho.in/login', external: true },
              ].map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1AAB6D] text-sm font-bold transition-all flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#1AAB6D] transition-colors" />
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} className="text-gray-500 hover:text-[#1AAB6D] text-sm font-bold transition-all flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#1AAB6D] transition-colors" />
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
              {t('footer.company')}
            </h4>
            <ul className="space-y-4">
              {[
                { label: t('footer.privacyPolicy'), href: '/privacy' },
                { label: t('footer.termsOfService'), href: '/terms' },
                { label: t('footer.supportCenter'), href: '/support' },
              ].map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1AAB6D] text-sm font-bold transition-all flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#1AAB6D] transition-colors" />
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} className="text-gray-500 hover:text-[#1AAB6D] text-sm font-bold transition-all flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#1AAB6D] transition-colors" />
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6 text-gray-400 text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-2"><span className="opacity-60">{t('footer.madeInIndia')}</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
