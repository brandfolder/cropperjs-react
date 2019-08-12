import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

import { availableOptions } from './crop_helper';
import './crop_core.css';


const CropCore = (props) => {
  const ref = useRef();
  const [cropper, setCropper] = useState({});
  const [cropperReady, setCropperReady] = useState(false);

  const cropOptions = Object.keys(props).reduce((acc, next) => {
    if (availableOptions.join().includes(next)) {
      acc[next] = props[next];
    }
    return acc;
  }, {});

  const initializeCropper = () => {
    const newCropper = new Cropper(ref.current, {
      ...cropOptions,
      ready() {
        setCropperReady(true);
        props.onReady();
      },
    });
    setCropper(newCropper);
  };

  useEffect(() => {
    if (props.imageUrl) {
      initializeCropper();
    }
  }, [props.imageUrl]);

  //* **** Capture 5 types of events **** *//
  useEffect(() => {
    if (!cropperReady) { return undefined; }
    cropper.element.addEventListener('crop', props.onCrop);
    return () => cropper.element.removeEventListener('crop', props.onCrop);
  }, [cropperReady, props.onCrop]);

  useEffect(() => {
    if (!cropperReady) { return undefined; }
    cropper.element.addEventListener('cropend', props.onCropEnd);
    return () => cropper.element.removeEventListener('cropend', props.onCropEnd);
  }, [cropperReady, props.onCropEnd]);

  useEffect(() => {
    if (!cropperReady) { return undefined; }
    cropper.element.addEventListener('cropmove', props.onCropMove);
    return () => cropper.element.removeEventListener('cropmove', props.onCropMove);
  }, [cropperReady, props.onCropMove]);

  useEffect(() => {
    if (!cropperReady) { return undefined; }
    cropper.element.addEventListener('cropstart', props.onCropStart);
    return () => cropper.element.removeEventListener('cropstart', props.onCropStart);
  }, [cropperReady, props.onCropStart]);

  useEffect(() => {
    if (!cropperReady) { return undefined; }
    cropper.element.addEventListener('zoom', props.onZoom);
    return () => cropper.element.removeEventListener('zoom', props.onZoom);
  }, [cropperReady, props.onZoom]);
  //* ********************************** *//

  const handleGetter = () => {
    const { action, func } = props.getter;
    switch (action) {
      case 'getData':
        func(cropper.getData(props.roundData));
        break;
      case 'getContainerData':
        func(cropper.getContainerData());
        break;
      case 'getImageData':
        func(cropper.getImageData());
        break;
      case 'getCanvasData':
        func(cropper.getCanvasData());
        break;
      case 'getCropBoxData':
        func(cropper.getCropBoxData());
        break;
      case 'getCroppedCanvas':
        func(cropper.getCroppedCanvas(props.croppedCanvasOptions));
        break;
      default: break;
    }
  };

  const handleSetter = () => {
    if (!cropperReady) { return undefined; }

    const { action, data } = props.setter;
    switch (action) {
      case 'crop':
        cropper.crop();
        break;
      case 'reset':
        cropper.reset();
        break;
      case 'clear':
        cropper.clear();
        break;
      case 'replace':
        cropper.replace(data.url, data.hasSameSize || false);
        break;
      case 'enable':
        cropper.enable();
        break;
      case 'disable':
        cropper.disable();
        break;
      case 'destroy':
        cropper.destroy();
        break;
      case 'move':
        cropper.move(data.offsetX, data.offsetY || data.offsetX);
        break;
      case 'moveTo':
        cropper.moveTo(data.x, data.y || data.x);
        break;
      case 'zoom':
        cropper.zoom(data.ratio);
        break;
      case 'zoomTo':
        cropper.zoomTo(data.ratio, data.pivot);
        break;
      case 'rotate':
        cropper.rotate(data.degree);
        break;
      case 'scale':
        cropper.scale(data.scaleX, data.scaleY || data.scaleX);
        break;
      case 'scaleX':
        cropper.scaleX(data.scaleX);
        break;
      case 'scaleY':
        cropper.scaleY(data.scaleY);
        break;
      case 'setData':
        cropper.setData(data);
        break;
      case 'setCanvasData':
        cropper.setCanvasData(data);
        break;
      case 'setCropBoxData':
        cropper.setCropBoxData(data);
        break;
      case 'setAspectRatio':
        cropper.setAspectRatio(data.aspectRatio);
        break;
      case 'setDragMode':
        cropper.setDragMode(data.dragMode || 'none');
        break;
      default: break;
    }
    return undefined;
  };

  useEffect(() => {
    handleSetter();
  }, [props.setter]);

  useEffect(() => {
    handleGetter();
  }, [props.getter]);

  return (
    <div className="crop-core-container">
      <img
        alt="crop"
        id="cropperjs-image"
        ref={ref}
        src={props.imageUrl}
      />
    </div>
  );
};

CropCore.propTypes = {
  croppedCanvasOptions: PropTypes.shape({}),
  imageUrl: PropTypes.string.isRequired,
  onCrop: PropTypes.func.isRequired,
  onReady: PropTypes.func,
  onZoom: PropTypes.func,
  getter: PropTypes.shape({
    action: PropTypes.string,
    func: PropTypes.func,
  }),
  roundData: PropTypes.bool,
  setter: PropTypes.shape({
    action: PropTypes.string,
    data: PropTypes.shape({}),
  }),
  // default props used if not passed in from parent
  /* eslint-disable react/no-unused-prop-types */
  checkCrossOrigin: PropTypes.bool,
  dragMode: PropTypes.string,
  guides: PropTypes.bool,
  imagePreviewClass: PropTypes.string,
  viewMode: PropTypes.number,
  zoomable: PropTypes.bool,
  zoomOnWheel: PropTypes.bool,
  /* eslint-enable react/no-unused-prop-types */
};

CropCore.defaultProps = {
  croppedCanvasOptions: {},
  getter: PropTypes.shape({
    action: '',
    func: () => {},
  }),
  onReady: () => {},
  onZoom: () => {},
  roundData: false,
  setter: PropTypes.shape({
    action: '',
    data: {},
  }),
  // default props used if not passed in from parent
  checkCrossOrigin: true,
  dragMode: 'move',
  guides: true,
  imagePreviewClass: 'image-preview',
  viewMode: 2,
  zoomable: true,
  zoomOnWheel: true,
};

export default CropCore;
