<template>
  <div class="about">
    <ul class="baseInfo">
      <li v-for="(item,index) in baseInfo" :key="index">
        <span>{{item.name}}:</span>
        <span>{{item.value}}</span>
      </li>
    </ul>
    <hr>
    <ul class="skillInfo">
      <li v-for="(item,index) in skillInfo" :key="index">
        <span>{{index+1}}.</span>
        <span>{{item}}</span>
      </li>
    </ul>
    <hr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseInfo: [
        { name: "出生日期", value: "1994/03/25" },
        { name: "手机", value: "18331588738" },
        { name: "邮箱", value: "1066788870@qq.com" },
        { name: "国籍", value: "中国" },
        { name: "户口", value: "湖北天门" },
        { name: "状态", value: "求职中" }
      ],
      skillInfo:[
        '熟练掌握HTML5、CSS3、Javascript开发，熟练使用scss，less',
        '能熟练使用第三方组件库，element-ui、vux、vant等',
        '熟练使用vue、vue-cli2、vue-cli3、vue-router、vuex、axios，有复杂应用场景开发经验',
        '熟练使用ES6,对ES6相关的知识有一定的理解',
        '熟练使用webpack,npm包管理工具',
        '熟悉nodeJS开发（正在学习）',
        '熟练使用git操作',
      ]
    };
  },
  mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.about {
  width: 960px;
  .baseInfo {
    width: 960px;
    overflow: hidden;
    position: relative;
    &::after{
      content: '基础信息';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 40px;
      text-align: center;
      line-height: 80px;
      letter-spacing: 80px;
      z-index:-1;
      color: #eeeeee;
      font-style: oblique;
    }
    li {
      width: 320px;
      float: left;
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      span:nth-child(2){
        font-weight: 600;
      }
      span:nth-child(1){
        display: inline-block;
        width: 80px;
        text-align: right;
      }
    }
  }
  .skillInfo{
    margin-top: 10px;
    position: relative;
    &::after{
      content: '专业技能';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      font-size: 40px;
      text-align: center;
      margin-top:-40px;
      // line-height: 80px;
      letter-spacing: 80px;
      z-index:-1;
      color: #cccccc;
      font-style: oblique;
    }
    span:nth-child(1){
      margin-right: 5px;
    }
  }
  hr{
    margin-top: 10px;
  }
}
</style>
