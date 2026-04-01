import { Platform } from '@angular/cdk/platform';

import { Directive, ElementRef, NgZone, DOCUMENT, inject } from '@angular/core';
import { ConfettiRenderer } from './confetti-renderer';
import {
  ConfettiConfig,
  defaultsConfettiConfig,
  NGX_CONFETTI_GLOBAL_CONFIG,
} from './config';

@Directive({
  selector: '[confetti], [ngxConfetti]',
  exportAs: 'ngxConfetti',
})
export class NgxConfettiDirective {
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private ngZone = inject(NgZone);
  private platform = inject(Platform);

  private _globalConfig: ConfettiConfig;

  private _confettiRenderer: ConfettiRenderer;

  constructor() {
    const document = inject<Document>(DOCUMENT, { optional: true })!;
    const globalConfig = inject<ConfettiConfig>(NGX_CONFETTI_GLOBAL_CONFIG, {
      optional: true,
    });

    this._globalConfig = (globalConfig ||
      defaultsConfettiConfig) as ConfettiConfig;
    this._confettiRenderer = new ConfettiRenderer(document);
  }
  public launch(config?: Partial<ConfettiConfig>) {
    if (!this.platform.isBrowser) {
      return;
    }
    // const element = coerceElement(this._elementRef);
    this.ngZone.runOutsideAngular(() => {
      this._confettiRenderer.launch(
        this._elementRef.nativeElement,
        config ?? this._globalConfig,
      );
    });
  }
}
