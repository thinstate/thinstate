# thinstate

Javascript state management for modern web | redux inspired | < 2kB | super simple | 0 dependency.

A peer dependency of [https://www.npmjs.com/package/web-essential-utils](https://www.npmjs.com/package/web-essential-utils) with few general purpose js util functions for production apps.

To install, if using yarn:

`yarn add thinstate`

If using npm:

`npm install thinstate`

To use in code:

Docs to be updated.

## Editor Configuration

- Editor of your preference. I used some VSCode specific config in .vscode folder and recommend plugins for enhanced experience.

Recommended VSCode Extensions:

- Prettier (Official) - Code formatter
- ESLint (Official) - Real time JS syntax validation

## Technologies Used

- Rollup.js
- Typescript + ESM
- Yarn
- Prettier + ESlint
- Jest lint setup, jest can be added
- Built on boilerplate [https://github.com/n10l/ts-lib-boilerplate](https://github.com/n10l/ts-lib-boilerplate)

## Available Scripts [For development]

In the project directory, you can run:

### `yarn build`

To build the project

### `yarn watch`

To build with livereload

### `yarn fix:all`

Runs prettier formatter followed by eslint, to format code and fix lint issues.
Prettier is not good enough to run alone, must always be followed lint fixes included in this command.
