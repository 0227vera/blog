<template>
  <div class='drag'>
      <draggable v-model="items" id="dragFather" :options="options">
          <li v-for="(item,index) in items" :key="index">              
              <span>{{item.name}}</span>  
              <span>{{item.lotStatus}}</span>
              <span>{{index + 1}}级审批</span>            
          </li>
      </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      items: [
        { name: "test1", lotStatus: "test1", id: "test1" },
        { name: "test2", lotStatus: "test2", id: "test2" },
        { name: "test3", lotStatus: "test3", id: "test3" },
        { name: "test4", lotStatus: "test4", id: "test4" },
        { name: "test5", lotStatus: "test5", id: "test5" },
        { name: "test6", lotStatus: "test6", id: "test6" }
      ],
      options: {
        animation: 200
      }
    };
  },
  mounted() {},
  methods: {},
  components: {
    draggable
  }
};
</script>

<style lang="scss" scoped>
.drag {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#dragFather {
  height: auto;
  overflow: hidden;
  padding: 10px 15px;
  li {
    list-style: none;
    height: 50px;
    line-height: 50px;
    color: #1abc9c;
    border: solid 1px #aaa;
    margin-top: 10px;
    display: flex;
    border-radius: 5px;
    span {
      font-size: 20px;
      display: block;
      width: 33%;
      text-align: center;
      &:nth-child(2) {
        color: #000;
      }
    }
  }
}
</style>
