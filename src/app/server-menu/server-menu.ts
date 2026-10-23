import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Session } from '../session';

@Component({
  selector: 'app-server-menu',
  imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatIcon, MatDivider, RouterLink],
  templateUrl: './server-menu.html',
})
export class ServerMenu {
  protected readonly session = inject(Session);
}
