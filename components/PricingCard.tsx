import React from 'react';
import { CoursePlan, ViewMode } from '../types';
import { APP_CONSTANTS } from '../constants';
import { CheckIcon } from './CheckIcon';

interface PricingCardProps {
  plan: CoursePlan;
  mode: ViewMode;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, mode }) => {
  const isMonthly = mode === ViewMode.MONTHLY;
  
  // Format numbers with commas
  const formatPrice = (price: number) => price.toLocaleString('en-IN');

  const currentPrice = isMonthly ? plan.monthlyPrice : plan.fullCoursePrice;
  const originalPrice = isMonthly ? plan.originalMonthlyPrice : plan.originalFullCoursePrice;

  // Calculate discount percent
  const discountPercent = originalPrice 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  return (
    <div className={`relative flex flex-col rounded-2xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-slate-500/50 transition-all duration-500 ease-out overflow-hidden group h-full transform hover:-translate-y-2 hover:scale-[1.02]`}>
      
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-lg group-hover:shadow-orange-500/20 transition-all">
            POPULAR
          </div>
        </div>
      )}

      {/* Header Gradient */}
      <div className={`h-2 w-full bg-gradient-to-r ${plan.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-500">{plan.title}</h3>
        <p className="text-slate-400 text-sm mb-6 h-10 line-clamp-2">{plan.description}</p>

        {/* Price Section */}
        <div className="mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 relative overflow-hidden group-hover:bg-slate-900/80 transition-colors duration-500">
           {/* Offer Badge inside price box */}
           {discountPercent > 0 && (
             <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded-bl-lg group-hover:bg-green-500/30 transition-colors">
               {discountPercent}% OFF
             </div>
           )}

          <div className="flex flex-col">
             {/* Original Price */}
             {originalPrice && (
                <div className="text-slate-500 text-sm font-medium line-through decoration-slate-600 decoration-2 mb-[-4px]">
                  {APP_CONSTANTS.CURRENCY_SYMBOL}{formatPrice(originalPrice)}
                </div>
             )}
            
            <div className="flex items-end gap-1 mb-1">
              <span className="text-2xl font-bold text-slate-400 group-hover:text-slate-300 transition-colors">{APP_CONSTANTS.CURRENCY_SYMBOL}</span>
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {formatPrice(currentPrice)}
              </span>
              <span className="text-slate-400 font-medium mb-1 group-hover:text-slate-300 transition-colors">
                {isMonthly ? '/mo' : ' total'}
              </span>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            {isMonthly ? 'Pay as you go' : `${plan.durationMonths} Month Intensive`}
          </p>
        </div>

        {/* Features */}
        <div className="flex-1">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">What's included</h4>
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className={`mt-0.5 p-0.5 rounded-full bg-slate-700 text-white group-hover:bg-slate-600 group-hover:scale-110 transition-all duration-300`}>
                  <CheckIcon className="w-3 h-3" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors duration-300">
                  {feature}
                </span>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <div className={`mt-0.5 p-0.5 rounded-full bg-slate-700 text-white group-hover:bg-slate-600 group-hover:scale-110 transition-all duration-300`}>
                <CheckIcon className="w-3 h-3" />
              </div>
              <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors duration-300">Certificate of Completion</span>
            </li>
          </ul>
        </div>

        {/* Action Button - Converted to Link */}
        <a 
          href={APP_CONSTANTS.ENROLL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r ${plan.color} opacity-90 hover:opacity-100 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95 group-hover:-translate-y-1 transition-all duration-300 mt-auto shadow-lg`}
        >
          Enroll Now
        </a>
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
    </div>
  );
};