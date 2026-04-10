export function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 text-center">
      <h2 className="text-4xl font-bold mb-16">Get Started in 3 Steps</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { step: '01', title: 'Add a Task', desc: 'Quickly jot down what needs to be done.' },
          { step: '02', title: 'Organize', desc: 'Set priorities, due dates, and pin important items.' },
          { step: '03', title: 'Stay Focused', desc: 'Filter, search, and track your progress effortlessly.' }
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold shadow-md">
              {s.step}
            </div>
            <h3 className="text-xl font-bold mb-3">{s.title}</h3>
            <p className="text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
