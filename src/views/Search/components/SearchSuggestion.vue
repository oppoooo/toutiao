<template>
  <div>
    <van-cell v-for="(item, index) in highlightData" :key="index" :title="item">
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item" @click="getSearchResult(index)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
export default {
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  //   监视绑定的函数，在methods 里的函数，支持字符串写法
  watch: {
    // keywords: 'getSearchSuggestion'
    // 开启立即执行
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    // 获取搜索建议并处理
    async getSearchSuggestion () {
      try {
        const res = await getSearchSuggestion(this.keywords)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('暂无搜索建议')
        }
        // this.suggestions = res.data.data.options.filter(Boolean)
        this.suggestions = res.data.data.options.filter((item) => Boolean(item))
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    getSearchResult (index) {
      // this.$router.push('/')
      // console.log(searchSuggestion)
      // 搜索的每一项
      console.log(this.suggestions[index])
      this.$emit('getSearchResult', this.suggestions[index])
    }
  },
  computed: {
    highlightData () {
      // 将搜索建议的每一项进行处理
      const reg = new RegExp(this.keywords, 'gi')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
