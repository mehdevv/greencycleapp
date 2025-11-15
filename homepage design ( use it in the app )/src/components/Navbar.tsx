import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Can3D } from "./Can3D";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12">
              <Can3D size={48} />
            </div>
            <span className="text-slate-900 tracking-tight">GREENCYCLE</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <a href="#features" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">
              How It Works
            </a>
            <a href="#impact" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">
              Impact
            </a>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 tracking-wide">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-900"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-6 space-y-4"
          >
            <a href="#features" className="block text-slate-600 hover:text-emerald-600 transition-colors py-2">
              Features
            </a>
            <a href="#how-it-works" className="block text-slate-600 hover:text-emerald-600 transition-colors py-2">
              How It Works
            </a>
            <a href="#impact" className="block text-slate-600 hover:text-emerald-600 transition-colors py-2">
              Impact
            </a>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Get Started
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}