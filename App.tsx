import React, { useState } from 'react';
import { COURSES, APP_CONSTANTS } from './constants';
import { PricingCard } from './components/PricingCard';
import { ViewMode } from './types';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.FULL);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Navbar / Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-green-500 to-emerald-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-emerald-900/20">
              I
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-white leading-none">INTEGRITY</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Software Training</span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <a href={`mailto:${APP_CONSTANTS.CONTACT_EMAIL}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              {APP_CONSTANTS.CONTACT_EMAIL}
            </a>
            <span className="text-xs text-emerald-400 font-semibold">{APP_CONSTANTS.PHONE_NUMBERS}</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Software Training and <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Placement Assistance</span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Learning knows no boundaries. Start a new journey with us in exclusive 
            <span className="text-slate-200 font-semibold"> Offline courses</span>. 
            We offer comprehensive training in software, hardware, and design.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
             {/* Toggle Switch */}
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
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {COURSES.map((course) => (
            <div key={course.id} className="flex justify-center h-full">
              <PricingCard plan={course} mode={viewMode} />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-white font-bold text-lg mb-2">INTEGRITY</h2>
          <p className="text-slate-400 text-sm mb-4">
            1st Floor, IT Tower Nalgonda, 508001 <br/>
            6-6-26/NR, Near Ganesh Temple, Vanasthalipuram 500070
          </p>
          <div className="flex justify-center gap-4 text-emerald-400 font-medium mb-8">
            <span>+91 9652352635</span>
            <span>63013 87792</span>
          </div>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Integrity Software Training. All rights reserved. Prices subject to change.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;