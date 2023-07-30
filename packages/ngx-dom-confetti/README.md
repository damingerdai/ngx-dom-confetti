# Ngx Dom Confetti

[Dom Confetti](https://www.npmjs.com/package/dom-confetti) for Angular

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
