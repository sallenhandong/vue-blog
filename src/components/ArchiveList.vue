<template>
     <!--   <h3>{{Month}}</h3> -->
       
     <li>
      <img class="dot" :src="DOT"/><span class="date">{{blogInfo.date}}</span><div class="title" @click="onDetailChose">{{ blogInfo.title }}</div>
     </li>
   
</template>

<script>
/** 单个数据列表项 **/
import { mapState } from "vuex";
import { Tag } from "element-ui";
import DOT from "../assets/点.png";
export default {
  name: "ArchiveList",
  data: function() {
    return {
      DOT,
      Month : "2018"
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
        const d = state.app.blogConfig ? state.app.blogConfig.d : [];
        const data = d.find(item => item.gitname === this.thisData.name);
        this.Month = "2018";
        return data || { title: this.thisData.title };
      }
    })
  },
  methods: {
    /** 点击某篇文章保存相关数据进入详情 **/
    onDetailChose() {
      this.$router.push(`/detail/${this.thisData.name}`);
    }
  },
  watch: {}
};
</script>

<style scoped lang="less">
.artive-list {
  width: 100%;
  box-sizing: border-box;
  border-left: solid 5px #d3d3d3;
  padding: 4px 8px;
}
a {
  color: #555;
  font-size: 15px;
  margin:5px;
    &:hover {
            color:black;

          }
}
li {
  margin:10px;

}

.listing {

}
h2{
  font-family: Times New Roman;
      -webkit-margin-before: 0.83em;
    -webkit-margin-after: 0.83em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
.date{
  font-family:Times New Roman;
    color: #555;
  font-size: 15px;
}
.title{
  font-size: 14px;
    display: inline;
    color: black;
    transition: all 0.2s;
    cursor: pointer;
    letter-spacing: 1px;
    margin-left: 5px;
/*    font-weight: bold;*/
    &:hover {
      color: lightgray;
    }
}
.dot{
 height: 7px;
 width: 7px;
 margin:5px;
}
</style>
