import { motion } from "motion/react";
import { Smartphone, Store, Truck } from "lucide-react";
import { Card } from "./ui/card";

const userTypes = [
  {
    icon: Smartphone,
    title: "Customers",
    subtitle: "Citizens & Recyclers",
    description: "Earn points by depositing bottles and cans at partner shops. Find the nearest location, track your impact, and exchange points for amazing rewards.",
    features: [
      "QR Code for easy deposits",
      "GPS to find nearest partners",
      "Real-time point tracking",
      "Redeem exclusive rewards",
    ],
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Store,
    title: "Superettes",
    subtitle: "Partner Shops & Retailers",
    description: "Manage customer deposits with a simple dashboard. Scan QR codes, track sacks, and offer custom rewards to build customer loyalty.",
    features: [
      "Simple QR scanning",
      "Sack management system",
      "Custom reward creation",
      "Analytics & insights",
    ],
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Truck,
    title: "Collectors",
    subtitle: "Recycling Centers & Logistics",
    description: "Optimize collection routes with real-time sack tracking. View heatmaps, validate pickups, and monitor recycling efficiency across the network.",
    features: [
      "Interactive sack map",
      "Route optimization",
      "Pickup validation via QR",
      "Performance analytics",
    ],
    color: "teal",
    gradient: "from-teal-500 to-emerald-600",
  },
];

export function UserTypes() {
  return (
    <section className="relative py-48 px-6 lg:px-8 bg-slate-50">
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8 mb-32"
        >
          <h2 className="text-6xl md:text-7xl text-slate-900 tracking-tighter">
            Built for <span className="text-emerald-600">Everyone</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto tracking-wide leading-relaxed">
            Three integrated platforms creating a circular economy
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {userTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="relative h-full bg-white border-slate-200 transition-all duration-300 p-12 overflow-hidden">
                  
                  <div className="relative space-y-10">
                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${type.gradient} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Title */}
                    <div className="space-y-3">
                      <h3 className="text-3xl text-slate-900 tracking-tight">{type.title}</h3>
                      <p className="text-slate-500 tracking-wide uppercase text-xs">{type.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed tracking-wide">
                      {type.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-5 pt-8 border-t border-slate-200">
                      {type.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                          className="flex items-center gap-4 text-slate-700 tracking-wide"
                        >
                          <div className={`w-1.5 h-1.5 bg-gradient-to-r ${type.gradient} rounded-full`} />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}