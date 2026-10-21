import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfettiConfig, defaultsConfettiConfig } from 'ngx-dom-confetti';

interface ConfigProperty {
  name: keyof ConfettiConfig;
  type: string;
  description: string;
}

@Component({
  selector: 'app-api-reference',
  imports: [RouterLink],
  templateUrl: './api-reference.component.html',
  styleUrl: './api-reference.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiReferenceComponent {
  readonly sections = [
    { id: 'component', label: 'Component' },
    { id: 'directive', label: 'Directive' },
    { id: 'service', label: 'Service' },
    { id: 'configuration', label: 'Configuration' },
    { id: 'providers', label: 'Providers & module' },
  ];

  private readonly properties: ConfigProperty[] = [
    { name: 'angle', type: 'number', description: 'Launch direction in degrees. 90 launches upward.' },
    { name: 'spread', type: 'number', description: 'Angular spread of the burst in degrees.' },
    { name: 'startVelocity', type: 'number', description: 'Initial speed. Each particle receives a randomized velocity based on this value.' },
    { name: 'elementCount', type: 'number', description: 'Number of particles in a burst.' },
    { name: 'width', type: 'string', description: 'Particle width as a CSS length, for example 10px.' },
    { name: 'height', type: 'string', description: 'Particle height as a CSS length, for example 10px.' },
    { name: 'perspective', type: 'string', description: 'CSS perspective applied to the host. Use none to disable it; 0px does not disable perspective.' },
    { name: 'colors', type: 'string[]', description: 'CSS colors, cycled through when creating particles. Supply a non-empty array.' },
    { name: 'duration', type: 'number', description: 'Animation duration in milliseconds.' },
    { name: 'stagger', type: 'number', description: 'Delay between particle starts in milliseconds. 0 starts the burst together.' },
    { name: 'dragFriction', type: 'number', description: 'Fraction of velocity removed each animation frame. Used when decay is not truthy.' },
    { name: 'decay', type: 'number', description: 'Legacy velocity multiplier per frame. A truthy value takes precedence over dragFriction. Required by the interface, but omitted from the shipped defaults.' },
    { name: 'random', type: '() => number', description: 'Random number generator. Return values from 0 (inclusive) to 1 (exclusive); useful for repeatable bursts.' },
  ];

  readonly configRows = this.properties.map(property => {
    const value = (defaultsConfettiConfig as Partial<ConfettiConfig>)[property.name];
    return {
      ...property,
      defaultValue: property.name === 'random' ? 'Math.random'
        : value === undefined ? 'Not set'
        : JSON.stringify(value),
    };
  });

  readonly componentExample = `<ngx-dom-confetti [active]="active()" [config]="config">
  Celebrate
</ngx-dom-confetti>`;
  readonly directiveExample = `<button ngxConfetti #burst="ngxConfetti"
  (click)="burst.launch({ elementCount: 80, perspective: 'none' })">
  Celebrate
</button>`;
  readonly serviceExample = `readonly confetti = inject(NgxDomConfettiService);

celebrate(target: HTMLElement) {
  this.confetti.open(target, { spread: 90, perspective: 'none' });
}`;
  readonly providerExample = `import { ApplicationConfig } from '@angular/core';
import { NgxDomConfettiService, provideConfetti } from 'ngx-dom-confetti';

export const appConfig: ApplicationConfig = {
  providers: [provideConfetti(), NgxDomConfettiService],
};`;
}
