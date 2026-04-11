export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">✓</span>
          </div>
          <span className="font-bold text-lg text-gray-900">Taskly</span>
        </div>
        <div className="text-gray-500 text-sm">
          © 2026 Taskly. Developed by Abu bakar for Hackathon II
        </div>
      </div>
    </footer>
  );
}
