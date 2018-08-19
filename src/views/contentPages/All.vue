<template>
    <div class="live-box">
        <div class="page1">
            <div class="shadow all_trans1s"></div>
            <div class="info-box">
                <span class="all_trans1s title">{{blogName}}</span>
                <div class="all_trans1s">{{blogSignature}}</div>
                <div class="all_trans1s">{{blogSignatureEn}}</div>
            </div>
        </div>
        <transition-group name="list" tag="ul" class="live">
            <ArtiveList v-for="(v, index) in pageNowData" :thisData="v" :key="index"></ArtiveList>
        </transition-group>
        <!--         <div class="nothing" v-if="!pageNowData.length">
            <img :src="ImgLoading" />
            <div>正在加载请稍候…</div>
        </div> -->
        <div class="pagin">
            <Pagination :total="total" :current-page="pageNow" layout="total, prev, pager, next" @current-change="onPageChange"></Pagination>
        </div>
        <vm-back-top :bottom="100" :duration="1000" :timing="'ease'">
            <div class="top">返回顶端</div>
        </vm-back-top>
        <Page3></Page3>
    </div>
</template>
<script>
/** 文章列表页 **/
import { mapState } from "vuex";
import { Pagination, Breadcrumb, BreadcrumbItem } from "element-ui";
import ArtiveList from "../../components/ArtiveList.vue";
import { sortDate } from "../../util/tools";
import ImgLoading from "../../assets/loading.gif";
import ImgLogo from "../../assets/logo.png";
import Vue from 'vue'
import VmBackTop from 'vue-multiple-back-top'
import Page3 from "../homePages/Page3.vue";
import {blogName, blogSignature,blogSignatureEn} from "../../config";
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
            blogSignatureEn
        };
    },
    components: {
        ArtiveList,
        Pagination,
        Breadcrumb,
        BreadcrumbItem,
        Page3
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
                this.total = state.app.blogList.length;
                this.blogSignature = blogSignature;
                this.blogSignatureEn = blogSignatureEn;
                this.blogName = blogName;
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
.list-enter-active {
    transition: all 500ms;
}

.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.live-box {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    min-height: 100%;
    .live {
        display: block;
        width: 100%;
        flex: auto;
        min-height: 300px;
        &li+li {
            margin-top: 16px;
        }
    }
    .nothing {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        text-align: center;
        color: #888;
        div {
            margin-top: 8px;
        }
    }
    .pagin {
        margin-top: 8px;
        flex: none;
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
        margin-left: -40px;
        margin-right: -40px;
        margin-top: -40px;
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
            font-size: 15px;
            &>div {
                letter-spacing: 1px;
                opacity: 1;
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
        .down {
            flex: none;
            margin-bottom: 16px;
            width: 16px;
            z-index: 2;
            animation: animate-down 1s;
            animation-iteration-count: infinite;
        }
    }
    .top {
        padding: 10px;
        background: red;
        margin-bottom: 100px;
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
}
</style>