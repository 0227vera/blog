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
        <h2>项目经验</h2>
        <li v-for="(item,index) in itemHisInfo" :key="index" :data-content="itemHisInfo.length-index">
          <div>
            <span>所在公司：</span>
            <span>{{getCompany(itemHisInfo.length-index)}}</span>
          </div>
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
import itemHisInfo from '../public/json/itemHisInfo'
import skillInfo from '../public/json/skillInfo'
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
      skillInfo,
      itemHisInfo
    };
  },
  methods:{
    getCompany(num){
      if (num === 1) {
        return '北京乐步教育科技有限公司(NoBook)'
      } else {
        return '北京讯飞乐知行软件有限公司'
      }
    }
  }
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
    h2{
      text-align: center;
      padding: 20px 0;
      letter-spacing: 20px;
    }
    &>li{
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-top: 20px;
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
      &::before{
      content: attr(data-content);
      overflow: hidden;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      line-height: 60px;
      background: #e7f4ff;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 20px;
      text-align: center;
      color: #409eff;
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
        &:first-child{
          width:100%;
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
  margin: 20px 0;
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
