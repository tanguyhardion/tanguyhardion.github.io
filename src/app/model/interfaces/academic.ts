import type { DateRange } from '../types/date-range';
import type { School } from '../types/school';

export interface Academic {
  school: School;
  degree: string;
  field: string;
  gpa?: string;
  dates: DateRange;
}
