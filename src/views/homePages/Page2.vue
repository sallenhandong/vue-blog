<template>
  <div class="page2">
      <div ref="bodyBox" class="body-box" @mousewheel.stop @DOMMouseScroll.stop>
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
import Menus from "../../components/Menus.vue";
import { isPc } from "../../util/tools";
import { blogStyle } from "../../config";
export default {
  name: "page2",
  data: function() {
    return {
      isPc: isPc(),
      isShow: false,
      scrollDom: null,
      blogStyle:""
    };
  },
  props: {
    pageNow: Number
  },
  components: {
    Menus
  },
  methods: {
    playChange() {
      // 菜单中的播放器按钮被点击时触发
      this.$emit();
    }
  },
  mounted() {
    this.blogStyle = blogStyle;
    if (this.pageNow === 1) {
      this.isShow = true;
    }
  },
  beforeUpdate() {
    this.isShow = this.pageNow === 1;
  }
};
</script>

<style scoped lang="less">
.page2 {
  height: 100%;
  position: relative;
  display: flex;
  .body-box {
    flex: auto;
    padding: 0px;
    background-color: white;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
