"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _cropperjs = _interopRequireDefault(require("cropperjs"));

require("cropperjs/dist/cropper.css");

var _crop_helper = require("./crop_helper");

require("./crop_core.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CropCore = function CropCore(props) {
  var ref = (0, _react.useRef)();

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      cropper = _useState2[0],
      setCropper = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      cropperReady = _useState4[0],
      setCropperReady = _useState4[1];

  var cropOptions = Object.keys(props).reduce(function (acc, next) {
    if (_crop_helper.availableOptions.join().includes(next)) {
      acc[next] = props[next];
    }

    return acc;
  }, {});

  var initializeCropper = function initializeCropper() {
    var newCropper = new _cropperjs.default(ref.current, _objectSpread({}, cropOptions, {
      ready: function ready() {
        setCropperReady(true);
        props.onReady();
      }
    }));
    setCropper(newCropper);
  };

  (0, _react.useEffect)(function () {
    if (props.imageUrl) {
      initializeCropper();
    }
  }, [props.imageUrl]); //* **** Capture 5 types of events **** *//

  (0, _react.useEffect)(function () {
    if (!cropperReady) {
      return undefined;
    }

    cropper.element.addEventListener('crop', props.onCrop);
    return function () {
      return cropper.element.removeEventListener('crop', props.onCrop);
    };
  }, [cropperReady, props.onCrop]);
  (0, _react.useEffect)(function () {
    if (!cropperReady) {
      return undefined;
    }

    cropper.element.addEventListener('cropend', props.onCropEnd);
    return function () {
      return cropper.element.removeEventListener('cropend', props.onCropEnd);
    };
  }, [cropperReady, props.onCropEnd]);
  (0, _react.useEffect)(function () {
    if (!cropperReady) {
      return undefined;
    }

    cropper.element.addEventListener('cropmove', props.onCropMove);
    return function () {
      return cropper.element.removeEventListener('cropmove', props.onCropMove);
    };
  }, [cropperReady, props.onCropMove]);
  (0, _react.useEffect)(function () {
    if (!cropperReady) {
      return undefined;
    }

    cropper.element.addEventListener('cropstart', props.onCropStart);
    return function () {
      return cropper.element.removeEventListener('cropstart', props.onCropStart);
    };
  }, [cropperReady, props.onCropStart]);
  (0, _react.useEffect)(function () {
    if (!cropperReady) {
      return undefined;
    }

    cropper.element.addEventListener('zoom', props.onZoom);
    return function () {
      return cropper.element.removeEventListener('zoom', props.onZoom);
    };
  }, [cropperReady, props.onZoom]); //* ********************************** *//

  var handleGetter = function handleGetter() {
    var _props$getter = props.getter,
        action = _props$getter.action,
        func = _props$getter.func;

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

      default:
        break;
    }
  };

  var handleSetter = function handleSetter() {
    if (!cropperReady) {
      return undefined;
    }

    var _props$setter = props.setter,
        action = _props$setter.action,
        data = _props$setter.data;

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

      default:
        break;
    }

    return undefined;
  };

  (0, _react.useEffect)(function () {
    handleSetter();
  }, [props.setter]);
  (0, _react.useEffect)(function () {
    handleGetter();
  }, [props.getter]);
  return _react.default.createElement("div", {
    className: "crop-core-container"
  }, _react.default.createElement("img", {
    alt: "crop",
    id: "cropperjs-image",
    ref: ref,
    src: props.imageUrl
  }));
};

CropCore.propTypes = {
  croppedCanvasOptions: _propTypes.default.shape({}),
  imageUrl: _propTypes.default.string.isRequired,
  onCrop: _propTypes.default.func.isRequired,
  onReady: _propTypes.default.func,
  onZoom: _propTypes.default.func,
  getter: _propTypes.default.shape({
    action: _propTypes.default.string,
    func: _propTypes.default.func
  }),
  roundData: _propTypes.default.bool,
  setter: _propTypes.default.shape({
    action: _propTypes.default.string,
    data: _propTypes.default.shape({})
  }),
  // default props used if not passed in from parent

  /* eslint-disable react/no-unused-prop-types */
  checkCrossOrigin: _propTypes.default.bool,
  dragMode: _propTypes.default.string,
  guides: _propTypes.default.bool,
  imagePreviewClass: _propTypes.default.string,
  viewMode: _propTypes.default.number,
  zoomable: _propTypes.default.bool,
  zoomOnWheel: _propTypes.default.bool
  /* eslint-enable react/no-unused-prop-types */

};
CropCore.defaultProps = {
  croppedCanvasOptions: {},
  getter: _propTypes.default.shape({
    action: '',
    func: function func() {}
  }),
  onReady: function onReady() {},
  onZoom: function onZoom() {},
  roundData: false,
  setter: _propTypes.default.shape({
    action: '',
    data: {}
  }),
  // default props used if not passed in from parent
  checkCrossOrigin: true,
  dragMode: 'move',
  guides: true,
  imagePreviewClass: 'image-preview',
  viewMode: 2,
  zoomable: true,
  zoomOnWheel: true
};
var _default = CropCore;
exports.default = _default;