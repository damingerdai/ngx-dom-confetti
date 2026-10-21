import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfettiRenderer } from './confetti-renderer';
import { NGX_CONFETTI_GLOBAL_CONFIG } from './config';

import { NgxDomConfettiComponent } from './confetti-component';

describe('NgxDomConfettiComponent', () => {
  let component: NgxDomConfettiComponent;
  let fixture: ComponentFixture<NgxDomConfettiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NgxDomConfettiComponent ],
      providers: [{ provide: NGX_CONFETTI_GLOBAL_CONFIG, useValue: { spread: 70 } }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDomConfettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('launches after activation with all inputs applied, regardless of input order', async () => {
    const launch = spyOn(ConfettiRenderer.prototype, 'launch');
    fixture.componentRef.setInput('active', true);
    fixture.componentRef.setInput('config', { elementCount: 12 });
    await fixture.whenStable();

    expect(launch).toHaveBeenCalledOnceWith(fixture.nativeElement, {
      spread: 70,
      elementCount: 12,
    });
  });

  it('retains partial configuration without relaunching until reactivated', async () => {
    const launch = spyOn(ConfettiRenderer.prototype, 'launch');
    fixture.componentRef.setInput('config', { elementCount: 12 });
    fixture.componentRef.setInput('active', true);
    await fixture.whenStable();

    fixture.componentRef.setInput('config', { angle: 30 });
    await fixture.whenStable();
    expect(launch).toHaveBeenCalledTimes(1);

    fixture.componentRef.setInput('active', false);
    await fixture.whenStable();
    fixture.componentRef.setInput('active', true);
    await fixture.whenStable();
    expect(launch).toHaveBeenCalledTimes(2);
    expect(launch).toHaveBeenCalledWith(fixture.nativeElement, {
      spread: 70,
      elementCount: 12,
      angle: 30,
    });
  });

  it('coerces boolean inputs and ignores empty configuration', async () => {
    const launch = spyOn(ConfettiRenderer.prototype, 'launch');
    fixture.componentRef.setInput('active', 'false');
    fixture.componentRef.setInput('config', null);
    await fixture.whenStable();
    expect(launch).not.toHaveBeenCalled();

    fixture.componentRef.setInput('active', '');
    await fixture.whenStable();
    expect(launch).toHaveBeenCalledOnceWith(fixture.nativeElement, { spread: 70 });
  });

});
