<template>
    <div class="tags">
      </ul>
        <li v-for="(item, index) in blogInfo.tags" :key="index" :data-id='item.type' @click="onDetailChose(item.type)">{{ item.name}}</li>
        </ul>
    </div>
</template>
<script>
/** 单个数据列表项 **/
import { mapState } from "vuex";
import { Tag } from "element-ui";
import DOT from "../assets/点灰色.png";
export default {
    name: "ArtiveList",
    data: function() {
        return {
            tagName: "",
            DOT
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
                const d = state.app.blogConfig ? state.app.blogConfig.t : [];
                const data = d.find(item => item.gitname === this.thisData.name);
                return data || { title: this.thisData.name };
            }
        })
    },
    methods: {
        /** 点击某篇文章保存相关数据进入详情 **/
        onDetailChose(e) {
            var type = e;
            this.$router.push(`/tagDetail/${type}`);
        }
    },
    watch: {}
};
</script>
<style scoped lang="less">

.tags {
    background-color: white;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    color: black;
    left: 10%;

    li{
        cursor: pointer;
        text-align: left;
           &:hover{
      color:darkgray;
    };
    }
}

.dot {
    height: 7px;
    width: 7px;
    margin: 5px;
}
</style>