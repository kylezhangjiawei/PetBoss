<template>
  <div class="header">
    <div class="header-2">
      <!-- @click="msg()" 消息的点击事件-->
      <span class="font">{{names}}<i class="modalss" @click="open()"></i> <i class="messagess"></i></span>
    </div>
    <!-- 内容区域 -->
    <div class="msg-bar">
      <div>
        <dt>今日收入</dt>
        <dd>{{ memberDatas.today_total}}</dd>
      </div>
      <div class="center">
        <dt>昨日收入</dt>
        <dd>{{ memberDatas.yesterday_total}}</dd>
      </div>
      <div>
        <dt>会员总数</dt>
        <dd>{{ memberDatas.member_total}}</dd>
      </div>
    </div>
    <!-- 空白条 -->
    <div class="blank"></div>
    <!-- 栏目选项栏-->
    <div class="pro-bar">
      <div @click="goOne()">
        <dt class="color-one" ><i></i></dt>
        <dd>人员管理</dd>
      </div>
      <div @click="goTwo()">
        <dt class="color-two" ><i></i></dt>
        <dd>会员卡</dd>
      </div>
      <div @click="goThree()">
        <dt class="color-three" ><i></i></dt>
        <dd>会员报表</dd>
      </div>
      <div @click="goFour()">
        <dt class="color-four" ><i></i></dt>
        <dd>营业额</dd>
      </div>
      <div @click="goFive()">
        <dt class="color-five" ><i></i></dt>
        <dd>库存</dd>
      </div>
      <!-- @click="goSix()"-->
     <!--  <div>
        <dt class="color-six" ><i></i></dt>
        <dd>进货</dd>
      </div> -->
      <!-- @click="goSeven()" -->
     <!--  <div>
        <dt class="color-seven" ><i></i></dt>
        <dd>调拨单</dd>
      </div> -->
      <!-- @click="goEight()" -->
     <!--  <div>
        <dt class="color-eight"><i></i></dt>
        <dd>入库单</dd>
      </div> -->
      <!--<div @click="goMyShop()">-->
        <!--<dt class="color-nine"><i></i></dt>-->
        <!--<dd>店铺设置</dd>-->
      <!--</div>-->
    </div>
    <!-- 虚拟模态框-->
    <mt-popup
      v-model="popupVisible"
      position="left"
      class="modal-left"
    >
      <div></div>
      <p>{{names}}</p>
      <!--<span><img src="../../../static/img/comments1.png" alt="">消息</span>-->
      <!--<span class="top"><img src="../../../static/img/cart.png" alt="">充值</span>-->
      <!--<span class="bottom"><img src="../../../static/img/set.png" alt="">设置</span>-->
      <!--<span><img src="../../../static/img/service.png" alt="">联系我们</span>-->
      <button @click="goOut()">退出登录</button>
      <!-- 公司注册符号与名称-->
      <p id="footer">&copy;2017用道云 v1.0.12</p>
    </mt-popup>
  </div>
</template>
<script>
  import getData from '../../assets/Data'
  var md5 = require('md5');
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'indexHtml',
    data() {
      return {
        popupVisible: false,
        names:'',
        Datas:[]
      }
    },
    computed:{
        ...mapGetters([
          'memberDatas'
        ])
      },
    created(){
       this.names = localStorage.getItem('Name');
      //获取今日昨日收入及会员总数
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
        url:'https://api.yongdaoyun.com/special/pet/boss/boss_homepage.php',
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
        let datas = res.data.data;
        this.$store.dispatch('memberDatas',datas);
        // this.Datas = res.data.data;
      }).catch( err =>{
        console.log(err)
      })
    },
    methods: {
      open() {
        this.popupVisible = true;
      },
      msg() {
        this.$router.push({path: '/Indexhtml/Message'})
      },
      goMyShop(){
        this.$router.push({path:'/Index/Myshop'})
      },
      goOne(){
        this.$router.push({path:'/Peoplehtml/Administration'})
      },
      goTwo(){
        this.$router.push({path:'/Index/Myshop/MembershipCard'})
      },
      goThree(){
        this.$router.push({path:'/Performancehtml/Members'})
      },
      goFour(){
        this.$router.push({path:'/Performancehtml/Members/Turnover'})
      },
      goFive(){
        this.$router.push({path:'/Index/Producthtml'})
      },
      goSix(){
//        this.$router.push({path:'/Producthtml/Stock'})
        Toast({
          message: '该页面功能正在开发..',
          duration: 2000,
          className:'ok'
        })
      },
      goSeven(){
//        this.$router.push({path:'/Producthtml/Allot'})
        Toast({
          message: '该页面功能正在开发..',
          duration: 2000,
          className:'ok'
        })
      },
      goEight(){
        this.$router.push({path:'/Producthtml/Put-in-storage'})
      },
      goOut(){
        this.$router.push({path:'/'});
        localStorage.clear();
      }
    }
  }
</script>
<style scoped>
  .header-2 {
    background-color: #4A505F;
    height: 0.824rem;
    line-height: 0.0.664rem;
    color: #ffffff;
    font-size: 0.34rem;
    width: 100%;
    display: flex;
    padding-top: 0.176rem;
  }

  .modalss {
    display: inline-block;
    width: 0.42rem;
    height: 0.28rem;
    background: url("../../../static/img/line.png") no-repeat;
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
    position: relative;
  }
  .messagess {
    display: inline-block;
    width: 0.36rem;
    height: 0.33rem;
    background: url("../../../static/img/comments.png") 50% 50% no-repeat;
    background-size: cover;
    position: absolute;
    top: 30%;
    right: 5%;
  }


  .msg-bar {
    display: -webkit-box;
    margin-top: -2px;
    background-color: #4a505f;
    height: 1.46rem;
  }

  .msg-bar div {
    width: 33%;
    height: 0.84rem;
    font-size: 0.22rem;
    margin-top:0.3rem;
  }

  .msg-bar div dt {
    font-size: 0.22rem;
    color: #9FA6AA;
  }

  .msg-bar div dd {
    margin-left: 0;
    margin-top: 0.18rem;
    font-size: 0.32rem;
    color: #fff;
  }


  .blank {
    width: 100%;
    height: 0.2rem;
    background-color: #e8e8e8;
  }

  .pro-bar {
    background-color: #fff;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .pro-bar div {
    width: 33%;
    height: 2.48rem;
    overflow: hidden;
    border-bottom: 1px solid #F0F0F0;
    border-left: 1px solid #F0F0F0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .pro-bar div dt {
    width: 1.12rem;
    height: 1.12rem;
    margin: 0 auto;
  }

  .pro-bar div dd {
    margin-left: 0;
    font-size: 0.26rem;
    color: #666;
    margin-top: 0.24rem;
  }

  .color-one {
    background-color: #e4e8fe;
    border-radius: 0.4rem;
  }
  .color-one i{
    display: inline-block;
    width: 0.63rem;
    height: 100%;
    background: url("../../../static/img/renyuanguanli.png")50% 50% no-repeat;
    background-size: contain;
  }
  .color-two {
    background-color: #dfeefe;
    border-radius: 0.4rem;
  }
  .color-two i{
    display: inline-block;
    width: 0.63rem;
    height: 100%;
    background: url("../../../static/img/huiyuanka.png")50% 50% no-repeat;
        background-size: contain;
  }
  .color-three {
    background-color: #fcf3cf;
    border-radius: 0.4rem;
  }
  .color-three i{
    display: inline-block;
    width: 0.63rem;
    height: 100%;
    background: url("../../../static/img/huiyuanbaobiao.png")50% 50% no-repeat;
        background-size: contain;
  }
  .color-four {
    background-color: #e8f6d8;
    border-radius: 0.4rem;
  }
  .color-four i{
    display: inline-block;
    width: 0.63rem;
    height: 100%;
    background: url("../../../static/img/yingyee.png")50% 50% no-repeat;
        background-size: contain;
  }
  .color-five {
    background-color: #fcece7;
    border-radius: 0.4rem;
  }
  .color-five i {
    display: inline-block;
    width: 0.63rem;
    height: 100%;
    background: url("../../../static/img/kucun.png")50% 50% no-repeat;
        background-size: contain;
  }
  .color-six {
    background-color: #dbf3f8;
    border-radius: 0.4rem;
  }
  .color-six i{
    display: inline-block;
    width: 0.63rem;
    height: 100%;
    background: url("../../../static/img/jinhuo.png")50% 50% no-repeat;
        background-size: contain;
  }
  .color-seven {
    background-color: #dfeefe;
    border-radius: 0.4rem;
  }
  .color-seven i{
    display: inline-block;
    width: 0.63rem;
    height: 100%;
    background: url("../../../static/img/diaobodan.png")50% 50% no-repeat;
        background-size: contain;
  }
  .color-eight {
    background-color: #E0F8EB;
    border-radius: 0.4rem;
  }
  .color-eight i {
    display: inline-block;
    width: 0.63rem;
    height: 100%;
    background: url("../../../static/img/rukudan.png")50% 50% no-repeat;
        background-size: contain;
  }
  .color-nine {
    background-color: #f9eddc;
    border-radius: 0.4rem;
  }
  .color-nine i{
    display: inline-block;
    width: 0.63rem;
    height: 100%;
    background: url("../../../static/img/dianpushezhi.png")50% 50% no-repeat;
        background-size: contain;
  }
  .icons {
    width: 0.45rem;
    height: 0.45rem;
  }

  #foot {
    height: 1.04rem;
    color: #999999;
  }

  .modal-left {
    right: 35%;
    bottom: -50%;
    background-color: #242A33;
    color: #ffffff;
    text-align: -webkit-center;
  }

  .modal-left div {
    width: 1.27rem;
    height: 1.27rem;
    border: 9px solid #535660;
    border-radius: 100px;
    background: url("../../../static/img/dingdang.png") -24% 100% no-repeat;
    margin-top: 0.46rem;
    background-size: cover;
  }

  .modal-left p {
    margin-top: 0.2rem;
    font-size: 0.36rem;
  }

  .modal-left span {
    display: block;
    background-color: #2b313c;
    height: 0.93rem;
    text-align: left;
    line-height: 0.93rem;
    padding-left: 0.28rem;
    font-size: 0.3rem;
    color: #c1c6d5;

  }

  .modal-left span img {
    margin-right: 0.24rem;
    vertical-align: middle;
    width: 0.36rem;
    height: 0.36rem;
  }

  .top {
    margin-top: 0.24rem;
  }

  .bottom {
    margin-bottom: 0.24rem;
    margin-top: 0.01rem;
  }

  .modal-left button {
    width: 2.75rem;
    height: 0.88rem;
    /*margin-top: 3.84rem;*/
    font-size: 0.26rem;
    color: #c1c6d5;
    background-color: #242a33;
    border: 1px solid #4b5060;
    border-radius: 10px;
    outline: none;
  }

  #footer {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0.5rem;
    width: 100%;
    color: #bbb;
  }
</style>
