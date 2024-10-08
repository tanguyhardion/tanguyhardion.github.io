import type { JobType } from '../enums/job-type';
import type { Company } from '../types/company';
import type { DateRange } from '../types/date-range';

export interface Experience {
  company: Company;
  position: string;
  jobType: JobType;
  description: string;
  projects: string[];
  dates: DateRange;
}
