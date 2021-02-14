import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { CoverletterComponent } from './coverletter/coverletter.component';
import { RedirectComponent } from './shared/redirect/redirect.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'portfolio',
    pathMatch: 'full',
  },

  {
    path: 'portfolio',
    component: CarouselComponent
  },

  {
    path: 'letter',
    component: CoverletterComponent
  },

  {
    path: 'downloads/:downloadId',
    component: RedirectComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
