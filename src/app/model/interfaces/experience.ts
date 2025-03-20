import type { JobType } from '../enums/job-type';
import type { Company } from '../types/company';
import type { DateRange } from '../types/date-range';

export interface Experience {
  company: Company;
  positionKey: string;
  jobType: JobType;
  descriptionKey: string;
  relatedProjects: {
    id: string;
    name: string;
  }[];
  dates: DateRange;
}
