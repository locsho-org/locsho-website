import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F0FBF5] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-[#E8F5EE] rounded-3xl flex items-center justify-center text-5xl mx-auto mb-6">
          🔍
        </div>
        <h1 className="text-6xl font-black text-[#1AAB6D] mb-2">404</h1>
        <h2 className="text-2xl font-black text-[#1A1A2E] mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          Looks like this page took a wrong turn. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#1AAB6D] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#148A57] transition-colors"
        >
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
