import { Injectable, signal } from '@angular/core';
import type { User } from 'firebase/auth';

export interface ServerLink {
  label: string;
  url: string;
  icon?: string;
}

export interface ServerGroup {
  title: string;
  links: ServerLink[];
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
  readonly denied = signal(false);

  private readonly firebase = import('./firebase');

  constructor() {
    this.firebase.then(({ watchUser, loadServerConfig }) =>
      watchUser(async (user) => {
        this.config.set(null);
        this.denied.set(false);
        this.user.set(user);
        if (!user) return;
        try {
          this.config.set(await loadServerConfig());
        } catch {
          this.denied.set(true);
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
