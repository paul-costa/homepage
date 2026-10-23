import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Session } from '../session';
import { LlmFrame } from './llm-frame';

@Component({
  selector: 'app-llm',
  imports: [MatIcon, RouterLink, LlmFrame],
  template: `
    <a class="back" routerLink="/"><mat-icon>arrow_back</mat-icon>home</a>
    <h1>LLM activity</h1>
    @if (session.config()?.llmMonitorUrl; as url) {
      <p>
        Live from costaserver, loads only on devices in the tailnet.
        <a [href]="url" target="_blank" rel="noopener">Open in a new tab</a>
      </p>
      <app-llm-frame [url]="url" />
    } @else if (session.user() === null) {
      <p>Sign in to see what the models on costaserver are doing.</p>
      <button class="pill" type="button" (click)="session.signIn()"><mat-icon>login</mat-icon>Sign in with Google</button>
    } @else if (session.denied()) {
      <p>{{ session.user()?.email }} has no access.</p>
    } @else {
      <p>Checking access…</p>
    }
  `,
  styles: `
    :host { display: block; }
    .back { display: inline-flex; align-items: center; gap: 6px; font: 400 13px/1 var(--mono); color: var(--faint); transition: color 0.2s ease; }
    .back:hover { color: var(--text); }
    .back mat-icon { width: 18px; height: 18px; font-size: 18px; }
    h1 { margin: 20px 0 6px; font-size: 28px; font-weight: 500; letter-spacing: -0.01em; }
    p { margin: 0 0 16px; color: var(--muted); font-size: 14px; }
    p a { color: var(--text); border-bottom: 1px solid var(--line); }
    app-llm-frame { height: max(520px, calc(100dvh - 260px)); border: 1px solid var(--line); border-radius: 20px; padding: 8px; background: var(--tile); }
  `,
})
export class Llm {
  protected readonly session = inject(Session);
}
