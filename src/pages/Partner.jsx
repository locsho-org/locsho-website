import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Footer from '../components/Footer';
import Badge from '../components/ui/Badge';
import { testimonials } from '../data/testimonials';
import OrderNotificationDemo from '../components/OrderNotificationDemo';
import PhoneMockup from '../components/ui/PhoneMockup';
import { demoVideos } from '../data/media';

const partnerSteps = [
  { step: 1, icon: '📝', titleKey: 'partnerPage.step1',  descKey: 'partnerPage.step1Desc' },
  { step: 2, icon: '📦', titleKey: 'partnerPage.step2',  descKey: 'partnerPage.step2Desc' },
  { step: 3, icon: '🔔', titleKey: 'partnerPage.step3',  descKey: 'partnerPage.step3Desc' },
  { step: 4, icon: '✅', titleKey: 'partnerPage.step4',  descKey: 'partnerPage.step4Desc' },
  { step: 5, icon: '💳', titleKey: 'partnerPage.step5',  descKey: 'partnerPage.step5Desc' },
];

const pricingPlans = [
  {
    nameKey: 'partnerPage.growth',
    priceKey: 'partnerPage.growthPrice',
    periodKey: 'partnerPage.growthPeriod',
    descKey: 'partnerPage.growthDesc',
    featuresKey: 'partnerPage.growthFeatures',
    ctaKey: 'partnerPage.startFree',
    highlight: false
  },
  {
    nameKey: 'partnerPage.professional',
    priceKey: 'partnerPage.proPrice',
    periodKey: 'partnerPage.proPeriod',
    descKey: 'partnerPage.proDesc',
    featuresKey: 'partnerPage.proFeatures',
    ctaKey: 'partnerPage.getStarted',
    highlight: true
  }
];

export default function Partner() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'LocSho Partner — ' + t('partnerPage.subtitle');
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[90vh] flex items-center bg-[#F0FBF5]">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="#1AAB6D" />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge color="green" className="mb-6 py-1.5 px-4 text-xs font-black uppercase tracking-[0.2em]">{t('partnerPage.title')}</Badge>
            <h1 className="text-5xl md:text-6xl font-black text-[#1A1A2E] mb-6 uppercase leading-[1.1] tracking-tighter">
              <span className="text-[#1AAB6D] underline decoration-[#1AAB6D]/20 underline-offset-8">{t('partnerPage.subtitle')}</span>
            </h1>
            <p className="text-gray-600 text-lg mb-10 max-w-xl leading-relaxed font-medium">
              {t('partnerPage.desc')}
            </p>
            
            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                t('partnerPage.zeroCommission'),
                t('partnerPage.directPayment'),
                t('partnerPage.aiSetup'),
                t('partnerPage.instantAlerts'),
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-[#1A1A2E] font-bold text-sm">
                  <span className="w-6 h-6 bg-[#1AAB6D] rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="h-16 px-10 rounded-2xl text-base tracking-widest uppercase font-black" href="/download">
                {t('partnerPage.registerShop')}
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-base tracking-widest uppercase font-black" href="/download">
                {t('footer.downloadApp')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="absolute inset-0 bg-[#1AAB6D]/10 rounded-full blur-[120px] transform scale-125" />
            <PhoneMockup 
              className="relative z-10 drop-shadow-3xl"
              screenContent={
                <div className="h-full bg-white flex flex-col">
                  <div className="bg-[#1AAB6D] p-6 text-white pt-10">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Today's Sales</p>
                    <p className="text-3xl font-black mt-1 tracking-tight">₹12,450</p>
                    <div className="mt-4 flex gap-2">
                      <div className="bg-white/20 px-2 py-1 rounded text-[8px] font-black uppercase tracking-wider">24 Orders</div>
                      <div className="bg-white/20 px-2 py-1 rounded text-[8px] font-black uppercase tracking-wider">+12% vs yesterday</div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Active Orders</p>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-900">Order #882{i}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Ananya S. • ₹183</p>
                        </div>
                        <div className="bg-green-50 text-green-600 px-2 py-1 rounded-lg text-[8px] font-black uppercase">Ready</div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* Trust & Discovery */}
      <SectionWrapper background="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div>
            <Badge color="green" className="mb-4">{t('partnerPage.digitalTransformation')}</Badge>
            <h2 className="text-4xl font-black text-[#1A1A2E] mb-6 uppercase tracking-tight leading-tight">
              {t('partnerPage.bringShop')}
            </h2>
            <p className="text-gray-500 text-lg mb-6 leading-relaxed">
              {t('partnerPage.bringShopDesc')}
            </p>
            <div className="space-y-4">
              {[
                { title: t('partnerPage.zeroCommissions'), desc: t('partnerPage.zeroCommissionsDesc') },
                { title: t('partnerPage.directMarketing'), desc: t('partnerPage.directMarketingDesc') },
                { title: t('partnerPage.aiCatalog'), desc: t('partnerPage.aiCatalogDesc') },
              ].map(f => (
                <div key={f.title} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#1AAB6D]/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#1AAB6D]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A2E] text-base">{f.title}</p>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#F0FBF5] rounded-[3rem] p-12 border border-[#1AAB6D]/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-[0.03] group-hover:scale-110 transition-transform">🏪</div>
            <div className="text-center">
              <p className="text-5xl font-black text-[#1AAB6D] mb-2 tracking-tighter">500+</p>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8">{t('partnerPage.registeredShops')}</p>
              <p className="text-gray-600 font-medium italic">"{t('partnerPage.testimonial')}"</p>
              <p className="mt-4 font-bold text-[#1A1A2E]">— {t('partnerPage.testimonialAuthor')}</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Interactive Demo */}
      <SectionWrapper background="mint">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Badge color="green" className="mb-4">{t('partnerPage.oneTap')}</Badge>
          <h2 className="text-4xl font-black text-[#1A1A2E] mb-6 uppercase tracking-tight">
            {t('partnerPage.seeOrders')}
          </h2>
          <p className="text-gray-500 text-lg font-medium">
            {t('partnerPage.oneTapDesc')}
          </p>
        </div>
        <OrderNotificationDemo />
      </SectionWrapper>

      {/* Steps Section */}
      <SectionWrapper background="white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#1A1A2E] uppercase tracking-tight">
            {t('partnerPage.pathToGrowth')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {partnerSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border border-gray-50 hover:border-[#1AAB6D]/20 hover:shadow-2xl hover:shadow-green-900/5 p-8 rounded-[2rem] text-center flex flex-col">
                <div className="w-16 h-16 bg-[#F0FBF5] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="font-black text-[#1A1A2E] mb-3 uppercase text-sm tracking-widest">{t(step.titleKey)}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium flex-1">{t(step.descKey)}</p>
                <div className="mt-6 font-black text-[10px] text-[#1AAB6D] bg-[#1AAB6D]/10 py-1 rounded-lg">STEP 0{step.step}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper background="gray">
        <div className="max-w-5xl mx-auto text-center">
          <Badge color="green" className="mb-4">{t('partnerPage.simplePricing')}</Badge>
          <h2 className="text-4xl font-black text-[#1A1A2E] mb-6 uppercase tracking-tight">
            {t('partnerPage.builtForProfit')}
          </h2>
          <p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto">
            {t('partnerPage.pricingDesc')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map(plan => (
              <Card key={plan.nameKey} className={`text-left p-10 rounded-[2.5rem] flex flex-col relative ${plan.highlight ? 'border-4 border-[#1AAB6D] shadow-2xl shadow-green-900/10' : 'border border-gray-100'}`}>
                {plan.highlight && (
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#1AAB6D] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">{t('partnerPage.recommended')}</div>
                )}
                <h3 className="text-xl font-black text-[#1A1A2E] uppercase tracking-widest mb-2">{t(plan.nameKey)}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-[#1A1A2E] tracking-tighter">{t(plan.priceKey)}</span>
                  <span className="text-gray-400 text-sm font-bold">{t(plan.periodKey)}</span>
                </div>
                <p className="text-gray-500 text-sm font-medium mb-8">{t(plan.descKey)}</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {t(plan.featuresKey, { returnObjects: true }).map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-bold text-[#1A1A2E]">
                      <span className="text-[#1AAB6D]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlight ? 'primary' : 'outline'} size="lg" className="w-full h-14 rounded-2xl uppercase tracking-widest font-black text-xs">
                  {t(plan.ctaKey)}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Real Results Testimonials */}
      <SectionWrapper background="white">
        <div className="text-center mb-16">
          <Badge color="green" className="mb-4">{t('partnerPage.partnerSuccess')}</Badge>
          <h2 className="text-4xl font-black text-[#1A1A2E] uppercase tracking-tight">
            {t('partnerPage.realResults')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border border-gray-50 p-8 rounded-[2rem] hover:shadow-xl transition-all">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#1AAB6D]/10">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-[#1A1A2E] text-base uppercase tracking-tight">{t.name}</p>
                    <p className="text-[10px] font-black text-[#1AAB6D] uppercase tracking-widest">{t.shop}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1">{t.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 font-medium italic leading-relaxed text-base mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-[#1A1A2E] tracking-tight">{t.ordersPerDay}</span>
                    <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Orders / Day</span>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-[#1AAB6D] tracking-tight">{t.monthlyEarnings}</span>
                    <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Monthly Growth</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper background="dark" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1AAB6D] opacity-[0.05] rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-[#1AAB6D]/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner shadow-white/10">
            🏪
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">
            {t('partnerPage.claimTerritory')}
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-md mx-auto font-medium">
            {t('partnerPage.claimDesc')}
          </p>
          <Button variant="primary" size="xl" className="h-20 px-12 rounded-[2rem] text-lg tracking-[0.2em] uppercase font-black shadow-2xl shadow-[#1AAB6D]/20" href="/download">
            {t('partnerPage.registerShop')}
          </Button>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-8">{t('partnerPage.limitedSlots')}</p>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
