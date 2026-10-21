import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
})
export class GuideComponent {
  readonly setupExample = `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideConfetti } from 'ngx-dom-confetti';

export const appConfig: ApplicationConfig = {
  providers: [provideConfetti()],
};`;

  readonly componentExample = `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgxDomConfettiComponent } from 'ngx-dom-confetti';

@Component({
  selector: 'app-celebration',
  imports: [NgxDomConfettiComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <button (click)="celebrate()">
      <ngx-dom-confetti [active]="active()">Celebrate</ngx-dom-confetti>
    </button>
  \`,
})
export class CelebrationComponent {
  readonly active = signal(false);

  celebrate() {
    this.active.set(true);
    setTimeout(() => this.active.set(false), 100);
  }
}`;

  readonly serviceExample = `import { Component, inject } from '@angular/core';
import { NgxDomConfettiService } from 'ngx-dom-confetti';

@Component({
  selector: 'app-service-demo',
  providers: [NgxDomConfettiService()],
  template: '<button #target (click)="confetti.open(target)">Celebrate</button>',
})
export class ServiceDemoComponent {
  readonly confetti = inject(NgxDomConfettiService);
}`;

  readonly directiveExample = `import { Component } from '@angular/core';
import { NgxConfettiDirective } from 'ngx-dom-confetti';

@Component({
  selector: 'app-directive-demo',
  imports: [NgxConfettiDirective],
  template: \`
    <button ngxConfetti #burst="ngxConfetti"
      (click)="burst.launch({ elementCount: 80, spread: 90 })">
      Celebrate
    </button>
  \`,
})
export class DirectiveDemoComponent {}`;
}
