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
import { NgxDomConfettiModule} from 'ngx-dom-confetti';

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

```html
<button mat-raised-button color="primary">
  <ngx-dom-confetti>
    Hit Me!
  </ngx-dom-confetti>
</button>
```

# license

[MIT](https://github.com/damingerdai/ngx-dom-confetti/blob/master/LICENSE)
