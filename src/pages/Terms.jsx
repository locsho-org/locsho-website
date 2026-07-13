import { useEffect } from 'react';
import { FileText } from 'lucide-react';
import Footer from '../components/Footer';

const sections = [
  { h: '1. Acceptance', p: 'By downloading, installing, accessing, or using LocSho User App or LocSho Partner App, the user or partner agrees to these Terms and Conditions.' },
  { h: '2. Services', p: 'LocSho provides a technology platform that helps users discover shops, place orders, and track fulfillment, and helps partners onboard stores, list products, manage pricing, and fulfill customer orders. LocSho may modify, suspend, or update features from time to time.' },
  { h: '3. Eligibility', p: 'Users must be legally capable of entering into a binding agreement. Partners must have the legal authority to register the business and provide valid business, tax, and KYC information where required.' },
  { h: '4. Accounts', p: 'Users and partners are responsible for maintaining the confidentiality of account credentials and for all activity under their accounts. False, misleading, or incomplete registration information may result in suspension or termination.' },
  { h: '5. Orders and Fulfillment', p: 'All orders are subject to acceptance, availability, serviceability, pricing accuracy, and operational constraints. Delivery estimates are indicative and may vary. Shops are responsible for the accuracy of catalog, pricing, tax, and availability information they publish.' },
  { h: '6. Payments', p: 'Payments may be processed through third-party payment providers. LocSho may facilitate payment collection, QR-based payment flows, settlements, charges, commissions, packaging fees, and other fees as applicable. Final payment handling may be subject to additional partner agreements and payment processor terms.' },
  { h: '7. Partner Responsibilities', p: 'Partners agree to:', list: [
    'Provide true and valid shop, owner information.',
    'Maintain accurate pricing, product listings, and operating hours.',
    'Fulfill accepted orders in a timely and lawful manner.',
    'Comply with all product, food, pharmacy, tax, consumer protection, and local business laws applicable to their category.',
    'Avoid listing prohibited, counterfeit, restricted, or unlawful goods.',
  ] },
  { h: '8. User Responsibilities', p: 'Users agree to:', list: [
    'Provide accurate delivery and contact information.',
    'Use the platform lawfully.',
    'Not abuse payment systems, offers, refunds, or OTP/authentication processes.',
    'Not place fraudulent or malicious orders.',
  ] },
  { h: '9. Suspensions and Termination', p: 'LocSho may suspend, restrict, or terminate access to either app for fraud risk, policy violations, failed verification, legal concerns, abuse, unpaid dues, or other legitimate operational reasons.' },
  { h: '10. Refunds, Cancellations, and Disputes', p: 'Refunds, returns, and cancellations may depend on the order stage, merchant category, product nature, and applicable law. Perishable, medical, regulated, or customized products may have special restrictions. Disputes should be raised through support within the specified period.' },
  { h: '11. Intellectual Property', p: 'All app content, branding, software, workflows, text, graphics, and platform elements belong to LocSho or its licensors, except merchant-uploaded or user-submitted content as applicable.' },
  { h: '12. Third-Party Services', p: 'LocSho may rely on third-party providers including payments, maps, messaging, hosting, analytics, and AI tools. Availability and performance of such services may affect app functionality.' },
  { h: '13. Disclaimer', p: 'Services are provided on an "as is" and "as available" basis, to the extent permitted by law. LocSho does not guarantee uninterrupted availability, exact delivery times, or error-free operation.' },
  { h: '14. Limitation of Liability', p: 'To the maximum extent permitted by law, LocSho is not liable for indirect, incidental, special, consequential, or punitive damages arising from the use of the apps or platform, subject to non-excludable legal rights.' },
  { h: '15. Indemnity', p: 'Users and partners agree to indemnify and hold harmless LocSho from claims arising from their misuse of the platform, policy violations, unlawful conduct, or breach of these terms.' },
  { h: '16. Governing Law', p: 'These Terms are governed by the laws of India, and disputes will be subject to the courts located in Greater Noida / Gautam Buddh Nagar, Uttar Pradesh, unless otherwise required by applicable law.' },
];

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms & Conditions — LocSho';
  }, []);

  return (
    <div className="bg-[#F8FAF9] min-h-screen">
      {/* Hero band — full width */}
      <div className="bg-white border-b border-gray-100 pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F5EE] text-[#1AAB6D] text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
            <FileText size={12} strokeWidth={2.5} /> Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] tracking-tight mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">LocSho · Effective 15th April 2026</p>
        </div>
      </div>

      {/* Content — comfortable reading column */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10 space-y-8 text-[15px] text-gray-600 leading-relaxed">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-black text-[#1A1A2E] mb-2">{s.h}</h2>
              <p className={s.list ? 'mb-2' : ''}>{s.p}</p>
              {s.list && (
                <ul className="list-disc pl-5 space-y-1.5 marker:text-[#1AAB6D]">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </section>
          ))}

        </div>
      </div>

      <Footer />
    </div>
  );
}
