import {
  AfterViewInit,
  Directive,
  ElementRef,
  PLATFORM_ID,
  SecurityContext,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: 'code[highlight]',
  standalone: false,
})
export class HighlightCodeDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    import('highlight.js').then((m) => {
      const text = (this.el.nativeElement as HTMLElement).innerHTML;
      const sanitzed = this.sanitizer.sanitize(SecurityContext.HTML, text);
      if (sanitzed) {
        m.default.highlightElement(this.el.nativeElement);
      }
    });
  }
}
