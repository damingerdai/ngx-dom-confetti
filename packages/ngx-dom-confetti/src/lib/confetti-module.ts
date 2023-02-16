import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxConfettiDirective } from './confetti-drective';
import { NgxDomConfettiComponent } from './confetti-component';


@NgModule({
  declarations: [
    NgxDomConfettiComponent,
    NgxConfettiDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxDomConfettiComponent,
    NgxConfettiDirective
  ]
})
export class NgxDomConfettiModule { }
