<template>
  <div class="header5">
    <!-- header  -->
    <div class="header-2">
      <span class="font">会员数量<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 会员总数量，会员平均消费，会员总消费 -->
    <div class="msg-bar">
      <div>
        <dt>会员总数量</dt>
        <dd>{{datas.MenberMuch}} <span class="size">人</span></dd>
      </div>
      <div class="center">
        <dt>会员平均消费</dt>
        <dd><span class="size">&yen;</span>&nbsp;{{datas.Average}}</dd>
      </div>
      <div>
        <dt>会员总消费</dt>
        <dd><span class="size">&yen;</span>&nbsp;{{datas.TotalConsume}}</dd>
      </div>
    </div>
    <!-- 时间选择器 -->
    <div class="time-choice">
      <div>
        <input type="date" placeholder="2017-05-01" v-model="timeOne">
        <span>-</span>
        <input type="date" placeholder="2017-05-01" v-model="timeTwo">
        <button type="button" @click="OjbK()">确定</button>
      </div>
      <!-- 今日 昨日 近7天 近30天选择-->
      <mt-navbar class="page-part" v-model="selecteds">
        <mt-tab-item id="1" class="topleftradius">今日</mt-tab-item>
        <mt-tab-item id="2">昨日</mt-tab-item>
        <mt-tab-item id="3">近7天</mt-tab-item>
        <mt-tab-item id="4" class="top-rightradius">近30天</mt-tab-item>
      </mt-navbar>
    </div>
    <!-- 数据展示区域 -->
    <mt-tab-container v-model="selecteds" class="listM">
      <mt-tab-container-item id="1">
        <div class="list-container" v-for="(list,index) in datas.member_info_today" @click="light(index,list)"
             :class="{'on':flag === index}">
          <div class="peoplist">
            <div class="text">
              <dt>{{list.Name}}</dt>
              <dd>{{list.Phone}}</dd>
            </div>
            <span class="money">{{list.Title}} <i></i></span>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="list-container" v-for="(list,index) in datas.member_info_yesterday" @click="light(index,list)"
             :class="{'on':flag === index}">
          <div class="peoplist">
            <div class="text">
              <dt>{{list.Name}}</dt>
              <dd>{{list.Phone}}</dd>
            </div>
            <span class="money">{{list.Title}} <i></i></span>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="list-container" v-for="(list,index) in datas.member_info_week" @click="light(index,list)"
             :class="{'on':flag === index}">
          <div class="peoplist">
            <div class="text">
              <dt>{{list.Name}}</dt>
              <dd>{{list.Phone}}</dd>
            </div>
            <span class="money">{{list.Title}} <i></i></span>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div class="list-container" v-for="(list,index) in datas.member_info_month" @click="light(index,list)"
             :class="{'on':flag === index}">
          <div class="peoplist">
            <div class="text">
              <dt>{{list.Name}}</dt>
              <dd>{{list.Phone}}</dd>
            </div>
            <span class="money">{{list.Title}} <i></i></span>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import getData from '../../../assets/Data'
  var md5 = require('md5');
  export default {
    name: 'header',
    data() {
      return {
        selecteds: '1',
        flag: -1,
        peoplelist: [
          {
            name: '张三',
            phone: '18073738936',
            price: '普通卡'
          },
          {
            name: '李四',
            phone: '18073738936',
            price: '钻石卡'
          },
          {
            name: '王麻子',
            phone: '18073738936',
            price: '洗护VIP卡'
          },
          {
            name: '王麻子',
            phone: '18073738936',
            price: '普通卡'
          },
          {
            name: '王麻子',
            phone: '18073738936',
            price: '普通卡'
          },
          {
            name: '王麻子',
            phone: '18073738936',
            price: '钻石卡'
          },
          {
            name: '王麻子',
            phone: '18073738936',
            price: '钻石卡'
          },
          {
            name: '王麻子',
            phone: '18073738936',
            price: '洗护VIP卡'
          },
          {
            name: '王麻子',
            phone: '18073738936',
            price: '洗护VIP卡'
          },
          {
            name: '王麻子',
            phone: '18073738936',
            price: '洗护VIP卡'
          },
        ],
        datas:'',
        timeOne:'',
        timeTwo:''
      }
    },
    created(){
      this.getMemberNum();
    },
    methods: {
      light(index,list) {
        this.flag = index;
        console.log(list)
        this.$router.push({path: '/Performancehtml/Members/MembersDetail',query:{plan:list}});
      },
      goback() {
        this.$router.go(-1);
      },
//      会员数量报表接口
      getMemberNum(){
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
          url:'https://api.yongdaoyun.com/special/pet/boss/boss_membership_report.php',
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
          this.datas = res.data.data;
        }).catch( err =>{
          console.log(err)
        })
      },
      //      查询按钮
      OjbK(){
        console.log(this.timeOne);
        console.log(this.timeTwo);
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
          url:'https://api.yongdaoyun.com/special/pet/boss/boss_membership_report.php',
          data:{
            "store_id":localStorage.getItem('storeId'),
            "system_id":85916832,
            "timestamp":time,
            "sign":signValue,
            "data":{
              DateType:2,
              starttime:this.timeOne,
              endtime:this.timeTwo
            }
          }
        }).then( res =>{
          console.log(res);
          this.datas = res.data.data;
        }).catch( err =>{
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>
  .header5 {
    height: 100%;
    overflow: auto;
  }

  .header-2 {
    background-color: #4A505F;
    height: 0.824rem;
    line-height: 0.664rem;
    padding-top: 0.176rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
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

  .msg-bar {
    display: -webkit-box;
    margin-top: 1.0rem;
    background-color: #4a505f;
    height: 1.71rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .msg-bar div {
    width: 33%;
    height: 1.03rem;
    font-size: 0.22rem;
    margin-top: 0.47rem;
  }

  .msg-bar div dt {
    font-size: 0.22rem;
    color: #9296a2;
  }

  .msg-bar div dd {
    margin-left: 0;
    margin-top: 0.16rem;
    font-size: 0.32rem;
    color: #e3e3e5;
  }

  .center {
    border-right: 1px solid #5A606F;
    border-left: 1px solid #5A606F;
  }

  .size {
    font-size: 0.22rem;
    color: #e3e3e5;
  }

  .time-choice {
    background-color: #ffffff;
    padding-bottom: 0.25rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    margin-top: 2.534rem;
  }

  .time-choice input {
    width: 2.17rem;
    height: 0.72rem;
    font-size: 0.28rem;
    color: #666;
    padding-left: 0.2rem;
    background-color: #f0f0f0;
    border: none;
    border-radius: 8px;
    margin-top: 0.26rem;
    outline: none;
  }

  .time-choice div {
    display: flex;
    justify-content: center;
  }

  .time-choice span {
    color: #4a505f;
    font-size: 0.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 0.2rem;
  }

  .time-choice button {
    width: 1.73rem;
    height: 0.72rem;
    font-size: 0.28rem;
    color: #fff;
    background-color: #4a505f;
    border: none;
    border-radius: 8px;
    margin-left: 0.3rem;
    outline: none;
    margin-top: 0.26rem;
  }

  .page-part {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    margin-top: 0.25rem;
    border: 1px solid #4A505F;
    border-radius: 8px;
    font-size: 0.28rem;
    color: #4b5060;
  }

  .page-part a {
    border-right: 1px solid #4A505F;
  }

  .topleftradius {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .top-rightradius {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .listM {
    margin-top: 5rem;
  }

  .list-container {
    height: 1.3rem;
    background-color: #ffffff;
    text-align: left;
  }

  .list-container div, .list-container span {
    display: inline-block;
  }

  .peoplist {
    margin-left: 0.5rem;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #e8e8e8;
  }

  .text {
    width: 50%;
  }

  .list-container div dt {
    font-size: 0.3rem;
    color: #333;
    margin-top: 0.25rem;
    margin-bottom: 0.22rem;
  }

  .list-container div dd {
    font-size: 0.24rem;
    color: #999;
    margin: 0;
  }

  .money {
    font-size: 0.34rem;
    color: #ff6633;
    vertical-align: top;
    margin-top: 0.48rem;
    display: inline-block;
    width: 36%;
    text-align: right;
  }

  .money i {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background: url("../../../../static/img/jiantou.png") 50% 50% no-repeat;
    vertical-align: middle;
    background-size: cover;
  }

  .on {
    background-color: #e8e8e8;
  }
</style>
<style>
  .header5 .mint-tab-item-label {
    font-size: 0.28rem;
  }

  .header5 .mint-navbar .mint-tab-item.is-selected {
    border-bottom: none;
    color: #ffffff;
    margin-bottom: -1px;
    margin-left: -1px;
    background-color: #4A505F;
  }
  .header5 .mint-navbar .mint-tab-item{
    padding: 0.17rem 0;
  }
</style>
