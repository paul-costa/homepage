import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Paul Costa' },
  {
    path: 'llm',
    loadComponent: () => import('./llm/llm').then((m) => m.Llm),
    title: 'LLM activity · Paul Costa',
  },
  { path: '**', redirectTo: '' },
];
