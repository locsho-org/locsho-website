import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SectionWrapper({
  children,
  className = '',
  id,
  background = 'white',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    mint: 'bg-[#F0FBF5]',
    'brand-light': 'bg-[#E8F5EE]',
    dark: 'bg-[#1A1A2E]',
    green: 'bg-[#1AAB6D]',
    gradient: 'bg-gradient-to-br from-[#1AAB6D] to-[#148A57]',
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`py-16 md:py-24 px-4 ${backgrounds[background]} ${className}`}
    >
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
