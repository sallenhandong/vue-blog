<template>
    <li class="artive-list">
<!--         <div class="title" @click="onDetailChose">{{ blogInfo.title }}</div>
        <div class="time">{{ blogInfo.date }}</div>
        <div v-if="blogInfo.pic" class="pic"><img :src="blogInfo.pic"></div>
        <div class="info"><span v-html="blogInfo.info"></span></div>
        <div class="tags">
            <div v-for="(item, index) in blogInfo.tags" :key="index">{{ item }}</div>
        </div>
        <div class="read-more"  @click="onDetailChose">阅读全文</div> -->

         <div v-if="blogInfo.pic" class="pic"><img :src="blogInfo.pic">

          <div class="title" @click="onDetailChose">{{ blogInfo.title }}</div>
          <div class="time">{{ blogInfo.date }}</div>
           <div class="tags">
            <div v-for="(item, index) in blogInfo.tags" :key="index">{{ item }}</div>
        </div>
         </div>

          
    </li>
</template>

<script>
/** 单个数据列表项 **/
import { mapState } from "vuex";
import { Tag } from "element-ui";
export default {
  name: "ArtiveList",
  data: function() {
    return {};
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
        return data || { title: this.thisData.name };
      }
    })
  },
  methods: {
    /** 点击某篇文章保存相关数据进入详情 **/
    onDetailChose() {

      this.$router.push(`/detail/${this.thisData.name}`);
      document.title = this.blogInfo.title;
    }
  },
  watch: {}
};
</script>

<style scoped lang="less">
.artive-list {
  width: 100%;
  box-sizing: border-box;
/*  border-left: solid 5px #d3d3d3;
  padding: 4px 8px;*/
  & + li {
    margin-top: 32px;
  }
  .title {
    font-size: 24px;
    margin-bottom: 8px;
    color: white;
    transition: all 0.2s;
    cursor: pointer;
    letter-spacing: 1px;
    margin-top: -80px;
    margin-left: 10px;
    font-weight: bold;
    &:hover {
      color: lightgray;
    }
  }
  .time {
    color: white;
    margin-bottom: 14px;
     font-weight: bold;
     margin-left: 10px;
  }
  .pic {
    box-sizing: border-box;
    margin-bottom: 8px;
    width: 100%;
    overflow: hidden;

    img {
      width: 100%;
      max-height: 350px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 2.0s;
      
      &:hover{
        transform: scale(1.05);
      }

    }
  }
  .info {
    color: #888;
    font-size: 14px;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .tags {
    top: -35px;
    margin-left: 110px;
    display: flex;

    & > div {
      font-size: 12px;
      margin-right: 10px;
      background-color: rgba(255,251, 240,0.4);
      color: #fff;
      padding: 3px 20px;
      border-radius: 3px;
       &:hover {
      background-color: rgba(255,251, 240,0.5);
    }
    }
  }
  .read-more {
    font-size: 16px;
    color: #30634c;
    letter-spacing: 1px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
      color: #0366d6;
    }
  }
}
</style>
