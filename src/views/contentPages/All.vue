<template>
    <div class="live-box">
        <div class="page1">
            <!--      <div class="shadow all_trans1s"></div> -->
            <div class="info-box">
                <span class="title">{{blogName}}</span>
                <div class="content">{{blogSignature}}</div>
                <div class="content">{{blogSignatureEn}}</div>
            </div>
        </div>
        <appHeader></appHeader>
        <div class="container">
            <transition-group name="list" tag="ul" class="live" :style="computeStyle">
                <ArtiveList v-for="(v, index) in pageNowData" :thisData="v" :key="index"></ArtiveList>
            </transition-group>
            <div v-if="blogStyle==1" class="newArticle">
                <div class="articleTitle">最新文章</div>
                <div class="content">
                    <NewArtiveList v-for="(v, index) in pageNowData" :thisData="v" :key="index"></NewArtiveList>
                </div>
            </div>
        </div>
        <div class="pagin">
            <Pagination :total="total" :current-page="pageNow" layout="total, prev, pager, next" @current-change="onPageChange"></Pagination>
        </div>
        <footerView></footerView>
        <vm-back-top :bottom="100" :duration="1000" :timing="'ease'">
            <div class="top"><img :src="backTopImage"></div>
        </vm-back-top>
    </div>
</template>
<script>
/** 文章列表页 **/
import { mapState } from "vuex";
import { Pagination, Breadcrumb, BreadcrumbItem } from "element-ui";
import ArtiveList from "../../components/ArtiveList.vue";
import NewArtiveList from "../../components/NewArtiveList.vue";
import { sortDate } from "../../util/tools";
import ImgLoading from "../../assets/loading.gif";
import ImgLogo from "../../assets/logo.png";
import Vue from 'vue'
import VmBackTop from 'vue-multiple-back-top'
import footerView from "../homePages/footerView.vue";
import { blogName, blogSignature, blogSignatureEn, backTopImage, blogStyle } from "../../config";
import { scrollTop } from './assist';
import appHeader from "../../components/header.vue";
import { isPc } from "../..//util/tools";
Vue.component(VmBackTop.name, VmBackTop)
export default {
    name: "live",
    data: function() {
        return {
            ImgLoading,
            pageNow: 1,
            pageSize: 10,
            total: 5,
            pageNowData: [],
            ImgLogo,
            blogName,
            blogSignature,
            blogSignatureEn,
            backTopImage,
            blogStyle,
            isPc: isPc(),
        };
    },
    components: {
        ArtiveList,
        Pagination,
        Breadcrumb,
        BreadcrumbItem,
        footerView,
        appHeader,
        NewArtiveList
    },
    mounted() {
        const temp = this.listData;
        for (let i = 0; temp[i]; i++) {
            setTimeout(() => this.pageNowData.push(temp[i]), (i + 1) * 100);
        }
        this.blogSignature = blogSignature;
        this.blogSignatureEn = blogSignatureEn;
        this.blogName = blogName;
        this.blogStyle = blogStyle;
    },
    computed: {
        computeStyle() {
            if (this.isPc) {
                return { width:  blogStyle == 2  ? 100 + `\%`:  70 + `\%`  }
            }
            
        },
        ...mapState({
            listData(state) {
                if (!state.app.blogConfig) {
                    this.total = 0;
                    return [];
                }
                this.total = state.app.blogList.length;
                return sortDate(state.app.blogList, state.app.blogConfig.d).filter(
                    (item, index) =>
                    index >= (this.pageNow - 1) * 10 && index < this.pageNow * 10
                );
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
        /** 页码改变时触发 **/
        onPageChange(v) {
            this.pageNow = v;
        }
    }
};
</script>
<style scoped lang="less">

.live-box {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    min-height: 100%;
    background-color: #f5f5f5;
    /* overflow: hidden;*/
    .live {
        width: 70%;
        min-height: 300px;

        left: 0px;
    }
    .pagin {
        margin-top: 8px;
        flex: none;
    }
    .page1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        padding: 16px;
        height: 400px;
        background-image: url(../../assets/beijing.jpeg);
        background-size: cover;
        background-position: top center;
        margin-bottom: 20px;
        &.show {
            .shadow {
                opacity: 0.9;
            }

            .info-box {
                &>div {
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
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            opacity: 0.5;
            z-index: 1;
        }
        .info-box {
            flex: auto;
            margin-top: 20vh;
            color: #d0d0d0;
            text-align: center;
            z-index: 2;
            &>div {
                color: white;
                letter-spacing: 1px;
                opacity: 1;
                font-size: 15px;
                &:hover {
                    color: deepskyblue;
                }
            }
            .title {
                display: block;
                font-size: 36px;
                letter-spacing: 2px;
                color: #f0f0f0;
                margin-top: 0px;
                transition-delay: 0.2s;
                opacity: 1;
                &:hover {
                    color: deepskyblue;
                }
            }
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
    .newArticle {
        width: 20%;
        border-radius: 10px;
        background-color: white;
        min-height: 220px;
        max-height: 220px;
        .articleTitle {
            text-align: left;
            top: 10px;
            border-bottom: 1px solid #eee;
            padding: 0 30px;
            box-shadow: 0 2px 5px -1px rgba(0, 0, 0, .05);
            color: rgba(0, 0, 0, .4);
            line-height: 35px;
        }
        .content {
            top: 10px;
        }
        li {
            text-align: left;
        }
    }
    .container {
        display: flex;
        flex-direction: row;

    }
}

@media all and (max-width: 600px) {
    .live-box {
        .live {
            width: 100%;
        }
        .container {
            display: flex;
            flex-direction: column;
            .newArticle {
                left: 7%;
                width: 90%;
            }
            .content {
                font-size: 14px;
            }
        }
    }
}
</style>