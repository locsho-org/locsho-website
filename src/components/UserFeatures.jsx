import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionWrapper from './ui/SectionWrapper';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { userFeatures } from '../data/features';

export default function UserFeatures() {
  const { t } = useTranslation();

  const featureTitles = {
    'voice-cart': t('userFeatures.voiceCart'),
    'multilang': t('userFeatures.multiLang'),
    'gps-shops': t('userFeatures.gps'),
    'live-tracking': t('userFeatures.tracking'),
  };
  const featureDescs = {
    'voice-cart': t('userFeatures.voiceCartDesc'),
    'multilang': t('userFeatures.multiLangDesc'),
    'gps-shops': t('userFeatures.gpsDesc'),
    'live-tracking': t('userFeatures.trackingDesc'),
  };

  return (
    <SectionWrapper id="user-features" background="white">
      <div className="text-center mb-12">
        <Badge color="green" className="mb-4">{t('userFeatures.badge')}</Badge>
        <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
          {t('userFeatures.title').split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-[#1AAB6D]">{t('userFeatures.title').split(' ').pop()}</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          {t('userFeatures.subtitle')}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userFeatures.map((feature, i) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card
              className={`h-full ${
                feature.highlight
                  ? 'border-2 border-[#1AAB6D] bg-[#F0FBF5]'
                  : 'border border-gray-100'
              }`}
            >
              <div className="w-12 h-12 bg-[#E8F5EE] rounded-2xl flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-[#1A1A2E]">{featureTitles[feature.id] || feature.title}</h3>
                {feature.highlight && (
                  <Badge color="green" className="text-[10px] shrink-0">{t('userFeatures.popular')}</Badge>
                )}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{featureDescs[feature.id] || feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
