import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'carousel',
    pathMatch: 'full',
  },
  {
    path: 'carousel',
    component: CarouselComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
