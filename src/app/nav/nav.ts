import { Component, computed, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Session } from '../session';

/**
 * Header: infrastructure maps and sign-in. After sign-in, every link group with a logo (Tailscale)
 * gets its own menu; the other groups and the account (name, log out) share the burger menu.
 */
@Component({
  selector: 'app-nav',
  imports: [MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger, MatIcon, MatDivider],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  protected readonly session = inject(Session);

  protected readonly logoGroups = computed(() => this.session.config()?.groups.filter((group) => group.logo) ?? []);
  protected readonly burgerGroups = computed(() => this.session.config()?.groups.filter((group) => !group.logo) ?? []);
  protected readonly userName = computed(() => {
    const user = this.session.user();
    return user?.displayName || user?.email || '';
  });
}
