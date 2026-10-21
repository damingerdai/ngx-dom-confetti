import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideComponent } from './guide.component';

describe('GuideComponent', () => {
  let component: GuideComponent;
  let fixture: ComponentFixture<GuideComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GuideComponent]
    });
    fixture = TestBed.createComponent(GuideComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
