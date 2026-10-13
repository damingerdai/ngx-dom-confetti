import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('renders navigation and a router outlet', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('app-nav-bar')).toBeTruthy();
    expect(element.querySelector('router-outlet')).toBeTruthy();
  });
});
