<template>
  <div>
    <van-nav-bar class="navbar" title="登录" @click-left="bakePage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 手机登录  -->
    <van-form ref="form" @submit="login" class="form">
      <!-- form 表单中 input必须有name属性 -->
      <!-- form 表单中任意button 按钮都会触发submit事件 -->
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="moblieRules"
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
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码 -->
        <template #right-icon>
          <!-- 倒计时 -->
          <van-count-down
            @finish="isShowCountDown = false"
            :time="3 * 1000"
            v-if="isShowCountDown"
          />
          <van-button
            v-else
            round
            size="mini"
            class="code-btn"
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" @click="login"
          >提交</van-button
        >
      </div>
    </van-form>
    <h1>{{ $store.state.Number }}</h1>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { moblieRules, codeRules } from '@/views/rules'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      moblieRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    bakePage () {
      console.log(this.$router)
      this.$router.back()
    },
    // 登录
    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
        console.log(res)
      } catch (err) {
        // 失败验证
        // this.$toast.fail('失败')
        console.log(err)
        const status = err.response.status
        let message = '登录错误，请刷新'
        if (status === 401) {
          message = err.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(err.response.status.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登录错误，请刷新')
        //     break
        //   default:
        //     this.$toast.fail('登录错误，请刷新')
        //     break
        // }
      }
    },
    async sendCode () {
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile')
        // 发送验证码
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (error) {
        // 手机验证失败
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    },
    btn () {
      this.$store.commit('setNumber', 2)
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
