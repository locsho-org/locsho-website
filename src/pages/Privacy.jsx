import { useEffect } from 'react';
import { Shield } from 'lucide-react';
import Footer from '../components/Footer';

const sections = [
  { h: '1. Introduction', p: 'LocSho ("LocSho", "the App", "we", "us", or "our") helps customers discover nearby shops, browse products, place orders, track deliveries, and communicate with participating stores and delivery personnel.' },
  { h: '3. Information We Collect', p: 'Depending on how the app is used, LocSho may collect:', list: [
    'Account information, such as name, mobile number, email address, and login credentials.',
    'Delivery information, such as saved addresses, geo-location, and order destination details.',
    'Order information, such as cart contents, shop selection, payment preference, order history, and delivery status.',
    'Voice input data, if the user uses voice-based cart creation or search.',
    'Device and usage information, such as device model, app version, IP address, crash logs, and app interaction events.',
    'Customer support information, such as chat messages, complaint details, and attachments shared during support cases.',
    'Payment-related information needed to process orders, although full card or UPI credentials should generally be handled by the payment service provider rather than stored directly by the app.',
  ] },
  { h: '4. How We Use Information', p: 'We may use user information to:', list: [
    'Create and manage customer accounts.',
    'Enable login, authentication, and OTP verification.',
    'Show nearby stores and improve location-based ordering.',
    'Build carts from typed or voice-based requests.',
    'Process and manage orders, deliveries, refunds, cancellations, and support requests.',
    'Send transactional notifications such as OTPs, order updates, and delivery alerts.',
    'Improve app performance, fraud prevention, product quality, and customer experience.',
    'Comply with legal obligations and enforce platform policies.',
  ] },
  { h: '5. Data Sharing', p: 'We may share relevant data only as needed with:', list: [
    'Shops or merchants to fulfill the customer\'s order.',
    'Delivery partners to complete pickup and delivery.',
    'Payment gateways or payment processors to handle transactions.',
    'Analytics, cloud hosting, communication, OTP, or customer support vendors acting on our behalf.',
    'Government or regulatory authorities where required by law.',
  ], after: 'We do not sell personal data unless explicitly stated and lawfully permitted.' },
  { h: '6. Permissions and Sensitive Data', p: 'The app may request access to:', list: [
    'Location, to show nearby stores and improve delivery accuracy.',
    'Microphone, if voice ordering or voice-based cart creation is enabled.',
    'Camera or storage/photos, if users upload support images, prescriptions, or profile content.',
    'Notifications, to send order and delivery updates.',
  ], after: 'Where required, the app should show a clear in-app explanation before requesting a sensitive permission.' },
  { h: '7. Data Retention', p: 'We retain data only for as long as necessary to provide services, resolve disputes, prevent fraud, comply with legal obligations, and maintain business records. Retention periods may vary by data type, such as account records, order history, payment references, and support logs.' },
  { h: '8. Data Security', p: 'We use reasonable administrative, technical, and organizational safeguards to protect personal information, including access controls, encryption in transit where appropriate, and restricted internal access. No method of transmission or storage is fully secure, so absolute security cannot be guaranteed.' },
  { h: '9. User Rights', p: 'Subject to applicable law, users may be able to:', list: [
    'Access or update account information.',
    'Request deletion of their account or specific data.',
    'Withdraw permissions through device settings.',
    'Contact support for privacy-related questions or complaints.',
  ] },
  { h: '10. Children', p: 'The app is not intended for children under the age permitted by applicable law unless specifically designed and disclosed otherwise.' },
  { h: '11. Third-Party Services', p: 'The app may include third-party services such as payment processors, maps, analytics tools, OTP vendors, crash reporting tools, and cloud storage providers. Their data practices may be governed by their own privacy notices.' },
  { h: '12. Changes to This Policy', p: 'We may update this Privacy Policy from time to time. Updated versions will be posted at the current policy URL with the revised effective date.' },
];

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy — LocSho';
  }, []);

  return (
    <div className="bg-[#F8FAF9] min-h-screen">
      {/* Hero band — full width */}
      <div className="bg-white border-b border-gray-100 pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F5EE] text-[#1AAB6D] text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
            <Shield size={12} strokeWidth={2.5} /> Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">LocSho · Effective 15th April 2026</p>
        </div>
      </div>

      {/* Content — comfortable reading column */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10 space-y-8 text-[15px] text-gray-600 leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-lg font-black text-[#1A1A2E] mb-2">{sections[0].h}</h2>
            <p>{sections[0].p}</p>
          </section>

          {/* Developer Details (rich block) */}
          <section>
            <h2 className="text-lg font-black text-[#1A1A2E] mb-2">2. Developer Details</h2>
            <div className="bg-[#F8FAF9] rounded-xl border border-gray-100 p-4 space-y-1.5">
              <p><strong className="text-[#1A1A2E]">Developer Name:</strong> Folwork Private Limited</p>
              <p><strong className="text-[#1A1A2E]">Registered Address:</strong> A-14005, 14th Avenue, Gaur City 2, Greater Noida West, 201009 Uttar Pradesh</p>
              <p><strong className="text-[#1A1A2E]">Email:</strong> <a href="mailto:admin@folwork.co" className="text-[#1AAB6D] underline">admin@folwork.co</a></p>
              <p><strong className="text-[#1A1A2E]">Support Contact:</strong> <a href="mailto:ajai@folwork.co" className="text-[#1AAB6D] underline">ajai@folwork.co</a></p>
              <p><strong className="text-[#1A1A2E]">Website:</strong> folwork.co</p>
            </div>
          </section>

          {/* Remaining sections (3 onward) */}
          {sections.slice(1).map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-black text-[#1A1A2E] mb-2">{s.h}</h2>
              <p className={s.list ? 'mb-2' : ''}>{s.p}</p>
              {s.list && (
                <ul className="list-disc pl-5 space-y-1.5 marker:text-[#1AAB6D]">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
              {s.after && <p className="mt-2">{s.after}</p>}
            </section>
          ))}

        </div>
      </div>

      <Footer />
    </div>
  );
}
