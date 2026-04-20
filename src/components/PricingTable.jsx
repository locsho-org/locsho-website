import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionWrapper from './ui/SectionWrapper';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { customerPricing, partnerPricing } from '../data/pricing';

function PricingCard({ plan, delay = 0 }) {
  const isPartner = plan.isPartner;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`relative bg-white rounded-3xl p-8 flex flex-col ${
        isPartner
          ? 'border-2 border-[#1AAB6D] shadow-xl'
          : 'border border-gray-100 shadow-md'
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-[#1AAB6D] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
            {plan.badge}
          </span>
        </div>
      )}

      {isPartner && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1AAB6D] rounded-t-3xl" />
      )}

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
          {plan.title}
        </p>
        <div className="flex items-end gap-1">
          <span className="text-5xl font-black text-[#1AAB6D]">
            {plan.price}
          </span>
          {plan.subtitle && (
            <span className="text-gray-400 text-sm mb-2">{plan.subtitle}</span>
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 w-5 h-5 bg-[#E8F5EE] rounded-full flex items-center justify-center shrink-0">
              <span className="text-[#1AAB6D] text-xs font-bold">✓</span>
            </span>
            <span className={`text-sm ${f.highlight ? 'font-semibold text-[#1A1A2E]' : 'text-gray-500'}`}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={isPartner ? 'primary' : 'outline'}
        size="lg"
        href={plan.ctaLink}
        className="w-full"
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
}

export default function PricingTable() {
  const { t } = useTranslation();

  const translatedCustomer = {
    ...customerPricing,
    title: t('pricing.forCustomers'),
    price: t('pricing.free'),
    subtitle: t('pricing.alwaysFree'),
    cta: t('pricing.downloadApp'),
    features: t('pricing.customerFeatures', { returnObjects: true }).map((text, i) => ({
      text,
      highlight: customerPricing.features[i]?.highlight,
    })),
  };

  const translatedPartner = {
    ...partnerPricing,
    isPartner: true,
    title: t('pricing.forShopOwners'),
    price: t('pricing.price'),
    subtitle: t('pricing.priceNote'),
    cta: t('pricing.startTrial'),
    badge: t('pricing.trialBadge'),
    features: t('pricing.partnerFeatures', { returnObjects: true }).map((text, i) => ({
      text,
      highlight: partnerPricing.features[i]?.highlight,
    })),
  };

  return (
    <SectionWrapper id="pricing" background="white">
      <div className="text-center mb-12">
        <Badge color="green" className="mb-4">{t('pricing.badge')}</Badge>
        <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
          {t('pricing.title').split(',')[0]}, <span className="text-[#1AAB6D]">{t('pricing.title').split(',')[1]?.trim().split(' ')[0]}</span> {t('pricing.title').split(',')[1]?.trim().split(' ').slice(1).join(' ')}
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          {t('pricing.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <PricingCard plan={translatedCustomer} delay={0} />
        <PricingCard plan={translatedPartner} delay={0.15} />
      </div>
    </SectionWrapper>
  );
}
