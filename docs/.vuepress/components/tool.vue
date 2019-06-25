<template>
  <div>
    <input type="number" v-model="num"><br>
    <ul>
      <li>
        生成随机序列的函数：<span>{{random}}</span>
      </li>
      <li>
        生成32位之间唯一的id：<span>{{production_id}}</span>
      </li>
      <li>
        倒计时抢购：
        <div id="c_box1"></div>
      </li>
    </ul>
    <ul>
      <li>
        <span>图片放大：</span>
        <div id="imgBox"><img id="img" src="../public/img/p1.jpg" alt=""></div>
      </li>
      <li v-if="false">
        <span>图片放大：</span>
        <div id="box">
            <div id="left">
                <img src="../public/img/p1.jpg" alt="">
                <div id="ball" class="hide"></div>
                <div id="mb"></div>
            </div>
            <div id="right" class="show">
                <img id="bigImg" src="../public/img/p1.jpg" alt="">
            </div>
        </div>
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    };
  },
  computed: {
    random() {
      return this.random_str(this.num);
    },
    production_id() {
      return this.productionId(this.num);
    }
  },
  mounted() {
    this.clock(new Date().getTime() - 0 + 3600 * 12 * 1000, "c_box1");
    this.initBigImg();
    // this.initManagnigire();
  },
  methods: {
    random_str(length) {
      let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      ALPHABET += "abcdefghijklmnopqrstuvwxyz";
      ALPHABET += "0123456789-_";
      let str = "";
      for (let i = 0; i < length; ++i) {
        let rand = Math.floor(Math.random() * ALPHABET.length);
        str += ALPHABET.substring(rand, rand + 1);
      }
      return str;
    },
    productionId(num) {
      let str = this.random_str(32).replace(/-|_/g, "") + new Date().getTime();
      return this.hashCode(str);
    },
    hashCode(str) {
      let len = 32;
      // 生成1-32的序列数字
      let rule = Array.from(new Array(len)).map((item, index) => index + 1);
      // 先获取前str的前32位
      let result = [...str].slice(0, 32);
      // 取时间戳的位置按照规则插入数组
      rule.forEach((item, index) => {
        if (
          index % 2 === 0 &&
          index / 2 + 1 < new Date().getTime().toString().length
        ) {
          result[index] = str[str.length - (index / 2 + 1)];
        }
      });
      return result.join("");
    },
    clock(n, id) {
      let box = document.getElementById(id);
      let date_future = new Date(n);
      let timer = setInterval(fn, 900);
      fn();
      function fn() {
        //获取当前时刻
        let date_now = new Date();
        //计算时间差且换算为秒数
        let times = parseInt((date_future - date_now) / 1000);
        //天
        let day = parseInt(times / (24 * 3600));
        //获取不够一天的时间
        let s_times = times % (24 * 3600);
        //小时
        let h = parseInt(s_times / 3600);
        //获取不够一小时的时间
        let s_times1 = s_times % 3600;
        //分钟
        let min = parseInt(s_times1 / 60);
        //获取秒数
        let sec = s_times1 % 60;

        //判断是否结束
        if (times <= 0) {
          clearInterval(timer);
          day = h = min = sec = 0;
        }

        //显示时间
        //innerHTML:html元素内容
        box.innerHTML =
          "<span>" +
          day +
          "</span>天<span>" +
          h +
          "</span>小时<span>" +
          min +
          "</span>分<span>" +
          sec +
          "</span>秒";
      }
    },
    initBigImg() {
      let box = document.getElementById("imgBox");
      let img = document.getElementById("img");
      let scale = 100;
      box.onmousemove = function(event) {
        let e = event || window.event;
        let mouX = e.offsetX || e.layerX;
        let mouY = e.offsetY || e.layerY;
        img.style.transformOrigin = mouX + "px " + mouY + "px";
      };
      this.mouWheel(
        box,
        () => {
          scale += 5;
          if (scale >= 300) {
            scale = 300;
          }
          img.style.transform = "scale(" + scale / 100 + ")";
        },
        () => {
          scale -= 5;
          if (scale <= 100) {
            scale = 100;
          }
          img.style.transform = "scale(" + scale / 100 + ")";
        }
      );
    },
    mouWheel(obj, wheelUp, wheelDown) {
      let userInfo = window.navigator.userAgent.toLowerCase();
      if (userInfo.indexOf("firefox") != -1) {
        //火狐下监听鼠标滚轮事件
        obj.addEventListener("DOMMouseScroll", wheel, false);
      } else {
        //非火狐下监听鼠标滚轮事件
        obj.onmousewheel = wheel;
      }
      //事件处理函数
      function wheel(event) {
        let e = event || window.event;
        //阻止浏览器默认行为
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        //阻止事件冒泡
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
        //判断滚轮滚动的方向
        if (e.wheelDelta) {
          //非火狐
          if (e.wheelDelta > 0) {
            wheelUp();
          } else {
            wheelDown();
          }
        } else if (e.detail) {
          //火狐
          if (e.detail < 0) {
            wheelUp();
          } else {
            wheelDown();
          }
        }
      }
    },
    initManagnigire() {
      let box = document.getElementById("box"),
        ball = document.getElementById("ball"),
        right = document.getElementById("right"),
        bigImg = document.getElementById("bigImg");

      box.onmousemove = function(event) {
        // 显示小块和大图窗口
        ball.className = right.className = "show";
        let e = event || window.event;
        // 计算是鼠标相对于左侧小图的坐标
        let mouX = (e.offsetX || e.layerX) - ball.offsetWidth / 2;
        let mouY = (e.offsetY || e.layerY) - ball.offsetHeight / 2;
        // 边界检测
        if (mouX <= 0) {
          mouX = 0;
        } else if (mouX >= box.clientWidth - ball.offsetWidth) {
          mouX = box.clientWidth - ball.offsetWidth;
        }

        if (mouY <= 0) {
          mouY = 0;
        } else if (mouY >= box.clientHeight - ball.offsetHeight) {
          mouY = box.clientHeight - ball.offsetHeight;
        }

        // 小蓝块跟随
        ball.style.left = mouX + "px";
        ball.style.top = mouY + "px";
        // 大图跟随
        bigImg.style.left = -mouX * 4 + "px";
        bigImg.style.top = -mouY * 4 + "px";
      };

      box.onmouseleave = function() {
        ball.className = right.className = "hide";
      };
    }
  },
  components: {}
};
</script>

<style scoped>
#imgBox {
  width: 640px;
  height: 400px;
  overflow: hidden;
}

#img {
  width: 640px;
  height: 400px;
  display: block;
  border: 0;
}

#box {
  width: 240px;
  height: 150px;
  position: relative;
}

#left {
  width: 240px;
  height: 150px;
  position: absolute;
  cursor: move;
}

#left img {
  width: 240px;
  height: 150px;
  display: block;
  border: 0;
}

#mb {
  width: 240px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

#ball {
  width: 60px;
  height: 35.5px;
  background: #008df4;
  opacity: 0.4;
  filter: alpha(opacity=40);
  position: absolute;
  left: 0;
  top: 0;
}

.show {
  display: block;
}

.hide {
  display: none;
}

#right {
  width: 240px;
  height: 150px;
  position: relative;
  top: 0;
  right: -300px;
  overflow: hidden;
  background: cyan;
}

#right img {
  width: 960px;
  height: 600px;
  display: block;
  border: 0;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.2s ease-out;
}
</style>
