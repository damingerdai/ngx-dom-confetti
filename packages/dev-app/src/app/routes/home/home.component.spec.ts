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
      perspective: '0px',
    });
    component.form.patchValue({ width: 20, height: 15, perspective: 100 });
    expect(component.config()).toMatchObject({
      width: '20px',
      height: '15px',
      perspective: '100px',
    });
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
