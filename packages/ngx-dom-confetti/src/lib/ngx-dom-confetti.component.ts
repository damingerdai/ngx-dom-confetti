import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

import { confetti } from './confetti';

@Component({
  selector: 'ngx-dom-confetti',
  template: ` <ng-content></ng-content> `,
  styles: [],
})
export class NgxDomConfettiComponent implements OnInit {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    confetti(this.el.nativeElement);
  }

  ngOnInit(): void {}
}
