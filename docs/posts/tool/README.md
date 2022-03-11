# js工具方法

## 识别设备类型

```js
// 判断设备类型的方法，设备像素比
const ua = window.navigator.userAgent;

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
  isAndroid,
  isIOS,
  isIphone,
  isIphoneX,
  isIphoneXSMAX,
  isIphoneXR,
  isIphoneXup,
};
```

## 使用ES6简单封装localStoage、sessionStorage

```js
class store {
  constructor (store) {
    if (!store) {
      return new Error('当前环境暂不支持localStorage')

    }
    this._store = store
  }
  setItem (_k, _v) {
    if (!this._store) return
    let kType = this.getType(_k)
    if (kType === 'string') {
      this._store.setItem(_k, this.filterValue(_v))
    }else{
      return new Error('key只能为字符串')
    }
  }
  getItem (_k) {
    if (!this._store) return
    let kType = this.getType(_k)
    if (kType !== 'string') {
      return new Error('key只能为字符串')
    }
    return this._store.getItem(_k)
  }
  removeItem (_k) {
    if (!this._store) return
    let kType = this.getType(_k)
    if (kType !== 'string') {
      return new Error('key只能为字符串')
    }
    return this._store.removeItem(_k)
  }
  clear () {
    if (!this._store) return
    this._store.clear()
  }
  getType (key) {
    return Object.prototype.toString.call(key).match(/\[object (.*?)\]/)[1].toLowerCase()
  }
  filterValue (value) {
    let vType = this.getType(value)
    let nullValue = ['undefined', 'null']
    let stringValue = ['boolean', 'number', 'string']
    if (~nullValue.indexOf(vType) || isNaN(value)) {
      return ''
    }
    if (~stringValue.indexOf(vType)) {
      return value
    }
    return JSON.stringify(value)
  }
}

class LocalStorage extends store {
  constructor (store) {
    super(store)
  }
  WX_USER_ID = 'WX_USER_ID'
}

class SessionStorage extends store {
  constructor (store) {
    super(store)
  }
  WX_SSO_TITLE = 'WX_SSO_TITLE'
}

const LS = new LocalStorage(window.localStorage || localStorage)
const SS = new SessionStorage(window.sessionStorage || sessionStorage)

export {LS,SS}
```

使用

```js
import {LS,SS} from './storage.js'
LS.setItem()
SS.getItem()
```

<gitask />
