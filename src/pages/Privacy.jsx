import { useEffect } from 'react';
import { Shield, Mail, Phone, Building } from 'lucide-react';
import Footer from '../components/Footer';

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy — LocSho';
  }, []);

  return (
    <div className="bg-[#F8FAF9] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-16">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1AAB6D] to-[#148A57] p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 border border-white/20">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white">Privacy Policy</h1>
              <p className="text-white/70 text-xs font-bold">LocSho · Effective: 15th April 2026</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">1. Introduction</h2>
            <p>LocSho ("LocSho", "the App", "we", "us", or "our") helps customers discover nearby shops, browse products, place orders, track deliveries, and communicate with participating stores and delivery personnel.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">2. Developer Details</h2>
            <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-1.5">
              <p><strong>Developer Name:</strong> Folwork Private Limited</p>
              <p><strong>Registered Address:</strong> A-14005, 14th Avenue, Gaur City 2, Greater Noida West, 201009 Uttar Pradesh</p>
              <p><strong>Email:</strong> <a href="mailto:admin@folwork.co" className="text-[#1AAB6D] underline">admin@folwork.co</a></p>
              <p><strong>Support Contact:</strong> <a href="mailto:ajai@folwork.co" className="text-[#1AAB6D] underline">ajai@folwork.co</a></p>
              <p><strong>Website:</strong> folwork.co</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">3. Information We Collect</h2>
            <p className="mb-2">Depending on how the app is used, LocSho may collect:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Account information, such as name, mobile number, email address, and login credentials.</li>
              <li>Delivery information, such as saved addresses, geo-location, and order destination details.</li>
              <li>Order information, such as cart contents, shop selection, payment preference, order history, and delivery status.</li>
              <li>Voice input data, if the user uses voice-based cart creation or search.</li>
              <li>Device and usage information, such as device model, app version, IP address, crash logs, and app interaction events.</li>
              <li>Customer support information, such as chat messages, complaint details, and attachments shared during support cases.</li>
              <li>Payment-related information needed to process orders, although full card or UPI credentials should generally be handled by the payment service provider rather than stored directly by the app.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">4. How We Use Information</h2>
            <p className="mb-2">We may use user information to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Create and manage customer accounts.</li>
              <li>Enable login, authentication, and OTP verification.</li>
              <li>Show nearby stores and improve location-based ordering.</li>
              <li>Build carts from typed or voice-based requests.</li>
              <li>Process and manage orders, deliveries, refunds, cancellations, and support requests.</li>
              <li>Send transactional notifications such as OTPs, order updates, and delivery alerts.</li>
              <li>Improve app performance, fraud prevention, product quality, and customer experience.</li>
              <li>Comply with legal obligations and enforce platform policies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">5. Data Sharing</h2>
            <p className="mb-2">We may share relevant data only as needed with:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Shops or merchants to fulfill the customer's order.</li>
              <li>Delivery partners to complete pickup and delivery.</li>
              <li>Payment gateways or payment processors to handle transactions.</li>
              <li>Analytics, cloud hosting, communication, OTP, or customer support vendors acting on our behalf.</li>
              <li>Government or regulatory authorities where required by law.</li>
            </ul>
            <p className="mt-2">We do not sell personal data unless explicitly stated and lawfully permitted.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">6. Permissions and Sensitive Data</h2>
            <p className="mb-2">The app may request access to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Location, to show nearby stores and improve delivery accuracy.</li>
              <li>Microphone, if voice ordering or voice-based cart creation is enabled.</li>
              <li>Camera or storage/photos, if users upload support images, prescriptions, or profile content.</li>
              <li>Notifications, to send order and delivery updates.</li>
            </ul>
            <p className="mt-2">Where required, the app should show a clear in-app explanation before requesting a sensitive permission.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">7. Data Retention</h2>
            <p>We retain data only for as long as necessary to provide services, resolve disputes, prevent fraud, comply with legal obligations, and maintain business records. Retention periods may vary by data type, such as account records, order history, payment references, and support logs.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">8. Data Security</h2>
            <p>We use reasonable administrative, technical, and organizational safeguards to protect personal information, including access controls, encryption in transit where appropriate, and restricted internal access. No method of transmission or storage is fully secure, so absolute security cannot be guaranteed.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">9. User Rights</h2>
            <p className="mb-2">Subject to applicable law, users may be able to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Access or update account information.</li>
              <li>Request deletion of their account or specific data.</li>
              <li>Withdraw permissions through device settings.</li>
              <li>Contact support for privacy-related questions or complaints.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">10. Children</h2>
            <p>The app is not intended for children under the age permitted by applicable law unless specifically designed and disclosed otherwise.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">11. Third-Party Services</h2>
            <p>The app may include third-party services such as payment processors, maps, analytics tools, OTP vendors, crash reporting tools, and cloud storage providers. Their data practices may be governed by their own privacy notices.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">12. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Updated versions will be posted at the current policy URL with the revised effective date.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-gray-900 mb-2">13. Contact Us</h2>
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
                  <Phone size={12} className="text-blue-400" /> +91 98917 73891
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
