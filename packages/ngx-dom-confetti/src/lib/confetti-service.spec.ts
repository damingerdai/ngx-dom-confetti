import { TestBed } from '@angular/core/testing';

import { provideConfetti } from './confetti-provider';

import { NgxDomConfettiService } from './confetti-service';

describe('NgxDomConfettiService', () => {
  let service: NgxDomConfettiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxDomConfettiService, provideConfetti()],
    });
    service = TestBed.inject(NgxDomConfettiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
