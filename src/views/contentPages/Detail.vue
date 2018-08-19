<template>
    <div class="page-detail" :v-loading="true">
        <vue-topprogress ref="topProgress"></vue-topprogress>
        <div id="home" class="home">
            <div id="scroller" class="scroller">
                <ul class="scroll-wrapper">
                    <li v-if="isPc" class="scroll-page">
                        <PageDetail :pageNow="pageNow"></PageDetail>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="!sourceData" class="loading-box">
            <img :src="ImgLoading" />
            <div>正在获取请稍候…</div>
        </div>
        <div ref="theBody" v-html="htmlData" class="the-body markdown-body editormd-html-preview"></div>
        <img :src="qrcode" class="zanshang" />
        <p class="zhichi">若你觉得我的文章对你有帮助,欢迎点击扫描上方二维码对我打赏</p>
        <share :config="Sconfig"></share>
        <span>感谢您花费时间阅读这篇文章！祝您在这里记录、阅读、分享愉快！</span>
        <br>
        <br>
        <span>作者@{{blogName}}</span>
        <br>
        <br>
        <span>{{blogSignature}}</span>
        <div class="the-end">--<span>End</span>--</div>
        <vm-back-top :bottom="100" :duration="1000" :timing="'ease'">
            <div class="top">返回顶端</div>
        </vm-back-top>
        <!--     <div id="gitment-box" class="gitment-box"></div> -->
    </div>
</template>
<script>
/** 文章的详情页 **/
import { mapState } from "vuex";
import { isPc } from "../../util/tools";
import IScroll from "iscroll";
import PageDetail from "../homePages/PageDetail.vue";
import "gitment/style/default.css";
import { masterName, blogName, blogSignature,moneyQrcode} from "../../config";
import ShowDown from "showdown";
import Gitment from "gitment";
import ImgLoading from "../../assets/loading.gif";
import { Button, Breadcrumb, BreadcrumbItem } from "element-ui";
import Vue from 'vue'
import Share from 'vue-social-share'
import { vueTopprogress } from 'vue-top-progress'
Vue.use(Share)
export default {
    name: "live",
    data: function() {
        return {
            sourceData: null,
            ImgLoading,
            Sconfig: {},
            isPc: isPc(),
            scrollDom: null,
            scrolling: false, // 是否正在滚动中
            pageNow: { title: "", info: "", date: "", pic: "" },
            blogName:"",
            blogSignature:"",
            qrcode:""
        };
    },

    components: {
        Button,
        Breadcrumb,
        BreadcrumbItem,
        PageDetail,
        vueTopprogress
    },
    mounted() {
        // console.log("router:", this.$route.params.id);
        this.getData(this.$route.params.id);
        /** PC端才初始化iscroll **/
        if (this.isPc) {
            this.initScroll();
        };
        this.$refs.topProgress.start();

    },
    beforeDestroy: function() {
        /** 离开前销毁iscroll实例 **/
        this.scrollDom && this.scrollDom.destroy();
    },
    computed: {
        /** 原始数据转html代码 **/
        htmlData() {
            if (!this.sourceData) {
                return null;
            }

            const converter = new ShowDown.Converter();
            return converter.makeHtml(this.sourceData);
        },
        ...mapState({
            blogCache(state) {
                return state.app.blogs.find(
                    item => item.name === this.$route.params.id
                );
            },
            /** 获取当前文章的配置信息 **/
            blogConfig(state) {
                const id = this.$route.params.id;
                if (!id || !state.app.blogConfig) {
                    return {};
                }
                const b = state.app.blogConfig.d;
                const data = b.find(item => item.gitname === id) || { title: id };
                this.Sconfig.url = "https://slimsallen.com/#/detail/" + data.gitname;
                document.title = data.title;
                return b.find(item => item.gitname === id) || { title: id };
            },
          
        })
    },
    methods: {

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

            this.scrollDom && this.scrollDom.goToPage(1, 0, 1000);
        },
        getData(id) {
            if (!id) {
                return null;
            }
            this.$store
                .dispatch({
                    type: "app/getBlogConfig",
                    url: id
                })
                .then(res => {
                    if (res.status === 200) {
                        var data = res.data;
                        const result = data.d.find(item => item.gitname === id) || { title: id };
                        this.pageNow.title = result.title;
                        this.pageNow.info = result.info;
                        this.pageNow.pic = result.pic;
                        this.pageNow.date = result.date;
                        this.blogName = blogName;
                        this.blogSignature = blogSignature;
                        this.qrcode = moneyQrcode;
                    }
                });



            this.$store
                .dispatch({
                    type: "app/getBlogDetail",
                    url: id
                })
                .then(res => {
                    if (res.status === 200) {
                        this.sourceData = res.data;
                        this.$refs.topProgress.done();
                    }
                });
        },
 }
};
</script>
<style lang="less">
.page-detail {
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    .the-body {
        padding: 0 !important;
        overflow-x: hidden;
        font-size: 16px;
    }
    .info {
        letter-spacing: 1px;
        .title {
            font-size: 32px;
            letter-spacing: 1px;
        }
        .date {
            margin-top: 8px;
            font-size: 16px;
            color: #888;
        }
        border-bottom: solid 1px #e0e0e0;
        padding-bottom: 24px;
        margin-bottom: 24px;
    }
    .loading-box {
        padding: 48px;
        text-align: center;
        display: block;
        margin: 0 auto;
        color: #888;
        font-size: 14px;
        div {
            margin-top: 8px;
        }
    }
    .the-end {
        padding: 50px 0;
        text-align: center;
        font-size: 14px;
        color: #888;
        span {
            padding: 0 24px;
        }
    }
    .bread {
        display: flex;
        align-items: center;
        padding-bottom: 16px;
        i {
            margin-right: 8px;
            margin-left: -5px;
            color: #0acb79;
        }
    }
}

.zanshang {
    position: absolute;
    left: 50%;
    margin-top: 5px;
    /* 高度的一半 */
    margin-left: -25px;
    /* 宽度的一半 */
    width: 120px;
    height: 120px;
}

.zhichi {
    text-align: center;
    margin-top: 130px;
    margin-left: 70px;
}

.home {
    background-color: #222;
    overflow: hidden;
    .scroller {
        height: 80vh;
        min-height: 300px;
        display: block;
        overflow: hidden;
        .scroll-wrapper {
            display: block;
            width: 100%;
            .scroll-page {
                display: block;
                width: 100%;
                height: 100vh;
                min-height: 300px;
                background-color: #fff;
                &.foot-page {
                    height: 300px;
                }
            }
        }
    }
}

.top {
    padding: 10px;
    background: red;
    margin-bottom: 100px;
    color: #fff;
    width: 100px;
    height: 100px;
    /*        text-align: center;*/
    border-radius: 2px;
}

@media only screen and (max-width: 640px) {
    .gitment-editor-login {
        width: 42px !important;
        margin-right: 0 !important;
        overflow: hidden;
        white-space: nowrap;
    }
}
</style>