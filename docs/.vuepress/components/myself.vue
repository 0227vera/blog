<template>
  <div class="about">
    <ul class="baseInfo">
      <li v-for="(item,index) in baseInfo" :key="index">
        <span>{{item.name}}:</span>
        <span>{{item.value}}</span>
      </li>
    </ul>
    <hr>
    <ul>
      <li v-for="(item,index) in skillInfo">
        <span>{{index+1}}.</span>
        <span>{{item}}</span>
      </li>
    </ul>
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
        '熟练掌握HTML5、CSS3、Javascript开发',
        '熟练使用vue、vuex，有复杂应用场景开发经验',
        '熟练使用ES6,对ES6相关的知识有一定的理解',
        '熟悉nodeJS开发（正在学习）'
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
        text-align: right
      }
    }
  }
}
</style>
