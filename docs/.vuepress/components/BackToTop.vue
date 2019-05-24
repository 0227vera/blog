<template>
  <section class="back-to-top">
    <div 
      :class="{'rocket': true, 'show': showRocket}"
      @click="BackToTop"
    >
      <img 
        :class="{'rotate': rotateRocket}"
        src="../public/img/rocket.jpg"
        @mousemove="rotateRocket = true"
        @mouseleave="rotateRocket = false"
      >
    </div>
  </section>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      showRocket: false,
      rotateRocket: false
    }
  },
  mounted() {
    this.showRocketIcon()
  },
  methods: {
    BackToTop() {
      window.scrollTo(0, 0)
    },
    showRocketIcon() {
      let that = this
      window.addEventListener('scroll', function() {
        let scrollTop = document.documentElement.scrollTop
        if (scrollTop >= 50) {
          that.showRocket = true
        } else {
          that.showRocket = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.back-to-top {
  width: auto;
  height: auto;
  position: fixed;
  right: 20px;
  bottom: 20px;
  .rocket {
    display: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    &>img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      cursor: pointer;
      transition: transform 0.5s;
      transform: rotate(-60deg);
    }
  }
}

.show {
  display: block !important;
}
.rotate {
  transform: rotate(0) !important;
}
</style>
