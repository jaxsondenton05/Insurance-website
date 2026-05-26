import { Mail, Phone, Instagram, Linkedin, Twitter } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-20 bg-obsidian text-bone border-t border-white/5" id="footer">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <span className="font-display font-bold text-lg tracking-tight text-bone uppercase italic">Denton Insurance</span>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-clay italic">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "#" },
                { name: "Services", href: "#services" },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" }
              ].map(item => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-bone/60 hover:text-clay transition-colors italic font-light">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-clay italic">Contact Info</h4>
            <ul className="space-y-4 italic">
              <li className="flex items-center gap-3 text-sm text-bone/60 group">
                <Phone className="w-4 h-4 text-clay" />
                <a href="tel:9493970449" className="hover:text-bone transition-colors font-light">949-397-0449</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-bone/60 group">
                <Mail className="w-4 h-4 text-clay" />
                <a href="mailto:Jaxson@crgia.com" className="hover:text-bone transition-colors font-light">Jaxson@crgia.com</a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-clay italic">Connect</h4>
            <div className="pt-4 border-t border-white/5 italic">
               <p className="text-[10px] text-bone/20 leading-relaxed font-light italic uppercase tracking-widest"> 
                Licensed Independent Insurance Agent <br />
                State of Texas.
                <span className="block mt-2 text-clay font-medium normal-case tracking-wider text-[11px]">
                  A proud agent of CRG Insurance Agency
                </span>
               </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 italic font-light">
          <div className="flex gap-8 text-[10px] text-bone/30 uppercase tracking-widest">
            <a href="#" className="hover:text-bone transition-colors">Compliance</a>
            <a href="#" className="hover:text-bone transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
