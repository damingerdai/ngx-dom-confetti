import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxDomConfettiModule} from 'ngx-dom-confetti';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxDomConfettiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
