import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcademicsComponent } from './pages/academics/academics.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { MoreComponent } from './pages/more/more.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'academics', component: AcademicsComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'more', component: MoreComponent },
  { path: '**', redirectTo: '' }
];
