<template>
  <div class="login-warp">
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="center">
      <h2>Please Sign In</h2>
      <input
        type="email"
        placeholder="username or email"
        :value="account"
        @change="e => account = e.target.value"
        @keydown.enter="loginExec"
      />
      <input
        type="password"
        placeholder="password"
        :value="password"
        @change="e => password = e.target.value"
        @keydown.enter="loginExec"
      />
      <h2>&nbsp;</h2>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '../hooks/login.hooks'

const router = useRouter()
const { account, password, login } = useLogin()
function loginExec () {
  login().then(success => {
    if (success) {
      router.push('/')
    }
  })
}
</script>

<style scoped>
.login-warp *, .login-warp *:before, .login-warp *:after {
  box-sizing: border-box;
}

.login-warp {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.login-warp:hover .top:before, .login-warp:hover .top:after, .login-warp:hover .bottom:before, .login-warp:hover .bottom:after, .login-warp:active .top:before, .login-warp:active .top:after, .login-warp:active .bottom:before, .login-warp:active .bottom:after {
  margin-left: 200px;
  transform-origin: -200px 50%;
  transition-delay: 0s;
}
.login-warp:hover .center, .login-warp:active .center {
  opacity: 1;
  transition-delay: 0.2s;
}

.top:before, .top:after, .bottom:before, .bottom:after {
  content: "";
  display: block;
  position: absolute;
  width: 200vmax;
  height: 200vmax;
  top: 50%;
  left: 50%;
  margin-top: -100vmax;
  transform-origin: 0 50%;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  z-index: 10;
  opacity: 0.65;
  transition-delay: 0.2s;
}

.top:before {
  transform: rotate(45deg);
  background: #e46569;
}
.top:after {
  transform: rotate(135deg);
  background: #ecaf81;
}

.bottom:before {
  transform: rotate(-45deg);
  background: #60b8d4;
}
.bottom:after {
  transform: rotate(-135deg);
  background: #3745b5;
}

.center {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  transition-delay: 0s;
  color: #333;
}
.center input {
  width: 100%;
  padding: 15px;
  margin: 5px;
  border-radius: 1px;
  border: 1px solid #ccc;
  font-family: inherit;
  outline: none;
}
</style>
