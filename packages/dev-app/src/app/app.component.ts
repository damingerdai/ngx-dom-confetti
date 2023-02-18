import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfettiConfig, NgxDomConfettiService } from 'ngx-dom-confetti';
import { NgxConfettiDirective } from 'ngx-dom-confetti/confetti-directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  fb: FormBuilder = inject(FormBuilder);
  ngxDomConfettiService: NgxDomConfettiService = inject(NgxDomConfettiService);
  config!: Partial<ConfettiConfig>;
  @ViewChild('btn', { read: ElementRef })
  btn!: ElementRef<HTMLButtonElement>;

  @ViewChild(NgxConfettiDirective) confettiDirective!: NgxConfettiDirective;

  active: boolean;

  colorPresets = [
    {
      label: 'Celebration',
      value: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    },
    {
      label: 'Monochrome',
      value: ["#000", "#333", "#666"],
    },
    {
      label: 'Poker',
      value: ["#000", "#f00"],
    },
    {
      label: 'RGB',
      value: ["#f00", "#0f0", "#00f"]
    }
  ]

  form: FormGroup = this.fb.group({
    angle: [90],
    spread: [45],
    startVelocity: [45],
    elementCount: [50],
    dragFriction: [0.1],
    duration: [3000],
    stagger: [0],
    width: [10],
    height: [10],
    perspective: [0],
    colors: [this.colorPresets[0].value]
  });

  constructor() {
    this.form.valueChanges.subscribe((config) => {
      this.config = {
        ...config,
        width: config.width + 'px',
        height: config.height + 'px',
        perspective: config.perspective + 'px'
      }
    });

    this.active = false;
  }

  hitWithOutService() {
    this.active = true;

    setTimeout(() => {
      this.active = false;
    }, 10);
  }

  hitWithService() {
    const el = this.btn.nativeElement.children.item(0) as HTMLElement;
    if (el) {
      this.ngxDomConfettiService.open(el,this.config);
    }

  }

  hitWithDirective() {
    this.confettiDirective?.launch();
  }
}
