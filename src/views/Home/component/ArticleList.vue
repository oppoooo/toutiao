<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPage"
        :immediate-check="false"
        v-model="loading"
        :finished="isFinished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        ><ArticleItem
          v-for="(item, index) in articles"
          :key="index"
          :articleInfo="item"
          @click="tzArticle"
        ></ArticleItem
      ></van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    ArticleItem
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async tzArticle () {
      const { data } = await getArticleList(this.id, +new Date())
      console.log(data)
    },
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())

        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (error) {
        const status = error.response.data.message
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请刷新')
        }
      }
    },
    async loadNextPage () {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        console.log(data)
        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        // 将第n页的数据放在artilices’
        if (this.refreshLoading) {
          // 如果是下拉刷新 将数据放在最前方
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
        this.loading = false
      } catch (error) {
        this.loading = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
