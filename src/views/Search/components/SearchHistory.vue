<template>
  <div>
    <!-- 搜索历史头部 -->

    <van-list @load="onLoad">
      <van-cell title="搜素历史">
        <!-- 右侧删除图标 -->
        <div v-if="isDeleteShow">
          <span @click="del">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon v-else name="delete" @click="isDeleteShow = true" />
      </van-cell>
      <van-cell
        v-for="(item, index) in historyRecord"
        :key="index"
        :title="item"
        @click="tz(index)"
      >
        <van-icon v-show="isDeleteShow" name="close" />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  // props: {
  //   // searchHistories: {
  //   //   type: Array
  //   //   // required: true
  //   // }
  // },
  data () {
    return {
      list: [],
      isDeleteShow: false,
      historyRecord: []
    }
  },
  methods: {
    onLoad () {},
    del () {
      this.historyRecord = []
      this.$store.commit('history', [])
    },

    tz (index) {
      this.$emit('Tsearch', this.historyRecord[index])
      console.log(this.historyRecord[index])
    }
  },
  created () {
    // this.historyRecord.push(this.$store.state.historyRecord)
    // console.log(this.historyRecord)
    this.historyRecord = this.$store.state.historyRecord
  }
}
</script>

<style lang="scss" scoped></style>
