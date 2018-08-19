<template>
    <div class="article-box">
   <!--      <div class="bread">
            <i class="el-icon-location"></i>
            <Breadcrumb>
                <BreadcrumbItem>个人简介</BreadcrumbItem>
            </Breadcrumb>

        </div> -->
        <div class="introduce">
          
          <h2>友链</h2>
          <p>欢迎交换友链</p>
       


        </div>


      
    </div>
</template>

<script>

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
h2 {
  color: #555;
  font-size: 20px;
}
p {
  font-size: 15px;
  color: #444;
  line-height: 1.77;
}

</style>
