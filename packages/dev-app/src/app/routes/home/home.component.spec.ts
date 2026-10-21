import { vi } from 'vitest';
import { NgxDomConfettiService, provideConfetti } from 'ngx-dom-confetti';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [NgxDomConfettiService, provideConfetti()]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('derives configuration from the initial form values and subsequent edits', () => {
    expect(component.config()).toMatchObject({
      angle: 90,
      width: '10px',
      height: '10px',
      perspective: 'none',
    });
    component.form.patchValue({ width: 20, height: 15, perspective: 100 });
    expect(component.config()).toMatchObject({
      width: '20px',
      height: '15px',
      perspective: '100px',
    });
  });

  it('disables perspective again after changing it back to zero', () => {
    component.form.patchValue({ perspective: 800 });
    expect(component.config().perspective).toBe('800px');
    component.form.patchValue({ perspective: 0 });
    expect(component.config().perspective).toBe('none');
  });

  it('renders service and directive bursts without perspective by default', () => {
    vi.useFakeTimers();
    try {
      component.hitWithService();
      component.hitWithDirective();
      const targets = fixture.nativeElement.querySelectorAll('.actions button') as NodeListOf<HTMLButtonElement>;
      for (const target of targets) {
        expect(target.style.perspective).toBe('none');
        const particles = target.querySelectorAll(':scope > div');
        expect(particles.length).toBe(50);
        expect((particles[0] as HTMLElement).style.width).toBe('10px');
      }
      vi.advanceTimersByTime(3200);
      for (const target of targets) {
        expect(target.querySelectorAll(':scope > div').length).toBe(0);
      }
    } finally {
      vi.useRealTimers();
    }
  });

  it('updates visible values with OnPush when the form changes', async () => {
    fixture.autoDetectChanges();
    component.form.patchValue({ angle: 180 });
    await fixture.whenStable();
    const value: HTMLOutputElement = fixture.nativeElement.querySelector('output[for="angle"]');
    expect(value.textContent).toContain('180');
  });

  it('passes the current configuration to the service and directive', () => {
    const serviceLaunch = vi.spyOn(component.ngxDomConfettiService, 'open').mockImplementation(() => undefined);
    const directiveLaunch = vi.spyOn(component.confettiDirective()!, 'launch').mockImplementation(() => undefined);
    component.form.patchValue({ elementCount: 80, spread: 120 });
    component.hitWithService();
    component.hitWithDirective();
    expect(serviceLaunch).toHaveBeenCalledWith(component.btn().nativeElement, component.config());
    expect(directiveLaunch).toHaveBeenCalledWith(component.config());
  });

  it('resolves the service target and directive through signal queries', () => {
    expect(component.btn().nativeElement.tagName).toBe('BUTTON');
    expect(component.confettiDirective()).toBeTruthy();
  });

});
