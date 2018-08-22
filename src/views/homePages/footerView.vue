<template>
  <footer>
    <div class="footer-content">
      <div class="left">
        <div class="left-line">
          <ul>
            <strong>链接</strong>
            <li>
              <a target="_blank" rel="external nofollow" href="https://juejin.im/user/599aabd6f265da24817a6012">
                <img src="http://otfgrdvwb.bkt.clouddn.com/juejin.png">
              </a>
            </li>
            <li>
              <a target="_blank" rel="external nofollow" href="https://weibo.com/masuxian/home?wvr=5">
                <img src="http://otfgrdvwb.bkt.clouddn.com/%E5%BE%AE%E5%8D%9A.png">
              </a>
            </li>
            <li>
              <a target="_blank" rel="external nofollow" href="https://www.jianshu.com/u/666edc4f8200">
                <img src="http://otfgrdvwb.bkt.clouddn.com/%E9%AA%8C%E8%AF%81-%E7%AE%80%E4%B9%A6.png">
              </a>
            </li>
            <li>
              <a rel="external nofollow" href="https://www.github.com/sallenhandong">
                <img src="http://otfgrdvwb.bkt.clouddn.com/githubb.png">
              </a>
            </li>
          </ul>
        </div>
        <div class="left-line">
          <!-- <ul>
            <strong>支持</strong>
            <li>
              <a target="_blank" rel="external nofollow" href="https://vuefe.cn/">
                <i class="iconfont icon-vue ">
                </i>
              </a>
            </li>
            <li>
              <a target="_blank" rel="external nofollow" href="http://koajs.com/">
                <i class="iconfont icon-nodejs ">
                </i>
              </a>
            </li>
            <li>
              <a target="_blank" rel="external nofollow" href="https://cloud.tencent.com/">
                <i class="iconfont icon-tengxunyun ">
                </i>
              </a>
            </li>
          </ul> -->
        </div>
   <!--      <div class="left-line">
          <strong>备案</strong>
          <a target="_blank" rel="external nofollow" href="http://www.miitbeian.gov.cn/">
            <span class="content ">粤ICP备17113740号</span>
          </a>
        </div> -->
      </div>
      <div class="right ">
        <div class="right-line">
          <span>© 2017 - 2018 ❤
            <a target="_blank" rel="external nofollow" href="https://slimsallen.com/" style="color: darkgray">Slim Sallen</a>
          </span>
        </div>
        <div class="right-line">
          <i>成长路上 有你相伴</i>
        </div>
        <div class="right-line">
          <i>如果您有任何问题 欢迎联系我</i>
        </div>
      </div>
    </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
footer {
  border-top: none;
  margin-bottom: 0;
  background-color: hsla(0, 0%, 100%, .6);
  .footer-content {
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: .9em;
    text-transform: uppercase;
    .left {
      .left-line {
        text-align: left;
        height: 2rem;
        line-height: 2rem;
        li,
        .content {
          display: inline-block;
          margin-left: 1rem;
        }
      }
    }
    .right {
      .right-line {
        text-align: right;
        height: 2rem;
        line-height: 2rem;
      }
    }
  }

 img{
    display: inline;
    width: 18px;
    height: 18px;
 }
  @media screen and (max-width: 400px) {
    .footer-content {
      width: 100%;
      display: block;
      .left {
        .left-line {
          text-align: center;
        }
      }
      .right {
        .right-line {
          text-align: center;
        }
      }
    }
  }
}
</style>

