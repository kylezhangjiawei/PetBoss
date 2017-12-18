<template>
  <div class="header">
    <!-- header  -->
    <!-- header  -->
    <div class="header-2">
      <span class="font">业绩<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 会员信息 -->
    <div class="member-msg">
      <div class="member-statement">
        <dt><i></i>会员报表</dt>
        <dd>今日新增&nbsp;:&nbsp;<span class="colors">{{datas.count}}</span>人</dd>
      </div>
      <div class="member-number">
        <span class="num-statistics" @click="goto()">数量统计 &nbsp;<i></i></span>
        <span class="num-sum">数量总计&nbsp;:&nbsp; <span>{{datas.total_count}}</span>人</span>
      </div>
    </div>
    <div class="member-msgs">
      <div class="member-structure" @click="goStructure()">
        <dt>会员结构报表</dt>
        <dd>会员结构分布</dd>
      </div>
      <div class="member-speedup" @click="goIncrease()">
        <dt>会员增速报表</dt>
        <dd>总计增速:&nbsp;<span class="colors">2.2%</span></dd>
      </div>
    </div>
    <!-- 营业额 -->
    <div class="turnover" @click="goTurnover()">
      <span class="turnover-one"><i></i> &nbsp;营业额</span>
      <div class="turnovers">
        <p class="turnover-two">今日营业额&nbsp;:&nbsp;<span class="colors">{{datas.today_actual}}</span>元</p>
        <p class="turnover-three">营业额总计&nbsp;:&nbsp;<span class="colors">{{datas.total_actual}}</span>元</p>
      </div>
    </div>
    <!-- 销售业绩-->
    <!--<div class="sell-msg" @click="goMarketing()">-->
      <!--<div class="sell-performance">-->
        <!--<div class="sell-per">-->
          <!--<dt><i></i>&nbsp;&nbsp;&nbsp;销售业绩</dt>-->
          <!--<dd>销售效果&nbsp;(销售增加)&nbsp;:&nbsp;<span class="colors">16.82%</span></dd>-->
        <!--</div>-->
        <!--<div class="sell-detail">-->
          <!--<span>详情<i></i></span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash; 储值销售 ，营销政策使用量&ndash;&gt;-->
    <!--<div class="member-msgs">-->
      <!--<div class="member-structure" @click="goStoredvaluesales()">-->
        <!--<dt>储值销售</dt>-->
        <!--<dd>储值总计&nbsp;:&nbsp; <span class="colors">792812.58</span>元</dd>-->
      <!--</div>-->
      <!--<div class="member-speedup" @click="goSalepolicy()">-->
        <!--<dt>销售政策使用量</dt>-->
        <!--<dd>使用率:&nbsp;<span class="colors">65%</span></dd>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import getData from '../../assets/Data'
  var md5 = require('md5');
  export default {
    name: 'header',
    data(){
      return{
        datas:[]
      }
    },
    created(){
      this.Performance();
    },
    methods: {
      goto() {
        this.$router.push({path: '/Performancehtml/Members'})
      },
      goback(){
        this.$router.go(-1)
      },
      goStructure() {
        this.$router.push({path: '/Performancehtml/Members/MemberStructure'})
      },
      goIncrease(){
        this.$router.push({path:'/Performancehtml/Members/MemberIncrease'})
      },
      goTurnover(){
        this.$router.push({path:'/Performancehtml/Members/Turnover'})
      },
      goMarketing(){
        this.$router.push({path:'/Performancehtml/Marketing'})
      },
      goSalepolicy(){
        this.$router.push({path:'/Performancehtml/SalePolicy'})
      },
      goStoredvaluesales(){
        this.$router.push({path:'/Performancehtml/StoredValueSales'})
      },
//      业绩主页的数据接口
      Performance(){
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
          url:'https://api.yongdaoyun.com/special/pet/boss/boss_membership_home.php',
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
      }
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
    background: url("../../../static/img/01_033.png") no-repeat;
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

  .member-msg {
    height: 1.55rem;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #ECECEC;
  }

  .member-statement {
    height: 100%;
    width: 50%;
    font-size: 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding-left: 0.3rem;
  }

  .member-number {
    height: 100%;
    width: 50%;
    font-size: 0.24rem;
    color: #999;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .member-statement dt {
    color: #00a9ed;
    margin-bottom: 0.3rem;
  }

  .member-statement dd {
    font-size: 0.24rem;
    color: #999;
    margin: 0;
  }

  .colors {
    color: #333333;
  }

  .member-statement dt i {
    display: inline-block;
    width: 0.34rem;
    height: 0.34rem;
    background: url("../../../static/img/fenxibaobiao.png") 50% 50% no-repeat;
    vertical-align: bottom;
    margin-right: 0.15rem;
    background-size: cover;
  }

  .num-statistics {
    display: block;
    margin-bottom: 0.3rem;
    text-align: right;
  }

  .num-sum {
    display: block;
    text-align: left;
  }

  .num-sum span {
    color: #333333;
  }

  .num-statistics i {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background: url("../../../static/img/jiantou.png") 50% 50% no-repeat;
    vertical-align: bottom;
    background-size: cover;
  }

  .member-msgs {
    height: 1.57rem;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
  }

  .member-structure, .member-speedup {
    height: 1.0rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    margin-bottom: 0.3rem;
    margin-top: 0.3rem;
  }

  .member-structure {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    width: 46%;
    border-right: 1px solid #ececec;
  }

  .member-speedup {
    width: 50%;
  }

  .member-structure dt, .member-speedup dt {
    font-size: 0.3rem;
    color: #333333;
    margin-bottom: 0.16rem;
  }

  .member-structure dd, .member-speedup dd {
    margin: 0;
    font-size: 0.24rem;
    color: #999;
  }

  .turnover {
    height: 1.57rem;
    background-color: #ffffff;
    margin-top: 0.21rem;
  }

  .turnovers {
    text-align: left;
    display: flex;
    justify-content: flex-start;
  }

  .turnover-one {
    display: block;
    font-size: 0.3rem;
    color: #ff7e00;
    text-align: left;
    padding-left: 0.3rem;
    padding-top: 0.33rem;
  }

  .turnover span i {
    display: inline-block;
    width: 0.34rem;
    height: 0.34rem;
    background: url("../../../static/img/caiwuguanli.png") no-repeat;
    margin-right: 0.1rem;
    vertical-align: bottom;
    background-size: cover;
  }

  .turnover p {
    display: inline-block;
    font-size: 0.3rem;
    color: #999;
    margin-bottom: 0px;
  }

  .turnover-two {
    padding-left: 0.3rem;
  }

  .turnover-three {
    padding-left: 0.16rem;
  }

  .sell-msg {
    background-color: #ffffff;
    margin-top: 0.21rem;
    border-bottom: 1px solid #F4F4F4;
  }

  .sell-performance {
    height: 1.57rem;
    display: flex;
    justify-content: flex-start;
  }

  .sell-per {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.3rem;
    text-align: left;
    margin-left: 0.3rem;
    width: 55%;
  }

  .sell-per dt i {
    display: inline-block;
    width: 0.34rem;
    height: 0.34rem;
    background: url("../../../static/img/tongji.png") no-repeat;
    vertical-align: text-top;
    background-size: cover;
  }

  .sell-per dd {
    margin: 0;
    margin-top: 0.3rem;
    color: #999;
  }

  .sell-detail {
    font-size: 0.3rem;
    color: #999;
    width: 40%;
    text-align: right;
    padding-top: 0.2rem;
  }

  .sell-detail span i {
    display: inline-block;
    width: 0.34rem;
    height: 0.34rem;
    background: url("../../../static/img/back .png") 50% 50% no-repeat;
    vertical-align: sub;
    background-size: 40%;
  }
</style>
