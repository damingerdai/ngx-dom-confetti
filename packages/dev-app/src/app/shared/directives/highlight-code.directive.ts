import { AfterViewInit, Directive, ElementRef, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';

@Directive({
  selector: 'code[highlight]',
})
export class HighlightCodeDirective implements AfterViewInit {


  constructor(private el: ElementRef, private sanitizer: DomSanitizer) { }

  ngAfterViewInit() {
    const text = (this.el.nativeElement as HTMLElement).innerHTML;
    const sanitzed = this.sanitizer.sanitize(
      SecurityContext.HTML,
      text
    );
    if (sanitzed) {
      hljs.highlightElement(this.el.nativeElement);
    }

  }
}
