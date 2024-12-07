import { makeEnvironmentProviders } from '@angular/core';
import {
  ConfettiConfig,
  defaultsConfettiConfig,
  NGX_CONFETTI_GLOBAL_CONFIG,
} from './config';

export function provideConfetti(config?: ConfettiConfig) {
  return makeEnvironmentProviders([
    {
      provide: NGX_CONFETTI_GLOBAL_CONFIG,
      useValue: config ?? defaultsConfettiConfig,
    },
  ]);
}
