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
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ContactComponent } from './contact/contact.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';


const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatGridListModule,
  MatChipsModule,
  MatButtonModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDialogModule,
]


@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    ContactComponent
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
