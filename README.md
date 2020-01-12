templating-benchmarks
=====================

This project provides a framework for running benchmarks against multiple templating engines under Node.js. The following templating engine modules are currently integrated:

Template | Syntax | Streaming | Asynchronous | Auto-escape
---- | ---- | ---- | ---- | ----
[dustjs-linkedin](https://github.com/linkedin/dustjs) | Text | ✔ | ✔ | ✔
[doT](https://github.com/olado/doT) | Text | ✖ | ✖ | ✖
[handlebars](https://github.com/wycats/handlebars.js) | Text | ✖ | ✖ | ✔
[pug](https://github.com/pugjs/pug) | Short-hand HTML | ✖ | ✖ | ✔
[marko](https://github.com/marko-js/marko) | HTML/Concise HTML | ✔ | ✔ | ✔
[nunjucks](http://mozilla.github.io/nunjucks/) | Text | ✖ | ✔ | ✖
[react](https://facebook.github.io/react/)<sup>1</sup> | JSX | ✖ | ✖ | ✔
[swig](http://mozilla.github.io/nunjucks/) | Text | ✖ | ✖ | ✔

NOTE 1: While React is not a "templating engine", it is commonly used to render HTML on the server so it has been included in this benchmark.

# Table of Contents

- [Run Benchmarks](#run-benchmarks)
- [Current Results](#current-results)
	- [Performance](#performance)
	- [Compiled Size](#compiled-size)
- [Client-side Runtime Sizes](#client-side-runtime-sizes)
	- [Marko](#marko)
	- [Dust](#dust)
- [Contribute](#contribute)
	- [Adding a New Comparison Group](#adding-a-new-comparison-group)
	- [Adding a New Template Engine](#adding-a-new-template-engine)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Run Benchmarks

1. Clone this repository
2. `npm install`
3. `npm test` (or `make`)

# Current Results

The following results were collected with the following setup:

- Node.js v8.9.1
- MacBook Pro (Retina, 15-inch, Mid 2015)
- Processor: 2,2 GHz Intel Core i7
- Memory: 16 GB 1600 MHz DDR3

## Performance

Higher numbers are better.

<!-- <performance> -->
```
                      RUNTIME PERFORMANCE
                      ===================
                      friends
                     ✓ es6 »   18,071 op/s (fastest)
                   ✗ marko »    2,738 op/s (84.85% slower)
                    ✗ dust »    1,262 op/s (93.02% slower)

                      if-expression
                     ✓ es6 »  866,489 op/s (fastest)
                     ✗ pug »  545,016 op/s (37.10% slower)
                   ✗ marko »  273,943 op/s (68.38% slower)
                    ✗ jade »   95,984 op/s (88.92% slower)

                      projects-escaped
              ✓ handlebars »   38,948 op/s (fastest)
                    ✗ dust »   36,845 op/s (5.40% slower)
                   ✗ marko »   25,774 op/s (33.82% slower)
      ✗ marko (native-for) »   14,999 op/s (61.49% slower)

                      projects-unescaped
                     ✓ es6 »  369,363 op/s (fastest)
      ✗ marko (native-for) »  239,117 op/s (35.26% slower)
                   ✗ marko »  219,355 op/s (40.61% slower)
                    ✗ dust »  121,383 op/s (67.14% slower)
              ✗ handlebars »   80,487 op/s (78.21% slower)

                      reverse-helper
                    ✓ dust »  388,540 op/s (fastest)
                   ✗ marko »  342,415 op/s (11.87% slower)

                      search-results
                   ✓ marko »   19,911 op/s (fastest)
                    ✗ dust »   14,530 op/s (27.03% slower)

                      simple-0
                     ✓ es6 »  452,559 op/s (fastest)
                     ✗ pug »  341,250 op/s (24.60% slower)
                  ✗ lodash »  305,446 op/s (32.51% slower)
                   ✗ marko »  283,025 op/s (37.46% slower)
                    ✗ dust »  253,595 op/s (43.96% slower)

                      simple-1
                     ✓ es6 »  714,086 op/s (fastest)
                     ✗ pug »  412,670 op/s (42.21% slower)
                     ✗ dot »  292,596 op/s (59.03% slower)
                    ✗ swig »  162,291 op/s (77.27% slower)
                   ✗ marko »  129,837 op/s (81.82% slower)
                    ✗ dust »  120,406 op/s (83.14% slower)
                    ✗ jade »   80,326 op/s (88.75% slower)
              ✗ handlebars »   75,251 op/s (89.46% slower)
                ✗ nunjucks »   48,923 op/s (93.15% slower)
                     ✗ vue »   26,128 op/s (96.34% slower)
                   ✗ react »    3,619 op/s (99.49% slower)

                      simple-2
                     ✓ es6 »  605,618 op/s (fastest)
                     ✗ pug »  446,262 op/s (26.31% slower)
                   ✗ marko »  242,928 op/s (59.89% slower)
                    ✗ dust »  141,255 op/s (76.68% slower)

                      ui-components
                   ✓ marko »   73,607 op/s (fastest)
                   ✗ react »    3,828 op/s (94.80% slower)
```
<!-- </performance> -->

## Compiled Size

Lower numbers are better.

<!-- <size> -->
```
                      COMPILED SIZE (gzipped/uncompressed)
                      ====================================
                      friends
                    ✓ dust »   488 bytes gzipped    1361 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   759 bytes gzipped    2256 bytes uncompressed
                                   35.70% larger              39.67% larger

                      if-expression
                    ✓ jade »   387 bytes gzipped    1049 bytes uncompressed
                                      (smallest)               0.38% larger
                   ✗ marko »   457 bytes gzipped    1045 bytes uncompressed
                                   15.32% larger                 (smallest)
                     ✗ pug »   925 bytes gzipped    2198 bytes uncompressed
                                   58.16% larger              52.46% larger

                      projects-escaped
                    ✓ dust »   260 bytes gzipped     546 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   545 bytes gzipped    1610 bytes uncompressed
                                   52.29% larger              66.09% larger
      ✗ marko (native-for) »   560 bytes gzipped    1606 bytes uncompressed
                                   53.57% larger              66.00% larger
              ✗ handlebars »   722 bytes gzipped    2218 bytes uncompressed
                                   63.99% larger              75.38% larger

                      projects-unescaped
                    ✓ dust »   265 bytes gzipped     578 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   528 bytes gzipped    1541 bytes uncompressed
                                   49.81% larger              62.49% larger
      ✗ marko (native-for) »   544 bytes gzipped    1537 bytes uncompressed
                                   51.29% larger              62.39% larger
              ✗ handlebars »   703 bytes gzipped    2250 bytes uncompressed
                                   62.30% larger              74.31% larger

                      reverse-helper
                    ✓ dust »   146 bytes gzipped     310 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   330 bytes gzipped     781 bytes uncompressed
                                   55.76% larger              60.31% larger

                      search-results
                    ✓ dust »   543 bytes gzipped    1500 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   723 bytes gzipped    1904 bytes uncompressed
                                   24.90% larger              21.22% larger

                      simple-0
                    ✓ dust »   170 bytes gzipped     232 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   296 bytes gzipped     590 bytes uncompressed
                                   42.57% larger              60.68% larger
                     ✗ pug »   424 bytes gzipped     783 bytes uncompressed
                                   59.91% larger              70.37% larger

                      simple-1
                   ✓ react »   392 bytes gzipped     842 bytes uncompressed
                                      (smallest)               7.01% larger
                    ✗ dust »   409 bytes gzipped     867 bytes uncompressed
                                    4.16% larger               9.69% larger
                     ✗ dot »   491 bytes gzipped     783 bytes uncompressed
                                   20.16% larger                 (smallest)
                    ✗ jade »   522 bytes gzipped    1116 bytes uncompressed
                                   24.90% larger              29.84% larger
                   ✗ marko »   588 bytes gzipped    1373 bytes uncompressed
                                   33.33% larger              42.97% larger
                ✗ nunjucks »   603 bytes gzipped    1361 bytes uncompressed
                                   34.99% larger              42.47% larger
              ✗ handlebars »   777 bytes gzipped    1999 bytes uncompressed
                                   49.55% larger              60.83% larger
                    ✗ swig »   779 bytes gzipped    3282 bytes uncompressed
                                   49.68% larger              76.14% larger
                     ✗ pug »  1064 bytes gzipped    2363 bytes uncompressed
                                   63.16% larger              66.86% larger

                      simple-2
                    ✓ dust »   266 bytes gzipped     634 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   427 bytes gzipped    1057 bytes uncompressed
                                   37.70% larger              40.02% larger
                     ✗ pug »   603 bytes gzipped    1549 bytes uncompressed
                                   55.89% larger              59.07% larger

                      ui-components
                   ✓ react »   204 bytes gzipped     310 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   319 bytes gzipped     723 bytes uncompressed
                                   36.05% larger              57.12% larger
```
<!-- </size> -->

# Client-side Runtime Sizes

Below are the approximate runtime sizes for each engine (lower numbers are better):

## Marko

| Modules        | Size |
| ------------- |:-------------:| -----:|
| `marko` | ~1.2KB gzipped (2.7KB uncompressed) |
| `marko` +<br>`async-writer` + <br>`raptor-xml/util` | ~2.33KB gzipped (6.3KB uncompressed) |

_NOTE:_ Sizes are approximate because overhead associated with the CommonJS module loader varies. Size based on code as of April 7, 2014.

## Dust

| Modules        | Size |
| ------------- |:-------------:| -----:|
| `dust-core` | 3.41KB gzipped (10.07KB uncompressed) |
| `dust-core` +<br>`dust-helpers` | 4.7KB gzipped (14.2KB uncompressed) |

_NOTE:_ Size based on code as of April 7, 2014.

# Contribute

## Adding a New Comparison Group

Each comparison group should contain a data file (either `data.json` or `data.js`) and a set of templates to compare. The file extension of the template will be used to determine which engine should be used. If the data file has the `.js` extension then it should be a JavaScript module that exports the data. A sample directory structure is shown below:

```
templates
    ├── group1
    │   ├── data.js
    │   ├── template.dust
    │   └── template.marko
    ├── group2
    │   ├── data.json
    │   ├── template.dust
    │   └── template.marko
    ├── group3
    │   ├── data.json
    │   ├── template.dust
    │   ├── template.native-for.marko
    │   └── template.marko
    └── group4
        ├── data.json
        ├── template.dust
        └── template.marko
```

## Adding a New Template Engine

To register a new templating engine, simply create a new module under the `engines` directory and it will automatically be loaded. See existing engine modules for supported methods and properties.

Pull Requests welcome!
