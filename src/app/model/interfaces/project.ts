import type { ProjectContext } from "../enums/project-context";

export interface Project {
  title: string;
  description: string;
  duration: string;
  team: number;
  technologies: string[];
  context: ProjectContext;
  contextLogo?: string;
  contextLogoLink?: string;
  image: string;
  link?: string;
}
