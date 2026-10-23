import { Component, computed, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Session } from '../session';

/** Header: infrastructure maps, sign-in, and after sign-in one menu per private link group */
@Component({
  selector: 'app-nav',
  imports: [MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger, MatIcon, MatDivider, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  protected readonly session = inject(Session);
  protected readonly initial = computed(() => (this.session.user()?.email ?? '?').charAt(0).toUpperCase());
}
