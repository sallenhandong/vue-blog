<template>
  <div class="page3">
 <!--      <div class="logo-box">
          <a href="https://cn.vuejs.org" target="_blank" title="vue.js"><img :src="LogoVue" /></a>
          <a href="https://github.com/sallenhandong" target="_blank" title="github"><img :src="LogoGitHub" /></a>
         <img :src="JS" />
         <img :src="PS" />
         <img :src="iOS" />
         <img :src="SWIFT" />
         <img :src="NODE" />
         <img :src="GOLANG" />
      </div> -->
       <div class="bottom">
            <div class="tags">
          <h3>POPULAR TAGS</h3>
            <TagList class="swiper-slide" v-for="(v, index) in pageNowData" :thisData="v" :key="index"></TagList>
        </div>
         <div class="about">
          <h3>ABOUT</h3>
          <div class="title" @click="onLinkClick('/archive')"> <img class="dot" :src="DOT"/>Article archives</div>
           <div class="title" @click="onLinkClick('/link_url')"><img class="dot" :src="DOT"/>Links</div>
          <div class="title" @click="onLinkClick('/about')"> <img class="dot" :src="DOT"/>About me</div>
        </div>

       </div>
      

<!--       <div class="info-box">
          <div>Vue.js 全家桶框架支持</div>
          <div>成长路上 一路有你 peace&love</div>
      </div> -->

      <div class="last">
          <!-- <img :src="ImgPic" /> -->
          <span>Slim sallen Copyright © 2018–2019 <a href="https://slimsallen.com" target="_blank">slimsallen.com</a> Ltd.</span>
      </div>
  </div>
</template>

<script>
import LogoVue from "../../assets/logo-vue.png";
import LogoGitHub from "../../assets/logo-github.png";
import LogoW3C from "../../assets/logo-w3school.png";
import LogoHTML5 from "../../assets/logo-html5.png";
import ImgPic from "../../assets/我的头像.jpg";
import JS from "../../assets/JS.png";
import iOS from "../../assets/iOS.png";
import PS from "../../assets/PS.png";
import SWIFT from "../../assets/swift.jpg";
import GOLANG from "../../assets/golang.png";
import NODE from "../../assets/node.jpeg";
import { sortDate } from "../../util/tools";
import { mapState } from "vuex";
import ArchiveList from  "../../components/ArchiveList.vue";
import TagList from "../../components/TagList.vue";
import DOT from "../../assets/点灰色.png";
export default {
  name: "page3",
  data: function() {
    return {
      LogoVue,
      LogoGitHub,
      LogoW3C,
      LogoHTML5,
      ImgPic,
      JS,
      iOS,
      PS,
      SWIFT,
      NODE,
      GOLANG,
      pageNowData: [],
      pageNow: 1,
      pageSize: 10,
      total: 0,
      DOT
    };
  },
  components: {
    ArchiveList,
    TagList
  },
  mounted() {
    const temp = this.listData;
    for (let i = 0; temp[i]; i++) {
      setTimeout(() => this.pageNowData.push(temp[i]), (i + 1) * 100);
    }

  },
  computed: {
    ...mapState({
      listData(state) {

        if (!state.app.blogConfig) {
          this.total = 0;
          return [];
        }
           this.total = state.app.blogConfig.t.length;
              console.log(state.app.blogConfig.t);
        return state.app.blogConfig.t;
      }

    })
  },
  watch: {
    listData(newV) {
      this.pageNowData.length = 0;
      const temp = newV;
      for (let i = 0; temp[i]; i++) {
        setTimeout(() => this.pageNowData.push(temp[i]), i * 100);
      }
    }
  },
    methods: {
    onLinkClick(url){
      this.$router.push(url);

    }
  }
};
</script>

<style scoped lang="less">
.page3 {
    display: flex;
  flex-direction: column;
  position: relative;
  background-color: #444444;
  height: 500px;
  margin-right: -40px;
  margin-left: -40px;
  margin-top: 10px;
  margin-bottom: -40px;
  .logo-box {
    display: flex;
    margin: 0 auto;
    max-width: 960px;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 32px;
    img {
      max-height: 60px;
      max-width: 60px;
    }
  }
  .info-box {
    text-align: center;
    color: #ccc;
    letter-spacing: 1px;
    font-size: 14px;
    line-height: 22px;
  }
  .last {
    text-align: center;
    margin-top: 32px;
    color: #888;
    font-size: 14px;
    letter-spacing: 1px;
    img {
      height: 40px;
      margin-right: 8px;
    }
    a {
      color: #888;
      transition: all 200ms;
      &:hover {
        color: #e0e0e0;
      }
    }

  }
  .tags {
      margin-left: 50px;
      color: #a5a5a5;
      font-family: Times New Roman;
      width: 30%;

    }
    h3 {
        font-family: Times New Roman;
      -webkit-margin-before: 0.83em;
    -webkit-margin-after: 0.83em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    }
    .about {
      margin-left: 50px;
      color: #a5a5a5;
      display: flex;
      width: 30%;
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
    .bottom {
          display: flex;
          flex-direction: row;
    }
    .dot{
 height: 7px;
 width: 7px;
 margin:5px;
}
.title{
    font-size: 18px;
    display: inline;
    color: #a5a5a5;
    transition: all 0.2s;
    cursor: pointer;
    letter-spacing: 1px;
    margin-left: 5px;
    font-family: Times New Roman;
/*    font-weight: bold;*/
    &:hover {
      color: deepskyblue;
    }
}
}
</style>
