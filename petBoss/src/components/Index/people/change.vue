<template>
  <div class="header">
    <!-- 导航条 -->
    <div class="header-2">
      <span class="back" @click="goback()"><i></i></span>
      <span class="font">修改</span>
    </div>
    <!-- 内容区域 表单格式-->
    <div class="container">
      <mt-field label="*姓名" placeholder="请输入姓名" type="text" v-model="userName" :disableClear="true"></mt-field>
      <mt-field label="*手机号" placeholder="请输入手机号" type="tel" v-model="Phone" :disableClear="true" :attr="{maxlength:11}"></mt-field>
      <div class="choice">
        <span class="job">*职位</span>
        <!--<div>-->
        <!--<input id="man" type="radio" value="man" v-model="vals"><label for="man">男</label>-->
        <!--<input id="woman" type="radio" value="woman" v-model="vals"><label for="woman">女</label>-->
        <!--</div>-->
        <div class="screen-condition">
          <span class="select-choice" @click="selectChoice()">{{values}}  <i></i></span>
          <transition name="slide-fade" mode="out-in">
            <div class="selects" v-if="increase">
              <span v-for="item in job" @click="selectClick(item)">{{item.JobName}}</span>
            </div>
          </transition>
        </div>
      </div>
      <mt-field label="备注" placeholder="请填写备注" type="text" v-model="Note" :disableClear="true"></mt-field>
    </div>
    <!-- 提交按钮 -->
    <button type="button" class="btn" @click="register()">确定</button>
    <!-- 短信提示 -->
    <div class="textAlert" v-if="isTrue">
      <p class="titles">您当前短信剩余<span class="textNum">125</span>条，<span style="text-decoration:underline">充值&nbsp;></span></p>
      <p class="bodys">职位选择收银员时系统会自动发送初始密码。</p>
      <p class="bodys">此收银员凭初始密码登陆系统成功后账号便激活</p>
    </div>
    <!-- 商标 -->
    <p id="footer">&copy;2017用道云</p>
  </div>
</template>
<script>
  import getData from '../../../assets/Data'
  var md5 = require('md5');
  import {Toast} from 'mint-ui';
  export default {
    name: 'header',
    data() {
      return {
        values: '',
        isTrue:false,
        Phone:'',
        userName:'',
        jobNumber:'',
        jobType:'',
        Note:'',
        increase:false,
        job:[],
        msg:[]
      }
    },
    created(){
      //获取员工编号
      this.msg = this.$route.query.plan;
      console.log(this.msg)
      //获取人员职位
      let time = Date.parse(new Date()).toString().substring(0,10);
      let objs = {
        system_id:85916832,
        timestamp:time,
        store_id:localStorage.getItem('storeId')
      };
      let sortStr=getData(objs);
      let strings="";
      let key = localStorage.getItem('Key');
      for(let i in sortStr){
        strings+=i+"="+sortStr[i] + "&"
      }
      //拼接秘钥
      strings+="key"+"="+key;
      //加密后的字符串
      let signValue = md5(strings).toUpperCase();
      this.$http({
        method:'post',
        url:'https://api.yongdaoyun.com/special/pet/staff/job_info.php',
        data:{
          "store_id":localStorage.getItem('storeId'),
          "system_id":85916832,
          "timestamp":time,
          "sign":signValue,
          "data":{

          }
        }
      }).then( res =>{
        console.log(res);
        this.job = res.data.data;
      }).catch( err =>{
        console.log(err)
      })
    },
    methods: {
      goback() {
        this.$router.go(-1)
      },
      selectClick(item) {
        this.values = item.JobName;
        this.jobNumber = item.JobNumber;
        this.increase = false;
        if ( this.jobNumber == 1708376835823320){
//          收银员
          this.isTrue = true;
        }
        if ( this.jobNumber == 1708376835823584){
//        美容师
          this.isTrue = false;
        }
      },
      selectChoice() {
        if (this.increase == false) {
          this.increase = true;
        } else {
          this.increase = false;
        }
      },
      register(){
        //开通人员账号
        if ( this.jobNumber == 1708376835823320){
//          收银员
          this.jobType = 1;
        }
        if ( this.jobNumber == 1708376835823584){
//        美容师
          this.jobType = 2;
        }
        let time = Date.parse(new Date()).toString().substring(0,10);
        let objs = {
          system_id:85916832,
          timestamp:time,
          store_id:localStorage.getItem('storeId'),
        };
        let sortStr=getData(objs);
        let strings="";
        let key = localStorage.getItem('Key');
        for(let i in sortStr){
          strings+=i+"="+sortStr[i] + "&"
        }
        //拼接秘钥
        strings+="key"+"="+key;
        //加密后的字符串
        let signValue = md5(strings).toUpperCase();
        this.$http({
          method:'post',
          url:'https://api.yongdaoyun.com/special/pet/staff/staff_update.php',
          data:{
            "store_id":localStorage.getItem('storeId'),
            "system_id":85916832,
            "timestamp":time,
            "sign":signValue,
            "data":{
              author_phone:localStorage.getItem('userPhone'),
              author_name:localStorage.getItem('userName'),
              job_type:this.jobType,
              note:this.Note,
              job_number:this.jobNumber,
              job_name:this.values,
              staff_name:this.userName,
              staff_phone:this.Phone,
              staff_number:this.msg.StaffNumber
            }
          }
        }).then( res =>{
          console.log(res);
          if(res.data.err_code == "0000"){
            Toast({
              message: '修改成功',
              className: 'ok'
            });
            this.$router.push({path:'/Peoplehtml/Administration'})
          }else {
            Toast({
              message: '输入有误',
              className: 'ok'
            })
          }
        }).catch( err =>{
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>
  .header{
    height: 100%;
  }
  .header-2 {
    background-color: #4A505F;
    height: 0.824rem;
    line-height: 0.664rem;
    padding-top: 0.176rem;
    position: relative;
  }

  .back {
    display: inline-block;
    width: 0.23rem;
    height: 0.38rem;
    background: url("../../../../static/img/01_033.png") no-repeat;
    vertical-align: top;
    position: absolute;
    top: 30%;
    left: 5%;
    background-size: cover;
  }

  .header-2 span {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .font {
    width: 100%;
    font-size: 0.36rem;
    text-align: center;
    color: #ffffff;
  }

  .container{
    background-color: #ffffff;
  }

  .choice {
    height: 0.9rem;
    background-color: #ffffff;
    margin-left: 0.3rem;
    line-height: 0.9rem;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e8e8e8;
  }

  .job{
    display: inline-block;
    float: left;
    width: 1.28rem;
    text-align: left;
    font-size: 0.3rem;
    color: #333;
  }

  .choice div {
    display: inline-block;
    display: flex;
  }

  .choice div label {
    font-size: 0.3rem;
    color: #666;
    position: relative;
    right: 0.8rem;
  }
  .screen-condition {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding-left: 0.62rem;
    width: 73%;
  }

  .selects {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    position: absolute;
    top: 103%;
    left: 0;
    right: 0;
    font-size: 0.28rem;
    color: #666;
    z-index: 1;
  }

  .selects span {
    margin-top: 0.16rem;
  }

  .select-choice {
    display: inline-block;
    width: 100%;
    height: 0.72rem;
    border-radius: 0.08rem;
    font-size: 0.28rem;
    color: #666;
    line-height: 0.72rem;
    text-align: left;
    position: relative;
  }

  .select-choice i {
    display: inline-block;
    width: 0.34rem;
    height: 0.34rem;
    background: url("../../../../static/img/01_03.png") no-repeat;
    position: absolute;
    top: 0.25rem;
    right: 0;
    background-size: 60%;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    transform: translate(0, -20px);
  }
  .btn {
    width: 6.9rem;
    height: 0.9rem;
    background-color: #ff6733;
    border-radius: 8px;
    font-size: 0.34rem;
    color: #ffffff;
    border: none;
    margin-top: 0.42rem;
    outline: none;
  }

  .textAlert{
    width: 100%;
    font-size: 0.3rem;
    height: 1.2rem;
    margin-top: 0.6rem;
    text-align: left;
    padding-left: 0.3rem;
  }
  .titles{
    color: #333;
    margin: 0;
    padding-bottom: 0.2rem;
  }
  .textNum{
    color: #FD7A4E;
  }

  .bodys{
    margin: 0;
    color: #A7A7A7;
  }

  #footer {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
</style>
