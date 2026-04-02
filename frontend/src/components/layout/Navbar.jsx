import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 20 });

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/policy", label: "Policy" },
    { path: "/claims", label: "Claims" },
    { path: "/simulation", label: "Simulation" }
  ];

  const handleLogout = () => {
    logout();
    navigate("/auth", { replace: true });
  };

  const handleNavigation = (path) => {
    if (!user) navigate("/auth", { state: { from: path } });
    else navigate(path);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverPos({ x: e.clientX, y: e.clientY });
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set(Math.max(Math.min((x - centerX) / 60, 5), -5));
    mouseY.set(Math.max(Math.min(-(y - centerY) / 60, 5), -5));
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="w-full flex justify-between items-center px-6 py-4 bg-[#03152A] sticky top-0 z-50 text-white relative border-b border-white/10"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00B8A0] to-transparent opacity-60" />

      <motion.div
        className="pointer-events-none absolute w-72 h-72 rounded-full blur-3xl opacity-20"
        animate={{ left: hoverPos.x - 150, top: hoverPos.y - 150 }}
        transition={{ type: "spring", stiffness: 80 }}
        style={{ background: "radial-gradient(circle, rgba(0,184,160,0.6), transparent 60%)" }}
      />

      <motion.h1
        onClick={() => navigate("/dashboard")}
        whileHover={{ scale: 1.1 }}
        className="font-bold text-lg cursor-pointer flex items-center gap-2 z-10"
      >
        <span>GigShield</span>
        <motion.span
          animate={{ y: [0, -4, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-[#00B8A0]"
        >
          🛡️
        </motion.span>
      </motion.h1>

      <div className="hidden md:flex gap-2 items-center bg-white/5 p-1 rounded-xl backdrop-blur-md shadow-inner z-10">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <motion.button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-4 py-2 text-sm font-medium rounded-lg text-gray-300"
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#00B8A0] rounded-lg"
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? "text-black font-semibold" : "hover:text-white"}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-4 z-10">
        {user && <span className="text-sm text-gray-300">{user.name || user.phone}</span>}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-1.5 rounded-lg bg-[#F58A07] text-white text-sm"
        >
          Logout
        </motion.button>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white text-2xl z-50"
      >
        ☰
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 w-full z-50 bg-[#03152A] flex flex-col items-center gap-5 py-6 md:hidden border-t border-white/10"
        >
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                handleNavigation(item.path);
                setOpen(false);
              }}
              className="text-white text-lg"
            >
              {item.label}
            </button>
          ))}

          {user && (
            <span className="text-gray-400 text-sm">
              {user.name || user.phone}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-[#F58A07] rounded-lg text-white"
          >
            Logout
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;