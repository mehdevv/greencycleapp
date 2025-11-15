import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Can3D } from "./Can3D";

export function Footer() {
  return (
    <footer className="relative border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12">
                <Can3D size={48} />
              </div>
              <span className="text-slate-900 tracking-tight">GREENCYCLE</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed tracking-wide">
              Revolutionizing recycling in Algeria, one bottle at a time.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-6">
            <h3 className="text-slate-900 tracking-tight uppercase text-sm">Product</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#features" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">Features</a></li>
              <li><a href="#how-it-works" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">How It Works</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">Pricing</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">Partners</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-slate-900 tracking-tight uppercase text-sm">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">About Us</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">Blog</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">Careers</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-slate-900 tracking-tight uppercase text-sm">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">Terms of Service</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">Cookie Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-slate-200 text-center text-slate-500 text-sm tracking-wide">
          <p>© {new Date().getFullYear()} GreenCycle. All rights reserved. Built for a sustainable Algeria 🇩🇿</p>
        </div>
      </div>
    </footer>
  );
}