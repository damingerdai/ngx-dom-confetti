import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxConfettiDirective } from './confetti-directive';
import { NgxDomConfettiComponent } from './confetti-component';
import { NgxDomConfettiService } from './confetti-service';
import { defaultsConfettiConfig, NGX_CONFETTI_GLOBAL_CONFIG } from './config';


@NgModule({
  declarations: [
    NgxDomConfettiComponent,
    NgxConfettiDirective,

  ],
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide: NGX_CONFETTI_GLOBAL_CONFIG,
      useValue: defaultsConfettiConfig,
    },
    NgxDomConfettiService,
  ],
  exports: [
    NgxDomConfettiComponent,
    NgxConfettiDirective
  ]
})
export class NgxDomConfettiModule {

  static forRoot(): ModuleWithProviders<NgxDomConfettiModule> {
    return {
      ngModule: NgxDomConfettiModule,
      providers: [
        {
          provide: NGX_CONFETTI_GLOBAL_CONFIG,
          useValue: defaultsConfettiConfig,
        },
        NgxDomConfettiService,
      ],
    };
  }

  static forChild(): ModuleWithProviders<NgxDomConfettiModule> {
    return {
      ngModule: NgxDomConfettiModule,
      providers: [
        {
          provide: NGX_CONFETTI_GLOBAL_CONFIG,
          useValue: defaultsConfettiConfig,
        },
        NgxDomConfettiService,
      ],
    };
  }
 }
