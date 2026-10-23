import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ServerMenu } from './server-menu/server-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ServerMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly year = new Date().getFullYear();

  constructor() {
    inject(MatIconRegistry).setDefaultFontSetClass('material-symbols-outlined');
  }
}
