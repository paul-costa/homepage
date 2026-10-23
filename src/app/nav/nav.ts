import { Component, computed, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Session } from '../session';

/**
 * Header: the server flow and homeassistant flow links and sign-in. After sign-in, one burger menu
 * holds every private link group (Tailscale, Links) and the account (name, log out).
 */
@Component({
  selector: 'app-nav',
  imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatIcon, MatDivider],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  protected readonly session = inject(Session);

  protected readonly userName = computed(() => {
    const user = this.session.user();
    return user?.displayName || user?.email || '';
  });
}
