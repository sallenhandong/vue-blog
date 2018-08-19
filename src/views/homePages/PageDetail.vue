<template>
  <div class="page1" :class="{show: isShow}">

      <div class="shadow all_trans1s"></div>
        <div class="backBtn" @click="onBackClick"><img class="backImage" :src="BackImage" /></div>
          <img class="bgImgView" :src="pageNow.pic" />
      <div class="info-box">
          <span class="all_trans1s title">{{pageNow.title}}</span>
           <div class="all_trans1s detail">{{pageNow.info}}</div>
          <div class="all_trans1s detail">{{pageNow.date}}</div>
       
      </div>
<!--       <img class="down" :src="ImgDown" /> -->
  </div>
</template>

<script>
import ImgLogo from "../../assets/logo.png";
import ImgDown from "../../assets/down.png";
import BackImage from "../../assets/返回.png";
export default {
  name: "page4",
  data: function() {
    return {
      isShow: true,
      ImgLogo,
      ImgDown,
      BackImage
    };
  },
  props: ["pageNow"],
  components: {},
  // mounted() {
  //   if (this.pageNow === 0) {
  //     this.isShow = true;
  //   }
  // },
  // beforeUpdate() {
  //   this.isShow = this.pageNow === 0;
  // }
   methods: {
    /** 点击某篇文章保存相关数据进入详情 **/
    onBackClick(){
      this.$router.go(-1);
    }
  }
  
};
</script>

<style scoped lang="less">
@keyframes animate-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}

.page1 {
  display: flex;
  flex-direction: column;
/*  align-items: center;*/
  box-sizing: border-box;
  padding: 16px;
  height: 100%;
  background-size: cover;
  background-position: top center;
  &.show {
    .shadow {
      opacity: 0.9;
    }
    .info-box {
      & > div {
        transform: scale(1);
        letter-spacing: 1px;
        margin-bottom: 8px;
        opacity: 1;
      }
      .dot {
        opacity: 0.7;
      }
      .title {
        opacity: 1;
      }
    }
  }
  .shadow {
    position: absolute;
    top: 0;
    left: -20;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 1;
    z-index: 1;
  }
  .info-box {
    flex: auto;
    margin-top: 20vh;
    color: #d0d0d0;
    text-align: center;
    z-index: 2;
    font-size: 12px;
    & > div {
      letter-spacing: 8px;
      transform: scale(2);
      opacity: 0;
      &:nth-child(2) {
        transition-delay: 0.4s;
      }
      &:nth-child(3) {
        transition-delay: 0.6s;
      }
    }
    .title {
      display: block;
      font-size: 27px;
      letter-spacing: 2px;
      color: #f0f0f0;
      margin-bottom: 32px;
      text-align: center;
      transition-delay: 0.6s;
      opacity: 0;
      margin-left: 80px;
      margin-right: 80px;
    }
    .detail{
      display: block;
      font-size: 15px;
      letter-spacing: 2px;
      color: #f0f0f0;
      margin-bottom: 32px;
      transition-delay: 0.6s;
      opacity: 0;

    }
  }
  .down {
    flex: none;
    margin-bottom: 140px;
    width: 16px;
    z-index: 2;
    animation: animate-down 1s;
    animation-iteration-count: infinite;
  }
.bgImgView {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    filter: blur(9px);
    filter: opacity(30%);
    margin-top: -20px;

  }
  .backBtn{
    left: 60px;
    top: 45px;
    width: 100px;
     z-index: 3;

  }
  .backImage {
      width: 30px;
    height: 30px;
  }
}
</style>
