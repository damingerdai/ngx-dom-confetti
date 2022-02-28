import { TestBed } from '@angular/core/testing';

import { NgxDomConfettiService } from './ngx-dom-confetti.service';

describe('NgxDomConfettiService', () => {
  let service: NgxDomConfettiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDomConfettiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
