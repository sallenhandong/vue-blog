import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import About from "./views/About.vue";
import Archive from "./views/contentPages/Archive.vue";
import Tag from "./views/contentPages/Tag.vue";
import Article from "./views/contentPages/Article.vue";
import Detail from "./views/contentPages/Detail.vue";
import All from "./views/contentPages/All.vue";
import About from "./views/contentPages/About.vue";
import Link_Url from "./views/contentPages/Link_Url.vue";
import TagDetail from "./views/contentPages/TagDetail.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "all", // 所有动态
          name: "all",
          alias: "/",
          component: All,
          meta: {
            title: '首页'
        }
        },
        {
          path: "archive", // 归档
          name: "archive",
          component: Archive,
          meta: {
            title: '归档'
        }
        },
        {
          path: "tag", // 标签
          name: "tag",
          component: Tag,
          meta: {
            title: '标签'
        }
        },
        {
          path: "article", // 日志列表
          name: "article",
          component: Article
        },
        {
          path: "detail/:id", // 文章详情页
          name: "detail",
          component: Detail
        },
        {
          path: "about", // 关于
          name: "about",
          component: About,
          meta: {
            title: '关于'
        }
        },
        {
          path: "link_url", // 友链
          name: "link_url",
          component: Link_Url,
          meta: {
            title: '友链'
        }
        },
        {
          path: "tagDetail/:type", // 关于
          name: "tagDetail",
          component: TagDetail,
          meta: {
            title: '列表'
        }
        },
      ]
    }
  ]
});
var router = new Router();
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    console.log('sdsdsdssds');
    document.title = to.meta.title;
  }
  next();
})
