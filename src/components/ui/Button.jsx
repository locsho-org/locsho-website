import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer select-none';

  const variants = {
    primary: 'bg-[#1AAB6D] text-white hover:bg-[#148A57] shadow-lg hover:shadow-xl',
    secondary: 'bg-[#E8F5EE] text-[#1AAB6D] hover:bg-[#d4eede]',
    outline: 'border-2 border-[#1AAB6D] text-[#1AAB6D] hover:bg-[#1AAB6D] hover:text-white',
    ghost: 'text-[#1A1A2E] hover:bg-gray-100',
    dark: 'bg-[#1A1A2E] text-white hover:bg-[#2d2d50]',
    white: 'bg-white text-[#1AAB6D] hover:bg-gray-50 shadow-md',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
