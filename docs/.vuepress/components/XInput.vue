<template>
  <div class="XInput">
    <ul>
      <li class="demo1" :style="{borderColor:f1?'#409eff':'#DCDFE6'}">
          <input type="text" placeholder="请点击我" @focus="f1=true" @blur="f1=false">
          <span></span>
      </li>
      <br>
      <li class="demo2" :style="{borderColor:f2?'#409eff':'#DCDFE6'}">
          <input type="text" placeholder="请点击我" @focus="f2=true" @blur="f2=false">
          <span class="bottom"></span>
          <span class="right"></span>
          <span class="top"></span>
          <span class="left"></span>
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  name: 'XInput',
  data () {
    return {
      f1:false,
      f2:false
    }
  },
  mounted () {
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.demo1{
position: relative;
display: inline-block;
padding: 5px;
margin-bottom: 10px;
border-radius: 5px;
// border:.5px solid #DCDFE6;
  input{
    outline: none;
    border: none;
    background: #fafafa;
    padding: 5px;
    border-radius: 5px;
    & ~ span{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background-color: #409eff;
      transform: scaleX(0);
      transform-origin: right center;
      transition: transform 0.3s ease-in-out;
    }
    &:focus ~ span {
      transform: scaleX(1);
      transform-origin: left center;
    }
  }
}
.demo2{
  position: relative;
  display: inline-block;
  padding: 5px;
  border-radius: 5px;
  // border:.5px solid #DCDFE6;
  // transform: borderColor .4s;
  // transition-delay: 0.4s;
  input {
    outline: none;
    border: none;
    background: #fafafa;
    padding: 5px;
    border-radius: 5px;
  }
  .bottom,
  .top,
  .left,
  .right {
    position: absolute;
    background-color: #409eff;
    transition: transform 0.1s ease-in-out;
  }
  .bottom,
  .top {
    left: 0;
    right: 0;
    height: 1px;
    transform: scaleX(0);
  }
  .left,
  .right {
    top: 0;
    bottom: 0;
    width: 1px;
    transform: scaleY(0);
  }
  .bottom {
    bottom: 0;
    transform-origin: right center;
  }
  .right {
    transform-origin: top center;
    right: 0;
    transition-delay: 0.1s;
  }
  .top {
    top: 0;
    transform-origin: left center;
    transition-delay: 0.2s;
  }
  .left {
    left: 0;
    transform-origin: bottom center;
    transition-delay: 0.3s;
  }
  input:focus ~ .bottom {
    transform: scaleX(1);
    transform-origin: left center;
  }
   input:focus ~ .right {
    transform: scaleY(1);
    transform-origin: bottom center;
  }
  input:focus ~ .top {
    transform: scaleX(1);
    transform-origin: right center;
  }
  input:focus ~ .left {
    transform: scaleY(1);
    transform-origin: top center;
  }
}
</style>
