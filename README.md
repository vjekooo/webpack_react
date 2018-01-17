# Webpack React config

[![Dependency Status](https://img.shields.io/david/ReactJSResources/react-webpack-babel.svg)](https://david-dm.org/dylang/npm-check)

### What's inside

* React 16
* Webpack 3
* SASS
* Babel
* Hot Module Replacement
* Jest 22
* ESLint

### Features

* Webpack configuration for development (with hmr) and production (with minification).
* Both js(x) and css hot loaded during development.
* Babel with class properties and object rest spread (Stage 3 proposals for ECMAScript).
* Sourcemaps for JS and CSS.
* CSS autoprefixing and extraction to a separate file.
* Code Splitting ( app <-> vendor ).
* ESLint - standard, no exceptions.

### To run

* Have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed on your system.
* Fork and clone the project:

```
git clone https://github.com/vjekooo/webpack_react
```

* Then install the dependencies:

```
npm install
```

* Run development server:

```
npm run dev
```

 * Wait for the browser to open

### To test
To run unit tests:

```
npm test
```

### To build the production package

```
npm run build
```
