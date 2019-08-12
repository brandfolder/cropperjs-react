# cropperjs-react
[![CircleCI](https://circleci.com/gh/brandfolder/cropperjs-react/tree/master.svg?style=svg)](https://circleci.com/gh/brandfolder/cropperjs-react/tree/master) [![Downloads](https://img.shields.io/npm/dm/cropperjs-react.svg)](https://www.npmjs.com/package/cropperjs-react) [![Version](https://img.shields.io/npm/v/cropperjs-react.svg)](https://www.npmjs.com/package/cropperjs-react)

[![NPM](https://nodei.co/npm/cropperjs-react.svg?style=flat)](https://www.npmjs.com/package/cropperjs-react "View this project on npm")

React component wrapper for [CropperJS](https://fengyuanchen.github.io/cropperjs) using react hooks

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Overview
React component wrapping [CropperJS](https://www.npmjs.com/package/react-cropper) library using [React hooks](https://reactjs.org/docs/hooks-overview.html) (useEffect and useState).

This wrapper accommodates all the functionality of the CropperJS library. To get data back from the cropper once the cropper object has initialized, update the `getter` object, e.g.:
```js
setGetter({ action: 'getCanvasData', func: setCanvasData });

```  
The cropper data, in this case the canvas data, will be passed into the supplied function as an argument. In this example, the canvas data will passed into `setCanvasData` and set into the `canvasData` state.

To set data in the cropper object use the `setter` object, e.g.:
```js
setSetter({ action: 'setData', data: { width: 300, height: 600 } });
```
This example will update the width and height of the crop box to be 300px by 600px.

## Getting Started
```shell
npm install cropperjs-react
```

## Usage
```js
import React, { useEffect, useState } from 'react';
import CropperJSWrapper from 'cropperjs-react';

const CropperJSWrapperExample = () => {
  const [containerData, setContainerData] = useState(null);
  const [canvasData, setCanvasData] = useState(null);
  const [croppedData, setCroppedData] = useState(defaultCroppedData);

  const [getter, setGetter] = useState({ action: '', func: () => {} });
  const [setter, setSetter] = useState({ action: '', data: {} });

  const imageUrl = 'https://cdn.thisiswhyimbroke.com/images/creepy-horse-head-squirrel-feeder2.jpg';

  const onCrop = (cropEvent) => {
    setGetter({ action: 'getCanvasData', func: updateCanvasData });
    setCroppedData(cropEvent.detail);
  };

  const initializeCropper = () => {
    setGetter({ action: 'getCanvasData', func: setCanvasData });
    setGetter({ action: 'getContainerData', func: setContainerData });
    setGetter({ action: 'getData', func: setCroppedData });
  };

  const onZoom = () => {
    setGetter({ action: 'getCanvasData', func: setCanvasData });
  };

  return (
    <CropperJSWrapper
      imageUrl={imageUrl} // required
      onCrop={onCrop} // required
      onReady={initializeCropper}
      onZoom={onZoom}
      getter={getter}
      setter={setter}
    />
  )
}
```
