import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Phone, ChevronDown, Clock, ShoppingBag, Store, AlertCircle, Package, CreditCard, MapPin, Mic, RefreshCw, UserCheck } from 'lucide-react';
import Footer from '../components/Footer';

const WHATSAPP_USER    = 'https://wa.me/918800453953?text=Hi%2C%20I%20need%20help%20with%20my%20LocSho%20order.';
const WHATSAPP_PARTNER = 'https://wa.me/918800453953?text=Hi%2C%20I%20am%20a%20LocSho%20partner%20and%20need%20support.';
const SUPPORT_EMAIL    = 'admin@folwork.co';
const PARTNER_EMAIL    = 'admin@folwork.co';

const userFaqs = [
  {
    icon: Package,
    q: 'My order is delayed or not delivered',
    a: 'First check live tracking in the app. If the rider has not moved in 10+ minutes, tap "Need Help" on the order screen — we will connect you with the rider or arrange a replacement delivery within 15 minutes.',
  },
  {
    icon: RefreshCw,
    q: 'I want to cancel my order',
    a: 'Orders can be cancelled free of charge within 2 minutes of placing. After that, cancellation depends on whether the shop has already started preparing. Open the order → tap "Cancel Order". If unavailable, contact support on WhatsApp.',
  },
  {
    icon: CreditCard,
    q: 'I was charged but order was not placed',
    a: 'Payment failures where money is deducted are automatically reversed within 3–5 business days. If the amount has not returned after 5 days, WhatsApp us with your UPI transaction ID and we will resolve it within 24 hours.',
  },
  {
    icon: ShoppingBag,
    q: 'Item I received is wrong or missing',
    a: 'Take a photo of what you received and WhatsApp it to us within 1 hour of delivery. We will either re-deliver the correct item or issue a full refund for the missing item — no questions asked.',
  },
  {
    icon: Mic,
    q: 'Voice cart is not understanding my language',
    a: 'Voice ordering supports Hindi, English, Telugu, Tamil, and Kannada. Make sure microphone permission is granted in your phone settings. Speak clearly and pause briefly between items. For best results, say item name + quantity, e.g. "Do kg aata".',
  },
  {
    icon: MapPin,
    q: 'No shops available in my area',
    a: 'LocSho is currently live in Greater Noida. We are expanding rapidly. Drop your pincode on WhatsApp and we will notify you the moment we go live in your area. You can also request a specific shop to join.',
  },
];

const partnerFaqs = [
  {
    icon: Store,
    q: 'My shop is not showing to customers',
    a: 'This usually happens when your subscription has expired or your shop is set to "Closed" in the Partner app. Check Dashboard → Shop Status. If status shows "Active" but shop is still invisible, contact partner support immediately.',
  },
  {
    icon: CreditCard,
    q: 'My payout has not arrived',
    a: 'Payouts are processed daily before 10 AM for the previous day\'s orders. If your UPI ID is correct and it has been over 24 hours, WhatsApp us with your Shop ID and the expected amount. We resolve payout issues within 4 hours.',
  },
  {
    icon: Package,
    q: 'How do I add or update my products?',
    a: 'Go to Partner App → Catalog → Add Item. You can search the master catalog or submit a new item for review. For bulk updates, use Catalog → Quick Price Update. For bulk upload, go to Catalog → Bulk Upload and download the Excel template.',
  },
  {
    icon: AlertCircle,
    q: 'Customer placed a wrong or fake order',
    a: 'You can decline any order with a reason. Repeated fake orders from the same customer are flagged automatically. If a customer is abusive or you suspect fraud, report via Partner App → Order → Report Issue, and our team will investigate.',
  },
  {
    icon: RefreshCw,
    q: 'I cannot log into my Partner account',
    a: 'Use "Resend OTP" on the login screen. Make sure you are entering the mobile number registered with LocSho. If OTP is still not received after 2 minutes, WhatsApp partner support with your registered number and shop name.',
  },
  {
    icon: UserCheck,
    q: 'How do I upgrade or renew my subscription?',
    a: 'Go to Partner App → Subscription → Choose Plan. Payment is via UPI or card. Your plan activates instantly after payment. If payment succeeded but plan did not activate, send the transaction screenshot to partner support.',
  },
];

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
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
  const [tab, setTab] = useState('user');
  const isUser = tab === 'user';

  const contacts = isUser
    ? [
        {
          icon: MessageCircle,
          label: 'WhatsApp Support',
          value: '+91 88004 53953',
          sub: 'Fastest response · Usually in 5 min',
          href: WHATSAPP_USER,
          color: '#25D366',
          bg: '#F0FBF5',
          cta: 'Chat on WhatsApp',
        },
        {
          icon: Mail,
          label: 'Email Support',
          value: SUPPORT_EMAIL,
          sub: 'Detailed queries · 4–6 hr response',
          href: `mailto:${SUPPORT_EMAIL}`,
          color: '#1AAB6D',
          bg: '#F0FBF5',
          cta: 'Send Email',
        },
        {
          icon: Phone,
          label: 'Helpline',
          value: '+91 88004 53953',
          sub: 'Mon–Sat, 9 AM – 9 PM IST',
          href: 'tel:+918800453953',
          color: '#F59E0B',
          bg: '#FFFBEB',
          cta: 'Call Now',
        },
      ]
    : [
        {
          icon: MessageCircle,
          label: 'Partner WhatsApp',
          value: '+91 88004 53953',
          sub: 'Dedicated partner line · Mon–Sat 8 AM – 10 PM',
          href: WHATSAPP_PARTNER,
          color: '#25D366',
          bg: '#F0FBF5',
          cta: 'Chat on WhatsApp',
        },
        {
          icon: Mail,
          label: 'Partner Email',
          value: PARTNER_EMAIL,
          sub: 'Billing, payouts, account issues · 2–4 hr SLA',
          href: `mailto:${PARTNER_EMAIL}`,
          color: '#1AAB6D',
          bg: '#F0FBF5',
          cta: 'Send Email',
        },
        {
          icon: Phone,
          label: 'Partner Helpline',
          value: '+91 88004 53953',
          sub: 'Mon–Sat, 8 AM – 10 PM IST',
          href: 'tel:+918800453953',
          color: '#F59E0B',
          bg: '#FFFBEB',
          cta: 'Call Now',
        },
      ];

  const faqs = isUser ? userFaqs : partnerFaqs;

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-[#E8F5EE] text-[#1AAB6D] text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
            Support Center
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] tracking-tight mb-4">
            How can we <span className="text-[#1AAB6D]">help you?</span>
          </h1>
          <p className="text-gray-500 font-medium text-base max-w-lg mx-auto">
            Get fast answers for order issues, payments, and account help — separately for customers and shop owners.
          </p>

          {/* Hours badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-full">
            <Clock size={14} className="text-[#F59E0B]" strokeWidth={2.5} />
            <span className="text-xs font-bold text-[#92400E]">Support hours: Mon–Sat, 9 AM – 9 PM IST</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Tab switcher */}
        <div className="flex gap-3 p-1.5 bg-white border border-gray-100 rounded-2xl shadow-sm mb-10 max-w-sm mx-auto">
          {[
            { key: 'user', icon: ShoppingBag, label: 'I\'m a Customer' },
            { key: 'partner', icon: Store, label: 'I\'m a Shopkeeper' },
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
                Common {isUser ? 'Customer' : 'Partner'} Issues
              </h2>
              <div className="flex flex-col gap-3">
                {faqs.map((item, i) => (
                  <FaqItem key={item.q} item={item} index={i} />
                ))}
              </div>
            </div>

            {/* Escalation note */}
            <div className="mt-8 flex items-start gap-3 p-4 bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-2xl">
              <AlertCircle size={16} className="text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="text-xs text-[#92400E] font-medium leading-relaxed">
                {isUser
                  ? 'If your issue is not resolved within 24 hours, email us at support@locsho.in with subject "URGENT" and your order number. A senior agent will respond within 2 hours.'
                  : 'For payout disputes or account suspension appeals, email partner@locsho.in with subject "ESCALATION" and your Shop ID. We resolve critical partner issues within 4 hours on business days.'}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
