export function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="bg-gradient-to-r from-[#FF6A00] to-[#FF8C42] rounded-3xl p-12 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Organized?</h2>
        <p className="text-lg mb-8 opacity-90">Join thousands who simplified tasks. Free, forever.</p>
        <a href="/signup" className="inline-block px-8 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-gray-50 transition-colors">
          Launch Taskly →
        </a>
      </div>
    </section>
  );
}
