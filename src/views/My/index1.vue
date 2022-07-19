<template>
  <div class="my">
    <!-- 头部 -->

    <header>
      <!-- 登录的盒子 -->

      <div v-if="isLogin" class="user-info banner">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 展示用户信息 -->

        <van-row class="row-2">
          <van-col span="12">
            <!-- 头像 -->

            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />

              <!-- 手机号 -->
              <span class="mobile">13511111111</span>
            </van-row>
          </van-col>

          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>

        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon> 0 </template>
            </van-grid-item>

            <van-grid-item text="粉丝">
              <template #icon> 0 </template>
            </van-grid-item>

            <van-grid-item text="关注">
              <template #icon> 0 </template>
            </van-grid-item>

            <van-grid-item text="获赞">
              <template #icon> 0 </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>

      <!-- 未登录 -->

      <div v-else class="login-register banner">
        <div class="wrap" @click="goLogin">
          <img src="../../assets/images/mobile.png" />
          <span>登录/注册</span>
        </div>
      </div>
    </header>

    <!-- 主体 -->

    <main>
      <!-- 历史/搜索 -->
      <van-grid class="grid" column-num="2" :clickable="true">
        <van-grid-item icon="photo-o" text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>

      <!-- 消息通知 -->
      <div class="link">
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="小智同学" is-link></van-cell>
      </div>
    </main>

    <!-- 底部退出 -->
    <van-button v-if="isLogin" block class="login-btn" @click="layout"
      >退出</van-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    layout () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
      console.log(111)
    },
    goLogin () {
      this.$router.push({ path: '/login' })
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
// 背景图
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
// 用户信息样式
.user-info {
  display: flex;
  flex-direction: column;

  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }
  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
// 主体
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}

.login-btn {
  :deep(.van-button__text) {
    color: red;
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
      margin-bottom: 10px;
    }
  }
}
</style>
