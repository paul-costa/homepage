import { Injectable, signal } from '@angular/core';

export interface ServerLink {
  label: string;
  /** absolute URLs open in a new tab, paths on this site (e.g. /infrastructure/homeassistant/) in the same one */
  url: string;
  /** Material Symbols name */
  icon?: string;
}

/** One section of the burger menu after sign-in */
export interface ServerGroup {
  title: string;
  links: ServerLink[];
  /** image in public/ shown next to the title, e.g. logos/tailscale.svg */
  logo?: string;
}

/** /private/server.json on costaserver, served only behind Cloudflare Access */
export interface ServerConfig {
  groups: ServerGroup[];
  llmMonitorUrl?: string;
}

/**
 * Sign-in is Cloudflare Access on costapaul.com/private/*: only Paul's email gets a login code. Signed in, the
 * Access cookie lets /private/server.json through; signed out, Access answers with a redirect to its login page,
 * which fetch() sees as an opaque redirect.
 */
@Injectable({ providedIn: 'root' })
export class Session {
  /** undefined while checking, false when signed out */
  readonly signedIn = signal<boolean | undefined>(undefined);
  readonly email = signal('');
  readonly config = signal<ServerConfig | null>(null);

  constructor() {
    this.load();
  }

  private async load() {
    try {
      const response = await fetch('/private/server.json', { redirect: 'manual', cache: 'no-store' });
      if (response.ok && response.headers.get('content-type')?.includes('json')) {
        this.config.set(await response.json());
        this.signedIn.set(true);
        const identity = await fetch('/cdn-cgi/access/get-identity', { cache: 'no-store' });
        if (identity.ok) this.email.set((await identity.json()).email ?? '');
        return;
      }
    } catch {
      // offline or no JSON: treat as signed out
    }
    this.signedIn.set(false);
  }

  /** /private/login/ is behind Access too; after the login code it sends the browser back home */
  signIn() {
    location.href = '/private/login/';
  }

  signOut() {
    location.href = '/cdn-cgi/access/logout';
  }
}
