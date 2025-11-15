import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Recycle, Users } from 'lucide-react';
import { Button } from './ui/button';

export default function WelcomePage({ onNext }) {
  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Decorative Frame */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          src="/Green Recycling Harmony.png" 
          alt="Decorative Frame" 
          className="w-full h-full object-cover opacity-40 md:opacity-50"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center w-full flex flex-col items-center justify-center h-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="mb-3 md:mb-4"
        >
          <img src="/logo1.png" alt="GREENCYCLE" className="h-20 md:h-28 w-auto mx-auto" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-4"
        >
          Welcome to <span className="text-emerald-600">GREENCYCLE</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto mb-4 md:mb-6 leading-relaxed px-4"
        >
          GREENCYCLE is a platform that connects citizens, partner shops, and recyclers 
          to create a sustainable recycling ecosystem. Earn rewards, manage deposits, 
          and make a positive impact on the environment.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 w-full max-w-3xl px-4"
        >
          <div className="flex flex-col items-center p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-2">
              <Recycle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1 text-xs md:text-sm">Easy Recycling</h3>
            <p className="text-[10px] md:text-xs text-slate-600 text-center leading-tight">
              Simple QR code scanning
            </p>
          </div>

          <div className="flex flex-col items-center p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-2">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1 text-xs md:text-sm">Connected Network</h3>
            <p className="text-[10px] md:text-xs text-slate-600 text-center leading-tight">
              Join a community
            </p>
          </div>

          <div className="flex flex-col items-center p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center mb-2">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1 text-xs md:text-sm">Earn Rewards</h3>
            <p className="text-[10px] md:text-xs text-slate-600 text-center leading-tight">
              Get points and redeem
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onNext}
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Let's Begin
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

