import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionWrapper from './ui/SectionWrapper';
import Badge from './ui/Badge';
import { stats } from '../data/stats';

function AnimatedCounter({ value, suffix, isInView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const isDecimal = !Number.isInteger(value);
    const duration = 1500;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span>{count}{suffix}</span>;
}

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { t } = useTranslation();

  const statLabels = {
    shops: t('socialProof.shops'),
    orders: t('socialProof.ordersDelivered'),
    rating: t('socialProof.avgRating'),
    delivery: t('socialProof.avgDelivery'),
  };

  return (
    <SectionWrapper id="social-proof" background="mint">
      <div className="text-center mb-12">
        <Badge color="green" className="mb-4">{t('socialProof.badge')}</Badge>
        <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
          {t('socialProof.title').split(' ').slice(0, -2).join(' ')}{' '}
          <span className="text-[#1AAB6D]">{t('socialProof.title').split(' ').slice(-2).join(' ')}</span>
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          {t('socialProof.subtitle')}
        </p>
      </div>

      <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
            className="text-center bg-white rounded-2xl p-6 shadow-sm border border-[#1AAB6D]/10"
          >
            <div className="w-12 h-12 bg-[#E8F5EE] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
              {stat.icon}
            </div>
            <div className="text-3xl md:text-4xl font-black text-[#1AAB6D] mb-1">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
            </div>
            <p className="text-[#1A1A2E] text-sm font-semibold">{statLabels[stat.id] || stat.label}</p>
            <p className="text-gray-400 text-xs mt-1">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Trust indicators */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: '🔒', title: t('socialProof.securePayments'), desc: t('socialProof.securePaymentsDesc') },
          { icon: '📍', title: t('socialProof.verifiedShops'), desc: t('socialProof.verifiedShopsDesc') },
          { icon: '🤝', title: t('socialProof.localFirst'), desc: t('socialProof.localFirstDesc') },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#1AAB6D]/10"
          >
            <div className="w-10 h-10 bg-[#E8F5EE] rounded-xl flex items-center justify-center text-xl shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="text-[#1A1A2E] font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
