<template>
  <div>
    <van-nav-bar class="navbar" title="登录" @click-left="bakePage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 手机登录  -->
    <van-form @submit="login" class="form">
      <!-- form 表单中 input必须有name属性 -->
      <!-- form 表单中任意button 按钮都会触发submit事件 -->
      <van-field
        v-model="moblie"
        name="moblie"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="password"
        autocomplete
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button round size="mini" class="code-btn">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      moblie: '',
      code: ''
    }
  },
  methods: {
    bakePage () {
      console.log(this.$router)
      this.$router.back()
    },
    async login () {
      const res = await login(this.moblie, this.code)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3692fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}

// 表单
.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    color: #666;
    padding: 0 10px;
  }
}
</style>
