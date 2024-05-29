import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter, withInMemoryScrolling, withComponentInputBinding } from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";
import { NgxDomConfettiModule } from "ngx-dom-confetti";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(
        routes,
        withInMemoryScrolling({
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
        }),
        withComponentInputBinding(),
    ),
    importProvidersFrom(
      BrowserModule,
      NgxDomConfettiModule.forRoot(),
    )
  ]
}
