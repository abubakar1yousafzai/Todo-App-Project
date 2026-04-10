export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-medium text-sm">
          Productivity, Simplified
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Organize Your Life,<br />
          <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">One Task at a Time</span>
        </h1>
        <p className="text-lg text-gray-600">
          A beautifully crafted task manager with smart priorities, due dates, pinning, and instant undo. No clutter. Just focus.
        </p>
        <div className="flex gap-4">
          <a href="/signup" className="px-8 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600">Start Free →</a>
          <a href="#features" className="px-8 py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-50">See Features</a>
        </div>
        <div className="flex items-center gap-2 pt-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />)}
          </div>
          <span className="text-sm text-gray-500">Loved by 2,000+ users</span>
        </div>
      </div>
      
      {/* App Preview Card */}
      <div className="relative bg-white p-2 rounded-2xl shadow-xl">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-gray-400">taskly.app</span>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {['All', 'Completed', 'Pending'].map(s => <div key={s} className="bg-gray-50 p-2 text-xs text-center rounded">{s}</div>)}
          </div>
          <div className="space-y-2">
            {[
              { title: 'Design landing page', color: 'bg-red-500' },
              { title: 'Review PR', color: 'bg-yellow-500' },
              { title: 'Update docs', color: 'bg-blue-500' }
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                <div className={`w-1 h-8 ${t.color}`} />
                <input type="checkbox" className="w-4 h-4" defaultChecked={i === 2} />
                <span className={`text-sm ${i === 2 ? 'line-through text-gray-400' : ''}`}>{t.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-4 left-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm shadow-md">
          Task Completed! ✓
        </div>
      </div>
    </section>
  );
}
