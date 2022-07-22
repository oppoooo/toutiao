<template>
  <div>
    <!-- 顶部导航 -->
    <div class="nav-top">
      <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" />
    </div>
    <!-- 主体部分 -->
    <div class="main">
      <h1>Array.prototype.forEach(callback) 的 callback 到底执行了几次?</h1>
      <!-- 头像 -->
      <div class="touxiang">
        <img src="http://toutiao.itheima.net/images/user_head.jpg" alt="" />

        <!-- 名字 -->
        <div class="name">
          <div>黑马程序员(改不了)</div>
          <div class="time">3 年前</div>
        </div>
        <!-- 关注 -->
        <div class="concern">
          <van-button type="primary" round>+关注</van-button>
        </div>
      </div>
      <!-- 正文 -->
      <div class="bd">
        <p><a href="">原文链接</a></p>
        <p>事情的起源是这样的, 同事发给我两段代码, 如下:</p>
      </div>
      <div></div>
      <van-divider>正文结束</van-divider>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.nav-top {
  :deep(.van-nav-bar__content) {
    background-color: skyblue;
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
}
.main {
  position: fixed;
  margin: 0 32px;
  left: 0;
  right: 0;
  top: 1.22667rem;
  bottom: 1.17333rem;
  overflow-y: scroll;
  background-color: #fff;
  h1 {
    font-size: 0.53333rem;
    padding: 0.66667rem 0;
    margin: 0;
    color: #3a3a3a;
  }
  .touxiang {
    display: flex;
    height: 84px;
    img {
      flex: 1;
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    .name {
      flex: 5;
      font-size: 12px;
      margin-left: 20px;
      .time {
        color: #b7b7b7;
      }
    }
    .concern {
      flex: 3;
      display: flex;
      align-items: center;
      justify-content: right;
      .van-button--round {
        width: 170px;
        height: 50px;
      }
    }
  }
  .bd {
    font-size: 12px;
  }
}
</style>
