# cropperjs-react
[![Downloads](https://img.shields.io/npm/dm/cropperjs-react.svg)](https://www.npmjs.com/package/cropperjs-react) [![Version](https://img.shields.io/npm/v/cropperjs-react.svg)](https://www.npmjs.com/package/cropperjs-react)

React component wrapper for [CropperJS](https://fengyuanchen.github.io/cropperjs) using react hooks

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Examples](#examples)
- [Usage](#usage)

## Overview

## Getting Started
```shell
npm install cropperjs-react
```

## Examples
[example/example.jsx](<link to example file in repo>)

<link to code sandbox example>

## Usage
```js
import CropCore from 'cropperjs-react';

  <CropCore
    imageUrl={imageUrl}
    onCrop={onCrop}
    onReady={initializeCropper}
    onZoom={onZoom}
    getter={getter}
    setter={setter}
  />
```
