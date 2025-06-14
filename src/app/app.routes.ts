import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'academics',
    loadComponent: () =>
      import('./pages/academics/academics.component').then((m) => m.AcademicsComponent)
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./pages/experience/experience.component').then((m) => m.ExperienceComponent)
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then((m) => m.ProjectsComponent)
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills.component').then((m) => m.SkillsComponent)
  },
  {
    path: 'more',
    loadComponent: () => import('./pages/more/more.component').then((m) => m.MoreComponent)
  },
  { path: '**', redirectTo: '' }
];
