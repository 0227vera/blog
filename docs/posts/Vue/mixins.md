# mixins

API文档上面的讲解：

`minxins`选项接收一个混入对象的数组，这些混入实例对象可以像正常的实例对象一样包含选项，他们将在`Vue.extend()`里最终使用相同的选项合并逻辑合并。举例：如果你的混入包含一个钩子而创建组件本身也有一个，两个函数将被调用。

<font color=color>Mixins钩子按照传入顺序一次调用，并在调用组件自身的钩子之前调用</font>

为什么要使用mixins

* 和写组件的原因比较像，混入就是为了将方法提取，方便维护

使用例子：

@/mixin/sign.js
```js
import services from '@/services'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isNeedPass: false
    }
  },
  computed: {
    ...mapState({
      whoInfo: state => state.whoInfo
    })
  },
  methods: {
    getSignData (password, isNeedPass) {
      this.isNeedPass = isNeedPass
      services.getSign({ password })
        .then(res => {
          if (res.data.sweepUrl) { // 表示上传过静态图片
            this.fillData(`${res.data.sweepUrl}__${this.whoInfo.userName}__${new Date().getTime()}`)
          } else if (res.data.sweepCode) { // 表示上传过手写签批 在这个地方是需要旋转的
            this.rotateImg(res.data.sweepCode)
          } else { // 表示没有信息，这个时候需要打开手写办进行书写
            window.callDrawingBoardFun = base64Str => {
              let data = `${base64Str}__${this.whoInfo.userName}__${new Date().getTime()}`
              this.fillData(data)
            }
            window.mCall.callDrawingBoard('callDrawingBoardFun')
          }
        }).catch(err => this.$notify(err.msg || '获取手写签批失败'))
    },
    rotateImg (base64) {
      let _this = this
      let canvas = document.createElement('canvas')
      let image = new Image()
      image.onload = function () {
        canvas.height = this.width
        canvas.width = this.height
        let ctx = canvas.getContext('2d')
        ctx.rotate(-Math.PI / 180 * 90)
        ctx.drawImage(this, -canvas.height, 0)
        let base = canvas.toDataURL('image/png')
        _this.fillData(`${base}__${this.whoInfo.userName}__${new Date().getTime()}`)
      }
      image.src = base64
    },
    fillData (data) {
      if (this.isNeedPass) {
        this.closePopup(data)
      } else {
        this.$emit('CLOSE_POPUP', data)
        this.showPass = false
      }
    }

  }
}

```

在写mixin文件的时候，如果不需要data就不要写data，如果写了data或者其他的钩子之类的，一定要写对，因为`vue.extend`的时候格式不对是会报错的

@/page/form-view.vue

```vue
import sign from '@/mixin/sign.js'
export default {
  name:'form-view',
  mixins: [sign],
  data(){
    return {
      // ...
    }
  }
}
```

此处只做一个简单的demo使用，在之后的项目中如果又需要我会继续使用



<gitask />
