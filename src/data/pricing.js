// Future API swap: GET /api/pricing

export const customerPricing = {
  title: 'For Customers',
  price: 'Free',
  subtitle: 'Always free to use',
  color: '#2ECC71',
  cta: 'Download App',
  ctaLink: '/download',
  features: [
    { text: '₹2 flat delivery fee (orders ₹199+)', highlight: true },
    { text: 'Free delivery on first 3 orders' },
    { text: 'No subscription required' },
    { text: 'Multi-shop checkout' },
    { text: 'Real-time order tracking' },
    { text: 'AI voice cart (Hindi, Telugu, Tamil, Kannada)' },
    { text: '24/7 customer support via WhatsApp' },
  ],
};

export const partnerPricing = {
  title: 'For Shop Owners',
  price: '₹299',
  subtitle: '/month after free trial',
  color: '#FF6B35',
  cta: 'Start Free Trial',
  ctaLink: '/partner',
  badge: '15 Days Free',
  features: [
    { text: '15-day free trial, no credit card', highlight: true },
    { text: 'Unlimited orders per day' },
    { text: 'AI product catalogue setup' },
    { text: 'WhatsApp order notifications' },
    { text: 'Daily UPI payouts' },
    { text: 'Sales analytics dashboard' },
    { text: 'Dedicated partner support' },
  ],
};
