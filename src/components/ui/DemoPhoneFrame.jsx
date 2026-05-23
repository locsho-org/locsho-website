export default function DemoPhoneFrame({ appName, headerRight, children }) {
  return (
    <div
      className="w-[252px] bg-[#1A1A2E] rounded-[44px] p-[10px] shadow-2xl shadow-black/30 ring-1 ring-white/10 mx-auto"
      aria-hidden="true"
    >
      <div className="bg-white rounded-[36px] overflow-hidden">
        <div className="bg-[#1A1A2E] flex items-center justify-between px-5 py-2">
          <span className="text-white/70 text-[10px] font-medium">9:41</span>
          <div className="w-16 h-[18px] bg-black rounded-full" />
          <span className="text-white/70 text-[10px]">●●●</span>
        </div>
        <div className="bg-[#1AAB6D] px-4 py-2.5 flex items-center justify-between">
          <span className="text-white font-black text-sm">{appName}</span>
          <span className="text-white/80 text-xs">{headerRight}</span>
        </div>
        <div className="min-h-[380px] bg-[#F8F9FA] relative overflow-hidden">
          {children}
        </div>
        <div className="bg-white flex justify-center py-2">
          <div className="w-20 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
