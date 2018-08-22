<template>
    <div id="home" class="home" @mousewheel="onMouseWheel" @DOMMouseScroll="onMouseWheel">
        <!-- <div id="scroller" class="contentScroll">
      </div> -->
        <Page2></Page2>
    </div>
</template>
<script>
import { isPc } from "../util/tools";
import IScroll from "iscroll";
import Page2 from "./homePages/Page2.vue";
import footerView from "./homePages/footerView.vue";
import appHeader from "../components/header.vue";
import { mapState } from "vuex";
import All from "./contentPages/All.vue";
import { blogStyle } from "../config";

export default {
    name: "home",
    data: function() {
        return {
            isPc: isPc(),
            scrollDom: null,
            scrolling: false, // 是否正在滚动中
            pageNow: 0,
            blogStyle
        };
    },
    props: {},
    components: {
        appHeader,
        Page2,
        footerView,
        All
    },
    computed: {
        ...mapState({})
    },
    mounted: function() {

        /** 获取博客配置信息 **/
        this.getBlogConfig();
        /** 获取博客列表 **/
        this.getBlogList();
    },
    beforeDestroy: function() {
        /** 离开前销毁iscroll实例 **/
        this.scrollDom && this.scrollDom.destroy();
    },
    methods: {
        onLinkClick() {
            this.scrollDomscrollTo(0, 0, 1);
        },
        clickSimple() {

            alert('简单样式');
            this.blogStyle = 2;
            this.$router.go(0);
        },
        /** 初始化页面全局滚动 **/
        initScroll() {
            this.scrollDom = new IScroll("#scroller", {
                snap: true,
                bounceEasing: {
                    style: "cubic-bezier(1,0.1,0.1,1)"
                },
                bounceTime: 1000,
                preventDefault: true,
                disablePointer: true
            });
            this.scrollDom.on("scrollEnd", () => {
                this.scrolling = false;
            });
        },
        /** 监听滚轮事件处理页面滚动 **/
        onMouseWheel(e) {
            // console.log("有在触发吗,IE", e);
            const f = e.wheelDeltaY || -e.detail || e.wheelDelta;
            if (this.scrolling) {
                return;
            }

            if (f < 0 && this.pageNow < 2) {
                // 向下滚动
                this.scrolling = true;
                this.pageNow++;
                this.scrollDom && this.scrollDom.goToPage(1, this.pageNow, 1000);
                // console.log("滚动：", this.scrollDom);
            } else if (f > 0 && this.pageNow > 0) {
                // 向上滚动
                this.scrolling = true;
                this.pageNow--;
                this.scrollDom && this.scrollDom.goToPage(1, this.pageNow, 1000);
            }
        },
        /** 进入页面获取博客配置信息 **/
        getBlogConfig() {
            this.$store.dispatch({
                type: "app/getBlogConfig",
                params: null
            });
        },
        /** 进入页面及获取所有文章列表 **/
        getBlogList() {
            this.$store.dispatch({
                type: "app/getBlogList",
                params: null
            });
        }
    },
    watch: {}
};
</script>
<style scoped lang="less">
.home {
    background-color: #222;
    left: -20px;
    margin-right: -30px;
    /*  overflow: hidden;*/
    .contentScroll {
        height: 100vh;
        display: block;
        /*    overflow: hidden;*/
    }
}

.clickSimple {
    padding: 10px;
    position: absolute;
    top: 100px;
    right: 0px;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    width: 200px;
    height: 200px;
}
</style>