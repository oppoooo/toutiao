<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '90%' }"
    closeable
  >
    <div class="popupMain">
      <!-- 我的频道 -->
      <div class="my-channel">
        <!-- 我的频道标题 -->
        <van-cell title="我的频道">
          <van-button
            size="small"
            @click="isEdit = !isEdit"
            round
            class="edit-btn"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 我的频道宫格部分 -->
        <van-grid gutter="10px" :border="false">
          <van-grid-item
            v-for="(item, index) in myChannels"
            :key="item.id"
            :text="item.name"
            :class="{ 'active-channel': item.name == '推荐' }"
            @click="onClickMyChannel(item, index)"
          >
            <!-- 点击出现x -->
            <template #icon
              ><van-icon v-show="isEdit && item.name !== '推荐'" name="cross"
            /></template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <!-- 推荐频道标题 -->
        <van-cell title="我的频道"> </van-cell>
        <!-- 推荐频道宫格部分 -->
        <van-grid gutter="10px" :border="false">
          <van-grid-item
            icon="plus"
            v-for="item in recommedChannels"
            :key="item.id"
            :text="item.name"
            @click="addMychannel(item)"
          ></van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    // 删除频道
    onClickMyChannel (channel, index) {
      // 边缘情况判断
      if (this.isEdit && channel.name !== '推荐') {
        this.$emit('del-mychannel', channel.id)
      }
      // 切换
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    // 添加频道
    addMychannel (mychannel) {
      this.$emit('add-mychannel', { ...mychannel })
    }
  },
  computed: {
    recommedChannels () {
      // 在所有频道减去我的频道
      // 在所有频道筛选出去我的频道
      return this.allChannels.filter((item) => {
        const result = this.myChannels.find((i) => i.id === item.id)
        if (result) {
          return false
        } else {
          return true
        }
        // return !this.myChannels.find((i) => i.d === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
  //按钮的样式
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
  //我的频道样式
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
          font-size: 24px;
        }
      }
    }
  }

  //推荐频道样式
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
