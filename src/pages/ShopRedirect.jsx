import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const IOS_STORE = 'https://apps.apple.com/in/app/locsho/id6771481950';
const ANDROID_STORE = 'https://play.google.com/store/apps/details?id=in.locsho.user';

const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = () => /Android/i.test(navigator.userAgent);

const appleIcon = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const googleIcon = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
    <path d="M3.18 23.76c.3.17.65.19.97.07l12.09-6.97-2.64-2.64-10.42 9.54zm-1.15-21.3c-.05.17-.08.35-.08.54v18c0 .19.03.37.08.54l9.86-9.86-9.86-9.22zm19.55 8.53l-2.86-1.65-2.95 2.69 2.95 2.98 2.88-1.66c.82-.47.82-1.88-.02-2.36zm-17.22 11.36l10.41-9.54-2.64-2.64-7.77 12.18z" />
  </svg>
);

export default function ShopRedirect() {
  const { shopId } = useParams();

  // Try to open the app via custom scheme on page load.
  // If the app is installed this opens it; if not, nothing happens
  // and the user sees the download buttons below.
  useEffect(() => {
    const scheme = `locsho://shop/${shopId}`;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = scheme;
    document.body.appendChild(iframe);
    setTimeout(() => document.body.removeChild(iframe), 2000);
  }, [shopId]);

  const storeUrl = isIOS() ? IOS_STORE : ANDROID_STORE;
  const showBothStores = !isIOS() && !isAndroid();

  return (
    <main className="min-h-screen bg-[#F0FBF5] flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-sm text-center"
      >
        {/* App icon */}
        <div className="w-20 h-20 bg-[#1AAB6D] rounded-[24px] flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-[#1AAB6D]/30">
          🛍️
        </div>

        <h1 className="text-2xl font-black text-[#1A1A2E] mb-2">Open in Locsho</h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          This shop is on the Locsho app. Download to browse products, place orders, and get same-day delivery.
        </p>

        {/* Single store CTA (mobile) */}
        {!showBothStores && (
          <motion.a
            href={storeUrl}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-3 bg-[#1A1A2E] text-white px-6 py-4 rounded-2xl font-bold text-base shadow-lg mb-4"
          >
            {isIOS() ? appleIcon : googleIcon}
            {isIOS() ? 'Download on the App Store' : 'Get it on Google Play'}
          </motion.a>
        )}

        {/* Both store CTAs (desktop / unknown device) */}
        {showBothStores && (
          <div className="flex flex-col gap-3 mb-4">
            <motion.a
              href={IOS_STORE}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 bg-[#1A1A2E] text-white px-6 py-4 rounded-2xl font-bold text-base shadow-lg"
            >
              {appleIcon}
              Download on the App Store
            </motion.a>
            <motion.a
              href={ANDROID_STORE}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 bg-[#1A1A2E] text-white px-6 py-4 rounded-2xl font-bold text-base shadow-lg"
            >
              {googleIcon}
              Get it on Google Play
            </motion.a>
          </div>
        )}

        <p className="text-gray-400 text-xs">
          Already have the app?{' '}
          <a
            href={`locsho://shop/${shopId}`}
            className="text-[#1AAB6D] font-semibold underline underline-offset-2"
          >
            Open it now
          </a>
        </p>
      </motion.div>
    </main>
  );
}
