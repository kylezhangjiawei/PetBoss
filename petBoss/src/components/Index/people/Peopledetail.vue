<template>
  <div class="header">
    <div class="header-2">
      <span class="font">{{peopledatas.StaffName}}<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 空白条 -->
    <div class="blank"></div>
    <!-- 人员信息 -->
    <div class="peopledetail">
      <span class="icon"><i></i></span>
      <span class="vertical">
        <dt >
          <span>{{peopledatas.StaffName}}</span>
          <span class="fontcolor">{{peopledatas.JobName}}</span>
        </dt>
        <dd class="verticalDt">
          <span>{{peopledatas.StaffPhone}}</span>
          <span>{{peopledatas.Note}}</span>
        </dd>
      </span>
    </div>
    <!-- 内容区域 -->
    <div class="msg-bar">
      <div>
        <dt>周排名</dt>
        <dd>{{peopledatas.w_number}}</dd>
      </div>
      <div class="center">
        <dt>月排名</dt>
        <dd>{{peopledatas.m_number}}</dd>
      </div>
      <div>
        <dt>销售总额</dt>
        <dd>{{peopledatas.m_total}}</dd>
      </div>
    </div>
    <!-- 用户基本信息 -->
    <div class="backColor">
      <div class="peoplemsg">
      <span class="names">创建日期</span>
      <span class="values">{{peopledatas.AddDate}}</span>
    </div>
      <div class="peoplemsg">
      <span class="names">当前状态</span>
      <span class="values" v-if='peopledatas.State == "1" '>已启用</span>
      <span class="values" v-if='peopledatas.State == "3" '>已停用</span>
        <span class="values" v-if='peopledatas.State == "2" '>未激活</span>
    </div>
    </div>
    <!-- 关闭账号 -->
    <div class="close" v-if=' peopledatas.State == "1"' >
      <button type="button" class="change" @click="changeIt()">修改</button>
      <button type="button"  class="stop" @click="starting()">停用</button>
    </div>
    <div class="close" v-if=' peopledatas.State == "3"'>
      <button type="button" class="change" @click="delect()">删除</button>
      <button type="button" class="stop" @click="starting()">启用</button>
    </div>
    <div class="close" v-if=' peopledatas.State == "2" '>
      <button type="button" class="Dele" @click="changeIt()">修改</button>
      <button type="button" class="openUp" @click="delect()">删除</button>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {MessageBox} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import getData from '../../../assets/Data';
  var md5 = require('md5');
  export default {
    name: 'header',
    data() {
      return {
        msg: '',
        jobType: '',
        state:''
      }
    },
    created() {
      this.msg = this.$route.query.plan;
      console.log(this.msg)
      if (this.msg.JobNumber == "1708376835823320") {
//        收银员
        this.jobType = 1;
      }
      if (this.msg.JobNumber == "1708376835823584") {
//        美容师
        this.jobType = 2;
      }
      if( this.msg.State == '1'){
        this.state = 3;
      }else {
        this.state = 1;
      }
    },
    computed: {
      ...mapGetters([
        'peopledatas'
      ]),
    },
    methods: {
      goback() {
        this.$router.go(-1)
      },
      starting(){
        //启用或停用
        let time = Date.parse(new Date()).toString().substring(0, 10);
        let objs = {
          system_id: 85916832,
          timestamp: time,
          store_id: localStorage.getItem('storeId')
        };
        let sortStr = getData(objs);
        let strings = "";
        let key = localStorage.getItem('Key');
        for (let i in sortStr) {
          strings += i + "=" + sortStr[i] + "&"
        }
        //拼接秘钥
        strings += "key" + "=" + key;
        //加密后的字符串
        let signValue = md5(strings).toUpperCase();
        this.$http({
          method: 'post',
          url: 'https://api.yongdaoyun.com/special/pet/staff/staff_stop_open.php',
          data: {
            "store_id": localStorage.getItem('storeId'),
            "system_id": 85916832,
            "timestamp": time,
            "sign": signValue,
            "data": {
              staff_number: this.msg.StaffNumber,
              job_type: this.jobType,
              state:this.state
            }
          }
        }).then(res => {
          console.log(res);
          if (res.data.err_code == "0000") {
            Toast({
              message: '设置成功',
              duration: 2000,
              className: 'ok'
            })
            this.$router.push({path: '/Index/Peoplehtml'})
          } else {
            Toast({
              message: '出错啦！',
              duration: 2000,
              className: 'ok'
            })
          }

        }).catch(err => {
          console.log(err)
        })
      },
      delect() {
        MessageBox.confirm('确定删除<span style="color:red" >' + this.msg.StaffName + '</span>账号?', '').then(action => {
          if (action == 'confirm') {
            //删除员工
            let time = Date.parse(new Date()).toString().substring(0, 10);
            let objs = {
              system_id: 85916832,
              timestamp: time,
              store_id: localStorage.getItem('storeId')
            };
            let sortStr = getData(objs);
            let strings = "";
            let key = localStorage.getItem('Key');
            for (let i in sortStr) {
              strings += i + "=" + sortStr[i] + "&"
            }
            //拼接秘钥
            strings += "key" + "=" + key;
            //加密后的字符串
            let signValue = md5(strings).toUpperCase();
            this.$http({
              method: 'post',
              url: 'https://api.yongdaoyun.com/special/pet/staff/staff_del.php',
              data: {
                "store_id": localStorage.getItem('storeId'),
                "system_id": 85916832,
                "timestamp": time,
                "sign": signValue,
                "data": {
                  staff_number: this.msg.StaffNumber,
                  job_type: this.jobType
                }
              }
            }).then(res => {
              console.log(res);
              if (res.data.err_code == "0000") {
                Toast({
                  message: '删除成功',
                  className: 'ok'
                })
                this.$router.push({path: '/Index/Peoplehtml'})
              } else {
                Toast({
                  message: '出错啦！',
                  className: 'ok'
                })
              }

            }).catch(err => {
              console.log(err)
            })
          }
          console.log('yes')
        }).catch(err => {
          console.log(err);
        })
      },
      changeIt() {
        this.$router.push({path: '/Peoplehtml/Administration/ChangePeople', query: {plan: this.msg}})
      },
    }
  }
</script>
<style scoped>
  .header {
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

  .blank {
    width: 100%;
    height: 0.3rem;
    background-color: #e8e8e8;
  }

  .peopledetail {
    width: 100%;
    height: 1.55rem;
    background-color: #ffffff;
    display: flex;
    font-size: 0.3rem;
    justify-content: flex-start;
  }

  .peopledetail span i {
    display: inline-block;
    width: 0.83rem;
    height: 0.83rem;
    background: url("../../../../static/img/man.png") 50% 50% no-repeat;
    background-color: #eef2f9;
    border-radius: 1.0rem;
    margin-left: 0.3rem;
    margin-right: 0.15rem;
    margin-top: 0.37rem;
    margin-bottom: 0.37rem;
    background-size: 50%;
  }

  .fontcolor {
    color: #666;
    margin-left: 0.2rem;
  }

  .peopledetail span dt {
    text-align: left;
    margin-bottom: 0.05rem;
  }

  .peopledetail span dd {
    margin: 0;
  }

  .msg-bar {
    display: -webkit-box;
    margin-top: 0.22rem;
    background-color: #ffffff;
    height: 1.71rem;
    margin-bottom: 0.22rem;
  }

  .msg-bar div {
    width: 33%;
    height: 1.03rem;
    font-size: 0.22rem;
    margin-top: 0.47rem;
  }

  .msg-bar div dt {
    font-size: 0.24rem;
    color: #999;
  }

  .msg-bar div dd {
    margin-left: 0;
    margin-top: 0.32rem;
    font-size: 0.34rem;
    color: #ff6633;
  }

  .center {
    border-right: 1px solid #E4E4E4;
    border-left: 1px solid #E4E4E4;
  }

  .backColor{
    background-color: #ffffff;
  }

  .peoplemsg {
    height: 0.89rem;
    background-color: #ffffff;
    font-size: 0.3rem;
    color: #333;
    line-height: 3;
    margin-left: 0.3rem;
    border-bottom: 1px solid #e8e8e8;
  }

  .peoplemsg span {
    display: inline-block;
  }

  .names {
    position: absolute;
    left: 0.3rem;
  }

  .values {
    position: absolute;
    right: 0.3rem;
    color: #666;
  }

  .close {
    height: 1.18rem;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }

  .stop {
    width: 43%;
    background-color: #ffffff;
    height: 0.78rem;
    border-radius: 0.08rem;
    border: 1px solid #ff6633;
    font-size: 0.34rem;
    color: #ff6633;
    margin-top: 0.2rem;
    outline: none;
  }
  .Retry{
    background-color: #ffffff;
    height: 0.78rem;
    border-radius: 0.08rem;
    border: 1px solid #ff6633;
    font-size: 0.34rem;
    color: #ff6633;
    margin-top: 0.2rem;
    width: 28%;
    outline: none;
  }
  .Dele,.openUp{
    background-color: #ffffff;
    height: 0.78rem;
    border-radius: 0.08rem;
    border: 1px solid #D1D1D1;
    font-size: 0.34rem;
    color: #000000;
    margin-top: 0.2rem;
    margin-right: 0.3rem;
    outline: none;
    width: 28%;
  }
  .change{
    width: 43%;
    background-color: #ffffff;
    height: 0.78rem;
    border-radius: 0.08rem;
    border: 1px solid #D1D1D1;
    font-size: 0.34rem;
    color: #000000;
    margin-top: 0.2rem;
    margin-right: 0.3rem;
    outline: none;
  }
  .vertical,.verticalDt{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .verticalDt{
    text-align: left;
  }
</style>
