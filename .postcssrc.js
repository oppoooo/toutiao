module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 设计稿1rem的大小
      // 如果是vant 组件就返回37.5
      rootValue: (module) => {
        if (/vant/gi.test(module.file)) {
          
          return 37.5
        } else {
          return 70
        }
      },

      // 适配的属性      
      // [] 可以使单独的属性
      propList: ['*']
    }
  }
}
