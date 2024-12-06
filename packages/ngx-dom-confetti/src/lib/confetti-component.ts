import { BooleanInput, coerceBooleanProperty, coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, Optional } from '@angular/core';

import { ConfettiRenderer } from './confetti-renderer';
import { ConfettiConfig, NGX_CONFETTI_GLOBAL_CONFIG } from './config';

@Component({
    selector: 'ngx-dom-confetti',
    template: ` <ng-content></ng-content> `,
    styles: [],
    standalone: false
})
export class NgxDomConfettiComponent {

  private _confettiRenderer: ConfettiRenderer;

  private _config: Partial<ConfettiConfig>;

  private _active: boolean;

  @Input()
  public set config(_config: Partial<ConfettiConfig>) {
    if (_config) {
      this._config = Object.assign(this._config, _config);
    }
  }

  @Input()
  public set active(_active: BooleanInput) {
    this._active = coerceBooleanProperty(_active);
    if (this._active) {
      this._confettiRenderer.launch(coerceElement(this.el), this._config);
    }
  }

  constructor(
    private el: ElementRef,
    @Optional() @Inject(DOCUMENT) document: any,
    @Optional() @Inject(NGX_CONFETTI_GLOBAL_CONFIG) globalConfig?: ConfettiConfig) {
    this._config = {
      ...globalConfig
    };
    this._confettiRenderer = new ConfettiRenderer(document);
    this._active = false;
  }
}
