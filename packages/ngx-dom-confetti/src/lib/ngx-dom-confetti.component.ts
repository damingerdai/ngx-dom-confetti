import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';

import { confetti, ConfettiConfig } from './confetti';

@Component({
  selector: 'ngx-dom-confetti',
  template: ` <ng-content></ng-content> `,
  styles: [],
})
export class NgxDomConfettiComponent implements OnInit {

  private _config:  Partial<ConfettiConfig>;

  @Input()
  public set config(_config: Partial<ConfettiConfig>) {
    if (_config) {
      this._config = Object.assign(this._config, _config);
    }

  }

  constructor(private el: ElementRef) {
    this._config =  {
      angle: 90,
      spread: 45,
      startVelocity: 45,
      elementCount: 50,
      width: "10px",
      height: "10px",
      perspective: "",
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
      duration: 3000,
      stagger: 0,
      dragFriction: 0.1,
      random: Math.random
  }
  }

  @HostListener('click')
  onClick() {
    confetti(this.el.nativeElement, this._config);
  }

  ngOnInit(): void {}
}
