import { Injectable } from '@angular/core';
import { confetti, ConfettiConfig, defaultsConfettiConfig } from './confetti';

@Injectable({
  providedIn: 'root'
})
export class NgxDomConfettiService {

  constructor() {
  }

  public open(el: HTMLElement, config?: Partial<ConfettiConfig>) {
    confetti(el, Object.assign(defaultsConfettiConfig, config));
  }
}
