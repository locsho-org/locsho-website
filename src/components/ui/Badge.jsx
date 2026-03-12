export default function Badge({ children, color = 'green', className = '' }) {
  const colors = {
    green: 'bg-[#E8F5EE] text-[#1AAB6D]',
    dark: 'bg-gray-100 text-[#1A1A2E]',
    white: 'bg-white/80 text-[#1AAB6D]',
    red: 'bg-red-100 text-red-500',
    mint: 'bg-[#F0FBF5] text-[#1AAB6D] border border-[#1AAB6D]/20',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${colors[color]} ${className}`}
    >
      {children}
    </span>
  );
}
