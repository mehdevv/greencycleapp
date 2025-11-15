import { motion } from "motion/react";
import { ArrowRight, Smartphone, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CTASection() {
  return (
    <section className="relative py-48 px-6 lg:px-8 overflow-hidden bg-slate-50">

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-200 rounded-2xl p-20 md:p-24 text-center space-y-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-full"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-emerald-700 tracking-wide uppercase text-sm">Join 15,000+ Active Users</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl text-slate-900 tracking-tighter leading-tight">
              Ready to Make a
              <span className="block text-emerald-600">
                Real Difference?
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Start earning rewards while helping build a sustainable future for Algeria. Download the app or visit a partner shop today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-7 tracking-wide"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Download App
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-12 py-7 tracking-wide"
            >
              <Globe className="w-5 h-5 mr-2" />
              Find Partner Shops
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-12 pt-12 border-t border-slate-200">
            <div className="space-y-2">
              <div className="text-3xl text-emerald-600 tracking-tight">100%</div>
              <div className="text-sm text-slate-500 tracking-wide uppercase">Free to Use</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl text-emerald-600 tracking-tight">500+</div>
              <div className="text-sm text-slate-500 tracking-wide uppercase">Partner Locations</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl text-emerald-600 tracking-tight">24/7</div>
              <div className="text-sm text-slate-500 tracking-wide uppercase">Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}