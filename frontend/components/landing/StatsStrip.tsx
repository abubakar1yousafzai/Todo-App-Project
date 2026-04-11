export function StatsStrip() {
  return (
    <div className="border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Free Forever', value: '100%' },
          { label: 'Accounts Needed', value: '0' },
          { label: 'Tasks Allowed', value: '∞' },
          { label: 'Load Time', value: '<1s' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
