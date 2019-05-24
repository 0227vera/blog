<template>
  <div class="canvas-nest" />
</template>

<script>
// import CanvasNest from 'canvas-nest.js'

export default {
  name: 'CanvasNest',
  props: {
    config: {
      type: Object,
      default() {
        return {
          color: '138,43,226',
          pointColor: '0,0,0',
          opacity: '0.5',
          count: 120,
          zIndex: -1
        }
      }
    },
    el: {
      type: String,
      default: '.canvas-nest'
    }
  },
  data() {
    return {
      cNest: null
    }
  },
  mounted() {
    /* 解决服务端无法获取浏览器Api(window...) */
    import('canvas-nest.js').then((module) => {
      const CanvasNest = module.default
      this.renderCanvasNest(CanvasNest)
    })
  },
  beforeDestroy() {
    this.cNest.destroy()
  },
  methods: {
    renderCanvasNest(CanvasNest) {
      const el = document.querySelector(this.el)
      this.cNest = new CanvasNest(el, this.config)
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas-nest {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
</style>
