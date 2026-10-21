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

  it('resolves the service target and directive through signal queries', () => {
    expect(component.btn().nativeElement.tagName).toBe('BUTTON');
    expect(component.confettiDirective()).toBeTruthy();
  });

});
