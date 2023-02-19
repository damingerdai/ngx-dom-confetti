import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, Optional } from '@angular/core';
import { ConfettiRenderer } from './confetti-renderer';
import { ConfettiConfig, NGX_CONFETTI_GLOBAL_CONFIG } from './config';

@Injectable()
export class NgxDomConfettiService {

  private _confettiRenderer: ConfettiRenderer;

  private _globalConfig: ConfettiConfig;

  constructor(
    @Optional() @Inject(DOCUMENT) document: any,
    @Inject(NGX_CONFETTI_GLOBAL_CONFIG) globalConfig: ConfettiConfig,
  ) {
    this._confettiRenderer = new ConfettiRenderer(document);
    this._globalConfig = globalConfig;
  }

  public open(el: HTMLElement | ElementRef, config?: Partial<ConfettiConfig>) {
    this._confettiRenderer.launch(
      coerceElement(el),
      config ?? this._globalConfig
    );
  }
}
