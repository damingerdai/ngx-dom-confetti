import {
  BooleanInput,
  coerceBooleanProperty,
  coerceElement,
} from '@angular/cdk/coercion';

import { Component, ElementRef, Input, DOCUMENT, inject } from '@angular/core';

import { ConfettiRenderer } from './confetti-renderer';
import { ConfettiConfig, NGX_CONFETTI_GLOBAL_CONFIG } from './config';

@Component({
  selector: 'ngx-dom-confetti',
  template: ` <ng-content></ng-content> `,
  styles: [],
})
export class NgxDomConfettiComponent {
  private el = inject(ElementRef);

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

  constructor() {
    const document = inject<Document>(DOCUMENT, { optional: true })!;
    const globalConfig = inject<ConfettiConfig>(NGX_CONFETTI_GLOBAL_CONFIG, {
      optional: true,
    });

    this._config = {
      ...globalConfig,
    };
    this._confettiRenderer = new ConfettiRenderer(document);
    this._active = false;
  }
}
