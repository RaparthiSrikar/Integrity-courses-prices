export interface CoursePlan {
  id: string;
  title: string;
  description: string;
  monthlyPrice: number;
  fullCoursePrice: number;
  durationMonths: number;
  features: string[];
  popular?: boolean;
  color: string;
}

export enum ViewMode {
  MONTHLY = 'MONTHLY',
  FULL = 'FULL'
}