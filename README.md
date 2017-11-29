# SCSS & Js FE Compiling Boilerplate
### Using Gulp, Webpack 3, Babel, esLint, Stylelint, nGrok, PostCSS, BrowserSync and more

I'll continuously update this brining more documentation and features.

## Quick Setup

### Basic

```bash
# Install the Dependencies
yarn install

# Start the Watcher
yarn start
```

### With BrowserSync

```bash
# Install the Global Dependencies
yarn preinstall

# Install the dependencies
yarn install

# Start the watcher
yarn sync
```

### Essential Folder Structure
```
.
├─ config
│  ├─ .babelrc
│  ├─ webpack.common.js
│  ├─ webpack.dev.js
│  └─ webpack.prod.js
├─ public
│  ├─ favicons
│  ├─ fonts
│  └─ svg
├─ src
│  ├─ base
│  ├─ components
│  ├─ keyframes
│  ├─ layout
│  ├─ mixins
│  ├─ settings
│  ├─ vendor
│  ├─ main.js
│  └─ main.scss
├─ .eslintrc
├─ .stylelintrc
├─ gulpfile.js
├─ package.json
```
