# Webpack React config

[![Dependency Status](https://img.shields.io/david/ReactJSResources/react-webpack-babel.svg)](https://david-dm.org/dylang/npm-check)

### What's inside

* React 16
* Webpack 3
* SASS
* Babel Cli
* Hot Module Reloading
* Jest 22

### Features

* Webpack configuration for development (with hot reloading) and production (with minification).
* CSS module loading, so you can include your css by ```import styles from './path/to.css';```.
* Both js(x) and css hot loaded during development.
* Sourcemaps for JS and CSS.
* CSS autoprefixing.
* Code Splitting ( app <-> vendor )

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

Wait for the browser to open

### To test
To run unit tests:

```
npm test
```

### To build the production package

```
npm run build
```

### ESLint
Standard - no exceptions