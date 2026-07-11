import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Mail, Phone, ChevronDown, Clock, ShoppingBag, Store, AlertCircle, Package, CreditCard, MapPin, Mic, RefreshCw, UserCheck } from 'lucide-react';
import Footer from '../components/Footer';

const WHATSAPP_USER    = 'https://wa.me/918800453953?text=Hi%2C%20I%20need%20help%20with%20my%20LocSho%20order.';
const WHATSAPP_PARTNER = 'https://wa.me/918800453953?text=Hi%2C%20I%20am%20a%20LocSho%20partner%20and%20need%20support.';
const SUPPORT_EMAIL    = 'admin@folwork.co';
const PARTNER_EMAIL    = 'admin@folwork.co';

// Icons pair with the translated FAQ arrays by index (order matches i18n keys)
const USER_FAQ_ICONS    = [Package, RefreshCw, CreditCard, ShoppingBag, Mic, MapPin];
const PARTNER_FAQ_ICONS = [Store, CreditCard, Package, AlertCircle, RefreshCw, UserCheck];

function FaqItem({ item, icon: Icon, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="w-9 h-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center shrink-0">
          <Icon size={17} className="text-[#1AAB6D]" strokeWidth={2.5} />
        </span>
        <span className="flex-1 text-sm font-bold text-[#1A1A2E]">{item.q}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 pt-1 text-sm text-gray-500 leading-relaxed pl-[4.5rem]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Support() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('user');
  const isUser = tab === 'user';

  const contacts = isUser
    ? [
        {
          icon: MessageCircle,
          label: t('support.user.whatsappLabel'),
          value: '+91 88004 53953',
          sub: t('support.user.whatsappSub'),
          href: WHATSAPP_USER,
          color: '#25D366',
          bg: '#F0FBF5',
          cta: t('support.chatOnWhatsapp'),
        },
        {
          icon: Mail,
          label: t('support.user.emailLabel'),
          value: SUPPORT_EMAIL,
          sub: t('support.user.emailSub'),
          href: `mailto:${SUPPORT_EMAIL}`,
          color: '#1AAB6D',
          bg: '#F0FBF5',
          cta: t('support.sendEmail'),
        },
        {
          icon: Phone,
          label: t('support.user.helplineLabel'),
          value: '+91 88004 53953',
          sub: t('support.user.helplineSub'),
          href: 'tel:+918800453953',
          color: '#F59E0B',
          bg: '#FFFBEB',
          cta: t('support.callNow'),
        },
      ]
    : [
        {
          icon: MessageCircle,
          label: t('support.partner.whatsappLabel'),
          value: '+91 88004 53953',
          sub: t('support.partner.whatsappSub'),
          href: WHATSAPP_PARTNER,
          color: '#25D366',
          bg: '#F0FBF5',
          cta: t('support.chatOnWhatsapp'),
        },
        {
          icon: Mail,
          label: t('support.partner.emailLabel'),
          value: PARTNER_EMAIL,
          sub: t('support.partner.emailSub'),
          href: `mailto:${PARTNER_EMAIL}`,
          color: '#1AAB6D',
          bg: '#F0FBF5',
          cta: t('support.sendEmail'),
        },
        {
          icon: Phone,
          label: t('support.partner.helplineLabel'),
          value: '+91 88004 53953',
          sub: t('support.partner.helplineSub'),
          href: 'tel:+918800453953',
          color: '#F59E0B',
          bg: '#FFFBEB',
          cta: t('support.callNow'),
        },
      ];

  const faqData = t(isUser ? 'support.userFaqs' : 'support.partnerFaqs', { returnObjects: true });
  const faqs = Array.isArray(faqData) ? faqData : [];
  const faqIcons = isUser ? USER_FAQ_ICONS : PARTNER_FAQ_ICONS;

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-[#E8F5EE] text-[#1AAB6D] text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
            {t('support.badge')}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] tracking-tight mb-4">
            {t('support.title1')} <span className="text-[#1AAB6D]">{t('support.title2')}</span>
          </h1>
          <p className="text-gray-500 font-medium text-base max-w-lg mx-auto">
            {t('support.subtitle')}
          </p>

          {/* Hours badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-full">
            <Clock size={14} className="text-[#F59E0B]" strokeWidth={2.5} />
            <span className="text-xs font-bold text-[#92400E]">{t('support.hours')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Tab switcher */}
        <div className="flex gap-3 p-1.5 bg-white border border-gray-100 rounded-2xl shadow-sm mb-10 max-w-sm mx-auto">
          {[
            { key: 'user', icon: ShoppingBag, label: t('support.tabCustomer') },
            { key: 'partner', icon: Store, label: t('support.tabShopkeeper') },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black transition-all ${
                tab === key
                  ? 'bg-[#1AAB6D] text-white shadow-md shadow-green-900/10'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={14} strokeWidth={2.5} />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            {/* Contact cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {contacts.map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex flex-col gap-3 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
                  >
                    <span
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: c.bg }}
                    >
                      <Icon size={20} strokeWidth={2.5} style={{ color: c.color }} />
                    </span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{c.label}</p>
                      <p className="text-sm font-black text-[#1A1A2E]">{c.value}</p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5 leading-snug">{c.sub}</p>
                    </div>
                    <span
                      className="mt-auto text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: c.bg, color: c.color }}
                    >
                      {c.cta} →
                    </span>
                  </a>
                );
              })}
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                {isUser ? t('support.commonCustomerIssues') : t('support.commonPartnerIssues')}
              </h2>
              <div className="flex flex-col gap-3">
                {faqs.map((item, i) => (
                  <FaqItem key={item.q} item={item} icon={faqIcons[i]} index={i} />
                ))}
              </div>
            </div>

            {/* Escalation note */}
            <div className="mt-8 flex items-start gap-3 p-4 bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-2xl">
              <AlertCircle size={16} className="text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="text-xs text-[#92400E] font-medium leading-relaxed">
                {isUser ? t('support.escalationUser') : t('support.escalationPartner')}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
