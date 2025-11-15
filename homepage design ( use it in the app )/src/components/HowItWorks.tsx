import { motion } from "motion/react";
import { UserPlus, QrCode, MapPin, Gift } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up",
    description: "Register with your phone number and get your unique QR code instantly. Print a physical card for elders.",
  },
  {
    icon: QrCode,
    step: "02",
    title: "Deposit Bottles",
    description: "Visit any partner shop, scan your QR, and add your bottles. Points are credited immediately.",
  },
  {
    icon: MapPin,
    step: "03",
    title: "Find Partners",
    description: "Use the GPS map to locate the nearest recycling point in under 5 minutes from your location.",
  },
  {
    icon: Gift,
    step: "04",
    title: "Get Rewards",
    description: "Exchange your points for discounts, free products, and exclusive offers at partner stores.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-48 px-6 lg:px-8 overflow-hidden bg-slate-50">

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8 mb-36"
        >
          <h2 className="text-6xl md:text-7xl text-slate-900 tracking-tighter">
            How It <span className="text-emerald-600">Works</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto tracking-wide leading-relaxed">
            Start recycling and earning rewards in four simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-slate-200" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="relative bg-white border border-slate-200 rounded-2xl p-12 transition-all duration-300">
                    {/* Step Number - Floating */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white tracking-tight">{step.step}</span>
                    </motion.div>

                    <div className="space-y-8 pt-8">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto">
                        <Icon className="w-8 h-8 text-emerald-600" />
                      </div>

                      {/* Content */}
                      <div className="text-center space-y-4">
                        <h3 className="text-2xl text-slate-900 tracking-tight">{step.title}</h3>
                        <p className="text-slate-600 leading-relaxed tracking-wide">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 border-r-2 border-t-2 border-slate-200 transform rotate-45 -translate-y-1/2" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}