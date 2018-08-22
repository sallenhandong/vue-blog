<template>
    <div class="artive-list">
        <div v-if="blogStyle==1" class="style1">
            <div class="style1 contentView">
                <div class="title" @click="onDetailChose">{{ blogInfo.title }}</div>
                <div class="info"><span v-html="blogInfo.info"></span></div>
                <div class="time">{{ blogInfo.date }}</div>
                <div class="tags">
                    <div v-for="(item, index) in blogInfo.tags" :key="index">{{ item }}</div>
                </div>
                <div class="read-more" @click="onDetailChose">阅读全文</div>
                <div class="line"></div>
            </div>
        </div>
        <div v-else class="style2">
            <div v-if="blogInfo.pic" class="pic2"><img :src="blogInfo.pic">
            </div>
            <div class="infoView2">
                <div class="title2" @click="onDetailChose">{{ blogInfo.title }}</div>
                <div class="time2">{{ blogInfo.date }}</div>
                <div class="tags2">
                    <div v-for="(item, index) in blogInfo.tags" :key="index">{{ item }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/** 单个数据列表项 **/
import { mapState } from "vuex";
import { Tag } from "element-ui";
import { blogStyle } from "../config";
export default {
    name: "ArtiveList",
    data: function() {
        return {
            blogStyle: ""
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
                this.blogStyle = blogStyle;
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
    align-items: center;
    margin-left: -15px;
    /*  border-left: solid 5px #d3d3d3;
  padding: 4px 8px;*/
    &+li {
        margin-top: 10px;
    }
    .style2 {
        margin-top: -30px;
        width: 100%;
        background-color: #F5F5F5;
        .title2 {
            font-size: 24px;
            margin-bottom: 8px;
            color: white;
            transition: all 0.2s;
            cursor: pointer;
            letter-spacing: 1px;
            margin-left: 10px;
            font-weight: bold;
            text-align: left;
            &:hover {
                color: lightgray;
            }
        }
        .time2 {
            color: white;
            margin-bottom: 14px;
            font-weight: bold;
            margin-left: 10px;
            text-align: left;
        }
        .pic2 {

            box-sizing: border-box;
            margin-bottom: 8px;
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;

            img {
                margin-top: 10px;
                width: 100%;
                max-height: 500px;
                border-radius: 4px;
                cursor: pointer;
                transition: all 2.0s;
                overflow: hidden;
                &:hover {
                    /* transform: scale(1.05);*/
                }
            }
        }
        .info2 {
            color: #888;
            font-size: 14px;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        .tags2 {
            top: -38px;
            margin-left: 110px;
            display: flex;

            &>div {
                font-size: 12px;
                margin-right: 10px;
                background-color: rgba(255, 251, 240, 0.4);
                color: #fff;
                padding: 3px 20px;
                border-radius: 3px;
                &:hover {
                    background-color: rgba(255, 251, 240, 0.5);
                }
            }
        }
        .infoView2 {
            margin-top: -90px;
            margin-bottom: 80px;
            height: 30px;
            left: 20px;
        }
    }
    .style1 {
        margin-top: -25px;
        width: 100%;
        height: 180px;
        background-color: #F5F5F5;
        .contentView {
            width: 95%;
            max-height: 160px;
            top: 10px;
            background-color: white;
            left: 40px;
            &:hover {
                background-color: #DCDCDC;
                .line {
                    background-color: white;
                }
            }
        }
        /*        .line {
            background-color: lightgray;
            margin-bottom: 30px;
            height: 1px;
            width: 90%;
            left: 5%;
        }*/
        .title {
            font-size: 20px;
            top: 10px;
            left: 5%;
            width: 95%;
            color: #222;
            transition: all 0.2s;
            cursor: pointer;
            letter-spacing: 1px;
            text-align: left;
            &:hover {
                color: #0366d6;
            }
        }
        .time {
            color: #888;
            top: 50px;
            width: 160px;
        }
        .info {
            color: #888;
            font-size: 14px;
            letter-spacing: 1px;
            left: 5%;
            text-align: left;
            width: 95%;
            top: 20px;
        }
        .tags {
            top: 28px;
            left: 150px;
            display: flex;
            width: 80%;
            &>div {
                font-size: 12px;
                margin-right: 4px;
                background-color: #00bcd4;
                color: #fff;
                padding: 3px 5px;
                border-radius: 3px;
            }
        }
        .read-more {
            position: absolute;
            font-size: 16px;
            color: #30634c;
            bottom: 40px;
            right: 10px;
            width: 100px;
            letter-spacing: 1px;
            transition: all 0.2s;
            cursor: pointer;
            &:hover {
                color: #0366d6;
            }
        }
    }
}

@media all and (max-width: 600px) {

    .artive-list {
        top: -40px;
        .style2 {
            margin-top: 0px;
            width: 100%;
            left: -15px;
            .title2 {
                font-size: 20px;
            }
            .pic2 {

                margin-bottom: -10px;
                img {
                    margin-top: 0px;
                    height: 250px;
                }
            }
            .infoView2 {
                position: absolute;
              bottom: -70px;
                height: 60px;
                left: 20px;
            }
        }
        .style1 {
            height: 170px;
            width: 100%;
            margin-top: 10px;
            left: -10px;
            .contentView {
                background-color: white;
                left: 10px;
                width: 90%;
            }
            .title {
                font-size: 16px;
                top: 10px;
                left: 5%;
                width: 90%;
                color: #222;
                transition: all 0.2s;
                cursor: pointer;
                letter-spacing: 1px;
                text-align: left;
                &:hover {
                    color: #0366d6;
                }
            }
            .info {
                color: #888;
                font-size: 14px;
                letter-spacing: 1px;
                left: 5%;
                text-align: left;
                width: 90%;
                top: 20px;
            }
            .tags {
                width: 80%;
                left: 5%;
                display: flex;
                width: 90%;
                &>div {
                    font-size: 12px;
                    margin-right: 4px;
                    background-color: #00bcd4;
                    color: #fff;
                    padding: 3px 16px;
                    border-radius: 3px;
                }
            }
            .read-more {
                position: absolute;
                font-size: 16px;
                color: #30634c;
                bottom: 2px;
                width: 46%;
                left: 50%;
                text-align: right;
                letter-spacing: 1px;
                transition: all 0.2s;
                cursor: pointer;
                &:hover {
                    color: #0366d6;
                }
            }
            .time {
                color: #888;
                width: 140px;
                text-align: left;
                left: 5%;
                position: absolute;
                top: 135px;
                bottom: 0px;
            }
        }
    }
}
</style>