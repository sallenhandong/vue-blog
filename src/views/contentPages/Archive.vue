<template>
    <div class="live-box">
           <ArchiveDetail></ArchiveDetail>
        <transition-group name="list" tag="ul" class="live">
            <ArchiveList v-for="(v, index) in pageNowData" :thisData="v" :key="index"></ArchiveList>
        </transition-group>
        <div class="pagin">
            <Pagination
                    :total="total"
                    :current-page="pageNow"
                    layout="total, prev, pager, next"
                    @current-change="onPageChange"
            ></Pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { Pagination, Breadcrumb, BreadcrumbItem } from "element-ui";
import { sortDate } from "../../util/tools";
import ImgLoading from "../../assets/loading.gif";
import ArchiveList from  "../../components/ArchiveList.vue";
import ArchiveDetail from "../homePages/ArchiveDetail.vue";
export default {
  name: "archive",
  data: function() {
    return {
      ImgLoading,
      pageNow: 1,
      pageSize: 20,
      total: 0,
      pageNowData: [],
      monthArr:[]
    };
  },
  components: {
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    ArchiveList,
    ArchiveDetail
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
  background-color: white;
  .live {
    display: block;
    width: 100%;
    flex: auto;
    min-height: 300px;
    &li + li {
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
}
h3{
  font-family: Times New Roman;
      -webkit-margin-before: 0.83em;
    -webkit-margin-after: 0.83em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}

</style>
