import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDomConfettiComponent } from './confetti-component';

describe('NgxDomConfettiComponent', () => {
  let component: NgxDomConfettiComponent;
  let fixture: ComponentFixture<NgxDomConfettiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NgxDomConfettiComponent ]
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
});
