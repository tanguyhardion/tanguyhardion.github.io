import type { ProjectContext } from "../enums/project-context";

export interface Project {
  titleKey: string;
  descriptionKey: string;
  durationKey: string;
  team: number;
  technologies: string[];
  context: ProjectContext;
  contextLogo?: string;
  contextLogoLink?: string;
  image: string;
  link?: string;
}
