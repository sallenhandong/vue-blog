<template>
    <div class="menus" :class="{ mobile: !isPc }">
        <!-- 头部，移动端才显示 -->
        <div class="head">
            <div class="menu-btn" @click="onMenuTrigger">
                <i v-if="!menuOpen" class="el-icon-more" ></i>
                <i v-if="menuOpen" class="el-icon-more-outline" ></i>
            </div>
            <span>Slim Sallen Blog</span>
        </div>
        <div class="menu-body" >
            <transition name="fade">
            <div v-show="menuOpen" class="menu-body-box" @click="onMenuClose">
                <transition name="leftmove"><div v-show="menuOpen" class="back-img-box" @click.stop></div></transition>
                <!-- <CanvasBack v-if="isPc"></CanvasBack> -->
                <transition name="leftmove">
                    <div v-show="menuOpen" class="info-box" @click.stop>
                        <div class="photo-box">
                            <img class="photo" :src="ImgPic" />
                            <div v-if="isPc" class="playing" :class="{ stop: !play }"></div>
                            <div v-if="isPc" class="play-btn" @click="playOrStop">
                                <div class="line" :class="{ play }"></div>
                            </div>
                        </div>
                        <div class="name">Slim Sallen</div>
                        <div class="func">全职ios开发 node.js、go、vue 前端爱好者</div>
                        <ul class="link">
                            <li @click="onLinkClick('/')" @touchend="onLinkClick('/')"><img class="menuIcon" :src="HOME"/>&nbsp首页</li>
                            <li @click="onLinkClick('/archive')" @touchend="onLinkClick('/archive')"><img class="menuIcon" :src="ARCHIVE"/>&nbsp归档</li>
                            <li @click="onLinkClick('/tag')" @touchend="onLinkClick('/tag')"><img class="menuIcon" :src="TAG"/>&nbsp标签</li>
                             <li @click="onLinkClick('/link_url')" @touchend="onLinkClick('/link_url')"><img class="menuIcon" :src="LINK_URL"/>&nbsp友链</li>
                            <li @click="onLinkClick('/about')" @touchend="onLinkClick('/about')"><img class="menuIcon" :src="ABOUT"/>&nbsp关于</li>
                        </ul>
                    </div>
                </transition>
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
import ImgPic from "../assets/headImage.jpeg";
import CanvasBack from "./CanvasBack.vue";
import { mapState } from "vuex";
import { getBlogInfo, isPc } from "../util/tools";
import HOME from "../assets/首页.png";
import ARCHIVE from "../assets/归档.png";
import TAG from "../assets/标签.png";
import ABOUT from "../assets/关于.png";
import LINK_URL from "../assets/链接.png";
export default {
  name: "Menus",
  data: function() {
    return {
      ImgPic,
      isPc: isPc(),
      menuOpen: isPc(), // 菜单是否展开
      HOME,
      ARCHIVE,
      TAG,
      ABOUT,
      LINK_URL
    };
  },
  methods: {
    playOrStop() {
      this.$store.dispatch({
        type: "page/setPlaying",
        params: { playing: !this.play }
      });
    },
    onLinkClick(url) {
      this.$router.push(url);
      if (!this.isPc) {
        // 移动端，自动关闭Menu
        this.menuOpen = false;
      }
    },
    onMenuTrigger() {
      this.menuOpen = !this.menuOpen;
    },
    onMenuClose() {
      // console.log("是否触发");
      if (!this.isPc) {
        // 只有移动端才能关闭
        this.menuOpen = false;
      }
    }
  },
  components: {
    CanvasBack
  },
  computed: {
    ...mapState({
      play: state => state.page.playing,
      liveLength: state =>
        state.app.blogConfig
          ? state.app.blogList.filter(
              item => getBlogInfo(item.name, state.app.blogConfig.d).type === 1
            ).length
          : 0,
      workLength: state =>
        state.app.blogConfig
          ? state.app.blogList.filter(
              item => getBlogInfo(item.name, state.app.blogConfig.d).type === 2
            ).length
          : 0,
      articleLength: state =>
        state.app.blogConfig
          ? state.app.blogList.filter(
              item => getBlogInfo(item.name, state.app.blogConfig.d).type === 3
            ).length
          : 0,
      allLength: state => (state.app.blogConfig ? state.app.blogList.length : 0)
    })
  }
};
</script>

<style scoped lang="less">
@keyframes go-round {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.leftmove-enter-active,
.leftmove-leave-active {
  transition: all 0.4s;
}
.leftmove-enter,
.leftmove-leave-to {
  transform: translateX(-90vw);
}

.leftmove0-enter-active,
.leftmove0-leave-active {
  transition: all 0.8s;
}
.leftmove0-enter,
.leftmove0-leave-to {
  transform: translateY(-30vw);
}

.leftmove1-enter-active,
.leftmove1-leave-active {
  transition: all 20s;
}
.leftmove1-enter,
.leftmove1-leave-to {
  transform: translateY(-40vw);
}

.leftmove2-enter-active,
.leftmove2-leave-active {
  transition: all 30s;
}
.leftmove2-enter,
.leftmove2-leave-to {
  transform: translateY(-50vw);
}

.leftmove3-enter-active,
.leftmove3-leave-active {
  transition: all 40s;
}
.leftmove3-enter,
.leftmove3-leave-to {
  transform: translateY(-60vw);
}

.menus {
  position: relative;
  flex: none;
  width: 30vw;
  min-width: 240px;
  max-width: 240px;
  height: 100%;
  box-sizing: border-box;
  z-index: 2;
  .head {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 45px;
    line-height: 45px;
    letter-spacing: 1px;
    text-align: center;
    background-color: #000;
    display: none;
    z-index: 10;
    color: #fff;
    .menu-btn {
      position: absolute;
      top: 0;
      left: 0;
      width: 45px;
      height: 45px;
      color: #fff;
      font-size: 18px;
    }
  }
  .menu-body {
    position: relative;
    width: 100%;
    height: 100%;
    .menu-body-box {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .back-img-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #333;
      background-image: url(../assets/你的名字.jpeg);
      background-size: cover;
      background-position: top center;

    }

    .menuIcon{

      width: 20px;
      height: 20px;
    }
/*    .back-img-box:hover {
      background-image: url(../assets/menu_back.jpg);
     transform: translate(100px,100px);
   }*/
    .info-box {
      width: 100%;
      height: 100%;
      color: #fff;
      box-sizing: border-box;
      letter-spacing: 1px;
      text-align: center;
      z-index: 2;
      padding-top: 15vh;
      padding-bottom: 24px;
      overflow-y: auto;
      overflow-x: hidden;
      .photo-box {
        position: relative;
        display: block;
        width: 26%;
        margin: 0 auto 0 auto;
        padding: 13% 0 13% 0;
        .photo {
          position: absolute;
          display: block;
          box-sizing: border-box;
          top: 2px;
          left: 2px;
          width: calc(100% - 3px);
          height: calc(100% - 3px);
          border-radius: 100%;
          border: solid 3px rgba(255, 255, 255, 0.8);
          z-index: 2;
        }
        .playing {
          position: absolute;
          top: 0;
          left: 0;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border-radius: 100%;
          background: linear-gradient(#3b79d8, rgba(0, 0, 0, 0));
          animation: go-round 2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          opacity: 1;
          z-index: 1;
          &.stop {
            animation-play-state: paused;
          }
        }
        .play-btn {
          cursor: pointer;
          position: absolute;
          box-sizing: border-box;
          top: 2px;
          left: 2px;
          width: calc(100% - 3px);
          height: calc(100% - 3px);
          border-radius: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: all 200ms;
          z-index: 3;
          &:hover {
            opacity: 1;
          }
          .line {
            position: absolute;
            height: 25%;
            width: 25%;
            top: 37.5%;
            left: 30%;
            transition: all 200ms;
            transform: rotate(45deg);
            border: none;
            border-top: solid 1px #fff;
            border-right: solid 1px #fff;
            &.play {
              height: 40%;
              width: 10px;
              top: 30%;
              left: calc(50% - 5px);
              transform: rotate(0);
              border: none;
              border-left: solid 1px #fff;
              border-right: solid 1px #fff;
            }
          }
        }
      }
      .name {
        font-size: 24px;
        margin-top: 12px;
  
      }
      .func {
        font-size: 14px;
        margin-top: 6px;
      }
      .list-info {
        display: flex;
        justify-content: center;
        font-size: 14px;
        margin-top: 24px;
        & > li {
          padding: 4px;
          &:first-child {
            color: aqua;
          }
          &:nth-child(2) {
            color: salmon;
          }
          &:nth-child(3) {
            color: lawngreen;
          }
        }
      }
      .link {
        position: relative;
        display: flex;
        margin-top: 24px;
        flex-direction: column;
        align-items: center;
        & > li {
          margin-bottom: 16px;
          font-size: 14px;
          color: #fff;
          box-sizing: border-box;
          padding: 4px 50px;
          max-width: 100%;
          position: relative;
          transition: all 200ms;
          cursor: pointer;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            max-width: 250px;
            height: 1px;
            background: linear-gradient(
              to right,
              transparent,
              #fff,
              transparent
            );
            transition: all 200ms;
          }
          &:hover {
            &::after {
              width: 80%;
            }
          }
        }
      }
    }
  }
  &.mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    .head {
      display: block;
    }
    .menu-body-box {
      position: absolute;
      top: 45px;
      left: 0;
      width: 100vw !important;
      height: calc(~"100vh - 45px") !important;
      .back-img-box {
        width: 80%;
        box-shadow: 3px 0 8px rgba(0, 0, 0, 0.5);
      }
      .info-box {
        width: 80%;
      }
    }
  }
}
</style>
