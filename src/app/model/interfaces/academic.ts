import type { DateRange } from '../types/date-range';
import type { School } from '../types/school';

export interface Academic {
  school: School;
  degreeKey: string;
  fieldKey: string;
  gpaKey?: string;
  dates: DateRange;
  relevantCourseworkKeys: string[];
}
