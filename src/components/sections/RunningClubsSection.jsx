import React from 'react';
import { Users, Flag, Calendar, BarChart } from 'lucide-react';
import { useModals } from '../../context/ModalContext';

export default function RunningClubsSection() {
  const { openCityRequest } = useModals();

  return (
    <section className="section-padding bg-[#0A0E27]">
      <div className="container-tight text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">Perfect For Running Clubs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Flag />, title: "Team Challenges", desc: "Who can run the most perfect heart?" },
            { icon: <Users />, title: "Group Routes", desc: "Organized Saturday morning heart runs." },
            { icon: <BarChart />, title: "Leaderboards", desc: "Track completion times for the route." },
            { icon: <Calendar />, title: "Event Planning", desc: "Ready-made routes for special events." }
          ].map((feat, i) => (
            <div key={i} className="p-6 bg-[#131730] rounded-2xl border border-white/5 hover:border-pink-500/30 transition-colors">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center text-pink-400 mb-4">
                {feat.icon}
              </div>
              <h3 className="font-bold mb-2">{feat.title}</h3>
              <p className="text-sm text-gray-400">{feat.desc}</p>
            </div>
          ))}
        </div>

        <button onClick={openCityRequest} className="px-8 py-4 bg-white text-[#0A0E27] font-bold rounded-xl hover:bg-gray-200 transition-colors">
          Create Club Route - Request City
        </button>
      </div>
    </section>
  );
}