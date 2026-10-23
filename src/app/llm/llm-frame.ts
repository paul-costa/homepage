import { Component, booleanAttribute, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/** The LLM monitor on costaserver (llm-monitor.service); reachable only from devices in the tailnet */
@Component({
  selector: 'app-llm-frame',
  template: `<iframe [src]="src()" title="LLM activity on costaserver" allow="local-network-access" loading="lazy"></iframe>`,
  styles: `
    :host { display: block; }
    iframe { display: block; width: 100%; height: 100%; border: 0; border-radius: 12px; color-scheme: dark; }
  `,
})
export class LlmFrame {
  readonly url = input.required<string>();
  /** the monitor's compact layout (?embed=1) */
  readonly compact = input(false, { transform: booleanAttribute });

  private readonly sanitizer = inject(DomSanitizer);

  // The URL comes from the admin-only Firestore document, not from user input
  protected readonly src = computed(() => {
    const url = new URL(this.url());
    if (this.compact()) url.searchParams.set('embed', '1');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.toString());
  });
}
