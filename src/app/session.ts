import { Injectable, signal } from '@angular/core';
import type { User } from 'firebase/auth';

export interface ServerLink {
  label: string;
  /** opens in a new tab */
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

/** Firestore document private/server, readable only by admins */
export interface ServerConfig {
  groups: ServerGroup[];
  llmMonitorUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class Session {
  /** undefined while Firebase has not answered yet */
  readonly user = signal<User | null | undefined>(undefined);
  readonly config = signal<ServerConfig | null>(null);

  private readonly firebase = import('./firebase');

  constructor() {
    // Sign-up is disabled in Firebase Auth, so only the existing admin account can sign in at all;
    // any account the Firestore rules still reject is signed out right away
    this.firebase.then(({ watchUser, loadServerConfig, signOutUser }) =>
      watchUser(async (user) => {
        this.config.set(null);
        this.user.set(user);
        if (!user) return;
        try {
          this.config.set(await loadServerConfig());
        } catch (error) {
          if ((error as { code?: string }).code === 'permission-denied') await signOutUser();
        }
      }),
    );
  }

  async signIn() {
    const { signInWithGoogle } = await this.firebase;
    await signInWithGoogle().catch(() => undefined);
  }

  async signOut() {
    const { signOutUser } = await this.firebase;
    await signOutUser();
  }
}
