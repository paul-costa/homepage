import { Component, computed, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PROJECTS } from '../links';
import { Session } from '../session';

/**
 * Header: the server flow and homeassistant flow links (only after sign-in: since 29 Oct 2026 /infrastructure/
 * is behind Cloudflare Access too; others get a share link with an expiry) and the burger menu. The menu always lists
 * the public projects (wedding.costa) and, below them, "Sign in" or, after sign-in, every private link
 * group (Tailscale, Links) and the account (name, log out).
 */
@Component({
  selector: 'app-nav',
  imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatIcon, MatDivider],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  protected readonly session = inject(Session);
  protected readonly projects = PROJECTS;

  protected readonly userName = computed(() => this.session.email());
}
