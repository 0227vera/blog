# 识别设备类型

```js
// 判断设备类型的方法，设备像素比
const ua = window.navigator.userAgent;

const isWeixin = /MicroMessenger/i.test(ua);
const isAndroid = /Android/i.test(ua);
const isIOS = /iP[hone|ad|od] OS/i.test(ua);
const isIphone = /iPhone/i.test(ua);

// iphoneX iphoneXS 刘海高度 30px
const isIphoneX = !!(
  isIphone &&
  window.devicePixelRatio &&
  window.devicePixelRatio === 3 &&
  window.screen.width === 375 &&
  window.screen.height === 812
);

// 刘海高度： 44px
const isIphoneXSMAX = !!(
  isIphone &&
  window.devicePixelRatio &&
  window.devicePixelRatio === 3 &&
  window.screen.width === 414 &&
  window.screen.height === 896
);

// 刘海高度 33px
const isIphoneXR = !!(
  isIphone &&
  window.devicePixelRatio &&
  window.devicePixelRatio === 2 &&
  window.screen.width === 414 &&
  window.screen.height === 896
);

// iPhoneX版本以上的刘海屏
const isIphoneXup = isIphoneX && isIphoneXSMAX && isIphoneXR;

export default {
  isWeixin,
  isAndroid,
  isIOS,
  isIphone,
  isIphoneX,
  isIphoneXSMAX,
  isIphoneXR,
  isIphoneXup,
};
```

<gitask />
