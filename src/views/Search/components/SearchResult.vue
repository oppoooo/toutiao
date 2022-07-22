<template>
  <div>
    <!-- 搜索结果 -->
    <!-- <van-cell
      v-for="(item, index) in SearchResult"
      :key="index.aut_id"
      :title="item.title"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template> -->
    <!-- <template #title>
        <span>123</span>
      </template> -->
    <!-- </van-cell> -->

    <van-list
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in SearchResult"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  data () {
    return {
      SearchResult: [],
      error: false,
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  props: {
    // 获取的搜索建议
    searchSug: {
      trpe: String,
      required: true
    }
  },
  created () {
    // this.getSearchResult()
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        // 获取搜索结果
        const { data } = await getSearchResult(
          this.searchSug,
          this.page,
          this.perPage
        )

        const { results } = data.data
        console.log(data)
        this.finished = false
        // this.SearchResult = data.data.result
        this.SearchResult.push(...results)

        // this.finished = false
        this.loading = false

        if (results.length) {
          this.page = this.page + 1
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
        this.$toast.fail('请刷新重试')
      }
    }
    // async loadNextPage () {
    //   try {
    //     const { data } = await getSearchResult(this.searchSug)
    //     if (!data.data.pre_timestamp) {
    //       this.isFinished = true
    //     }
    //     // 将第n页的数据放在artilices’
    //     if (this.refreshLoading) {
    //       // 如果是下拉刷新 将数据放在最前方
    //       this.articles.unshift(...data.data.results)
    //     } else {
    //       this.articles.push(...data.data.results)
    //     }

    //     // 更新页数
    //     this.pre_timestamp = data.data.pre_timestamp
    //     this.loading = false
    //   } catch (error) {
    //     this.loading = true
    //   } finally {
    //     this.loading = false
    //     this.refreshLoading = false
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
