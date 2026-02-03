import React from 'react';
import { Check, Heart } from 'lucide-react';

export default function EarlyAdopterSection() {
  return (
    <section className="py-24 bg-[#001F3F] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#FF1493]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="flex-1">
            <div className="inline-block px-4 py-1.5 bg-[#FF1493]/10 text-[#FF1493] border border-[#FF1493]/20 rounded-full text-xs font-bold mb-6 shadow-[0_0_15px_rgba(255,20,147,0.2)]">
              PREMIUM COMMUNITY
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Join The <span className="text-[#FF1493]">Founders Club</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              We're building the world's largest collection of GPS art. 
              Get lifetime access to premium features and exclusive routes.
            </p>
            
            <div className="space-y-5 mb-10">
              {[
                { title: "Priority Access to New Cities", desc: "Run new routes before anyone else." },
                { title: "Exclusive Founder Badge", desc: "Permanent status on your profile." },
                { title: "Direct Roadmap Influence", desc: "Vote on which cities we map next." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group cursor-default">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#FF1493]/20 flex items-center justify-center group-hover:bg-[#FF1493] transition-colors">
                    <Check className="w-3.5 h-3.5 text-[#FF1493] group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <a href="#pricing" className="px-8 py-4 bg-[#FF1493] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(255,20,147,0.4)] hover:bg-[#D10074] hover:shadow-[0_0_30px_rgba(255,20,147,0.6)] transition-all text-center">
                 Join Founders Club - $4.99
               </a>
            </div>
          </div>
          
          <div className="w-full lg:w-5/12">
             <div className="relative aspect-[3/4] rounded-3xl bg-gradient-to-br from-[#0A0E27] to-[#1a1f3d] border border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-2xl group transform hover:-translate-y-2 transition-transform duration-500">
               <div className="absolute inset-0 bg-white/5 backdrop-blur-sm z-0"></div>
               
               <div className="relative z-10">
                 <div className="flex justify-between items-start mb-8">
                   <Heart className="w-12 h-12 text-[#FF1493] fill-[#FF1493]/20" />
                   <div className="px-3 py-1 bg-[#FF1493] text-white text-[10px] font-bold tracking-widest uppercase rounded">
                     Member #001
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF1493] to-purple-600 p-0.5 mb-4">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Founder" className="w-full h-full rounded-full bg-black" />
                   </div>
                   <h3 className="text-3xl font-black text-white italic tracking-tighter">FOUNDER<br/>MEMBER</h3>
                   <p className="text-sm font-mono text-[#FF1493]">LIFETIME ACCESS GRANTED</p>
                 </div>
               </div>

               <div className="absolute -bottom-20 -right-20 w-64 h-64 border-[32px] border-[#FF1493]/10 rounded-full blur-sm"></div>
               <div className="absolute -top-20 -left-20 w-64 h-64 border-[32px] border-purple-500/10 rounded-full blur-sm"></div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}