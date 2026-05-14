import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, KeyRound, LogOut, RefreshCw,
  Zap, TrendingUp, FileText, CreditCard, Check, Loader2,
  AlertCircle, Calendar, IndianRupee, ArrowRight,
  ArrowLeft, Store, Star
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const API = import.meta.env.VITE_API_URL || 'https://api.locsho.in';

async function apiFetch(path, options = {}) {
  const { headers: optHeaders, ...restOptions } = options;
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...optHeaders },
    ...restOptions,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

function formatPrice(price) {
  if (price === undefined || price === null) return '—';
  if (price === 0) return 'Free';
  return `₹${price}`;
}

// ── Auth: Phone ───────────────────────────────────────────────────────────────

function PhoneStep({ onSuccess }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const send = async () => {
    const clean = phone.replace(/\D/g, '');
    if (clean.length !== 10) { setError('Enter a valid 10-digit mobile number'); return; }
    setLoading(true); setError('');
    try {
      await apiFetch('/auth/partner/send-otp', { method: 'POST', body: JSON.stringify({ phone: clean }) });
      onSuccess(clean);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Badge color="green" className="mb-4">Partner Portal</Badge>
        <h1 className="text-3xl font-black text-[#1A1A2E] tracking-tight mb-2">Sign In</h1>
        <p className="text-gray-500 font-medium">Enter your registered mobile number to continue.</p>
      </div>
      <div>
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Mobile Number</label>
        <div className="flex items-center gap-3 border-2 border-gray-100 rounded-2xl px-4 py-3.5 focus-within:border-[#1AAB6D] transition-colors bg-gray-50">
          <span className="text-sm font-bold text-gray-400 shrink-0">+91</span>
          <div className="w-px h-5 bg-gray-200 shrink-0" />
          <input
            type="tel"
            maxLength={10}
            value={phone}
            onChange={e => { setPhone(e.target.value.replace(/\D/g, '')); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="9876543210"
            className="flex-1 outline-none text-lg font-bold text-[#1A1A2E] bg-transparent placeholder:text-gray-300 tracking-widest"
            autoFocus
          />
        </div>
        {error && (
          <p className="mt-2 text-sm font-semibold text-red-500 flex items-center gap-1.5">
            <AlertCircle size={14} />{error}
          </p>
        )}
      </div>
      <Button
        variant="primary"
        size="md"
        onClick={send}
        disabled={loading || phone.replace(/\D/g, '').length < 10}
        className="w-full h-14 rounded-2xl uppercase tracking-widest font-black disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <><Phone size={16} className="mr-2" /> Send OTP</>}
      </Button>
      <p className="text-center text-xs text-gray-400 font-medium">
        Only for registered Locsho partners.{' '}
        <a href="/download" className="text-[#1AAB6D] font-semibold hover:underline">Get the app →</a>
      </p>
    </div>
  );
}

// ── Auth: OTP ─────────────────────────────────────────────────────────────────

function OTPStep({ phone, onSuccess, onBack }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const verify = async () => {
    if (otp.length !== 6) { setError('Enter the 6-digit OTP'); return; }
    setLoading(true); setError('');
    try {
      const data = await apiFetch('/auth/partner/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) });
      const token = data.data?.accessToken || data.accessToken;
      const partner = data.data?.partner || data.partner;
      onSuccess(token, partner);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setResending(true); setError('');
    try {
      await apiFetch('/auth/partner/send-otp', { method: 'POST', body: JSON.stringify({ phone }) });
      setTimer(30); setOtp('');
    } catch (e) {
      setError(e.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-[#1AAB6D] mb-4 transition-colors">
          <ArrowLeft size={14} /> Change number
        </button>
        <Badge color="green" className="mb-4">OTP Verification</Badge>
        <h1 className="text-3xl font-black text-[#1A1A2E] tracking-tight mb-2">Enter OTP</h1>
        <p className="text-gray-500 font-medium">Sent to <span className="font-bold text-[#1A1A2E]">+91 {phone}</span></p>
      </div>
      <div>
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">6-Digit Code</label>
        <input
          type="tel"
          maxLength={6}
          value={otp}
          onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && verify()}
          placeholder="••••••"
          className="w-full h-16 border-2 border-gray-100 rounded-2xl px-4 outline-none text-3xl font-black text-center text-[#1A1A2E] tracking-[0.6em] focus:border-[#1AAB6D] transition-colors bg-gray-50"
          autoFocus
        />
        {error && (
          <p className="mt-2 text-sm font-semibold text-red-500 flex items-center gap-1.5">
            <AlertCircle size={14} />{error}
          </p>
        )}
      </div>
      <Button
        variant="primary"
        size="md"
        onClick={verify}
        disabled={loading || otp.length < 6}
        className="w-full h-14 rounded-2xl uppercase tracking-widest font-black disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <><KeyRound size={16} className="mr-2" /> Verify & Login</>}
      </Button>
      <div className="text-center">
        {timer > 0 ? (
          <p className="text-sm text-gray-400 font-medium">Resend OTP in <span className="font-bold text-[#1A1A2E]">{timer}s</span></p>
        ) : (
          <button onClick={resend} disabled={resending} className="text-sm font-semibold text-[#1AAB6D] hover:underline flex items-center gap-1.5 mx-auto">
            {resending ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />} Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function getDaysRemaining(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getGraceDaysLeft(endDate, gracePeriodDays) {
  if (!endDate) return 0;
  const grace = new Date(endDate);
  grace.setDate(grace.getDate() + (gracePeriodDays ?? 7));
  return Math.max(0, Math.ceil((grace.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function Dashboard({ token, partner, onLogout }) {
  const [tab, setTab] = useState('plan');
  const [subscription, setSubscription] = useState(null);
  const [usageList, setUsageList] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [plans, setPlans] = useState([]);
  const [topUpPacks, setTopUpPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [payingInvoice, setPayingInvoice] = useState(null);
  const [switchingPlan, setSwitchingPlan] = useState(null);
  const [toast, setToast] = useState(null);

  const authHeaders = { Authorization: `Bearer ${token}` };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setErrors({});
    const results = await Promise.allSettled([
      apiFetch('/subscriptions/current', { headers: authHeaders }),
      apiFetch('/subscriptions/usage', { headers: authHeaders }),
      apiFetch('/subscriptions/invoices', { headers: authHeaders }),
      apiFetch('/subscriptions/plans', { headers: authHeaders }),
      apiFetch('/subscriptions/top-up-packs', { headers: authHeaders }),
    ]);
    const errs = {};
    if (results[0].status === 'fulfilled') {
      const v = results[0].value.data || results[0].value;
      setSubscription(v?.id ? v : null);
    } else errs.subscription = results[0].reason?.message;
    if (results[1].status === 'fulfilled') {
      const v = results[1].value.data || results[1].value;
      setUsageList(Array.isArray(v) ? v : (v ? [v] : []));
    } else errs.usage = results[1].reason?.message;
    if (results[2].status === 'fulfilled') { const v = results[2].value.data || results[2].value; setInvoices(Array.isArray(v) ? v : []); }
    else errs.invoices = results[2].reason?.message;
    if (results[3].status === 'fulfilled') { const v = results[3].value.data || results[3].value; setPlans(Array.isArray(v) ? v : []); }
    else errs.plans = results[3].reason?.message;
    if (results[4].status === 'fulfilled') { const v = results[4].value.data || results[4].value; setTopUpPacks(Array.isArray(v) ? v : []); }
    setErrors(errs);
    setLoading(false);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const payInvoice = async (invoice) => {
    setPayingInvoice(invoice.id);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) { showToast('Could not load payment gateway', 'error'); return; }
      const orderRes = await apiFetch(`/subscriptions/invoices/${invoice.id}/pay`, { method: 'POST', headers: authHeaders });
      const payData = orderRes.data || orderRes;
      const { orderId, amount } = payData;
      await new Promise((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: 'rzp_test_SkWqLfKhGtXy4U', amount, currency: 'INR', order_id: orderId,
          name: 'Locsho', description: `Invoice #${invoice.invoiceNumber || invoice.id}`,
          prefill: { contact: partner?.phone }, theme: { color: '#1AAB6D' },
          handler: async (resp) => {
            try {
              await apiFetch(`/subscriptions/invoices/${invoice.id}/verify-payment`, {
                method: 'POST', headers: authHeaders,
                body: JSON.stringify({ razorpayOrderId: orderId, razorpayPaymentId: resp.razorpay_payment_id, razorpaySignature: resp.razorpay_signature }),
              });
              showToast('Payment successful!'); load(); resolve();
            } catch (e) { reject(e); }
          },
          modal: { ondismiss: () => reject(new Error('CANCELLED')) },
        });
        rzp.open();
      });
    } catch (e) {
      if (e.message === 'CANCELLED') showToast('Payment cancelled', 'error');
      else showToast(e.message, 'error');
    } finally {
      setPayingInvoice(null);
    }
  };

  const switchPlan = async (plan) => {
    setSwitchingPlan(plan.id);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) { showToast('Could not load payment gateway', 'error'); return; }
      const hasActiveSub = subscription && ['active', 'trial', 'grace'].includes(subscription.status);
      const endpoint = hasActiveSub ? '/subscriptions/switch' : '/subscriptions/subscribe';
      const orderRes = await apiFetch(endpoint, {
        method: 'POST', headers: authHeaders, body: JSON.stringify({ planId: plan.id }),
      });
      const orderData = orderRes.data || orderRes;
      if (!orderData.orderId) {
        showToast(orderData.immediate === false ? `Plan switch queued — activates at cycle end` : `Switched to ${plan.name}!`);
        load(); return;
      }
      await new Promise((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: 'rzp_test_SkWqLfKhGtXy4U', amount: orderData.amount, currency: 'INR', order_id: orderData.orderId,
          name: 'Locsho', description: `Subscribe to ${plan.name}`,
          prefill: { contact: partner?.phone }, theme: { color: '#1AAB6D' },
          handler: async (resp) => {
            try {
              await apiFetch('/subscriptions/verify-payment', {
                method: 'POST', headers: authHeaders,
                body: JSON.stringify({ razorpayOrderId: orderData.orderId, razorpayPaymentId: resp.razorpay_payment_id, razorpaySignature: resp.razorpay_signature }),
              });
              showToast(`Switched to ${plan.name}!`); load(); resolve();
            } catch (e) { reject(e); }
          },
          modal: { ondismiss: () => reject(new Error('CANCELLED')) },
        });
        rzp.open();
      });
    } catch (e) {
      if (e.message === 'CANCELLED') showToast('Payment cancelled', 'error');
      else showToast(e.message || 'Payment failed', 'error');
    } finally {
      setSwitchingPlan(null);
    }
  };

  // ── Derived values ────────────────────────────────────────────────────────
  const sub = subscription;
  const shopName = partner?.shop?.name || partner?.shopName || partner?.name || 'Your Shop';
  const planName = sub?.plan?.name || 'Free';
  const endDate = sub?.endDate || sub?.expiresAt;
  const daysLeft = getDaysRemaining(endDate);
  const isInGrace = sub?.status === 'grace';
  const graceDaysLeft = isInGrace ? getGraceDaysLeft(endDate, sub?.gracePeriodDays) : 0;

  const totalUsage = usageList.length > 0 ? usageList.reduce(
    (acc, u) => ({
      ordersUsed: acc.ordersUsed + (u.ordersUsed || 0),
      completedOrders: acc.completedOrders + (u.completedOrders || 0),
      topupOrdersUsed: acc.topupOrdersUsed + (u.topupOrdersUsed || 0),
      overageOrders: acc.overageOrders + (u.overageOrders || 0),
      overageAmount: acc.overageAmount + (u.overageAmount || 0),
      commissionAmount: acc.commissionAmount + (u.commissionAmount || 0),
    }),
    { ordersUsed: 0, completedOrders: 0, topupOrdersUsed: 0, overageOrders: 0, overageAmount: 0, commissionAmount: 0 }
  ) : null;

  const orderQuota = sub?.orderQuota || 0;
  const completedOrders = totalUsage?.completedOrders || 0;
  const orderProgress = orderQuota > 0 ? Math.min(100, Math.round((completedOrders / orderQuota) * 100)) : 0;
  const isUnlimited = !orderQuota;

  const unpaidInvoices = invoices.filter(i => i.status === 'sent' || i.status === 'overdue' || i.status === 'pending');
  const isSuspendedWithDebt = !sub && unpaidInvoices.length > 0;

  const statusMeta = {
    active:    { label: 'Active',    dot: 'bg-emerald-400', pill: 'bg-emerald-50 text-emerald-700' },
    trial:     { label: 'Trial',     dot: 'bg-amber-400',   pill: 'bg-amber-50 text-amber-700' },
    grace:     { label: 'Grace',     dot: 'bg-orange-400',  pill: 'bg-orange-50 text-orange-700' },
    expired:   { label: 'Expired',   dot: 'bg-red-400',     pill: 'bg-red-50 text-red-600' },
    cancelled: { label: 'Cancelled', dot: 'bg-gray-300',    pill: 'bg-gray-100 text-gray-500' },
  };
  const sm = statusMeta[sub?.status] || { label: 'Free Plan', dot: 'bg-[#1AAB6D]', pill: 'bg-[#E8F5EE] text-[#1AAB6D]' };

  const tabs = [
    { id: 'plan',     label: 'My Plan',  icon: Zap },
    { id: 'usage',    label: 'Usage',    icon: TrendingUp },
    { id: 'invoices', label: 'Invoices', icon: FileText, badge: unpaidInvoices.length },
  ];

  return (
    <div className="w-full">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.95 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold flex items-center gap-2.5 whitespace-nowrap ${toast.type === 'success' ? 'bg-[#1A1A2E] text-white' : 'bg-red-500 text-white'}`}
          >
            {toast.type === 'success' ? <Check size={15} strokeWidth={3} /> : <AlertCircle size={15} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F5EE] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#1AAB6D]" size={24} />
          </div>
          <p className="text-sm text-gray-400 font-semibold">Loading your subscription...</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <div className="w-full lg:w-72 shrink-0 space-y-4">

            {/* Shop card with gradient hero */}
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
              {/* Green gradient top */}
              <div className="bg-gradient-to-br from-[#1AAB6D] to-[#0d8a54] px-6 pt-6 pb-8 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full bg-white/10" />
                <div className="relative">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-3 border border-white/30">
                    <Store size={24} className="text-white" />
                  </div>
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-0.5">Welcome back</p>
                  <p className="font-black text-white text-xl leading-tight truncate">{shopName}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/20 text-white`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
                      {sm.label}
                    </span>
                    <span className="text-white/60 text-[10px] font-semibold">{planName} Plan</span>
                  </div>
                </div>
              </div>

              {/* Stats rows */}
              <div className="px-5 py-4 space-y-3">
                {[
                  { label: 'Price', value: sub?.plan?.price === undefined ? 'Free' : sub.plan.price === 0 ? 'Free' : sub.billingType === 'postpaid' ? `₹${sub.plan.perOrderFee || '—'}/order` : `₹${sub.plan.price}/mo` },
                  { label: 'Commission', value: sub?.commissionRate !== undefined ? `${sub.commissionRate}%` : 'Varies by plan' },
                  { label: endDate ? (sub?.status === 'trial' ? 'Trial ends' : isInGrace ? 'Grace ends' : 'Renews') : 'Billing', value: endDate ? new Date(endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No active plan' },
                  { label: 'Orders quota', value: sub?.orderQuota ? `${sub.orderQuota}/cycle` : sub ? 'Unlimited' : '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
                    <span className="text-xs font-black text-[#1A1A2E]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-50" />

              <div className="p-4 space-y-2">
                <button
                  onClick={() => setTab('plan')}
                  className="w-full h-11 rounded-2xl bg-[#1AAB6D] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#158f5a] transition-all"
                >
                  <Star size={13} strokeWidth={2.5} /> Upgrade Plan
                </button>
                <button
                  onClick={onLogout}
                  className="w-full h-10 rounded-2xl border border-gray-100 text-gray-400 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-red-200 hover:text-red-500 transition-all"
                >
                  <LogOut size={13} /> Logout
                </button>
              </div>
            </div>

            {/* Top-up packs */}
            {topUpPacks.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Zap size={11} className="text-amber-500" /> Top-up Packs
                </p>
                <div className="space-y-2">
                  {topUpPacks.map(pack => (
                    <div key={pack.id} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-[#F0FBF5] transition-colors">
                      <div>
                        <p className="text-xs font-black text-[#1A1A2E] leading-none">{pack.name}</p>
                        <p className="text-[10px] font-semibold text-gray-400 mt-0.5">{pack.orderCount} orders</p>
                      </div>
                      <span className="text-sm font-black text-[#1AAB6D]">₹{pack.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Why upgrade hint — only when no active paid plan */}
            {!sub?.plan?.price && (
              <div className="bg-[#1A1A2E] rounded-3xl p-5 space-y-3">
                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Why upgrade?</p>
                {[
                  { icon: TrendingUp, text: 'Handle more orders per cycle' },
                  { icon: IndianRupee, text: 'Lower commission on each order' },
                  { icon: Zap,        text: 'Priority support & analytics' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon size={13} className="text-[#1AAB6D]" />
                    </div>
                    <p className="text-xs font-semibold text-white/70 leading-tight">{text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Main panel ────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Banners */}
            {isSuspendedWithDebt && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-red-700">Your shop is not visible to customers</p>
                  <p className="text-xs text-red-500 font-medium mt-0.5">Subscription expired and grace period ended. Pay your outstanding invoice to restore your shop.</p>
                </div>
                {unpaidInvoices[0] && (
                  <button
                    onClick={() => payInvoice(unpaidInvoices[0])}
                    disabled={!!payingInvoice}
                    className="shrink-0 px-3 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-1.5 hover:bg-red-700 transition-all"
                  >
                    {payingInvoice ? <Loader2 size={12} className="animate-spin" /> : 'Pay Now'}
                  </button>
                )}
              </div>
            )}

            {isInGrace && unpaidInvoices.length > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-amber-800">Payment Due — {graceDaysLeft} day{graceDaysLeft !== 1 ? 's' : ''} left</p>
                    <p className="text-xs text-amber-600 font-medium mt-0.5">Pay your invoice to keep your shop visible to customers.</p>
                  </div>
                  {unpaidInvoices[0] && (
                    <button
                      onClick={() => payInvoice(unpaidInvoices[0])}
                      disabled={!!payingInvoice}
                      className="shrink-0 px-3 py-2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-1.5 hover:bg-amber-600 transition-all"
                    >
                      {payingInvoice ? <Loader2 size={12} className="animate-spin" /> : 'Pay Now'}
                    </button>
                  )}
                </div>
                <div className="h-1.5 bg-amber-200 rounded-full overflow-hidden">
                  <div className="h-1.5 bg-amber-500 rounded-full transition-all" style={{ width: `${Math.max(5, (graceDaysLeft / (sub?.gracePeriodDays ?? 7)) * 100)}%` }} />
                </div>
              </div>
            )}

            {unpaidInvoices.length > 0 && !isInGrace && !isSuspendedWithDebt && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3">
                <AlertCircle size={16} className="text-amber-500 shrink-0" />
                <p className="text-sm font-semibold text-amber-700 flex-1">You have {unpaidInvoices.length} unpaid invoice{unpaidInvoices.length > 1 ? 's' : ''}. Pay to continue uninterrupted.</p>
                <button onClick={() => setTab('invoices')} className="shrink-0 text-xs font-black text-amber-700 underline hover:no-underline">View</button>
              </div>
            )}

            {/* Key stats grid — always visible */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: 'Days Left',
                  value: daysLeft !== null ? daysLeft : '—',
                  sub: endDate ? `until ${new Date(endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : 'no active plan',
                  color: daysLeft !== null && daysLeft <= 7 ? 'text-red-600' : 'text-[#1A1A2E]',
                  icon: Calendar,
                },
                {
                  label: 'Orders',
                  value: sub ? (isUnlimited ? completedOrders : `${completedOrders}/${orderQuota}`) : '—',
                  sub: sub ? (isUnlimited ? 'unlimited quota' : `${orderProgress}% used`) : 'subscribe to track',
                  color: orderProgress >= 90 ? 'text-red-600' : 'text-[#1A1A2E]',
                  icon: TrendingUp,
                  progress: sub && !isUnlimited ? orderProgress : null,
                  progressColor: orderProgress >= 90 ? 'bg-red-400' : 'bg-[#1AAB6D]',
                },
                {
                  label: 'Commission',
                  value: sub?.commissionRate !== undefined ? `${sub.commissionRate}%` : '—',
                  sub: sub ? 'per completed order' : 'varies by plan',
                  color: 'text-[#1A1A2E]',
                  icon: IndianRupee,
                },
                {
                  label: 'Current Bill',
                  value: totalUsage ? `₹${totalUsage.commissionAmount.toFixed(0)}` : '₹0',
                  sub: 'this billing cycle',
                  color: 'text-[#1AAB6D]',
                  icon: CreditCard,
                },
              ].map(({ label, value, sub: subtext, color, icon: Icon, progress, progressColor }) => (
                <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon size={12} className="text-gray-300" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
                  </div>
                  <p className={`text-xl font-black leading-none mb-1 ${color}`}>{value}</p>
                  <p className="text-[10px] font-semibold text-gray-400 leading-tight">{subtext}</p>
                  {progress !== null && progress !== undefined && (
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                      <div className={`h-1 rounded-full transition-all ${progressColor}`} style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5">
              {tabs.map(({ id, label, icon: Icon, badge }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl text-xs font-black uppercase tracking-tight transition-all relative border ${
                    tab === id
                      ? 'bg-white border-gray-200 text-[#1AAB6D] shadow-sm'
                      : 'bg-white/60 border-transparent text-gray-400 hover:text-gray-600 hover:bg-white/80'
                  }`}
                >
                  <Icon size={13} strokeWidth={tab === id ? 2.5 : 2} />
                  <span className="hidden sm:inline">{label}</span>
                  {badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center shadow">
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                {/* ── My Plan ── */}
                {tab === 'plan' && (
                  <>
                    {errors.subscription && <ErrorCard message={errors.subscription} onRetry={load} />}

                    {/* Current plan compact banner */}
                    <div className={`rounded-2xl p-4 flex items-center justify-between gap-4 border ${sub ? 'bg-[#F0FBF5] border-[#1AAB6D]/20' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sub ? 'bg-[#1AAB6D]' : 'bg-gray-200'}`}>
                          <Zap size={18} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Plan</p>
                          <p className="font-black text-[#1A1A2E] text-base leading-none">{planName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-[#1A1A2E]">
                          {sub?.plan?.price === 0 || !sub ? 'Free' : `₹${sub.plan.price}`}
                        </p>
                        {sub?.plan?.price > 0 && <p className="text-[10px] font-semibold text-gray-400">/month</p>}
                      </div>
                    </div>

                    {/* Current plan features if on paid plan */}
                    {sub?.plan?.features && (
                      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">What&apos;s included</p>
                        <ul className="grid grid-cols-2 gap-2.5">
                          {(Array.isArray(sub.plan.features)
                            ? sub.plan.features
                            : Object.entries(sub.plan.features).map(([k, v]) => `${k}: ${v === -1 ? 'Unlimited' : v}`)
                          ).map((f, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-semibold text-[#1A1A2E]">
                              <span className="w-4 h-4 bg-[#E8F5EE] rounded-full flex items-center justify-center shrink-0">
                                <Check size={9} className="text-[#1AAB6D]" strokeWidth={3} />
                              </span>
                              {typeof f === 'string' ? f : JSON.stringify(f)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Usage summary if available */}
                    {totalUsage && (
                      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">This cycle usage</p>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: 'Completed', value: totalUsage.completedOrders },
                            { label: 'Top-up',    value: totalUsage.topupOrdersUsed },
                            { label: 'Overage',   value: totalUsage.overageOrders, warn: totalUsage.overageOrders > 0 },
                          ].map(({ label, value, warn }) => (
                            <div key={label} className="text-center p-3 bg-gray-50 rounded-xl">
                              <p className={`text-xl font-black ${warn ? 'text-red-500' : 'text-[#1A1A2E]'}`}>{value}</p>
                              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight mt-0.5">{label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Available plans section */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-black text-[#1A1A2E] uppercase tracking-tight">
                          {sub ? 'Switch Plan' : 'Choose a Plan'}
                        </p>
                        {errors.plans && <span className="text-xs text-red-500 font-semibold">{errors.plans}</span>}
                      </div>
                      {plans.length === 0 && !errors.plans ? (
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
                          <Loader2 size={18} className="animate-spin text-gray-300 mx-auto mb-2" />
                          <p className="text-xs text-gray-400 font-semibold">Loading plans...</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {plans.map((plan, idx) => {
                            const isCurrent = (sub?.planId ?? sub?.plan?.id) === plan.id;
                            const isPopular = plan.isPopular || idx === 1;
                            return (
                              <div
                                key={plan.id}
                                className={`rounded-2xl overflow-hidden border-2 flex flex-col ${isCurrent ? 'border-[#1AAB6D]' : isPopular ? 'border-[#1A1A2E]' : 'border-gray-100'}`}
                              >
                                {/* Card header */}
                                <div className={`px-4 py-4 ${isCurrent ? 'bg-[#F0FBF5]' : isPopular ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}>
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <div>
                                      <p className={`text-xs font-black uppercase tracking-tight ${isPopular && !isCurrent ? 'text-white' : 'text-[#1A1A2E]'}`}>{plan.name}</p>
                                      {isPopular && !isCurrent && <span className="text-[8px] font-black uppercase tracking-widest text-[#1AAB6D]">★ Popular</span>}
                                      {isCurrent && <span className="text-[8px] font-black uppercase tracking-widest text-[#1AAB6D]">● Current</span>}
                                    </div>
                                    <div className="text-right">
                                      <p className={`text-lg font-black leading-none ${isPopular && !isCurrent ? 'text-white' : 'text-[#1A1A2E]'}`}>{formatPrice(plan.price)}</p>
                                      {plan.price > 0 && <p className={`text-[9px] font-semibold ${isPopular && !isCurrent ? 'text-white/40' : 'text-gray-400'}`}>/mo</p>}
                                    </div>
                                  </div>
                                  {/* Key specs */}
                                  <div className={`space-y-1 text-[10px] font-semibold ${isPopular && !isCurrent ? 'text-white/60' : 'text-gray-500'}`}>
                                    <p>📦 {plan.orderQuota ? `${plan.orderQuota} orders` : 'Unlimited orders'}</p>
                                    {plan.commissionRate !== undefined && <p>💸 {plan.commissionRate}% commission</p>}
                                    {plan.validityDays && <p>📅 {plan.validityDays} days validity</p>}
                                  </div>
                                </div>
                                {/* CTA */}
                                <div className="bg-white p-3 mt-auto">
                                  {isCurrent ? (
                                    <div className="w-full h-9 bg-[#E8F5EE] text-[#1AAB6D] font-black rounded-xl flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest">
                                      <Check size={11} strokeWidth={3} /> Active
                                    </div>
                                  ) : (
                                    <button
                                      className={`w-full h-9 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 ${isPopular ? 'bg-[#1AAB6D] text-white hover:bg-[#158f5a]' : 'border-2 border-[#1AAB6D] text-[#1AAB6D] hover:bg-[#1AAB6D]/5'}`}
                                      onClick={() => switchPlan(plan)}
                                      disabled={!!switchingPlan}
                                    >
                                      {switchingPlan === plan.id ? <Loader2 size={11} className="animate-spin" /> : <ArrowRight size={11} />}
                                      {plan.price === 0 ? 'Use Free' : 'Subscribe'}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* ── Usage ── */}
                {tab === 'usage' && (
                  <>
                    {errors.usage ? <ErrorCard message={errors.usage} onRetry={load} /> :
                    totalUsage ? (
                      <>
                        {/* Orders progress */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-black text-[#1A1A2E] uppercase tracking-tight">Orders Completed</p>
                            <p className="text-sm font-semibold">
                              <span className={`font-black text-lg ${orderProgress >= 90 ? 'text-red-500' : 'text-[#1AAB6D]'}`}>{completedOrders}</span>
                              {!isUnlimited && <span className="text-gray-300"> / {orderQuota}</span>}
                              {isUnlimited && <span className="text-gray-300"> / ∞</span>}
                            </p>
                          </div>
                          {!isUnlimited && (
                            <>
                              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }} animate={{ width: `${orderProgress}%` }} transition={{ duration: 0.7, ease: 'easeOut' }}
                                  className={`h-full rounded-full ${orderProgress >= 90 ? 'bg-red-400' : 'bg-[#1AAB6D]'}`}
                                />
                              </div>
                              <p className={`text-[10px] font-semibold mt-1.5 ${orderProgress >= 90 ? 'text-red-400' : 'text-gray-400'}`}>{orderProgress}% of quota used</p>
                            </>
                          )}
                          <p className="text-[10px] font-semibold text-gray-400 mt-1">Only delivered / picked-up orders count toward billing</p>
                        </div>

                        {/* Detailed breakdown */}
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Top-up Orders', value: totalUsage.topupOrdersUsed, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
                            { label: 'Overage Orders', value: totalUsage.overageOrders, icon: AlertCircle, color: totalUsage.overageOrders > 0 ? 'text-red-600' : 'text-gray-500', bg: totalUsage.overageOrders > 0 ? 'bg-red-50' : 'bg-gray-50' },
                            { label: 'Overage Amount', value: `₹${totalUsage.overageAmount.toFixed(0)}`, icon: IndianRupee, color: 'text-[#1A1A2E]', bg: 'bg-gray-50' },
                            { label: 'Commission Due', value: `₹${totalUsage.commissionAmount.toFixed(0)}`, icon: CreditCard, color: 'text-[#1AAB6D]', bg: 'bg-[#E8F5EE]' },
                          ].map(({ label, value, icon: Icon, color, bg }) => (
                            <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                                <Icon size={15} className={color} />
                              </div>
                              <div>
                                <p className={`text-lg font-black ${color}`}>{value}</p>
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight leading-tight">{label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <EmptyState icon="📊" title="No usage data yet" subtitle="Usage appears once orders start coming in" />
                    )}
                  </>
                )}

                {/* ── Invoices ── */}
                {tab === 'invoices' && (
                  <>
                    {errors.invoices ? <ErrorCard message={errors.invoices} onRetry={load} /> :
                    invoices.length === 0 ? (
                      <EmptyState icon="🧾" title="No invoices yet" subtitle="Your billing history will appear here" />
                    ) : invoices.map(inv => {
                      const isPending = inv.status === 'sent' || inv.status === 'pending';
                      const isOverdue = inv.status === 'overdue';
                      const amount = inv.total ?? inv.amount;
                      return (
                        <div key={inv.id} className={`bg-white border rounded-2xl p-5 shadow-sm ${isOverdue ? 'border-red-100' : 'border-gray-100'}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${inv.status === 'paid' ? 'bg-[#E8F5EE]' : isOverdue ? 'bg-red-50' : 'bg-amber-50'}`}>
                                <FileText size={15} className={inv.status === 'paid' ? 'text-[#1AAB6D]' : isOverdue ? 'text-red-500' : 'text-amber-500'} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-black text-[#1A1A2E]">
                                  {inv.invoiceNumber ? `#${inv.invoiceNumber}` : `Invoice ${inv.id?.slice(-8).toUpperCase()}`}
                                </p>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">
                                  {inv.billingPeriodStart && inv.billingPeriodEnd
                                    ? `${fmtDate(inv.billingPeriodStart)} – ${fmtDate(inv.billingPeriodEnd)}`
                                    : fmtDate(inv.createdAt || inv.date)}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <p className="text-lg font-black text-[#1A1A2E]">₹{amount}</p>
                              <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full ${
                                inv.status === 'paid' ? 'bg-[#E8F5EE] text-[#1AAB6D]' :
                                isOverdue ? 'bg-red-50 text-red-600' :
                                'bg-amber-50 text-amber-600'
                              }`}>{inv.status}</span>
                            </div>
                          </div>
                          {(isPending || isOverdue) && (
                            <button
                              className="mt-4 w-full h-11 rounded-xl bg-[#1AAB6D] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#158f5a] transition-all disabled:opacity-50"
                              onClick={() => payInvoice(inv)}
                              disabled={payingInvoice === inv.id}
                            >
                              {payingInvoice === inv.id ? <Loader2 size={13} className="animate-spin" /> : <IndianRupee size={13} />}
                              Pay ₹{amount}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function ErrorCard({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-center gap-3">
      <AlertCircle size={18} className="text-red-400 shrink-0" />
      <p className="text-sm font-semibold text-red-600 flex-1">{message}</p>
      <button onClick={onRetry} className="shrink-0 text-red-400 hover:text-red-600 transition-colors">
        <RefreshCw size={14} />
      </button>
    </div>
  );
}

function EmptyState({ icon, title, subtitle }) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-sm">
      <div className="w-16 h-16 bg-[#F0FBF5] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">{icon}</div>
      <p className="font-black text-[#1A1A2E] mb-1">{title}</p>
      {subtitle && <p className="text-sm text-gray-400 font-medium">{subtitle}</p>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PartnerLogin() {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState(null);
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('partner_portal_token');
    const savedPartner = localStorage.getItem('partner_portal_data');
    if (savedToken && savedPartner) {
      setToken(savedToken);
      try { setPartner(JSON.parse(savedPartner)); } catch {}
      setStep('dashboard');
    }
  }, []);

  const handleOTPSent = (ph) => { setPhone(ph); setStep('otp'); };

  const handleLoginSuccess = (tok, p) => {
    setToken(tok); setPartner(p);
    localStorage.setItem('partner_portal_token', tok);
    localStorage.setItem('partner_portal_data', JSON.stringify(p));
    setStep('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('partner_portal_token');
    localStorage.removeItem('partner_portal_data');
    setToken(null); setPartner(null); setPhone('');
    setStep('phone');
  };

  return (
    <div className="min-h-screen bg-[#F0FBF5] pt-16">
      {step === 'dashboard' ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="px-6 py-8">
          <Dashboard token={token} partner={partner} onLogout={handleLogout} />
        </motion.div>
      ) : (
      <div className="flex items-start justify-center px-4 py-12 min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center">

            {/* Left branding */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden lg:block">
              <Link to="/partner" className="flex items-center gap-2.5 mb-10">
                <img src="/logo.png" alt="Locsho" className="w-8 h-8 rounded-lg" />
                <span className="font-black text-xl text-[#1A1A2E]">Loc<span className="text-[#1AAB6D]">sho</span></span>
              </Link>
              <Badge color="green" className="mb-6">Partner Subscription Portal</Badge>
              <h2 className="text-4xl font-black text-[#1A1A2E] tracking-tight leading-tight mb-6 uppercase">
                Manage your<br />
                <span className="text-[#1AAB6D]">subscription</span><br />
                from anywhere
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed font-medium mb-10">
                View your current plan, track usage, pay invoices, and upgrade — all without opening the app.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: 'View your current plan and status' },
                  { icon: TrendingUp, text: 'Monitor order & product usage' },
                  { icon: FileText, text: 'Download and pay invoices' },
                  { icon: CreditCard, text: 'Upgrade or switch plans instantly' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#E8F5EE] rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-[#1AAB6D]" />
                    </div>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right auth card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card hover={false} className="border border-gray-100 shadow-xl rounded-[2.5rem] p-8 md:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.18 }}
                  >
                    {step === 'phone' && <PhoneStep onSuccess={handleOTPSent} />}
                    {step === 'otp' && <OTPStep phone={phone} onSuccess={handleLoginSuccess} onBack={() => setStep('phone')} />}
                  </motion.div>
                </AnimatePresence>
              </Card>
            </motion.div>

          </div>
      </div>
      )}
    </div>
  );
}
