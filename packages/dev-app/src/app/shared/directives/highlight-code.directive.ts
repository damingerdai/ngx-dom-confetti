import {
  AfterViewInit,
  Directive,
  ElementRef,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: 'code[highlight]',
  standalone: false,
})
export class HighlightCodeDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private sanitizer: DomSanitizer,
  ) {}

  ngAfterViewInit() {
    import('highlight.js').then((m) => {
      const text = (this.el.nativeElement as HTMLElement).innerHTML;
      const sanitzed = this.sanitizer.sanitize(SecurityContext.HTML, text);
      if (sanitzed) {
        m.default.highlightElement(this.el.nativeElement);
      }
    });
  }
}
