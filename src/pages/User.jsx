import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Footer from '../components/Footer';
import UserFeatures from '../components/UserFeatures';
import UserOrderTrackingDemo from '../components/UserOrderTrackingDemo';
import Badge from '../components/ui/Badge';

const openAppStore = () => {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const url = isIOS
    ? 'https://apps.apple.com/us/app/locsho/id6771481950'
    : 'https://play.google.com/store/apps/details?id=in.locsho.user&hl=en_IN';
  if (isIOS) {
    const w = window.open(url, '_blank');
    if (w) w.opener = null;
  } else {
    window.location.href = url;
  }
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

function VoiceCartDemo() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const voiceCartSteps = [
    { id: 1, lang: t('voiceDemo.langHindi'), flag: '🇮🇳', speech: '"Ek kg aata, 500gm dal, aur doodh do packet"', items: [] },
    { id: 2, lang: t('voiceDemo.processing'), flag: '🤖', speech: t('voiceDemo.understanding'), items: [] },
    {
      id: 3,
      lang: t('voiceDemo.addedToCart'),
      flag: '✅',
      speech: t('voiceDemo.foundItems'),
      items: [
        { name: t('voiceDemo.aata'), qty: '1 kg',    price: '₹52' },
        { name: t('voiceDemo.dal'),         qty: '500 gm',  price: '₹75' },
        { name: t('voiceDemo.milkPacket'),        qty: '2×500ml', price: '₹56' },
      ],
    },
  ];
  const [running, setRunning] = useState(false);

  const runDemo = () => {
    if (running) return;
    setRunning(true);
    setStep(0);
    setTimeout(() => setStep(1), 500);
    setTimeout(() => setStep(2), 2000);
    setTimeout(() => { setStep(3); setRunning(false); }, 3500);
  };

  const current = voiceCartSteps[step - 1];

  return (
    <div className="bg-white border border-[#1AAB6D]/20 rounded-[2.5rem] p-6 md:p-8 max-w-xl mx-auto shadow-xl shadow-green-900/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#1AAB6D]/10 rounded-xl flex items-center justify-center text-xl">🎤</div>
        <h3 className="text-xl font-black text-[#1A1A2E]">{t('voiceDemo.title')}</h3>
      </div>

      <div className="bg-[#F8FDF9] rounded-3xl p-6 mb-8 min-h-[240px] flex flex-col border border-[#1AAB6D]/5 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-8"
            >
              <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center mb-6 text-4xl animate-bounce">
                🎤
              </div>
              <p className="text-gray-400 font-medium max-w-[200px]">{t('voiceDemo.idlePrompt')}</p>
            </motion.div>
          )}

          {current && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{current.flag}</span>
                  <span className="text-[#1AAB6D] font-black uppercase tracking-widest text-[10px] bg-[#1AAB6D]/10 px-2 py-1 rounded-md">{current.lang}</span>
                </div>
                {step === 2 && (
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-[#1AAB6D] rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border border-[#1AAB6D]/10 rounded-2xl p-4 mb-4 shadow-sm">
                <p className="text-gray-700 font-medium italic">"{current.speech}"</p>
              </div>

              {current.items?.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2 flex-1"
                >
                  {current.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-50"
                    >
                      <div>
                        <p className="text-sm font-bold text-[#1A1A2E]">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.qty}</p>
                      </div>
                      <p className="text-[#1AAB6D] font-black text-sm">{item.price}</p>
                    </motion.div>
                  ))}
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-dashed border-[#1AAB6D]/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{t('voiceDemo.totalOrder')}</span>
                    <span className="text-[#1AAB6D] font-black text-xl tracking-tighter">₹183</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={runDemo}
        disabled={running}
        className={cn(
          "w-full py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.25em] transition-all relative overflow-hidden group shadow-lg",
          running
            ? 'bg-[#F0FBF5] text-[#1AAB6D]/50 cursor-not-allowed border-2 border-[#1AAB6D]/10'
            : 'bg-[#1AAB6D] text-white hover:bg-[#148A57] hover:shadow-[#1AAB6D]/20 active:scale-95'
        )}
      >
        <span className="relative z-10">
          {running ? t('userPage.aiProcessing') : step === 3 ? t('userPage.resetDemo') : t('userPage.tryVoice')}
        </span>
        {!running && (
          <motion.div 
            className="absolute inset-0 bg-white/10"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.button>
    </div>
  );
}

export default function User() {
  const { t } = useTranslation();

  const userSteps = [
    { step: 1, icon: '📍', titleKey: 'userPage.step1',  desc: t('userSteps.step1Desc') },
    { step: 2, icon: '🛒', titleKey: 'userPage.step2',  desc: t('userSteps.step2Desc') },
    { step: 3, icon: '📲', titleKey: 'userPage.step3',  desc: t('userSteps.step3Desc') },
    { step: 4, icon: '🚚', titleKey: 'userPage.step4',  desc: t('userSteps.step4Desc') },
  ];

  useEffect(() => {
    document.title = 'LocSho — ' + t('userPage.subtitle');
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[90vh] flex items-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F0FBF5] rounded-l-[100px] -z-10 hidden lg:block" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#1AAB6D] opacity-[0.03] rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#1AAB6D] opacity-[0.02] rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <Badge color="green" className="mb-6 py-1.5 px-4 text-xs font-black uppercase tracking-[0.2em]">{t('userPage.title')}</Badge>
            <h1 className="text-5xl md:text-7xl font-black text-[#1A1A2E] mb-6 leading-[1.1] tracking-tighter">
              <span className="text-[#1AAB6D] relative">
                {t('userPage.subtitle')}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none">
                  <path d="M3 9C118.5 3 239.5 3 355 9" stroke="#1AAB6D" strokeWidth="6" strokeLinecap="round" opacity="0.2"/>
                </svg>
              </span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-xl leading-relaxed font-medium">
              {t('userPage.desc')}
            </p>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-10 w-fit">
              {[
                t('userPage.benefitLocalShop'),
                t('userPage.benefitSameRates'),
                t('userPage.benefitFresh'),
                t('userPage.benefitFastDelivery'),
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-[#1A1A2E] font-bold text-sm">
                  <span className="w-6 h-6 bg-[#1AAB6D] rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="primary" size="lg" className="h-16 px-10 rounded-2xl text-base tracking-widest uppercase font-black" onClick={() => window.open('https://user.locsho.in', '_blank')}>
                {t('userPage.startOrdering')}
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-base tracking-widest uppercase font-black" onClick={openAppStore}>
                {t('footer.downloadApp')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-[#1AAB6D]/5 rounded-full blur-[100px] scale-150 animate-pulse pointer-events-none" />
            <div className="relative z-10 drop-shadow-2xl">
              <UserOrderTrackingDemo />
            </div>
            {/* Floating UI elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white shadow-xl rounded-2xl p-4 border border-gray-100 z-20 hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">{t('userPage.orderConfirmed')}</p>
                  <p className="text-xs font-bold text-gray-900">{t('userPage.arrivingIn8mins')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <UserFeatures />

      {/* Modern How It Works */}
      <SectionWrapper background="mint">
        <div className="text-center mb-16">
          <Badge color="green" className="mb-4">{t('userPage.simplifiedProcess')}</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A2E] tracking-tight">
            {t('userPage.asEasy')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {userSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="group relative">
                <div className="absolute -top-10 left-4 text-8xl font-black text-[#1AAB6D]/5 pointer-events-none group-hover:text-[#1AAB6D]/10 transition-colors">
                  0{s.step}
                </div>
                <Card className="h-full bg-white border border-gray-100 hover:border-[#1AAB6D]/20 hover:shadow-2xl hover:shadow-green-900/5 transition-all p-8 rounded-[2rem]">
                  <div className="w-16 h-16 bg-[#F0FBF5] rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-black text-[#1A1A2E] mb-3 uppercase tracking-tight">{t(s.titleKey)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{s.desc}</p>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* High-Impact Voice Demo */}
      <SectionWrapper background="white" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1AAB6D] opacity-[0.02] rounded-full blur-3xl" />
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge color="green" className="mb-4">{t('userPage.aiFirst')}</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-6 tracking-tight">
            {t('userPage.orderWithVoice')}
          </h2>
          <p className="text-gray-500 text-lg font-medium leading-relaxed">
            {t('userPage.voiceDesc')}
          </p>
        </div>
        <VoiceCartDemo />
      </SectionWrapper>

      {/* Shop Request CTA */}
      <SectionWrapper id="request-shop" background="dark" className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-white rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-6xl mb-8">🏪</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {t('userPage.missingShop')}
          </h2>
          <p className="text-gray-300 text-lg mb-10 font-medium leading-relaxed">
            {t('userPage.missingShopDesc')}
          </p>
          <Button variant="white" size="lg" className="h-16 px-12 rounded-2xl text-base tracking-widest uppercase font-black" href="https://wa.me/918800453953?text=Hi%2C%20I'd%20like%20to%20request%20a%20shop%20on%20LocSho%3A%20" target="_blank" rel="noopener noreferrer">
            {t('userPage.requestShop')}
          </Button>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
