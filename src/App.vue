<template>
  <div id="app" class="boss">
        <router-view/>
  </div>
</template>

<style lang="less">

* {
  -webkit-overflow-scrolling: touch;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;

}
/* 美化滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #222;
}
div
{
  position: relative;
  display: block;
} /* 全部都是相对定位 */
@import "./style/css/editormd.preview.min.css";
</style>
