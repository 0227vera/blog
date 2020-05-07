<template>
  <section class="back-to-top" :class="{show:showRocket}">
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
  mounted() {
    this.showRocketIcon()
  },
  methods: {
    BackToTop() {
      this.showRocket = false
      let scrollT = document.documentElement.scrollTop || document.body.scrollTop
        document.documentElement.scrollTop -= scrollT/5
      if (scrollT > 0) {
        window.requestAnimationFrame(() => {
          this.BackToTop()
        })
      }
    },
    showRocketIcon() {
      let that = this;
      window.addEventListener("scroll", function() {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= 50) {
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
  transition: all .3s;
  z-index: 99999;
  transform: rotate(360deg);
  .rotateRocket{
    transition: transform 0.3s;
    transform: scale(1.1) rotate(360deg);
  }
}
</style>
