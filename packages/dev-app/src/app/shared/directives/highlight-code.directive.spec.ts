import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightCodeDirective } from './highlight-code.directive';

@Component({
  standalone: false,
  template: '<code highlight>const answer = 42;</code>',
})
class TestHostComponent {}

describe('HighlightCodeDirective', () => {
  it('attaches to code elements with its injected dependencies', () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, HighlightCodeDirective],
    });
    const fixture = TestBed.createComponent(TestHostComponent);
    const code = fixture.debugElement.query(By.directive(HighlightCodeDirective));
    expect(code.injector.get(HighlightCodeDirective)).toBeTruthy();
  });
});
