# Ngx Dom Confetti

[Dom Confetti](https://www.npmjs.com/package/dom-confetti) for Angular

## Compatibility

The upcoming 0.8.0 release supports Angular and Angular CDK `^22.1.6`.
Older Angular versions should use a compatible earlier library release.

# Install

for npm user

```bash
npm install ngx-dom-confetti
```

for yarn user

```bash
yarn add ngx-dom-confetti
```

for pnpm user

```bash
pnpm install ngx-dom-confetti
```

# Use

import `NgxDomConfettiModule` to `AppModule`

```ts
import { NgxDomConfettiModule } from 'ngx-dom-confetti';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    NgxDomConfettiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

use `ngx-dom-confetti`

The component's `active` and `config` inputs are readonly signals. Template
bindings keep the same names; call signals when passing values from a parent:

```html
<ngx-dom-confetti [active]="active()" [config]="config()">
  <button (click)="active.set(true)">Celebrate</button>
</ngx-dom-confetti>
```

Initialize parent state with `active = signal(false)` and
`config = signal<Partial<ConfettiConfig>>({ elementCount: 50 })`, importing
`signal` from `@angular/core` and `ConfettiConfig` from `ngx-dom-confetti`.
Set `active` to false and let Angular render before setting it to true again
for another burst. Launching happens after rendering in the browser.
Configuration updates merge into the previous configuration and do not launch
a burst by themselves.

For programmatic input updates, use Angular bindings or
`componentRef.setInput('active', true)` instead of assigning to the component's
input properties. Read component inputs with `component.active()` and
`component.config()`.


## component:

```html
<button mat-raised-button color="primary">
  <ngx-dom-confetti>
    Hit Me!
  </ngx-dom-confetti>
</button>
```

## service

```ts
@Component({
  selector: 'app-root',
  template: `
     <div class="center">
      <button #btn="matButton" mat-raised-button color="primary" (click)="hitWithService()">
        Hit Me with Service!
      </button>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngxDomConfettiService: NgxDomConfettiService = inject(NgxDomConfettiService);

  @ViewChild('btn', { read: ElementRef })
  btn!: ElementRef<HTMLButtonElement>;

  hitWithService() {
    const el = this.btn.nativeElement.children.item(0) as HTMLElement;
    if (el) {
      this.ngxDomConfettiService.open(el,this.config);
    }

  }
}

```

## directive

```ts
@Component({
  selector: 'app-root',
  template: `
     <div class="center">
      <button mat-raised-button color="primary" (click)="hitWithDirective()">
        Hit Me with Directive!
      </button>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngxDomConfettiService: NgxDomConfettiService = inject(NgxDomConfettiService);

  @ViewChild(NgxConfettiDirective) confettiDirective!: NgxConfettiDirective;

  hitWithDirective() {
    this.confettiDirective?.launch();
  }
}
```


# license

[MIT](https://github.com/damingerdai/ngx-dom-confetti/blob/master/LICENSE)
