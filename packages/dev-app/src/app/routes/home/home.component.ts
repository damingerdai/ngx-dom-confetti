
import { Component, ElementRef, inject, computed, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfettiConfig, NgxDomConfettiModule, NgxDomConfettiService } from 'ngx-dom-confetti';
import { NgxConfettiDirective } from 'ngx-dom-confetti';
import { SharedModule } from '../../shared/shared.module';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    NgxDomConfettiModule,
    SharedModule
]
})
export class HomeComponent {

  fb: FormBuilder = inject(FormBuilder);
  ngxDomConfettiService: NgxDomConfettiService = inject(NgxDomConfettiService);
  readonly btn = viewChild.required<unknown, ElementRef<HTMLButtonElement>>('btn', { read: ElementRef });
  readonly confettiDirective = viewChild(NgxConfettiDirective);
  readonly active = signal(false);

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

  private readonly formValue = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });

  readonly config = computed<Partial<ConfettiConfig>>(() => {
    const config = this.formValue();
    return {
      ...config,
      width: config.width + 'px',
      height: config.height + 'px',
      perspective: config.perspective + 'px',
    };
  });

  hitWithOutService() {
    this.active.set(true);

    setTimeout(() => {
      this.active.set(false);
    }, 10);
  }

  hitWithService() {
    const el = this.btn().nativeElement.children.item(0) as HTMLElement;
    if (el) {
      this.ngxDomConfettiService.open(el, this.config());
    }

  }

  hitWithDirective() {
    this.confettiDirective()?.launch();
  }

}
