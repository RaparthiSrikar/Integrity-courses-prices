export interface CoursePlan {
  id: string;
  title: string;
  category: 'Web Development' | 'AI & Data Science' | 'Networking & Hardware' | 'Design' | 'Office & Productivity';
  description: string;
  monthlyPrice: number;
  originalMonthlyPrice?: number;
  fullCoursePrice: number;
  originalFullCoursePrice?: number;
  durationMonths: number;
  features: string[];
  popular?: boolean;
  color: string;
}

export enum ViewMode {
  MONTHLY = 'MONTHLY',
  FULL = 'FULL'
}