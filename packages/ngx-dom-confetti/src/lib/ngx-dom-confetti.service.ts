import { Injectable } from '@angular/core';
import { confetti, ConfettiConfig } from './confetti';

@Injectable({
  providedIn: 'root'
})
export class NgxDomConfettiService {

  constructor() {
  }

  public open(el: HTMLElement, config?: Partial<ConfettiConfig>) {
    confetti(el, config);
  }
}
