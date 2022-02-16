<template>
  <div v-if="isPCBroswer">
    <div class="about" id="printMe">
      <ul class="baseInfo">
        <li v-for="(item,index) in baseInfo" :key="index">
          <span>{{item.name}}:</span>
          <span>{{item.value}}</span>
        </li>
      </ul>
      <hr />
      <ul class="skillInfo">
        <h2>技术能力</h2>
        <li v-for="(item,index) in skillInfo" :key="index">
          <span>{{index+1}}.</span>
          <span>{{item}}</span>
        </li>
      </ul>
      <hr />
      <ul class="itemHisWorkInfo">
        <h2>工作经历</h2>
        <li
          v-for="(item,index) in itemHisWorkInfo"
          :key="index"
          :data-content="itemHisWorkInfo.length-index"
        >
          <div>
            <span>公司名称：</span>
            <span>{{getCompany(item.type)}}</span>
          </div>
          <div>
            <span>职位类别：</span>
            <span>{{item.industry}}</span>
          </div>
          <div>
            <span>在职时间：</span>
            <span>{{item.time}}</span>
          </div>
          <div class="mutil">
            <span>主要工作：</span>
            <ul>
              <li v-for="(du,duIndex) in item.work" :key="duIndex">
                <span>{{duIndex+1}}.{{du}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <hr />
      <ul class="itemHisInfo">
        <h2>项目经验</h2>
        <li
          v-for="(item,index) in itemHisInfo"
          :key="index"
          :data-content="itemHisInfo.length-index"
        >
          <div>
            <span>所在公司：</span>
            <span>{{getCompany(item.type)}}</span>
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
          <div class="mutil">
            <span>项目内容和职责：</span>
            <ul>
              <li v-for="(du,duIndex) in item.duty" :key="duIndex">
                <span>{{duIndex+1}}.{{du}}</span>
              </li>
            </ul>
          </div>
          <div class="mutil" v-if="item.result && item.result.length">
            <span>工作成果：</span>
            <ul>
              <li v-for="(du,duIndex) in item.result" :key="duIndex">
                <span>{{duIndex+1}}.{{du}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="print">
      <button
        v-print="printObj"
        title="点击可直接打印此页面或保存为pdf,为保证效果,请尽量使用Google Chrome或者Safari访问"
      >打印此页面</button>
    </div>
  </div>
  <div v-else class="phone">
    为了打印方便，请在PC端打开https://0227vera.github.io/about/
  </div>
</template>

<script>
import Print from "vue-print-nb";
import Vue from "vue";
Vue.use(Print);
import itemHisInfo from "../public/json/itemHisInfo";
import itemHisWorkInfo from "../public/json/itemHisWorkInfo";
import skillInfo from "../public/json/skillInfo";
import baseInfo from "../public/json/baseInfo";
export default {
  data() {
    return {
      isPCBroswer: false,
      printObj: {
        id: "printMe",
        popTitle: `廖轩-高级前端工程师-${new Date().getFullYear() - 2018}年`
      },
      baseInfo,
      skillInfo,
      itemHisInfo: itemHisInfo.filter(item => !item.hide),
      itemHisWorkInfo: itemHisWorkInfo.filter(item => !item.hide)
    };
  },
  mounted(){
    import('../public/js/utils').then(m => {
      this.isPCBroswer = m.default()
    })
  },
  methods: {
    getCompany(num) {
      return [
        "",
        "科大讯飞-北京乐知行软件有限公司",
        "滴滴出行"
      ][num];
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
.phone{
  white-space: pre-line;
}
.about {
  width: 960px;
  .baseInfo {
    width: 960px;
    overflow: hidden;
    position: relative;
    &::after {
      content: "基础信息";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 40px;
      text-align: center;
      line-height: 80px;
      letter-spacing: 80px;
      z-index: -1;
      color: #eeeeee;
      font-style: oblique;
    }
    li {
      width: 320px;
      float: left;
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      span:nth-child(2) {
        font-weight: 600;
      }
      span:nth-child(1) {
        display: inline-block;
        width: 80px;
        text-align: right;
      }
    }
  }
  .skillInfo {
    h2 {
      text-align: center;
      padding: 20px 0;
      letter-spacing: 20px;
    }
    margin-top: 10px;
    position: relative;
    &::after {
      content: "专业技能";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      font-size: 40px;
      text-align: center;
      margin-top: -40px;
      letter-spacing: 80px;
      z-index: -1;
      color: #eeeeee;
      font-style: oblique;
    }
    span:nth-child(1) {
      margin-right: 5px;
    }
    li{
      margin-top: 10px;
      margin-left: 40px;
      font-weight: bold;
    }
  }
  .itemHisWorkInfo {
    margin-top: 10px;
    width: 960px;
    height: auto;
    overflow: hidden;
    position: relative;
    h2 {
      text-align: center;
      padding: 20px 0;
      letter-spacing: 20px;
    }
    & > li {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-top: 20px;
      padding-bottom: 20px;
      position: relative;
      &::after {
        content: "";
        width: 100%;
        border-bottom: dashed 1px #000;
        bottom: 0;
        left: 0;
        position: absolute;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
      &::before {
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
      div {
        width: 100%;
        display: flex;
        align-items: center;
        line-height: 40px;
        & > span {
          display: inline-block;
          vertical-align: top;
          &:first-child {
            width: 130px;
            text-align: right;
          }
          &:last-child {
            font-weight: 600;
          }
        }
        &:first-child {
          width: 100%;
        }
        &:last-child {
          width: 100%;
          ul {
            display: inline-block;
            vertical-align: top;
            font-weight: 600;
          }
        }
        &.mutil {
          width: 100%;
          margin-bottom: 10px;
          ul {
            vertical-align: top;
            font-weight: 600;
            border: 1px #eeeeee solid;
            padding: 10px;
            flex: 1;
            border-radius: 8px
          }
        }
      }
    }
  }
  .itemHisInfo {
    margin-top: 10px;
    width: 960px;
    height: auto;
    overflow: hidden;
    position: relative;
    h2 {
      text-align: center;
      padding: 20px 0;
      letter-spacing: 20px;
    }
    & > li {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-top: 20px;
      padding-bottom: 20px;
      position: relative;
      &::after {
        content: "";
        width: 100%;
        border-bottom: dashed 1px #000;
        bottom: 0;
        left: 0;
        position: absolute;
      }
      &::before {
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
      div {
        width: 100%;
        line-height: 40px;
        display: flex;
        align-items: center;
        & > span {
          &:first-child {
            width: 130px;
            text-align: right;
          }
          &:last-child {
            font-weight: 600;
          }
        }
        &.mutil {
          width: 100%;
          margin-bottom: 10px;
          ul {
            vertical-align: top;
            font-weight: 600;
            border: 1px #eeeeee solid;
            padding: 10px;
            flex: 1;
            border-radius: 8px
          }
        }
      }
    }
  }
  hr {
    margin-top: 10px;
  }
}
.print {
  margin: 20px 0;
  position: fixed;
  top: 60px;
  right: 20px;
  button {
    height: 40px;
    line-height: 40px;
    width: 160px;
    outline: none;
    border: none;
    background: #449eff;
    color: #ffffff;
    cursor: pointer;
    border-radius: 5px;
  }
}
</style>
