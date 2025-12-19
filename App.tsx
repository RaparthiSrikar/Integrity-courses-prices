import React, { useState, useMemo } from 'react';
import { COURSES, APP_CONSTANTS } from './constants';
import { PricingCard } from './components/PricingCard';
import { Logo } from './components/Logo';
import { ViewMode, CoursePlan } from './types';

const CATEGORIES = [
  'All',
  'Web Development',
  'AI & Data Science',
  'Networking & Hardware',
  'Design',
  'Office & Productivity'
] as const;

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.FULL);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(30000);

  // Dynamic price limits based on viewMode
  const priceStats = useMemo(() => {
    const prices = COURSES.map(c => viewMode === ViewMode.MONTHLY ? c.monthlyPrice : c.fullCoursePrice);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [viewMode]);

  // Adjust maxPrice when switching view modes to keep it within bounds
  React.useEffect(() => {
    if (maxPrice > priceStats.max) setMaxPrice(priceStats.max);
    if (maxPrice < priceStats.min) setMaxPrice(priceStats.min);
  }, [viewMode, priceStats.max, priceStats.min]);

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      
      const price = viewMode === ViewMode.MONTHLY ? course.monthlyPrice : course.fullCoursePrice;
      const matchesPrice = price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, maxPrice, viewMode]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setMaxPrice(priceStats.max);
  };

  return (
    <div id="top" className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Navbar / Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#top" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Logo className="w-14 h-14" />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white leading-none">INTEGRITY</span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Software Training</span>
              </div>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#search" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Search</a>
            <a href="#pricing" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Courses</a>
            <a href="#contact" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="hidden lg:flex flex-col items-end">
            <a href={`mailto:${APP_CONSTANTS.CONTACT_EMAIL}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              {APP_CONSTANTS.CONTACT_EMAIL}
            </a>
            <span className="text-xs text-emerald-400 font-semibold">{APP_CONSTANTS.PHONE_NUMBERS}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Training</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            Learning knows no boundaries. Start a new journey with us in exclusive 
            <span className="text-slate-200 font-semibold"> Offline and Online Courses</span>.
          </p>

          <div className="flex flex-col items-center justify-center gap-6">
             {/* Plan Toggle */}
            <div className="inline-flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
              <button
                onClick={() => setViewMode(ViewMode.MONTHLY)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  viewMode === ViewMode.MONTHLY
                    ? 'bg-slate-700 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Monthly Plan
              </button>
              <button
                onClick={() => setViewMode(ViewMode.FULL)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  viewMode === ViewMode.FULL
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Full Course Plan
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-bold">
                  SAVE
                </span>
              </button>
            </div>

            {/* Filter Section */}
            <div id="search" className="w-full max-w-5xl bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                {/* Search Bar */}
                <div className="lg:col-span-5 text-left">
                  <label htmlFor="search-input" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Search Courses</label>
                  <div className="relative">
                    <input
                      id="search-input"
                      type="text"
                      placeholder="e.g. React, Python, UI Design..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Price Range */}
                <div className="lg:col-span-3 text-left">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Max Price</label>
                    <span className="text-emerald-400 font-mono text-sm">{APP_CONSTANTS.CURRENCY_SYMBOL}{maxPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={priceStats.min}
                    max={priceStats.max}
                    step={500}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 mt-2 font-medium">
                    <span>{APP_CONSTANTS.CURRENCY_SYMBOL}{priceStats.min.toLocaleString()}</span>
                    <span>{APP_CONSTANTS.CURRENCY_SYMBOL}{priceStats.max.toLocaleString()}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="lg:col-span-4 overflow-hidden">
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 text-left">Category</label>
                   <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                            selectedCategory === cat
                              ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                              : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div id="pricing" className="scroll-mt-24">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredCourses.map((course) => (
                <div key={course.id} className="flex justify-center h-full">
                  <PricingCard plan={course} mode={viewMode} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">No courses found matching your criteria</h3>
              <p className="text-slate-500 mb-8">Try adjusting your search terms or filters to find what you're looking for.</p>
              <button 
                onClick={resetFilters}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-colors border border-slate-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-900 bg-slate-950 py-12 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-white font-bold text-lg mb-2">INTEGRITY</h2>
          <p className="text-slate-400 text-sm mb-4">
            1st Floor, IT Tower Nalgonda, 508001 <br/>
            6-6-26/NR, Near Ganesh Temple, Vanasthalipuram 500070
          </p>
          <div className="flex justify-center gap-4 text-emerald-400 font-medium mb-8">
            <a href={`tel:${APP_CONSTANTS.PHONE_NUMBERS.split(',')[0].trim()}`} className="hover:text-white transition-colors">+91 9652352635</a>
            <a href={`tel:${APP_CONSTANTS.PHONE_NUMBERS.split(',')[1].trim()}`} className="hover:text-white transition-colors">63013 87792</a>
          </div>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Integrity Software Training. All rights reserved. Prices subject to change.
          </p>
          <a href="#top" className="inline-block mt-8 text-slate-500 hover:text-white transition-colors">
            <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest block mt-1">Back to top</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;