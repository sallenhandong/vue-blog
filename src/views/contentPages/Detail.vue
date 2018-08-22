<template>
    <div class="page-detail" :v-loading="true">
        <vue-topprogress ref="topProgress"></vue-topprogress>
        <div class="page1">
            <PageDetail :pageNow="pageNow"></PageDetail>
        </div>
        <div v-if="!sourceData" class="loading-box">
            <img :src="ImgLoading" />
            <div>正在获取请稍候…</div>
        </div>
<!--         <div v-html="htmlData" v-highlight>
        </div> -->
         <div ref="theBody" v-html="htmlData" class="the-body markdown-body editormd-html-preview"></div>
        <div class="shareAndPay">
            <img :src="qrcode" class="zanshang" />
            <p class="content">若你觉得我的文章对你有帮助,欢迎点击扫描上方二维码对我打赏</p>
            <qr-code :text="shareUrl" size="100" color="black" class="shareView"></qr-code>
            <p class="content">扫描二维码,分享此文章</p>
            <div class="line"></div>
        </div>
        <div class="profile">
            <img :src="headImage" class="headImage">
            <span class="nickName">{{blogName}}</span>
            <span class="introduce">{{introduce}}</span>
            <span class="address">{{address}}<a  target="_blank" :href="blogLink" >{{blogLink}}</a></span>
        </div>
        <div class="the-end">--<span>End</span>--</div>
              <vm-back-top :bottom="100" :duration="1000" :timing="'ease'">
    <div class="top"><img :src="backTopImage"></div>
  </vm-back-top>
    </div>
</template>
<script>
/** 文章的详情页 **/
import { mapState } from "vuex";
import { isPc } from "../../util/tools";
import IScroll from "iscroll";
import PageDetail from "../homePages/PageDetail.vue";
import "gitment/style/default.css";
import { masterName, blogName, blogSignature, moneyQrcode, headImage, introduce,backTopImage ,blogLink,address} from "../../config";
import ShowDown from "showdown";
import Gitment from "gitment";
import ImgLoading from "../../assets/loading.gif";
import { Button, Breadcrumb, BreadcrumbItem } from "element-ui";
import Vue from 'vue'
import Share from 'vue-social-share'
import { vueTopprogress } from 'vue-top-progress'
import VueQRCodeComponent from 'vue-qrcode-component'
import VmBackTop from 'vue-multiple-back-top'
import VueMarkdown from 'vue-markdown'
import hljs from 'highlight.js';
Vue.component(VmBackTop.name, VmBackTop)
Vue.component('qr-code', VueQRCodeComponent)
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
            blogName: "",
            blogSignature: "",
            qrcode: "",
            shareUrl: "",
            headImage: "",
            introduce: "",
            content: "",
            backTopImage:"",
            address:""
        };
    },

    components: {
        Button,
        Breadcrumb,
        BreadcrumbItem,
        PageDetail,
        vueTopprogress,
        VueMarkdown
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
                        this.shareUrl = "https://slimsallen.com/#/detail/" + result.gitname;
                        this.headImage = headImage;
                        this.introduce = introduce;
                        this.backTopImage = backTopImage;
                        this.blogLink = blogLink;
                        this.address = address;
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
                        this.content = this.sourceData;
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
    background-color: white;
    .the-body {
        padding: 0 !important;
        overflow-x: hidden;
        font-size: 16px;
        left: 5%;
        width: 90%;
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
    margin-top: 5px;
    width: 100px;
    height: 100px;
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



.page1 {

    height: 400px;
    background-size: cover;
    background-position: top center;
    margin-bottom: 20px;
    margin-left: -40px;
    margin-right: -40px;
    margin-top: -40px;
}

.shareAndPay {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    .line {
        background-color: lightgray;
        margin-top: 20px;
        height: 1px;
        width: 100%;
    }
}

.content {
    font-size: 13px;
    /*    font-style: italic;*/
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    text-align: center;
    color: #595959;
}

.shareView {
    margin-top: 20px;
}

.profile {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    .nickName {
        font-size: 22px;
        color: #999;
        margin-top: 20px;
    }
    .introduce {
        margin-top: 20px;
        font-size: 14px;
        margin-bottom: 20px;
        margin-right: 30px;
        margin-left: 30px;
    }
    .headImage {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        background-position: center center;
        background-size: cover;
        border: solid 3px rgba(211, 211, 211, 0.3);
    }
    a {
        font-size: 15px;
        font-style: italic;
        color: #999;
        margin-left: 10px;
        &:hover {
            color: black;
        }
        ;
    }
    .address {
        font-size: 13px;
        font-style: italic;
    }
}
.top {
        padding: 10px;
        margin-right: -20px;
        margin-bottom: -100px;
        color: #fff;
        text-align: center;
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