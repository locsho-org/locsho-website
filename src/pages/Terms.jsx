import { useEffect } from 'react';
import { FileText, Mail, Phone, Building } from 'lucide-react';
import Footer from '../components/Footer';

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms & Conditions — LocSho';
  }, []);

  return (
    <div className="bg-[#F8FAF9] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-16">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1AAB6D] to-[#148A57] p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 border border-white/20">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white">Terms and Conditions</h1>
              <p className="text-white/70 text-xs font-bold">LocSho · Effective: 15th April 2026</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">1. Acceptance</h2>
            <p>By downloading, installing, accessing, or using LocSho User App or LocSho Partner App, the user or partner agrees to these Terms and Conditions.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">2. Services</h2>
            <p>LocSho provides a technology platform that helps users discover shops, place orders, and track fulfillment, and helps partners onboard stores, list products, manage pricing, and fulfill customer orders. LocSho may modify, suspend, or update features from time to time.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">3. Eligibility</h2>
            <p>Users must be legally capable of entering into a binding agreement. Partners must have the legal authority to register the business and provide valid business, tax, and KYC information where required.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">4. Accounts</h2>
            <p>Users and partners are responsible for maintaining the confidentiality of account credentials and for all activity under their accounts. False, misleading, or incomplete registration information may result in suspension or termination.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">5. Orders and Fulfillment</h2>
            <p>All orders are subject to acceptance, availability, serviceability, pricing accuracy, and operational constraints. Delivery estimates are indicative and may vary. Shops are responsible for the accuracy of catalog, pricing, tax, and availability information they publish.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">6. Payments</h2>
            <p>Payments may be processed through third-party payment providers. LocSho may facilitate payment collection, QR-based payment flows, settlements, charges, commissions, packaging fees, and other fees as applicable. Final payment handling may be subject to additional partner agreements and payment processor terms.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">7. Partner Responsibilities</h2>
            <p className="mb-2">Partners agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Provide true and valid shop, owner information.</li>
              <li>Maintain accurate pricing, product listings, and operating hours.</li>
              <li>Fulfill accepted orders in a timely and lawful manner.</li>
              <li>Comply with all product, food, pharmacy, tax, consumer protection, and local business laws applicable to their category.</li>
              <li>Avoid listing prohibited, counterfeit, restricted, or unlawful goods.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">8. User Responsibilities</h2>
            <p className="mb-2">Users agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Provide accurate delivery and contact information.</li>
              <li>Use the platform lawfully.</li>
              <li>Not abuse payment systems, offers, refunds, or OTP/authentication processes.</li>
              <li>Not place fraudulent or malicious orders.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">9. Suspensions and Termination</h2>
            <p>LocSho may suspend, restrict, or terminate access to either app for fraud risk, policy violations, failed verification, legal concerns, abuse, unpaid dues, or other legitimate operational reasons.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">10. Refunds, Cancellations, and Disputes</h2>
            <p>Refunds, returns, and cancellations may depend on the order stage, merchant category, product nature, and applicable law. Perishable, medical, regulated, or customized products may have special restrictions. Disputes should be raised through support within the specified period.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">11. Intellectual Property</h2>
            <p>All app content, branding, software, workflows, text, graphics, and platform elements belong to LocSho or its licensors, except merchant-uploaded or user-submitted content as applicable.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">12. Third-Party Services</h2>
            <p>LocSho may rely on third-party providers including payments, maps, messaging, hosting, analytics, and AI tools. Availability and performance of such services may affect app functionality.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">13. Disclaimer</h2>
            <p>Services are provided on an "as is" and "as available" basis, to the extent permitted by law. LocSho does not guarantee uninterrupted availability, exact delivery times, or error-free operation.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">14. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, LocSho is not liable for indirect, incidental, special, consequential, or punitive damages arising from the use of the apps or platform, subject to non-excludable legal rights.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">15. Indemnity</h2>
            <p>Users and partners agree to indemnify and hold harmless LocSho from claims arising from their misuse of the platform, policy violations, unlawful conduct, or breach of these terms.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">16. Governing Law</h2>
            <p>These Terms are governed by the laws of India, and disputes will be subject to the courts located in Greater Noida / Gautam Buddh Nagar, Uttar Pradesh, unless otherwise required by applicable law.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">17. Contact</h2>
            <div className="bg-gray-900 rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Building size={16} className="text-[#1AAB6D]" />
                <span className="text-sm font-bold">Folwork Private Limited</span>
              </div>
              <div className="space-y-2">
                <a href="mailto:ajai@folwork.co" className="flex items-center gap-2 text-xs text-white/80 hover:text-white">
                  <Mail size={12} className="text-[#1AAB6D]" /> ajai@folwork.co
                </a>
                <a href="tel:+919891773891" className="flex items-center gap-2 text-xs text-white/80 hover:text-white">
                  <Phone size={12} className="text-emerald-400" /> +91 98917 73891
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
