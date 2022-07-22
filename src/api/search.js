import request from '@/utils/request'
/**
 * 获取建议联想
 * @param {string} q 搜索关键字
 * @returns Promise
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchResult = (q, page, perPage) => {
  return request({
    url: 'v1_0/search',
    params: { q, page, per_page: perPage }
  })
}
