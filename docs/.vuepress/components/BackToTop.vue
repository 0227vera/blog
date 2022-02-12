<template>
  <section v-if="isPCBroswer" class="back-to-top" :class="{show:showRocket}">
    <div 
      class="rocket"
      @click="BackToTop"
      :class="{rotateRocket}"
    >
      <img 
        :class="{'rotate': rotateRocket}"
        src="../public/img/backtotop.svg"
        @mousemove="rotateRocket = true"
        @mouseleave="rotateRocket = false"
      >
    </div>
  </section>
</template>

<script>

export default {
  name: "BackToTop",
  data() {
    return {
      showRocket: false,
      rotateRocket: false
    };
  },
  computed: {
    isPCBroswer() {
      const e = navigator.userAgent.toLowerCase()
      const t = "ipad" == e.match(/ipad/i)
      const i = "iphone" == e.match(/iphone/i)
      const r = "midp" == e.match(/midp/i)
      const n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)
      const a = "ucweb" == e.match(/ucweb/i)
      const o = "android" == e.match(/android/i)
      const s = "windows ce" == e.match(/windows ce/i)
      const l = "windows mobile" == e.match(/windows mobile/i);
      return !(t || i || r || n || a || o || s || l)
    }
  },
  mounted() {
    this.showRocketIcon()
  },
  methods: {
    BackToTop() {
      this.showRocket = false
      document.documentElement.scrollTop = 0
    },
    showRocketIcon() {
      let that = this;
      window.addEventListener("scroll", function() {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= 60) {
          that.showRocket = true;
        } else {
          that.showRocket = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.back-to-top {
  width: auto;
  height: auto;
  position: fixed;
  right: -135px;
  opacity: 0;
  transform: rotate(0deg);
  transition: all .3s;
  bottom: 150px;
  .rocket {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #EBEBEB;
    box-shadow: 0 2px 5px #bfbfbf;
    transition: transform 0.3s;
    transform: scale(1) rotate(0deg);
     background: #fff;
    & > img {
      width: 40px;
      height: 40px;
      margin: 10px;
      color: #EBEBEB;
      cursor: pointer;
      transition: transform 0.5s;
    }
  }
}
.show {
  right: 35px;
  opacity: 1;
  transition: all 0.5s;
  z-index: 99999;
  transform: rotate(360deg);
  .rotateRocket{
    transition: transform 0.5s;
    transform: scale(1.1);
  }
}
</style>
