import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { CoverletterComponent } from './coverletter/coverletter.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'portfolio',
    pathMatch: 'full',
  },

  {
    path: 'portfolio',
    component: CarouselComponent,
    pathMatch: 'full',
  },

  {
    path: 'letter',
    component: CoverletterComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
