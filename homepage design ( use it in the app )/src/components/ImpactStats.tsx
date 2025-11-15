import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Leaf, Users, Building2, TrendingUp } from "lucide-react";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const stats = [
  {
    icon: Leaf,
    value: 2450000,
    suffix: "+",
    label: "Bottles Recycled",
    color: "emerald",
  },
  {
    icon: Users,
    value: 15420,
    suffix: "+",
    label: "Active Users",
    color: "teal",
  },
  {
    icon: Building2,
    value: 523,
    suffix: "+",
    label: "Partner Shops",
    color: "cyan",
  },
  {
    icon: TrendingUp,
    value: 12500,
    suffix: " kg",
    label: "CO₂ Emissions Saved",
    color: "emerald",
  },
];

export function ImpactStats() {
  return (
    <section id="impact" className="relative py-48 px-6 lg:px-8 bg-white">
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8 mb-32"
        >
          <h2 className="text-6xl md:text-7xl text-slate-900 tracking-tighter">
            Our <span className="text-emerald-600">Impact</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto tracking-wide leading-relaxed">
            Together, we're creating a cleaner, greener Algeria
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative bg-white border border-slate-200 rounded-2xl p-12 transition-all duration-300 overflow-hidden">

                  <div className="relative space-y-8">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Stats */}
                    <div className="space-y-3">
                      <div className="text-5xl text-slate-900 tracking-tight">
                        <CountUp end={stat.value} />
                        {stat.suffix}
                      </div>
                      <div className="text-slate-500 tracking-wide uppercase text-xs">{stat.label}</div>
                    </div>

                    {/* Progress indicator */}
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Impact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-emerald-50 border border-emerald-200 rounded-2xl p-16 text-center"
        >
          <p className="text-3xl text-slate-900 mb-4 tracking-tight">
            Every bottle counts. Join the movement today.
          </p>
          <p className="text-slate-600 text-lg tracking-wide">
            Our community has prevented over <span className="text-emerald-600">12,500 kg of CO₂</span> from entering the atmosphere.
          </p>
        </motion.div>
      </div>
    </section>
  );
}