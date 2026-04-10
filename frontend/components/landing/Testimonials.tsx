export function Testimonials() {
  const testimonials = [
    { name: 'Priya S', role: 'Freelance Designer', quote: 'Taskly makes my daily workflow so much easier to manage.' },
    { name: 'Rahul M', role: 'Software Engineer', quote: 'Simple, fast, and exactly what I need for my tasks.' },
    { name: 'Ananya K', role: 'Student', quote: 'I love how clean the interface is. It really helps me focus.' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-16">
        Loved by <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">People Like You</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="p-8 bg-white rounded-2xl shadow-sm border">
            <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
            <p className="text-gray-600 mb-6 italic">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
