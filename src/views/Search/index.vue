<template>
  <div>
    <!-- 头部搜索 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        @focus="visableSearchSugestion"
        background="#3296fa"
        class="search"
      />
    </form>
    <!-- 搜索结果/建议/历史 -->
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
    <!-- 将搜索关键词传过去 -->
    <component
      :is="componentName"
      :keywords="keywords"
      :searchSug="searchSug"
      @getSearchResult="getResult"
      @Tsearch="tzSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data () {
    return {
      // 搜索关键词
      keywords: '',
      isShowSearchResult: false,
      searchSug: '',
      historyRecord: []
    }
  },
  computed: {
    componentName () {
      // 搜索历史 ，搜索框没有结果或者空字符
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      //   搜索结果
      if (this.isShowSearchResult) {
        //  this.searchSug = this.keywords

        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    tzSearch (item) {
      this.searchSug = item
      this.keywords = item
      // this.historyRecord.push(item)
      this.isShowSearchResult = true

      // this.$router.push('/home')
    },
    // 搜索
    onSearch () {
      this.isShowSearchResult = true
      this.searchSug = this.keywords

      // const b = this.$store.state.historyRecord.push(
      //   this.$store.state.historyRecord
      // )
      const arr = []
      arr.push(this.keywords)
      this.$store.state.historyRecord.push(1)
      // this.historyRecord.push(this.keywords)
      this.$store.commit('history', arr)
      // this.historyRecord.push(this.$store.state.historyRecord)
      // window.localStorage.setItem
      console.log(JSON.parse(window.localStorage.getItem('History')))
    },
    backToPrePage () {
      this.$router.go(-1)
    },
    visableSearchSugestion () {
      this.isShowSearchResult = false
    },
    // 点击跳转结果
    getResult (searchSug) {
      console.log(searchSug)
      this.searchSug = searchSug
      this.keywords = searchSug
      // // console.log(searchSug)
      // this.historyRecord.push(searchSug)
      // // // const arr = this.historyRecord.push(searchSug)
      // this.$store.commit('history', this.historyRecord)
      // console.log(this.$store.state.historyRecord)
      // console.log(this.historyRecord)
      this.isShowSearchResult = true
    }
  }
  // watch: {
  //   keywords (value) {
  //     console.log(value)
  //     this.historyRecord.push(value)
  //     console.log(this.historyRecord)
  //     this.$store.commit('history', value)
  //     console.log(this.$store.state.historyRecord)
  //   }
  // }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
