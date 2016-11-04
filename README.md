# PostCSS Border 9-patch

[PostCSS] plugin to generate 9-patch like border styles.

[PostCSS]: https://github.com/postcss/postcss

## Introduction

This plugin aims to bring a convenient conversion to border image styles for 9-patch effects.
In Android we have a bunch of 9-patch toolsets; in iOS we have `UIimage.resizableImageWithCapInsets`.
In CSS, 9-patch is achieved via appropriate combinations of `border-width`, `border-image-source` and `border-image-slice` rules.

## Example

```css
.bg {
    /* Input example */

    border-9-patch: url('bg.png') 110px 114px 52px 50px 50px 48px;
}
```

```css
.foo {
    /* Output example */

    border-style: solid;
    border-color: transparent;
    border-image-source: url('bg.png');
    /* image dimension: 110px x 114px */
    border-width: 52px 50px 50px 48px;
    border-image-slice: 45.61% 45.45% 43.86% 43.64%;
}
```

## Usage

```js
postcss([ require('postcss-border-9-patch') ])
```

See [PostCSS] docs for examples for your environment.

## TODO

* Fulfill introduction
* Improve API
* Error handling

## License

[MIT License](https://opensource.org/licenses/MIT)
