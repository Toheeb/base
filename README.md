# Base

Base provides you with the following two files with many benefits.

## A classless stylesheet.

```html
<link rel="stylesheet" href="https://unpkg.com/@toheeb/base@3.0.0-alpha.0/base.css">
```
You can use this sheet as-is, and get a readable page your users can personalize. 

You can also turn it to a reset stylesheet to power custom styles.

```css
:root {

  /* remove line heights */
  --line-lead: 0;

  /* remove paragraph pads */
  --lh-pad: 0;

  /* remove lines */
  --border-width: 0;

  /* remove markers */
  --content: none;
}
```

## A Content Script

This script helps you create richer content out-of-the box. Currently, you can do tabs, and enclosures.

Besides, it comes with utility methods like `matchContainer`. A method simulating matchMedia for containers. You'll need this because, per True Web Design, for fully-responsive designs, media queries can't help, but container query can.

In legacy browsers, you can load it as shown below.

```html
<head>
  <script src="https://unpkg.com/@toheeb/base@3.0.0-alpha.0/dist/base.umd.js"></script>

  <script>

    // Initialize rich content methods
    window.base.init_all();

    // Use an utility (matchMedia)
    window.base.utils.matchMedia(...);

  </script>
</head>
```

In modern browsers, you can use the import syntax like below

```html
<head>
  <script type='module'>
    import { base } from 'https://unpkg.com/@toheeb/base@3.0.0-alpha.0/dist/base.js';

    // Initialize rich content methods
    base.init_all();

    // Use an utility (matchMedia)
    base.utils.matchMedia(...);
  </script>

</head>
```

In Node.js, can do below

```js
  import {base} from '@toheeb/base';

  // Initialize rich content methods
  base.init_all();

  // Use an utility (matchMedia)
  base.utils.matchMedia(...)
```

