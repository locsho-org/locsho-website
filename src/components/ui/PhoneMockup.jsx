export default function PhoneMockup({ screenContent, className = '' }) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: 240, height: 480 }}>
      {/* Phone frame */}
      <div className="absolute inset-0 bg-[#1A1A2E] rounded-[40px] shadow-2xl" />
      {/* Screen */}
      <div className="absolute inset-[8px] bg-white rounded-[33px] overflow-hidden">
        {/* Status bar */}
        <div className="h-6 bg-[#1A1A2E] flex items-center justify-center">
          <div className="w-16 h-3 bg-black rounded-full" />
        </div>
        {/* Screen content */}
        <div className="h-full bg-gray-50 overflow-hidden">
          {screenContent || (
            <img
              src="https://placehold.co/224x440/FF6B35/ffffff?text=LocSho+App"
              alt="LocSho App"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/30 rounded-full" />
    </div>
  );
}
