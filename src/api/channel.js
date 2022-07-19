import request from '@/utils/request'
import storage from '@/utils/storage'

export const getChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

// 获取所有推荐列表
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

export const delMychannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
/**
 *  添加
 * @param {Number} id 频道id
 * @param {number} seq  添加频道下标
 * @returns
 */
export const addMychannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      // 请求体body在data写
      channels: [{ id, seq }]
    }
  })
}

// 本地存储数据
const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getMychannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setMyChannelToLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
