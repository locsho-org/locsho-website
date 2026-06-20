import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DemoPhoneFrame from './ui/DemoPhoneFrame';
import { demoVideos } from '../data/media';

const DURATIONS = [2800, 2500, 2500];

function StepTracker({ steps }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm space-y-3">
      {steps.map((step) => (
        <div key={step.label} className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
              step.done
                ? 'bg-[#1AAB6D] text-white'
                : step.active
                ? 'bg-[#E8F5EE] border-2 border-[#1AAB6D]'
                : 'bg-gray-100'
            }`}
          >
            {step.done ? '✓' : step.active ? (
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-[#1AAB6D] rounded-full"
              />
            ) : null}
          </div>
          <span
            className={`text-xs flex-1 ${
              step.done || step.active ? 'text-[#1A1A2E] font-bold' : 'text-gray-400'
            }`}
          >
            {step.label}
          </span>
          {step.active && (
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-[#1AAB6D] rounded-full"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function OrderPlacedScreen() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4"
    >
      <div className="bg-[#E8F5EE] rounded-2xl p-3 mb-3 flex items-center gap-3">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-2xl"
        >
          🎉
        </motion.span>
        <div>
          <p className="text-[#1AAB6D] font-black text-sm leading-tight">{t('trackingDemo.orderPlaced')}</p>
          <p className="text-gray-500 text-xs">{t('trackingDemo.orderConfirmed')}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 mb-3 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🏪</span>
          <span className="text-[#1A1A2E] text-xs font-bold">{t('trackingDemo.shopName')}</span>
        </div>
        <div className="space-y-1.5 border-t border-gray-100 pt-2">
          <div className="flex justify-between">
            <span className="text-gray-500 text-xs">{t('trackingDemo.item1')}</span>
            <span className="text-[#1AAB6D] text-xs font-bold">₹285</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-xs">{t('trackingDemo.item2')}</span>
            <span className="text-[#1AAB6D] text-xs font-bold">₹75</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-1.5">
            <span className="text-xs font-bold text-[#1A1A2E]">{t('orderDemo.total')}</span>
            <span className="text-xs font-black text-[#1AAB6D]">₹360</span>
          </div>
        </div>
      </div>

      <div className="bg-[#1AAB6D] text-white text-xs font-bold py-2.5 rounded-xl text-center">
        {t('trackingDemo.trackOrder')}
      </div>
    </motion.div>
  );
}

function PreparingScreen() {
  const { t } = useTranslation();
  const steps = [
    { label: t('trackingDemo.stepPlaced'), done: true, active: false },
    { label: t('trackingDemo.stepPreparing'), done: false, active: true },
    { label: t('trackingDemo.stepOnWay'), done: false, active: false },
    { label: t('trackingDemo.stepDelivered'), done: false, active: false },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4"
    >
      <p className="text-[#1A1A2E] font-black text-sm mb-3">{t('trackingDemo.orderNum')}</p>
      <StepTracker steps={steps} />
      <div className="mt-3 bg-[#F0FBF5] rounded-xl p-3 flex items-center gap-2">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="flex gap-1"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#1AAB6D] rounded-full" />
          ))}
        </motion.div>
        <span className="text-xs text-gray-500">{t('trackingDemo.packingMsg')}</span>
      </div>
    </motion.div>
  );
}

function DeliveryScreen() {
  const { t } = useTranslation();
  const steps = [
    { label: t('trackingDemo.stepPlaced'), done: true, active: false },
    { label: t('trackingDemo.stepPrepared'), done: true, active: false },
    { label: t('trackingDemo.stepOnWay'), done: false, active: true },
    { label: t('trackingDemo.stepDelivered'), done: false, active: false },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          className="text-xl"
        >
          🛵
        </motion.span>
        <div>
          <p className="text-[#1A1A2E] font-black text-sm leading-tight">{t('trackingDemo.onTheWay')}</p>
          <p className="text-gray-500 text-xs">{t('trackingDemo.orderNum')}</p>
        </div>
        <div className="ml-auto bg-[#E8F5EE] px-2 py-1 rounded-lg">
          <p className="text-[#1AAB6D] text-xs font-black">{t('trackingDemo.eta')}</p>
        </div>
      </div>

      <StepTracker steps={steps} />

      <div className="mt-3 bg-[#1AAB6D]/10 rounded-xl px-3 py-2.5 flex items-center justify-between">
        <span className="text-xs text-gray-600">{t('trackingDemo.arrivingIn')}</span>
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-2 h-2 bg-[#1AAB6D] rounded-full"
          />
          <span className="text-[#1AAB6D] font-black text-sm">{t('trackingDemo.eta')}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function UserOrderTrackingDemo() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const [state, setState] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!inView) {
      clearTimeout(timerRef.current);
      setState(0);
      return;
    }
    timerRef.current = setTimeout(
      () => setState((prev) => (prev === 2 ? 0 : prev + 1)),
      DURATIONS[state],
    );
    return () => clearTimeout(timerRef.current);
  }, [inView, state]);

  if (demoVideos.user) {
    return (
      <div className="max-w-2xl mx-auto">
        <iframe
          src={demoVideos.user}
          title="LocSho User App Demo"
          className="w-full aspect-video rounded-2xl shadow-lg"
          loading="lazy"
          allowFullScreen
        />
      </div>
    );
  }

  const labels = [
    t('trackingDemo.labelPlaced'),
    t('trackingDemo.labelPreparing'),
    t('trackingDemo.labelDelivery'),
  ];

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <DemoPhoneFrame appName="LocSho" headerRight={t('trackingDemo.location')}>
        <AnimatePresence mode="wait">
          {state === 0 && <OrderPlacedScreen />}
          {state === 1 && <PreparingScreen />}
          {state === 2 && <DeliveryScreen />}
        </AnimatePresence>
      </DemoPhoneFrame>

      <div className="flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              state === i ? 'w-6 bg-[#1AAB6D]' : 'w-1.5 bg-gray-200'
            }`}
          />
        ))}
      </div>

      <p className="text-gray-400 text-xs">{labels[state]}</p>
    </div>
  );
}
