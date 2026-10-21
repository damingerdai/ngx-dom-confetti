import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  input,
  untracked,
} from '@angular/core';

import { ConfettiRenderer } from './confetti-renderer';
import { ConfettiConfig, NGX_CONFETTI_GLOBAL_CONFIG } from './config';

@Component({
  selector: 'ngx-dom-confetti',
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class NgxDomConfettiComponent {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = new ConfettiRenderer(inject(DOCUMENT));
  private configSnapshot: Partial<ConfettiConfig> = {
    ...inject(NGX_CONFETTI_GLOBAL_CONFIG, { optional: true }),
  };

  readonly config = input<Partial<ConfettiConfig> | null>();
  readonly active = input(false, { transform: coerceBooleanProperty });

  constructor() {
    let wasActive = false;
    afterRenderEffect(() => {
      // Retain the existing cumulative partial-configuration behavior.
      this.configSnapshot = { ...this.configSnapshot, ...this.config() };
      const active = this.active();
      if (active && !wasActive) {
        untracked(() => this.renderer.launch(this.el.nativeElement, this.configSnapshot));
      }
      wasActive = active;
    });
  }
}
