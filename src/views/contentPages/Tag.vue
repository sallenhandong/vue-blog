<template>
    <div class="tag">

        <TagList class="swiper-slide" v-for="(v, index) in pageNowData" :thisData="v" :key="index"></TagList>
      <!--   <transition-group name="list" tag="ul" class="live">
        </transition-group> -->
        <div class="nothing" v-if="!pageNowData.length">
            <img :src="ImgLoading" />
            <div>正在获取…</div>
        </div>
 <!--        <div class="pagin">
            <Pagination
                    :total="total"
                    :current-page="pageNow"
                    layout="total, prev, pager, next"
                    @current-change="onPageChange"
            ></Pagination>
        </div> -->
    </div>
</template>

<script>
/** 个人作品页 **/
import { mapState } from "vuex";
import { Pagination, Breadcrumb, BreadcrumbItem } from "element-ui";
import ArtiveList from "../../components/ArtiveList.vue";
import TagList from "../../components/TagList.vue";
import { getBlogInfo, sortDate } from "../../util/tools";
import ImgLoading from "../../assets/loading.gif";
export default {
  name: "live",
  data: function() {
    return {
      ImgLoading,
      pageNow: 1,
      pageSize: 10,
      total: 0,
      pageNowData: []
    };
  },
  components: {
    ArtiveList,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    TagList
  },
  mounted() {

    const temp = this.listData;
    this.pageNowData.length = 0;
    for (let i = 0; temp[i]; i++) {
      setTimeout(() => this.pageNowData.push(temp[i]), i * 100);
    }

  },
  computed: {
    ...mapState({
      listData(state) {
        if (!state.app.blogConfig) {
          this.total = 0;
          return [];
        }

        // const s = state.app.blogList.filter(
        //   item => getBlogInfo(item.name, state.app.blogConfig.d).type === 2
        // );
         this.total = state.app.blogConfig.t.length;
      
        return state.app.blogConfig.t;
      }
    })
  },
  watch: {
    listData(newV) {
      const temp = newV;
      for (let i = 0; temp[i]; i++) {
        setTimeout(() => this.pageNowData.push(temp[i]), i * 100);
      }
    }
  },
  methods: {
    /** 页码改变时触发 **/
    onPageChange(v) {
      // console.log("触发：", v);
      this.pageNow = v;
    }
  }
};
</script>

<style scoped lang="less">
.list-enter-active,
.list-leave-active {
  transition: all 500ms;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.tag {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  min-height: 100%;
  .live {
    display: block;
    width: 100%;
    flex: auto;
    min-height: 300px;
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
}
</style>
