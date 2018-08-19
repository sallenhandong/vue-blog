<template>
    <li class="artive-list">
        <div class="tags">
          <div v-for="(item, index) in blogInfo.tags" :key="index" :data-id='item.type' @click="onDetailChose(item.type)"> <img class="dot" :src="DOT"/> {{ item.name}}</div>
        </div>
    </li>
</template>

<script>
/** 单个数据列表项 **/
import { mapState } from "vuex";
import { Tag } from "element-ui";
import DOT from "../assets/点灰色.png";
export default {
  name: "ArtiveList",
  data: function() {
    return {
      tagName:"",
      DOT
    };
  },
  props: {
    thisData: Object
  },
  components: {
    Tag
  },
  mounted() {},
  computed: {

    ...mapState({

      blogInfo(state) {
        const d = state.app.blogConfig ? state.app.blogConfig.t : [];
        const data = d.find(item => item.gitname === this.thisData.name);
        return data || { title: this.thisData.name };
      }
    })
  },
  methods: {
    /** 点击某篇文章保存相关数据进入详情 **/
    onDetailChose(e) {
      var type = e;
       this.$router.push(`/tagDetail/${type}`);
    }
  },
  watch: {}
};
</script>

<style scoped lang="less">
.artive-list {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
}
  .tags {
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    & > div {
      font-size: 18px;
      font-family: Times New Roman;
   /*   margin-right: 6px;*/
/*      background-color: #00bcd4;*/
      color: #a5a5a5;
      width: 200px;
      padding: 5px 2px;
      border-radius: 3px;
     transition: all 0.2s;
      cursor: pointer;    
      font-weight: bold;
      display: inline;
      &:hover {
             color: deepskyblue;
            }
    }
    
  }
    .dot{
 height: 7px;
 width: 7px;
 margin:5px;
}

</style>
