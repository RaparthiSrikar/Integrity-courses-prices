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

  return (
    <div className={`relative flex flex-col rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-slate-500 transition-all duration-300 overflow-hidden group h-full transform hover:-translate-y-1`}>
      
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-lg">
            POPULAR
          </div>
        </div>
      )}

      {/* Header Gradient */}
      <div className={`h-2 w-full bg-gradient-to-r ${plan.color}`} />

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
        <p className="text-slate-400 text-sm mb-6 h-10">{plan.description}</p>

        {/* Price Section */}
        <div className="mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-end gap-1 mb-1">
            <span className="text-2xl font-bold text-slate-400">{APP_CONSTANTS.CURRENCY_SYMBOL}</span>
            <span className="text-4xl font-extrabold text-white tracking-tight">
              {isMonthly ? formatPrice(plan.monthlyPrice) : formatPrice(plan.fullCoursePrice)}
            </span>
            <span className="text-slate-400 font-medium mb-1">
              {isMonthly ? '/mo' : ' total'}
            </span>
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
                <div className={`mt-0.5 p-0.5 rounded-full bg-slate-700 text-white`}>
                  <CheckIcon className="w-3 h-3" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors">
                  {feature}
                </span>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <div className={`mt-0.5 p-0.5 rounded-full bg-slate-700 text-white`}>
                <CheckIcon className="w-3 h-3" />
              </div>
              <span className="text-sm text-slate-300">Certificate of Completion</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <button className={`w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r ${plan.color} opacity-90 hover:opacity-100 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all duration-200 mt-auto`}>
          Enroll Now
        </button>
      </div>
    </div>
  );
};