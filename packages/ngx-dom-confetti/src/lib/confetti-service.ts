import { coerceElement } from '@angular/cdk/coercion';

import { ElementRef, Injectable, DOCUMENT, inject } from '@angular/core';
import { ConfettiRenderer } from './confetti-renderer';
import { ConfettiConfig, NGX_CONFETTI_GLOBAL_CONFIG } from './config';

@Injectable()
export class NgxDomConfettiService {
  private _confettiRenderer: ConfettiRenderer;

  private _globalConfig: ConfettiConfig;

  constructor() {
    const document = inject<Document>(DOCUMENT, { optional: true })!;
    const globalConfig = inject<ConfettiConfig>(NGX_CONFETTI_GLOBAL_CONFIG);

    this._confettiRenderer = new ConfettiRenderer(document);
    this._globalConfig = globalConfig;
  }

  public open(el: HTMLElement | ElementRef, config?: Partial<ConfettiConfig>) {
    this._confettiRenderer.launch(
      coerceElement(el),
      config ?? this._globalConfig,
    );
  }
}
