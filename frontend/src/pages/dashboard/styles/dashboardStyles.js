export const styles = {

  page: `
    min-h-screen 
    bg-[#03152A] 
    text-white 
    p-6 
    relative 
    overflow-hidden
  `,

  glow: `
    absolute w-[600px] h-[600px] 
    bg-[#00B8A0]/20 
    rounded-full blur-3xl 
    top-[-150px] left-[-150px]
  `,

  headerWrapper: "mb-8 relative z-10",

  headerTitle: `
    text-4xl font-bold tracking-tight
    bg-gradient-to-r from-white to-[#00B8A0]
    bg-clip-text text-transparent
  `,

  headerSub: "text-gray-400 mt-1",

  aiBadge: `
    inline-block mt-3 px-3 py-1 rounded-full 
    bg-[#00B8A0]/20 text-[#00B8A0] text-sm
    border border-[#00B8A0]/30
    animate-pulse
  `,
  grid: "grid md:grid-cols-3 gap-6 mb-8 relative z-10",

  card: `
    p-6 rounded-2xl 
    bg-white/5 backdrop-blur-2xl 
    border border-white/10 
    shadow-[0_0_25px_rgba(0,184,160,0.15)]
    hover:shadow-[0_0_40px_rgba(0,184,160,0.3)]
    transition-all duration-300
    hover:scale-[1.02]
  `,

  cardTitle: "text-sm text-gray-400 mb-2",

  section: "mb-8 relative z-10",
  chartSection: "mb-10 relative z-10",

  alertItem: `
    p-3 rounded-lg 
    bg-[#F58A07]/10 
    border border-[#F58A07]/30 
    backdrop-blur-md
    shadow-[0_0_15px_rgba(245,138,7,0.2)]
  `,

  buttonGrid: "grid md:grid-cols-3 gap-6 relative z-10",

  buttonCard: `
    p-5 rounded-2xl 
    bg-white/5 backdrop-blur-xl 
    border border-white/10
    shadow-[0_0_20px_rgba(0,184,160,0.15)]
    hover:shadow-[0_0_35px_rgba(0,184,160,0.3)]
    transition-all duration-300
    hover:scale-[1.03]
    flex items-center justify-center
  `,

  btnPrimary: `
    w-full py-3 rounded-xl font-bold 
    bg-[#00B8A0] text-black
    shadow-[0_0_20px_rgba(0,184,160,0.4)]
    hover:shadow-[0_0_40px_rgba(0,184,160,0.7)]
    transition-all duration-300
    hover:scale-105 active:scale-95
  `,

  btnAction: `
    w-full py-3 rounded-xl font-bold 
    bg-[#F58A07] text-black
    shadow-[0_0_20px_rgba(245,138,7,0.4)]
    hover:shadow-[0_0_40px_rgba(245,138,7,0.7)]
    transition-all duration-300
    hover:scale-105 active:scale-95
  `,

  btnSecondary: `
    w-full py-3 rounded-xl font-bold 
    bg-white/10 backdrop-blur-md 
    border border-white/10
    hover:bg-white/20
    transition-all duration-300
  `,
};