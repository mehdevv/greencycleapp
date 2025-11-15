import { motion } from "motion/react";
import { QrCode, MapPin, Gift, BarChart3, Leaf, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const features = [
  {
    icon: QrCode,
    title: "Instant QR Deposits",
    description: "Scan your unique QR code at any partner shop and earn points in seconds. Simple, fast, and contactless.",
    stat: "2-3 sec",
    statLabel: "per deposit",
  },
  {
    icon: MapPin,
    title: "Find Nearest Partners",
    description: "GPS-powered map shows the closest recycling points with real-time availability, distance, and rewards.",
    stat: "< 5 min",
    statLabel: "away",
  },
  {
    icon: Gift,
    title: "Exclusive Rewards",
    description: "Exchange points for discounts, free products, and special offers at your favorite local shops.",
    stat: "100+",
    statLabel: "rewards",
  },
  {
    icon: BarChart3,
    title: "Track Your Impact",
    description: "See how many bottles you've recycled, CO₂ saved, and your contribution to a greener Algeria.",
    stat: "Real-time",
    statLabel: "analytics",
  },
  {
    icon: Leaf,
    title: "Sustainability Score",
    description: "Level up your green profile and unlock badges as you recycle more and inspire others.",
    stat: "20+",
    statLabel: "levels",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "No complex hardware needed. Works on any smartphone with a simple scan and tap interface.",
    stat: "0",
    statLabel: "setup time",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-48 px-6 lg:px-8 bg-white">

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8 mb-32"
        >
          <h2 className="text-6xl md:text-7xl text-slate-900 tracking-tighter">
            Powerful <span className="text-emerald-600">Features</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto tracking-wide leading-relaxed">
            Everything you need to recycle smarter and earn rewards faster
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative h-full bg-white border border-slate-200 rounded-2xl p-10 transition-all duration-300 overflow-hidden">
                  
                  <div className="relative space-y-8">
                    {/* Icon & Stat */}
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl text-emerald-600 tracking-tight">{feature.stat}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">{feature.statLabel}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl text-slate-900 tracking-tight">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed tracking-wide">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}