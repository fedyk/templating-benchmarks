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
                     ✓ es6 »   12,488 op/s (fastest)
                   ✗ marko »    3,173 op/s (74.59% slower)
                    ✗ dust »      762 op/s (93.90% slower)

                      if-expression
                     ✓ es6 »  300,885 op/s (fastest)
                     ✗ pug »  248,302 op/s (17.48% slower)
                   ✗ marko »  173,221 op/s (42.43% slower)
                    ✗ jade »   62,813 op/s (79.12% slower)

                      projects-escaped
      ✓ marko (native-for) »   59,800 op/s (fastest)
                   ✗ marko »   55,125 op/s (7.82% slower)
              ✗ handlebars »   49,328 op/s (17.51% slower)
                    ✗ dust »   32,399 op/s (45.82% slower)

                      projects-unescaped
                     ✓ es6 »  180,115 op/s (fastest)
      ✗ marko (native-for) »  121,077 op/s (32.78% slower)
              ✗ handlebars »  119,540 op/s (33.63% slower)
                   ✗ marko »  118,969 op/s (33.95% slower)
                    ✗ dust »   85,755 op/s (52.39% slower)

                      reverse-helper
                    ✓ dust »  188,532 op/s (fastest)
                   ✗ marko »  178,699 op/s (5.22% slower)

                      search-results
                   ✓ marko »   26,419 op/s (fastest)
                    ✗ dust »   12,713 op/s (51.88% slower)

                      simple-0
                     ✓ es6 »  228,616 op/s (fastest)
                     ✗ pug »  181,466 op/s (20.62% slower)
                  ✗ lodash »  167,833 op/s (26.59% slower)
                   ✗ marko »  159,563 op/s (30.20% slower)
                    ✗ dust »  139,894 op/s (38.81% slower)

                      simple-1
                     ✓ es6 »  274,638 op/s (fastest)
                     ✗ pug »  196,682 op/s (28.39% slower)
                     ✗ dot »  163,379 op/s (40.51% slower)
              ✗ handlebars »  109,964 op/s (59.96% slower)
                   ✗ marko »   99,738 op/s (63.68% slower)
                    ✗ dust »   87,945 op/s (67.98% slower)
                    ✗ jade »   65,636 op/s (76.10% slower)
                    ✗ swig »   40,291 op/s (85.33% slower)
                ✗ nunjucks »   37,727 op/s (86.26% slower)
                     ✗ vue »   12,968 op/s (95.28% slower)
                   ✗ react »    3,631 op/s (98.68% slower)

                      simple-2
                     ✓ es6 »  266,016 op/s (fastest)
                     ✗ pug »  238,684 op/s (10.27% slower)
                   ✗ marko »  142,558 op/s (46.41% slower)
                    ✗ dust »  102,955 op/s (61.30% slower)

                      ui-components
                   ✓ marko »   59,904 op/s (fastest)
                   ✗ react »    3,498 op/s (94.16% slower)

```
<!-- </performance> -->

## Compiled Size

Lower numbers are better.

<!-- <size> -->
```
                      COMPILED SIZE (gzipped/uncompressed)
                      ====================================
                      friends
                    ✓ dust »   488 bytes gzipped    1362 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   765 bytes gzipped    2271 bytes uncompressed
                                   36.21% larger              40.03% larger

                      if-expression
                    ✓ jade »   387 bytes gzipped    1049 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   464 bytes gzipped    1106 bytes uncompressed
                                   16.59% larger               5.15% larger
                     ✗ pug »   905 bytes gzipped    2138 bytes uncompressed
                                   57.24% larger              50.94% larger

                      projects-escaped
                    ✓ dust »   261 bytes gzipped     547 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   555 bytes gzipped    1621 bytes uncompressed
                                   52.97% larger              66.26% larger
              ✗ handlebars »   565 bytes gzipped    1564 bytes uncompressed
                                   53.81% larger              65.03% larger
      ✗ marko (native-for) »   577 bytes gzipped    1649 bytes uncompressed
                                   54.77% larger              66.83% larger

                      projects-unescaped
                    ✓ dust »   266 bytes gzipped     579 bytes uncompressed
                                      (smallest)                 (smallest)
              ✗ handlebars »   543 bytes gzipped    1596 bytes uncompressed
                                   51.01% larger              63.72% larger
                   ✗ marko »   551 bytes gzipped    1598 bytes uncompressed
                                   51.72% larger              63.77% larger
      ✗ marko (native-for) »   574 bytes gzipped    1626 bytes uncompressed
                                   53.66% larger              64.39% larger

                      reverse-helper
                    ✓ dust »   147 bytes gzipped     311 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   361 bytes gzipped     950 bytes uncompressed
                                   59.28% larger              67.26% larger

                      search-results
                    ✓ dust »   544 bytes gzipped    1501 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   729 bytes gzipped    1935 bytes uncompressed
                                   25.38% larger              22.43% larger

                      simple-0
                    ✓ dust »   172 bytes gzipped     233 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   325 bytes gzipped     759 bytes uncompressed
                                   47.08% larger              69.30% larger
                     ✗ pug »   424 bytes gzipped     783 bytes uncompressed
                                   59.43% larger              70.24% larger

                      simple-1
                   ✓ react »   392 bytes gzipped     842 bytes uncompressed
                                      (smallest)               7.01% larger
                    ✗ dust »   412 bytes gzipped     868 bytes uncompressed
                                    4.85% larger               9.79% larger
                     ✗ dot »   491 bytes gzipped     783 bytes uncompressed
                                   20.16% larger                 (smallest)
                    ✗ jade »   522 bytes gzipped    1116 bytes uncompressed
                                   24.90% larger              29.84% larger
                ✗ nunjucks »   604 bytes gzipped    1367 bytes uncompressed
                                   35.10% larger              42.72% larger
                   ✗ marko »   606 bytes gzipped    1369 bytes uncompressed
                                   35.31% larger              42.80% larger
              ✗ handlebars »   621 bytes gzipped    1489 bytes uncompressed
                                   36.88% larger              47.41% larger
                    ✗ swig »   782 bytes gzipped    3334 bytes uncompressed
                                   49.87% larger              76.51% larger
                     ✗ pug »  1046 bytes gzipped    2303 bytes uncompressed
                                   62.52% larger              66.00% larger

                      simple-2
                    ✓ dust »   267 bytes gzipped     635 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   442 bytes gzipped    1155 bytes uncompressed
                                   39.59% larger              45.02% larger
                     ✗ pug »   603 bytes gzipped    1549 bytes uncompressed
                                   55.72% larger              59.01% larger

                      ui-components
                   ✓ react »   204 bytes gzipped     310 bytes uncompressed
                                      (smallest)                 (smallest)
                   ✗ marko »   386 bytes gzipped     990 bytes uncompressed
                                   47.15% larger              68.69% larger
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
