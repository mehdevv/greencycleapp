import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { InteractiveBackground } from "./InteractiveBackground";
import { Can3D } from "./Can3D";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-white">
      <InteractiveBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-full"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-emerald-700 tracking-wide uppercase text-sm">Algeria's Recycling Revolution</span>
            </motion.div>

            <div className="space-y-10">
              <h1 className="text-6xl md:text-8xl text-slate-900 tracking-tighter leading-[0.9]">
                Turn Bottles
                <span className="block text-emerald-600">
                  Into Rewards
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-xl leading-relaxed tracking-wide">
                A sophisticated ecosystem connecting citizens, retailers, and recycling centers to build a sustainable Algeria.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white group px-10 py-7 tracking-wide"
              >
                Start Recycling
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-10 py-7 tracking-wide"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-12 pt-16 border-t border-slate-200">
              <div className="space-y-2">
                <div className="text-4xl text-slate-900 tracking-tight">15K+</div>
                <div className="text-slate-500 tracking-wide uppercase text-xs">Active Users</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl text-slate-900 tracking-tight">500+</div>
                <div className="text-slate-500 tracking-wide uppercase text-xs">Partner Shops</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl text-slate-900 tracking-tight">2M+</div>
                <div className="text-slate-500 tracking-wide uppercase text-xs">Bottles Recycled</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - 3D Can */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              <Can3D size={400} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}