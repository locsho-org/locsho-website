import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-md p-6 ${hover ? 'hover:shadow-xl transition-shadow duration-300' : ''} ${className}`}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
