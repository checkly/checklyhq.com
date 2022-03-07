---
title: Runtime specification
weight: 9999
menu:
  docs:
    parent: "Runtimes"
aliases:
  - /docs/browser-checks/runner-specification/
---

By default, all our runners have their timezone set to UTC, regardless of their location.

## Built-in Node.js modules

- assert
- buffer
- crypto
- dns
- path
- querystring
- readline
- stream
- string_decoder
- timers
- tls
- url
- util
- zlib

See the built-in module documentation on the official Node.js site:

- [12.x](https://nodejs.org/dist/latest-v12.x/docs/api/)
- [14.x](https://nodejs.org/dist/latest-v14.x/docs/api/)

## NPM packages

These are the currently available runtimes and the included external NPM dependencies.

> Note: the below libraries are included for **setup and teardown scripts** as well, with the exclusion of Puppeteer, Playwright and Mocha.

{{< runtimes >}}

##
||
| ------------- |
<div class="contribute-doc">
<p><img src="/docs/images/icons/edit.png" width="14px" height="14px">
You can contribute to this documentation by 
<a href="https://github.com/checkly/checklyhq.com/tree/main/site/content/docs" target="_blank"> editing this page on Github </a></p>
</div>