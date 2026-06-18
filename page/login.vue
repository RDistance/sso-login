<template>
  <div class="login-container">
    <div class="glass-panel">
      <div class="form-box">
        <h2 class="title">{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h2>
        <p class="subtitle">{{ isLogin ? 'Please enter your details to sign in.' : 'Join us to get started!' }}</p>

        <!-- 错误信息提示框 -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleSubmit" class="form">
          <!-- 登录专用: 用户名或邮箱 -->
          <div class="input-group" v-if="isLogin">
            <label>Username or Email</label>
            <input type="text" v-model="formData.identifier" placeholder="Enter username or email" required />
          </div>

          <!-- 注册专用: 用户名 -->
          <div class="input-group" v-if="!isLogin">
            <label>Username</label>
            <input type="text" v-model="formData.username" placeholder="Choose a username" required />
          </div>

          <!-- 注册专用: 邮箱 -->
          <div class="input-group" v-if="!isLogin">
            <label>Email</label>
            <input type="email" v-model="formData.email" placeholder="Enter your email" required />
          </div>

          <!-- 密码 (登录/注册通用) -->
          <div class="input-group">
            <label>Password</label>
            <input type="password" v-model="formData.password" placeholder="••••••••" required />
          </div>

          <!-- 记住我 & 忘记密码 (仅登录可见) -->
          <div class="options" v-if="isLogin">
            <a href="#" class="forgot-pwd">Forgot password?</a>
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up') }}
          </button>
        </form>

        <!-- 切换登录/注册 -->
        <div class="toggle-text">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <a href="#" @click.prevent="toggleMode">{{ isLogin ? 'Sign up' : 'Log in' }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 控制当前是登录还是注册模式
const isLogin = ref(true)

// 交互状态
const isLoading = ref(false)
const errorMessage = ref('')

// 表单数据
const formData = reactive({
  identifier: '', // 登录时用的账号或邮箱
  username: '',   // 注册时用的账号
  email: '',      // 注册时用的邮箱
  password: ''  // 通用密码
})

// 切换模式方法：切换时清空已有数据
const toggleMode = () => {
  isLogin.value = !isLogin.value
  errorMessage.value = ''
  
  // 重置表单
  formData.identifier = ''
  formData.username = ''
  formData.email = ''
  formData.password = ''
}

// 提交表单
const handleSubmit = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (isLogin.value) {
      // --- 登录逻辑 ---
      if (!formData.identifier || !formData.password) throw new Error('Please fill in all fields.')
      
      console.log('执行登录操作:', { identifier: formData.identifier, password: formData.password })
      // TODO: 替换为真实的 fetch/axios 调用
      alert('登录成功: ' + formData.identifier)
      
    } else {
      // --- 注册逻辑 ---
      if (!formData.username || !formData.email || !formData.password) throw new Error('Please fill in all fields.')
      if (formData.password.length < 6) throw new Error('Password must be at least 6 characters.')
      
      console.log('执行注册操作:', { username: formData.username, email: formData.email, password: formData.password })
      // TODO: 替换为真实的 fetch/axios 调用
      alert('注册成功，请登录！')
      isLogin.value = true // 注册成功后自动切回登录页面
    }
  } catch (error: any) {
    // 捕获前端校验错误或后端返回的错误
    errorMessage.value = error.message || 'An unexpected error occurred.'
  } finally {
    isLoading.value = false // 无论成功失败，重置 loading 状态
  }
}
</script>

<style scoped>
/* 极光渐变背景 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 毛玻璃面板 */
.glass-panel {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  width: 100%;
  max-width: 420px;
  padding: 40px;
  color: white;
  transition: all 0.3s ease;
  box-sizing: border-box;
  margin: 20px;
}

.title {
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
}

.subtitle {
  margin: 0 0 30px 0;
  font-size: 14px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}

.error-message {
  background: rgba(255, 76, 76, 0.2);
  border: 1px solid rgba(255, 76, 76, 0.5);
  color: #ffcccc;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 13px;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input-group input:focus {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 25px;
}

.options a {
  color: white;
  text-decoration: none;
}

.options a:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  color: #333;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(253, 160, 133, 0.4);
}

.toggle-text {
  margin-top: 25px;
  text-align: center;
  font-size: 14px;
}

.toggle-text a {
  color: #f6d365;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
}

.toggle-text a:hover {
  text-decoration: underline;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
