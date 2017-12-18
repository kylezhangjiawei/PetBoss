<template>
  <div class="signin">
    <!--header-->
    <div class="header-2">
      <div class="font">
        <i class="back" @click="goback()"></i>
        <span>注册</span>
      </div>
    </div>
    <!-- 内容主体 -->
    <div class="container">
      <mt-field label="姓名" placeholder="请输入姓名" type="test" :disableClear="true"></mt-field>
      <mt-field label="手机号" name="mobile" placeholder="请输入11位手机号" type="tel" v-model="phone" :disableClear="true" :attr="{maxlength:11}">
      </mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" v-model="code" type="number" :disableClear="true">
        <span @click="getCodes()" v-if="getCode" class="codes">获取验证码</span>
        <span v-if="sendMsgCode" class="codes">{{time + '秒后获取'}}</span>
      </mt-field>
      <div class="pwd">
        <label for="password">密码</label>
        <input type="password" placeholder="请输入密码" v-model="password" id="password" name="password">
      </div>
      <div class="pwd">
        <label for="password">确认密码</label>
        <input type="password" placeholder="请再次输入密码" name="passwordagin">
      </div>
      <!-- 空白条 -->
      <div class="blank"></div>
      <mt-field label="店铺名称" placeholder="请输入店铺名称" type="test" v-model="name" :disableClear="true"></mt-field>
      <mt-field label="店铺地址" placeholder="请输入店铺地址" type="test" v-model="address" :disableClear="true"></mt-field>
      <!--<mt-cell title="店铺地址">-->
      <!--<span class="code"></span>-->
      <!--</mt-cell>-->
    </div>
    <!-- 注册按钮 -->
    <button class="button-colors" @click="sign()">注册</button>
    <!-- 公司注册符号与名称-->
    <p class="footer">&copy;2017用道云 V1.0.12</p>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui';
  import getData from '../../assets/Data'

  var md5 = require('md5');
  import {Toast} from 'mint-ui';

  export default {
    name: 'signin',
    data() {
      return {
        address: '',
        phone: '',
        password: '',
        code: '',
        name: '',
        sendMsgCode: false,
        time: 60,
        getCode: true,
        passwordagin: ''
      }
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      sign() {
        let time = Date.parse(new Date()).toString().substring(0, 10);
        let objs = {
          method: 'register',
          system_id: 85916832,
          timestamp: time,
          address: this.address,
          code: this.code,
          name: this.name,
          phone: this.phone,
          password: this.password,
        };
        let sortStr = getData(objs);
        let strings = "";
        let key = 'e3aa19a71687700a259bdf8a9078ffea';
        for (let i in sortStr) {
          strings += i + "=" + sortStr[i] + "&"
        }
        //拼接秘钥
        strings += "key" + "=" + key;
        //加密后的字符串
        const signValue = md5(strings).toUpperCase();
        let _this = this;
        this.$http({
          method: 'post',
          url: 'https://api.yongdaoyun.com/pub/entrance',
          data: {
            sign: signValue,
            method: 'register',
            system_id: 85916832,
            timestamp: time,
            address: this.address,
            code: this.code,
            name: this.name,
            phone: this.phone,
            password: this.password
          }
        }).then(function (res) {
          console.log(res)
          if (res.data.err_code == "0000") {
//            Toast({
//              message: '注册成功',
//              duration: 2000,
//              className: 'wrongTip'
//            });
            _this.$router.push({path: '/'})
          }else {
                        Toast({
              message: '注册失败',
              duration: 2000,
              position: 'top',
              className: 'wrongTip'
            });
          }
        }).catch(function (err) {
          console.log(err)
        })

      },
      getCodes() {
        let time = Date.parse(new Date()).toString().substring(0, 10);
        let strA = {
          method: 'send_sms_code',
          system_id: 85916832,
          timestamp: time,
          phone: this.phone,
          type: 1
        };
        let sortStr = getData(strA);
        let strings = "";
        let key = 'e3aa19a71687700a259bdf8a9078ffea';
        for (let i in sortStr) {
          strings += i + "=" + sortStr[i] + "&"
        }
        //拼接秘钥
        strings += "key" + "=" + key;
        //加密后的字符串
        const signValue = md5(strings).toUpperCase();
        let _this = this;
        //验证码请求
        this.$http({
          method: 'post',
          url: 'https://api.yongdaoyun.com/pub/entrance',
          data: {
            sign: signValue,
            method: 'send_sms_code',
            system_id: 85916832,
            timestamp: time,
            phone: this.phone,
            type: 1
          }
        }).then(function (respone) {
          console.log(respone);
          if (respone.data.err_code === "0000") {
            _this.sendMsgCode = true;
            _this.getCode = false;
            let clock = setInterval(function () {
              if ((_this.time--) <= 0) {
                _this.time = 60;
                _this.sendMsgCode = false;
                _this.getCode = true;
                clearInterval(clock)
              }
            }, 1000)
          } else if (respone.data.err_code === "0002") {
            Toast({
              message: '该号码已注册，请登录',
              duration: 2000,
              position: 'top',
              className: 'wrongTip'
            });
          } else {
            Toast({
              message: '请输入正确的手机号',
              duration: 2000,
              position: 'top',
              className: 'wrongTip'
            });
          }

        }).catch(function (err) {
          console.log(err)
        })
      }

    }
  }
</script>
<style scoped>
  .signin {
    height: 100%;
  }

  .header-2 {
    background-color: #ffffff;
    height: 0.82rem;
    line-height: 0.664rem;
    padding-top: 0.176rem;
    position: relative;
  }

  .back {
    display: inline-block;
    width: 0.23rem;
    height: 0.38rem;
    background: url("../../../static/img/arrow.png") no-repeat;
    position: absolute;
    top: 30%;
    left: 5%;
    background-size: cover;
  }

  .header-2 span {
    display: inline-block;
  }

  .font {
    width: 100%;
    font-size: 0.36rem;
    text-align: center;
    color: #333;
  }

  .container {
    background-color: #ffffff;
    margin-top: 0.32rem;
  }

  .blank {
    width: 100%;
    height: 0.22rem;
    background-color: #EFEFEF;
  }

  .pwd {
    height: 0.9rem;
    font-size: 0.3rem;
    text-align: left;
    margin-left: 0.3rem;
    line-height: 0.9rem;
    border-bottom: 1px solid #e8e8e8;
  }

  .help {
    font-size: 0.16rem;
    color: red;
    display: inline;
  }

  .pwd label {
    width: 1.28rem;
    display: inline-block;
  }

  .pwd input {
    width: 3.61rem;
    height: 0.5rem;
    padding-left: 0.52rem;
    font-size: 0.3rem;
    border: none;
    outline: none;
  }

  .code {
    height: 0.23rem;
    width: 0.23rem;
    position: relative;
    right: 0.5rem;
    background: url("../../../static/img/03_03.png") no-repeat;
  }

  .button-colors {
    background-color: #F99d7e;
    border: none;
    width: 6.3rem;
    height: 0.88rem;
    font-size: 0.34rem;
    border-radius: 8px;
    color: #ffffff;
    outline: none;
    margin-top: 0.42rem;
  }

  .footer {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }

</style>
<style>
  .signin .mint-field-other {
    border: none;
  }

  .signin .mint-field-other .help {
    font-size: 1rem;
    border: none;
    color: red;
  }

  .signin .mint-field-other .codes {
    display: block;
    border-left: 1px solid #f5f5f5;
  }

</style>

