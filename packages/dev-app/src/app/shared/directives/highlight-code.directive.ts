import { AfterContentInit, AfterViewInit, Directive, ElementRef, HostBinding, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';

@Directive({
  selector: 'code[highlight]',
})
export class HighlightCodeDirective implements AfterViewInit, AfterContentInit {

  // @HostBinding("innerHtml")
  // content!: string

  constructor(private el: ElementRef, private sanitizer: DomSanitizer) { }

  ngAfterContentInit(): void {
    //console.log(this.content)
  }

  ngAfterViewInit() {
    // console.log(this.content)
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
