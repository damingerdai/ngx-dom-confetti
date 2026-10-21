import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { defaultsConfettiConfig } from 'ngx-dom-confetti';
import { routes } from '../../app.routes';
import { ApiReferenceComponent } from './api-reference.component';

describe('API reference route', () => {
  it('loads the reference and documents every shipped default', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/api-reference', ApiReferenceComponent);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('API Reference');
    const names = component.configRows.map(row => row.name);
    for (const name of Object.keys(defaultsConfettiConfig)) {
      expect(names).toContain(name);
    }
    expect(names).toContain('decay');
    for (const section of component.sections) {
      expect(harness.routeNativeElement?.querySelector(`#${section.id}`)).toBeTruthy();
    }
  });
});
