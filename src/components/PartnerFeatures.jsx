import { motion } from 'framer-motion';
import SectionWrapper from './ui/SectionWrapper';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { partnerFeatures } from '../data/features';

export default function PartnerFeatures() {
  return (
    <SectionWrapper id="partner-features" background="mint">
      <div className="text-center mb-12">
        <Badge color="green" className="mb-4">For Shop Owners</Badge>
        <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
          Grow Your Shop with{' '}
          <span className="text-[#1AAB6D]">LocSho Partner</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Join 78+ local shops already selling online. AI-powered setup, zero upfront costs.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {partnerFeatures.map((feature, i) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card
              className={`h-full bg-white ${
                feature.highlight
                  ? 'border-2 border-[#1AAB6D]'
                  : 'border border-gray-100'
              }`}
            >
              <div className="w-12 h-12 bg-[#E8F5EE] rounded-2xl flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-[#1A1A2E]">{feature.title}</h3>
                {feature.highlight && (
                  <Badge color="green" className="text-[10px] shrink-0">Key</Badge>
                )}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA Banner — matching partner dashboard style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl p-8 md:p-12 text-center border border-[#1AAB6D]/20 shadow-sm"
      >
        <div className="w-16 h-16 bg-[#E8F5EE] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
          🏪
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-[#1A1A2E] mb-3">
          Start Your 15-Day Free Trial
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          No credit card. No setup fee. Just your shop name and a WhatsApp number.
        </p>
        <Button variant="primary" size="lg" href="/partner">
          Join as Partner →
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}
