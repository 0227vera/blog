<template>
  <div>
    <div class="about" id="printMe">
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
      <ul class="itemHisInfo">
        <li v-for="(item,index) in itemHisInfo" :key="index">
          <div>
            <span>项目名称：</span>
            <span>{{item.name}}</span>
          </div>
          <div>
            <span>项目开发时间：</span>
            <span>{{item.time}}</span>
          </div>
          <div>
            <span>项目中的角色：</span>
            <span>{{item.role}}</span>
          </div>
          <div>
            <span>是否前后端分离：</span>
            <span>{{item.isSeparate ? '是' : '否'}}</span>
          </div>
          <div>
            <span>项目内容和职责：</span>
            <ul>
              <li v-for="(du,duIndex) in item.duty" :key="duIndex">
                <span>{{duIndex+1}}.{{du}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="print">
      <button v-print="'#printMe'">打印此页面</button>
    </div>
  </div>
</template>

<script>
import Print from 'vue-print-nb'
import Vue from 'vue'
Vue.use(Print)
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
        '有开发preact经验',
        '有开源项目维护经验',
        '熟练使用ES6,对ES6相关的知识有一定的理解',
        '熟练使用webpack,npm包管理工具',
        '熟悉nodeJS开发（正在学习）',
        '熟练使用git操作',
      ],
      itemHisInfo:[
        {
          name:'多级公文流转移动端', 
          time:'201906-201907',
          role:'从0->1',
          isSeparate:true,
          duty:[
            'vue2+vue-cli3+vant项目构建和研发',
            '表单设计器的预览和交互兼容H5',
            '优化并制定相关的交互和动画标准'
          ]
        },
        {
          name:'多级公文流转web端', 
          time:'201903-201906',
          role:'从0->1',
          isSeparate:true,
          duty:[
            'vue2+vue-cli2+elementUI构建和研发',
            '公文流程设计器的单独生成',
            '公文表单设计器的单独生成',
            '使用canvas完成批注功能'
          ]
        },
        {
          name:'内控系统', 
          time:'201901-201903',
          role:'从0->1',
          isSeparate:false,
          duty:[
            '很老的办公应用项目的更新修改，前后端未分离',
            '使用cdn的方式，vue+elementUI+jq的形式畸形研发',
            '为什么没有使用前后端分离？因为产品版本需求不一样，每次修改的页面是部分而非一次全部迭代'
          ]
        },
        {
          name:'工作流系统移动端', 
          time:'201811-201812',
          role:'从0->1',
          isSeparate:true,
          duty:[
            '移动端工作流系统，使用vue2+vue-cli+vux研发',
            '从0->1搭建',
            '使用nodeJS+webpack自动生成相关需要的补丁文件'
          ]
        },
        { 
          name:'工作流系统web端', 
          time:'201808-201811',
          role:'维护者',
          isSeparate:false,
          duty:[
            '很老的办公应用项目的更新修改，前后端未分离',
            '使用cdn的方式，vue+elementUI+jq的形式畸形研发'
          ]
        },
        {
          name:'工作流引擎和表单设计器维护', 
          time:'20180705-201808',
          role:'维护者',
          isSeparate:false,
          duty:[
            '基于开源项目bpmn-js经行修改的工作引擎，github地址：https://github.com/bpmn-io/bpmn-js',
            '流程设计器ui上面主要使用的jq',
            '使用preact（react的一个子类）书写的表单设计器插件，高度自定义，'
          ]
        },
        { 
          name:'小学科学课件开发', 
          time:'2017011-201807',
          role:'维护者',
          isSeparate:false,
          duty:[
            '主要负责js编程，高度还原设计flash设计以及动画还原',
            '熟悉并使用PIXI，使用框架jQuery-UI进行页面渲染',
            '使用BabylonJS进行3D实验设计和实现',
            '封装高复用，可维护性的组件',
            '使用nodeJS，git，webpack，对项目进行管理',
          ]
        },
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
      letter-spacing: 80px;
      z-index:-1;
      color: #eeeeee;
      font-style: oblique;
    }
    span:nth-child(1){
      margin-right: 5px;
    }
  }
  .itemHisInfo{
    margin-top: 10px;
    width: 960px;
    height: auto;
    overflow: hidden;
    position: relative;
    &::after{
      content: '项目经验';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      font-size: 40px;
      text-align: center;
      margin-top:-40px;
      letter-spacing: 80px;
      z-index:-1;
      color: #eeeeee;
      font-style: oblique;
    }
    &>li{
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-bottom: 20px;
      padding-bottom: 20px;
      position: relative;
      &::after{
        content: "";
        width: 100%;
        border-bottom: dashed 1px #000;
        bottom: 0;
        left: 0;
        position: absolute;
      }
      div{
        width: 50%;
        float: left;
        line-height: 40px;
        &>span{
          display: inline-block;
          &:first-child{
            width: 130px;
            text-align: right;
            vertical-align: middle;
          }
          &:last-child{
            font-weight: 600;
          }
        }
        &:last-child{
          width: 100%;
          ul{
            display: inline-block;
            vertical-align: middle;
            font-weight: 600;
          }
        }
      }
    }
  }
  hr{
    margin-top: 10px;
  }
}
.print{
  margin-bottom: 20px;
  button{
    height: 40px;
    line-height: 40px;
    width: 100px;
    outline: none;
    border: none;
    background: #449eff;
    color: #ffffff;
    cursor: pointer;
    border-radius: 5px;
  }
}
</style>
