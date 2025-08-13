export default function PortfolioPage() {
  return (
    <div className="bg-black text-white min-h-screen pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl chrome-text">My Portfolio</h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          This section showcases my ability to turn raw data into compelling visual narratives.
        </p>
        <div className="mt-10">
          <div className="w-full aspect-video bg-gray-900/50 ring-1 ring-white/10 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Power BI Dashboard Showcase Coming Soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
