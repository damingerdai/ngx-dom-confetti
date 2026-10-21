# Repository Guidelines

## Project Structure & Module Organization

- `packages/ngx-dom-confetti/src/lib/` contains the Angular confetti library: components, directives, service, renderer, and configuration. Export public APIs through `src/public-api.ts`.
- `packages/dev-app/src/app/` contains the demo and usage guide; static assets live in `packages/dev-app/src/assets/`, with global styles in `src/styles.scss`.
- Tests sit beside source files as `*.spec.ts`. Workspace build targets are configured in `angular.json`; generated packages and application bundles go into `dist/`.

## Build, Test, and Development Commands

Use Node.js 24, matching CI, and run commands from the repository root.

- `npm ci`: install dependencies from `package-lock.json`.
- `npm start`: serve the demo locally.
- `npm run build`: build the production demo.
- `npm run build:lib`: build the library with ng-packagr.
- `npm run package`: build the library and copy its license into the distribution.
- `npm run watch:lib`: rebuild the library when source files change.
- `npm run lint`: lint both projects with ESLint and Angular ESLint.

## Coding Style & Naming Conventions

Follow `.editorconfig`: two-space indentation, UTF-8, final newlines, and single quotes in TypeScript. Remove trailing whitespace from code. TypeScript and Angular templates use strict checking.

Use PascalCase for classes and camelCase for members. Follow nearby filenames: library files use names such as `confetti-service.ts`; demo components use `home.component.ts` with HTML and SCSS companions. Use `app-` component selectors in the demo and follow the library’s existing `ngx` selector conventions. Husky runs lint-staged before commits and commitlint for commit messages.

## Testing Guidelines

Both projects use Vitest. Run targeted suites:

- `npm test -- dev-app --watch=false`
- `npm test -- ngx-dom-confetti --watch=false`

Add adjacent `*.spec.ts` tests for behavior changes, using Angular TestBed where appropriate. No minimum coverage threshold is configured. CI currently runs lint and both builds; run affected tests locally and report failures.

## Commit & Pull Request Guidelines

Follow the Conventional Commit history: `feat: ...`, `fix: ...`, or `docs: ...`. Keep commits focused. For pull requests, explain the behavior change, link relevant issues, list validation performed, and include screenshots for visible demo changes. Before submission, run `npm run lint`, `npm run package`, and `npm run build`; update usage documentation when public APIs change.
