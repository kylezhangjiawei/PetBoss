<template>
  <div class="hello">
    <!--<h1>{{ msg }}</h1>-->
    <div class="header-2">
      <div class="font">
        <span >宠店宝</span>
      </div>
    </div>
    <!-- 空白条 -->
    <div class="blank"></div>
    <!-- 内容主体 -->
    <div class="container">
      <!-- 公司logo -->
      <p class="logo"><img src="../../../static/img/logo_03(1).png" alt=""></p>
      <!--登录表单-->
        <div class="form-style  margins">
          <label for="userName" class="user-icon"></label>
          <input  type="tel"  id="userName" placeholder="手机号" v-model="user.phone" name="mobile" maxlength="11">
        </div>
        <div class="form-style">
          <label for="userPwd" class="password-icon"></label>
          <input  type="password"  id="userPwd" placeholder="密码" v-model="user.password" name="password">
        </div>
      <div class="info">
        <button
          type="submit"
          :class="['button-colors',{'active':user.phone && user.password}]"
          :disabled="button.disabled"
          @click="index"
        >登录
        </button>
      </div>

    <!-- 注册用户 与 忘记密码-->
    <div class="register">
      <span @click="signin">立即注册</span>
      <span class="first-one">|</span>
      <span @click="reset">忘记密码</span>
    </div>
    <!-- 公司注册符号与名称-->
    <p class="footer">&copy;2017用道云 V1.0.12</p>
  </div>
</div>
</template>

<script>
import getData from '../../assets/Data'
var md5 = require('md5');
import { Toast } from 'mint-ui';
export default {
  name: 'hello',
  data() {
    return {
      user: {
        phone: '',
        password: '',
        timestamp:''
      },
      button: {
        disabled: true
      },
      error:''
    }
  },
  created(){
    if (localStorage.getItem('storeId')) {
      this.$router.push({path:'/Index'});
      console.log('yes')
    }
  },
    watch: {  //监听input是否有值
      user: {
        handler(val) {
          this.change(val)
        },
        deep: true
      }
    },
    methods: {
      change({phone, password}) { //通过判断input输入框是否有值来设置disabled的布尔值
        if (phone && password) {
          this.button.disabled = false
        } else {
          this.button.disabled = true
        }
      },
        reset() {  //跳转路由
          this.$router.push({path: '/Resetpwd'})
        },
        signin() {
          this.$router.push({path:'/Signin'})
        },
        index(){
          let time = Date.parse(new Date()).toString().substring(0,10);
          let objs = {
            method: 'login',
            system_id:85916832,
            timestamp:time,
            phone:this.user.phone,
            password:this.user.password
          };
          let sortStr=getData(objs);
          let strings="";
          let key ='e3aa19a71687700a259bdf8a9078ffea';
          for(let i in sortStr){
            strings+=i+"="+sortStr[i] + "&"
          }
          //拼接秘钥
          strings+="key"+"="+key;
          //加密后的字符串
          const signValue = md5(strings).toUpperCase();
          this.$store.dispatch('getSign',{
            phone:this.user.phone,
            password:this.user.password,
            timestamp:time,
            method:'login',
            system_id:85916832,
            sign:signValue
          }).then(() => {

            this.$router.push({path:'/Index'})
          })
        }
      }
    }
    </script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    a {
      color: #000000;
      height: 5%;
    }

    .hello {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    .header-2 {
      background-color: #ffffff;
      height: 0.82rem;
      line-height: 0.664rem;
      padding-top: 0.176rem;
      position: relative;
    }

    .header-2 span {
      display: inline-block;
    }

    input{
      border-radius: 0;
    }

    .font {
      width: 100%;
      font-size: 0.36rem;
      text-align: center;
      color: #333;
    }
    .blank {
      width: 100%;
      height: 0.02rem;
      background-color: #e8e8e8;
    }

    .logo{
      margin: 0;
      margin-bottom: 1.08rem;
    }
    .logo img{
      width: 2.2rem;
      height: 2.2rem;
    }
    .container {
      padding-top: 0.32rem;
      background-color: #ffffff;
      height: 100%;
    }

    .form-style {
      height: 0.6rem;
      display: flex;
      justify-content: flex-start;
      margin-left: 0.64rem;
      margin-right: 0.64rem;
    }
    .margins{
      margin-bottom: 0.6rem;
    }

    .user-icon {
      display: inline-block;
      background: url("../../../static/img/icon_03.png") 40% 40% no-repeat;
      width: 0.6rem;
      height: 0.6rem;
      vertical-align: bottom;
      background-size: cover;
    }

    .password-icon {
      display: inline-block;
      background: url("../../../static/img/icon_06.png") 40% 45% no-repeat;
      width: 0.6rem;
      height: 0.6rem;
      vertical-align: bottom;
      background-size: cover;
    }

    input {
      width: 5.4rem;
      border: none;
      border-bottom: 1px solid #cccccc;
      font-size: 0.34rem;
      color: #333333;
      margin-left: 0.3rem;
    }
    ::-webkit-input-placeholder { color:#cccccc; } /* chrome */
    ::-moz-placeholder { color:#cccccc; } /* firefox 19+ */
    :-ms-input-placeholder { color:#cccccc; } /* ie */
    /*input:-moz-placeholder { color:#cccccc; }*/
    input:focus {
      outline: none;
    }

    .info{
      margin-top: 0.8rem;
      display: flex;
      margin-left: 0.64rem;
    }

    .button-colors {
      background-color: #FFA385;
      border: none;
      width: 6.3rem;
      height: 0.88rem;
      font-size: 0.34rem;
      border-radius: 8px;
      color: #ffffff;
      outline: none;
    }

    .button-colors.active {
      background-color: #FF6633;
      border: none;
      width: 6.3rem;
      height: 0.88rem;
      font-size: 0.34rem;
      border-radius: 8px;
      color: #ffffff;
      outline: none;
    }

    .register {
      height: 0.96rem;
      font-size: 0.28rem;
      line-height: 0.96rem;
      overflow: hidden;
      margin-top: 0.28rem;
      color: #666;
    }

    .register span {
      display: inline-block;
      vertical-align: middle;
    }

    .footer {
      font-size: 0.2rem;
      position: absolute;
      bottom: 0;
      width: 100%;
      color: #bbb;
    }

    .help{
      display: inline-block;
      color: red;
      font-size: 0.2rem;
    }

    </style>
<style>
  /*loading动画样式*/
  .hello .mint-spinner-snake{
    height: 0.6rem !important;
    width: 0.6rem !important;

  }
  .hello .mint-indicator-text{
    font-size: 0.22rem;
  }
  .hello .mint-indicator-wrapper{
    width: 2rem !important;
    height: 2rem !important;
  }
</style>
