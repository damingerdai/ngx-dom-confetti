import { coerceElement } from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { ConfettiRenderer } from './confetti-renderer';
import { ConfettiConfig, defaultsConfettiConfig, NGX_CONFETTI_GLOBAL_CONFIG } from './config';

@Directive({
  selector: '[confetti], [ngxConfetti]',
  exportAs: 'ngxConfetti',
})
export class NgxConfettiDirective {

  private _globalConfig: ConfettiConfig;

  private _confettiRenderer: ConfettiRenderer;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private platform: Platform,
    @Optional() @Inject(DOCUMENT) document: any,
    @Optional() @Inject(NGX_CONFETTI_GLOBAL_CONFIG) globalConfig?: ConfettiConfig,
  ) {
    this._globalConfig = (globalConfig || defaultsConfettiConfig) as ConfettiConfig;
    this._confettiRenderer = new ConfettiRenderer(document);
  }


  public launch(config?: Partial<ConfettiConfig>) {
    if (!this.platform.isBrowser) {
      return;
    }
    const element = coerceElement(this._elementRef);
    this.ngZone.runOutsideAngular(() => {
      this._confettiRenderer.launch(this._elementRef.nativeElement, config ?? this._globalConfig);
    })

  }

}
