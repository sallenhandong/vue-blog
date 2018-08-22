<template>
    <div class="ul-list">
        <ul>
            <li @click="onDetailChose">{{blogInfo.title}}</li>
        </ul>
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
.ul-list{

    ul{
        text-align: left;
     
    }
    li{
        cursor: pointer;
    }
}
</style>