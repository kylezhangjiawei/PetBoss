<template>
  <div class="reset">
    <div class="header-2">
      <div class="font">
        <i class="back" @click="goback()"></i>
        <span >重置密码</span>
      </div>
    </div>
    <!-- 空白条 -->
    <div class="blank"></div>
    <!-- 注册内容 -->
    <div class="container">
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"  name="mobile" :disableClear="true" :attr="{maxlength:11}">
      </mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="code" :disableClear="true">
        <span @click="getCodes()" v-if="getCode" class="codes">获取验证码</span>
        <span v-if="sendMsgCode" class="codes">{{time+'秒后获取'}}</span>
      </mt-field>
      <div class="pwd">
        <label for="password">密码</label>
        <input type="password" placeholder="请输入密码" v-model="password" id="password" name="password">
      </div>
      <div class="pwd">
        <label for="password">确认密码</label>
        <input type="password" placeholder="请确认密码" name="passwordagin"  v-model="password_two">
      </div>
    </div>
    <!-- 确认按钮 -->
    <button type="submit" class="button-color" @click="changes">完成</button>
    <!-- 公司注册符号与名称-->
    <p class="footer">&copy;2017用道云 V1.0.12</p>
  </div>
</template>
<script>
  import getData from '../../assets/Data'
  var md5 = require('md5');
  import { Toast } from 'mint-ui';
  export default {
    name: 'reset',
    data(){
      return{
        phone:'',
        sendMsgCode:false,
        time:60,
        getCode:true,
        code:'',
        password:'',
        password_two:''
      }
    },
    methods: {
      changes() {
        let time = Date.parse(new Date()).toString().substring(0,10);
        let objs = {
          method: 'retrieve_password',
          system_id:85916832,
          timestamp:time,
          code:this.code,
          phone:this.phone,
          password:this.password,
          password_two:this.password_two
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
        let _this = this;
        this.$http({
          method:'post',
          url:'https://api.yongdaoyun.com/pub/entrance',
          data:{
            sign:signValue,
            method: 'retrieve_password',
            system_id:85916832,
            timestamp:time,
            code:this.code,
            phone:this.phone,
            password:this.password,
            password_two:this.password_two
          }
        }).then(function(res){
          console.log(res)
          if (res.data.err_code == "0000"){
//            Toast({
//              message: '修改成功',
//              duration: 2000,
//              className: 'rightTip'
//            });
            _this.$router.push({path:'/'})
          }else{
            Toast({
              message: '信息输入有误',
              duration: 2000,
              position: 'top',
              className: 'wrongTip'
            });
          }
        }).catch(function(err){
          console.log(err)
        })
        //this.$router.push({path: '/Changepwd'})
      },
      goback(){
        this.$router.go(-1)
      },
      getCodes(){
        let time = Date.parse(new Date()).toString().substring(0,10);
        let strA = {
          method: 'send_sms_code',
          system_id:85916832,
          timestamp:time,
          phone:this.phone,
          type:2
        };
        let sortStr=getData(strA);
        let strings="";
        let key ='e3aa19a71687700a259bdf8a9078ffea';
        for(let i in sortStr){
          strings+=i+"="+sortStr[i] + "&"
        }
        //拼接秘钥
        strings+="key"+"="+key;
        //加密后的字符串
        const signValue = md5(strings).toUpperCase();
        let _this = this;
        //验证码请求
        this.$http({
          method:'post',
          url:'https://api.yongdaoyun.com/pub/entrance',
          data:{
            sign:signValue,
            method: 'send_sms_code',
            system_id:85916832,
            timestamp:time,
            phone:this.phone,
            type:2
          }
        }).then(function (respone) {
          console.log(respone)
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
              message: respone.data.err_msg,
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
  .reset {
    height: 100%;
  }
  .header-2 {
    background-color: #ffffff;
    height: 0.82rem;
    line-height: 0.664rem;
    padding-top: 0.176rem;
    position: relative;
  }
  .userInfo{
    position: absolute;
    top: 17%;
    right: 5%;
    color: #ff6633;
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
  .container{
    background-color: #ffffff;
  }
  .blank {
    width: 100%;
    height: 0.32rem;
    background-color: #e8e8e8;
  }

  .button-color {
    background-color: #FF6733;
    border: none;
    width: 6.3rem;
    height: 0.88rem;
    font-size: 0.34rem;
    border-radius: 8px;
    color: #ffffff;
    margin-top: 0.42rem;
  }
  .pwd{
    height: 0.9rem;
    font-size: 0.3rem;
    text-align: left;
    margin-left: 0.3rem;
    line-height: 0.9rem;
    border-bottom: 1px solid #e8e8e8;
  }
  .help{
    font-size: 1rem;
    color: red;
    display: inline;
  }
  .pwd label{
    width: 1.28rem;
    display: inline-block;
  }
  .pwd input{
    width:3.61rem;
    height: 0.5rem;
    padding-left: 0.52rem;
    font-size: 0.3rem;
    border: none;
    outline: none;
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
  .reset .mint-field-other{
    border: none;
  }
  .reset .mint-field-other .help{
    font-size: 0.16rem;
    border: none;
    color: red;
  }
  .reset .mint-field-other .codes{
    display: block;
    border-left: 1px solid #f5f5f5;
  }
</style>
