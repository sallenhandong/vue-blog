<template>
    <div class="article-box">
        <AboutDetail></AboutDetail>
        <div class="introduce">
            <p>{{introduce}}</p>
            <p>Email:{{email}}</p>
            <p>Wechat:{{wechat}}</p>
            <h3>博客简介</h3>
            <p>Vue搭建</p>
            <h3>个人声明</h3>
            <p>声明：本站所有文章均为本人原创，仅代表个人思想，与其他任何人或组织无关。</p>
            <p class="address">{{address}}&nbsp&nbsp<a :href="blogLink">{{blogLink}}</a></p>
            </li>
        </div>
    </div>
</template>
<script>
import AboutDetail from "../homePages/AboutDetail.vue";
import { introduce ,blogLink,wechat,email,address} from "../../config";
export default {
    name: "about",
    data: function() {
        return {
            introduce,
            blogLink,
            wechat,
            email,
            address
        };
    },
    components: {
        AboutDetail
    },
    mounted() {
        this.introduce = introduce;
        this.blogLink = blogLink;
        this.wechat = wechat;
        this.email = email;
        this.address = address;
    }
}
</script>
<style scoped lang="less">
.article-box {}

h3 {
    display: block;
    font-size: 1.17em;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    font-weight: bold;
}

p {
    font-size: 15px;
    color: #444;
    line-height: 1.77;
}

a {
    font-size: 15px;
    color: #444;
    line-height: 1.77;
    &:hover {
        color: black;
    }
    font-family: Times New Roman;
}

.introduce {
    left: 10%;
    width: 80%;
}

.address {
    text-align: center;

}
</style>