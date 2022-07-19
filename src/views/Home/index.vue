<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round><van-icon name="search">搜索</van-icon></van-button>
      </template>
    </van-nav-bar>

    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <!-- 更多按钮 -->
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
    </van-tabs>
    <!-- 弹框 -->
    <EditChannelPopup
      ref="Popup"
      :myChannels="channels"
      @del-mychannel="delMychannel"
      @change-active="changeActive"
      @add-mychannel="addMychannel"
    ></EditChannelPopup>
  </div>
</template>

<script>
import {
  getChannel,
  getMychannelsByLocal,
  setMyChannelToLocal,
  delMychannel,
  addMychannel
} from '@/api'
import ArticleList from './component/ArticleList'
import EditChannelPopup from './component/EditChannelPopup.vue'
export default {
  data () {
    return {
      active: 2,
      channels: [],
      isShow: false
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  },
  created () {
    this.getChannel()
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    async getChannel () {
      try {
        // const { data } = await getChannel()
        // this.channels = data.data.channels
        if (!this.login) {
          // 如果是离线状态
          // 本地储存有数据，直接用本地
          // 如果本地无数据，发送请求获取
          const myChannels = getMychannelsByLocal()
          if (myChannels) {
            this.channels = myChannels
          } else {
            const { data } = await getChannel()
            this.channels = data.data.channels
          }
        }
      } catch (error) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    // 删除子组件的频道
    async delMychannel (id) {
      // filter 返回一个新数组
      this.channels = this.channels.filter((item) => item.id !== id)
      // 如果是离线状态
      // 本地储存有数据，直接用本地
      // 如果本地无数据，发送请求获取
      if (!this.isLogin) {
        setMyChannelToLocal(this.channels)
      } else {
        // 登录状态 删除频道
        try {
          await delMychannel(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    // 点击频道切换
    changeActive (active) {
      this.active = active
    },
    // 添加频道
    async addMychannel (channel) {
      this.channels.push(channel)
      if (!this.isLogin) {
        setMyChannelToLocal(this.channels)
      } else {
        // 登录
        try {
          await addMychannel(channel.id, this.channels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      return this.$toast.success('添加频道成功')
    },
    // 弹出框点击显示
    showPopup () {
      // this.isShow = true
      this.$refs.Popup.isShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

// tabs
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

// 头部
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
