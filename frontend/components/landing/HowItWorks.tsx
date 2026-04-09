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
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-2xl mb-6">
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
