import { Calendar, Flag, Pin, Undo, BarChart, Lock } from "lucide-react";

export function Features() {
  const features = [
    { title: 'Due Dates', desc: 'Never miss a deadline', icon: Calendar },
    { title: 'Priority Levels', desc: 'High, Medium, Low', icon: Flag },
    { title: 'Pin Tasks', desc: 'Keep important tasks on top', icon: Pin },
    { title: 'Undo Actions', desc: 'Restore deleted tasks in 5s', icon: Undo },
    { title: 'Live Stats', desc: 'Track progress instantly', icon: BarChart },
    { title: '100% Private', desc: 'No account needed', icon: Lock },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-bold tracking-wider uppercase text-sm">Features</span>
        <h2 className="text-4xl font-bold mt-3">Everything You Need, <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Nothing You Don't</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
              <f.icon className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
