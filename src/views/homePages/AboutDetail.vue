<template>
    <div class="aboutDetail">
        <div class="backBtn" @click="onBackClick"><img class="backImage" :src="BackImage" /></div>
        <img class="bgImgView" :src="aboutImage" />
        <div class="info-box">
            <span class="title">关于</span>
        </div>
        <img class="down" :src="ImgDown" />
    </div>
</template>
<script>
import ImgLogo from "../../assets/logo.png";
import ImgDown from "../../assets/down.png";
import BackImage from "../../assets/返回.png";
import { aboutImage } from "../../config";

export default {
    name: "aboutDetail",
    data: function() {
        return {
            isShow: true,
            ImgLogo,
            ImgDown,
            BackImage,
            aboutImage
        };
    },
    props: ["pageNow"],
    components: {},
    mounted() {
        this.aboutImage = aboutImage;
    },
    methods: {
        onBackClick() {
            if (window.history.length <= 2) {
                this.$router.push('/');

            } else {
                this.$router.go(-1);
            }

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

.aboutDetail {
    display: flex;
    flex-direction: column;
    /*  align-items: center;*/
    box-sizing: border-box;
    padding: 16px;
    height: 500px;
    background-size: cover;
    background-position: top center;
    .info-box {
        flex: auto;
        margin-top: 20vh;
        color: #d0d0d0;
        text-align: center;
        z-index: 2;
        font-size: 12px;
        .title {
            display: block;
            font-size: 27px;
            letter-spacing: 2px;
            color: #f0f0f0;
            text-align: center;
        }
    }
    .bgImgView {
        width: 100%;
        height: 100%;
        z-index: 1;
        position: absolute;
        filter: blur(9px);
        filter: opacity(90%);
        margin-top: -20px;
    }
    .backBtn {
        left: -20px;
        top: 20px;
        width: 100px;
        z-index: 3;
    }
    .backImage {
        width: 30px;
        height: 30px;
    }
    .down {
        margin-left: 50%;
        margin-bottom: 0px;
        width: 16px;
        z-index: 2;
        animation: animate-down 1s;
        animation-iteration-count: infinite;
    }
}
</style>