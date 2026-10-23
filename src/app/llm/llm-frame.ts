import { Component, ElementRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * The LLM monitor on costaserver (llm-monitor.service, owned by the costaserver repo), reachable only
 * from devices in the tailnet. Contract: ?embed=1 is the compact card on a transparent background
 * with the details folding out inside it; the page posts {llmMonitorHeight} to its parent whenever
 * its content changes size.
 */
@Component({
  selector: 'app-llm-frame',
  template: `<iframe
    #frame
    [src]="src()"
    [style.height.px]="height() || 480"
    title="LLM activity on costaserver"
    allow="local-network-access"
    loading="lazy"
  ></iframe>`,
  styles: `
    :host { display: block; }
    /* The monitor page declares no color-scheme (= light); a dark iframe would get an opaque white backdrop */
    iframe { display: block; width: 100%; border: 0; border-radius: var(--radius-child); color-scheme: light; transition: height 0.2s ease; }
  `,
  host: { '(window:message)': 'resize($event)' },
})
export class LlmFrame {
  readonly url = input.required<string>();

  protected readonly height = signal(0);

  private readonly frame = viewChild.required<ElementRef<HTMLIFrameElement>>('frame');
  private readonly sanitizer = inject(DomSanitizer);

  // The URL comes from the admin-only Firestore document, not from user input
  protected readonly src = computed(() => {
    const url = new URL(this.url());
    url.searchParams.set('embed', '1');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.toString());
  });

  resize(event: MessageEvent) {
    if (event.origin !== new URL(this.url()).origin) return;
    if (event.source !== this.frame().nativeElement.contentWindow) return;
    const height = event.data?.llmMonitorHeight;
    if (typeof height === 'number' && height > 0) this.height.set(Math.ceil(height));
  }
}
