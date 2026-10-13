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

## Releasing

Use Node.js 24.15 or newer within the 24.x line and npm. The release workflow uses
[npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) with GitHub
Actions OIDC instead of an `NPM_TOKEN` secret. Publishing requires npm 11.5.1 or newer.

Before the first OIDC release, configure a GitHub Actions trusted publisher in the
`ngx-dom-confetti` package settings on npmjs.com:

- Organization or user: `damingerdai`
- Repository: `ngx-dom-confetti`
- Workflow filename: `publish-npm.yaml` (without `.github/workflows/`)
- Environment name: leave empty, since the publishing job has no environment.
- Allowed actions: allow direct publishing with `npm publish`.

The publishing job grants `id-token: write` on a GitHub-hosted runner. After a
successful OIDC release, remove the unused repository `NPM_TOKEN` secret and revoke
the old npm token if no other workflow uses it.

### Manual release (recommended)

1. Merge the release changes into `master`.
2. Open **Actions → Publish to npm → Run workflow**, select `master`, and choose
   `patch`, `minor`, or `major`. From 0.7.1, select **minor** to publish **0.8.0**.
3. The workflow synchronizes root/library/lockfile versions, generates the
   changelog, and creates a local version commit and tag. It runs lint, unit tests,
   release-script tests, both builds, and an isolated consumer build of the `.tgz`.
4. Only after validation succeeds does it atomically push the commit and tag.
   It publishes that same tarball and creates a GitHub Release using the committed
   changelog entry. Concurrent releases are serialized.

The workflow needs permission to push release commits to `master` and create tags
and releases. If branch protection blocks this, use the version PR approach below;
do not bypass branch protection. Tags pushed with `GITHUB_TOKEN` do not start a
second workflow; the manual run continues through publication itself.

### Version PR / tag release

Run `npm run version:minor` (or `version:patch` / `version:major`) on a clean release
branch. This creates the synchronized version commit and local tag. Submit the
commit as a PR. Once merged, ensure the release tag points to the validated release
commit on `master`, then push that tag, for example `git push origin v0.8.0`.
With squash/rebase merges, recreate the **unpublished local tag** on the merged
commit first. The tag workflow checks versions and runs the same validation without
bumping again. Only stable `vX.Y.Z` releases are supported.

### Validation and recovery

Run `npm run lint`, `npm run test:ci`, `npm run test:release`, `npm run package`,
`npm run build`, and `npm run release:check`. Library tests require Chrome.
`npm run test:package -- /absolute/path/to/package.tgz` installs a tarball in a
throwaway project and builds the demo without workspace source aliases.

If publication fails after the version commit was pushed, use **Re-run failed jobs**
to reuse the validated artifact; do not request another version bump. If npm accepted
the package but the publish job lost its response, verify the published package and
finish the GitHub Release using the saved release notes/artifact instead of trying
to overwrite that npm version. If only GitHub Release creation fails, rerun that job.
