const GlassContainer = ({ children }) => {
  return (
    <div className="relative w-[900px] h-[520px] rounded-2xl overflow-hidden 
      bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,184,160,0.2)] 
      border border-white/10">
      {children}
    </div>
  );
};

export default GlassContainer;