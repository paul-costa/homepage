import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// application components
import { CarouselComponent } from './carousel/carousel.component';

// angular material
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
]


@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    materialModules,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
