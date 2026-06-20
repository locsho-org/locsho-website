import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Badge from '../components/ui/Badge';
import Footer from '../components/Footer';

function useCounter(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function StatItem({ stat, delay, inView }) {
  const { t } = useTranslation();
  const count = useCounter(stat.target, 1600, inView);
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <p className="text-3xl font-black text-[#1AAB6D]">{stat.format(count)}</p>
      <p className="text-gray-500 text-sm mt-1">{t(stat.labelKey)}</p>
    </motion.li>
  );
}

const appleIcon = (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);
const googleIcon = (
  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" aria-hidden="true">
    <path d="M3.18 23.76c.3.17.65.19.97.07l12.09-6.97-2.64-2.64-10.42 9.54zm-1.15-21.3c-.05.17-.08.35-.08.54v18c0 .19.03.37.08.54l9.86-9.86-9.86-9.22zm19.55 8.53l-2.86-1.65-2.95 2.69 2.95 2.98 2.88-1.66c.82-.47.82-1.88-.02-2.36zm-17.22 11.36l10.41-9.54-2.64-2.64-7.77 12.18z" />
  </svg>
);

// target: raw integer to count to; display: fn to format final/interim value
const trustStats = [
  {
    target: 48,
    labelKey: 'downloadPage.appStoreRating',
    format: (n) => (n / 10).toFixed(1) + '★',
  },
  {
    target: 50,
    labelKey: 'downloadPage.downloads',
    format: (n) => n + 'K+',
  },
  {
    target: 2000,
    labelKey: 'downloadPage.localShops',
    format: (n) => n.toLocaleString('en-IN') + '+',
  },
];

const steps = [
  { step: '01', titleKey: 'downloadPage.step1', descKey: 'downloadPage.step1Desc' },
  { step: '02', titleKey: 'downloadPage.step2', descKey: 'downloadPage.step2Desc' },
  { step: '03', titleKey: 'downloadPage.step3', descKey: 'downloadPage.step3Desc' },
];

function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section
      ref={ref}
      aria-label="App statistics"
      className="bg-white border-y border-gray-100 py-10 px-4"
    >
      <ul className="max-w-2xl mx-auto grid grid-cols-3 gap-6 list-none">
        {trustStats.map((stat, i) => (
          <StatItem key={stat.labelKey} stat={stat} delay={i * 0.1} inView={inView} />
        ))}
      </ul>
    </section>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut', delay },
});

export default function Download() {
  const { t } = useTranslation();

  const appLinks = [
    { store: t('downloadPage.appStore'), platform: t('downloadPage.downloadOn'), icon: appleIcon, subtitle: 'iOS 13+', href: 'https://apps.apple.com/us/app/locsho/id6771481950' },
    { store: t('downloadPage.googlePlay'), platform: t('downloadPage.getItOn'), icon: googleIcon, subtitle: t('downloadPage.googlePlaySubtitle'), href: 'https://play.google.com/store/apps/details?id=in.locsho.user&hl=en_IN' },
  ];

  useEffect(() => {
    document.title = t('downloadPage.title') + ' — LocSho';
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <main>
        <section
          aria-labelledby="download-heading"
          className="bg-[#F0FBF5] pt-28 pb-20 px-4 relative overflow-hidden"
        >
          {/* Background rings */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            {[640, 480, 320].map((size) => (
              <span
                key={size}
                className="absolute rounded-full border border-[#1AAB6D]/10"
                style={{ width: size, height: size }}
              />
            ))}
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div {...fadeUp(0)}>
              <Badge color="green" className="mb-6">
                {t('downloadPage.freeDownload')}
              </Badge>
            </motion.div>

            {/* App icon */}
            <motion.div
              {...fadeUp(0.08)}
              className="w-24 h-24 bg-[#1AAB6D] rounded-[28px] flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl shadow-[#1AAB6D]/30"
              aria-hidden="true"
            >
              🛍️
            </motion.div>

            <motion.h1
              id="download-heading"
              {...fadeUp(0.12)}
              className="text-4xl md:text-5xl font-black text-[#1A1A2E] leading-tight mb-4"
            >
              {t('downloadPage.title')}
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="text-gray-500 text-lg max-w-md mx-auto mb-10"
            >
              {t('downloadPage.subtitle')}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp(0.2)}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
            >
              {appLinks.map((app) => (
                <motion.a
                  key={app.store}
                  href={app.href}
                  aria-label={`${app.platform} ${app.store}`}
                  className="bg-[#1A1A2E] text-white px-7 py-4 rounded-2xl flex items-center gap-4 hover:bg-[#2d2d50] transition-colors shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1AAB6D] focus-visible:outline-offset-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {app.icon}
                  <div className="text-left">
                    <p className="text-xs text-white/60">{app.platform}</p>
                    <p className="text-base font-bold leading-tight">{app.store}</p>
                    <p className="text-xs text-white/50">{app.subtitle}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.p {...fadeUp(0.24)} className="text-gray-400 text-xs mb-12">
              {t('downloadPage.agreeTerms')}
            </motion.p>

            {/* QR codes */}
            <motion.div
              {...fadeUp(0.28)}
              className="flex flex-col sm:flex-row gap-8 justify-center"
            >
              {[
                { label: t('downloadPage.userApp'), key: 'User' },
                { label: t('downloadPage.partnerApp'), key: 'Partner' },
              ].map(({ label, key }) => (
                <figure key={key} className="flex flex-col items-center gap-2">
                  <div className="bg-white p-4 rounded-2xl shadow-md border border-[#1AAB6D]/10">
                    <img
                      src={`https://placehold.co/144x144/F0FBF5/1AAB6D?text=QR+${key}`}
                      alt={`Scan to download ${label}`}
                      width={144}
                      height={144}
                      className="rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="text-gray-400 text-sm">{label}</figcaption>
                </figure>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Trust bar ── */}
        <TrustBar />

        {/* ── How it works ── */}
        <section
          aria-labelledby="steps-heading"
          className="bg-[#F0FBF5] py-20 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="steps-heading"
                className="text-3xl md:text-4xl font-black text-[#1A1A2E]"
              >
                {t('downloadPage.upAndRunning')}
              </h2>
              <p className="text-gray-500 mt-3">
                {t('downloadPage.threeStepsDesc')}
              </p>
            </div>

            <ol className="flex flex-col md:flex-row gap-6" role="list">
              {steps.map((s, i) => (
                <motion.li
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 bg-white rounded-3xl p-7 border border-[#1AAB6D]/10 shadow-sm"
                >
                  <span
                    className="text-4xl font-black text-[#1AAB6D]/20 leading-none block mb-4"
                    aria-hidden="true"
                  >
                    {s.step}
                  </span>
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{t(s.titleKey)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(s.descKey)}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
