<template>
    <div class="article-box">
   <!--      <div class="bread">
            <i class="el-icon-location"></i>
            <Breadcrumb>
                <BreadcrumbItem>个人简介</BreadcrumbItem>
            </Breadcrumb>

        </div> -->
        <div class="introduce">
          
       
          <h3>About Me</h3>
          <p>我是Slim sallen,全职ios开发，热爱node、前端技术，热爱编程,热爱生活，分享自己的创业经历和编程经验</p>
          <p>Email:296472276@.com</p>
          <p>Wechat:singerhan521</p>
          <h3>博客简介</h3>
          <p>Vue搭建</p>
          <h3>个人声明</h3>
          <p>声明：本站所有文章均为本人原创，仅代表个人思想，与其他任何人或组织无关。</p>
         <p class="address">Xi'an 西安&nbsp&nbsp&nbsp<a href="www.slimsallen.com" title="www.slimsallen.com">www.slimsallen.com</a></p>
         
    </li>
        </div>


      
    </div>
</template>

<script>


export default {
  name: "live",
  data: function() {
    return {
      Zanshang
    };
  }
}
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
h3{
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
            color:black;

          }
    font-family: Times New Roman;
}
.address{
  text-align: center;
}


</style>
