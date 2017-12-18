<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">我的店铺
        <i class="back" @click="goback()"></i></span>
    </div>
    <!-- 店铺Logo名称 -->
    <div class="shop-head">
      <div class="shop-logo">
      </div>
      <div class="shop-name">
        <dt>{{names}}</dt>
        <dd>连云港店</dd>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="msg-bar">
      <div @click="goMemberCard()">
        <dt class="card"></dt>
        <dd>会员卡</dd>
      </div>
      <!-- @click="goDiscountsPro()" 营销策略点击-->
      <div class="center">
        <dt class="marketing"></dt>
        <dd>营销策略</dd>
      </div>
      <div>
        <dt class="control"></dt>
        <dd>总部管控</dd>
      </div>
    </div>
    <!-- 消息 -->
    <div class="message">
      <span class="message-icon"><i></i></span>
      <span class="message-msg">消息</span>
      <span class="message-back-icon"><i></i></span>
    </div>
    <!-- 关于我们 -->
    <div class="message">
      <span class="we-icon"><i></i></span>
      <span class="message-msg">关于我们</span>
      <span class="message-back-icon"><i></i></span>
    </div>
    <!-- 客服电话 -->
    <div class="messages">
      <span class="phone-icon"><i></i></span>
      <span class="message-msg">客服电话</span>
      <span class="message-back-icon">18000187588</span>
    </div>
    <!-- 退出登录 -->
    <div class="btn" @click="goOut()">退出登录</div>
  </div>
</template>
<script>
    export default {
      name:'header',
      data(){
        return{
          names:''
        }
      },
        created(){
       this.names = localStorage.getItem('Name');
    },
      methods:{
        goback(){
          this.$router.go(-1)
        },
        goMemberCard(){
          this.$router.push({path:'/Index/Myshop/MembershipCard'})
        },
        goDiscountsPro(){
          this.$router.push({path:'/Index/Myshop/MembershipCard/DiscountsPro'})
        },
        goOut(){
          this.$router.push({path:'/'});
          localStorage.clear();
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
  .shop-head{
    display: flex;
    justify-content: flex-start;
    height: 1.77rem;
    background-color: #4a505f;
    margin-top: -2px;
  }
  .shop-logo{
    width: 1.25rem;
    height: 70%;
    border-radius: 100px;
    border: 6px solid #9EAEAE;
    background: url("../../../../static/img/dingdang.png")50% 50% no-repeat;
    margin-top: 0.16rem;
    margin-left: 0.17rem;
    background-size: cover;
  }
  .shop-name{
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #ffffff;
    margin-left: 0.2rem;
  }
  .shop-name dt{
    margin-bottom: 0.22rem;
    font-size: 0.28rem;
  }
  .shop-name dd{
    margin: 0;
    font-size: 0.22rem;
  }
  .msg-bar {
    display: -webkit-box;
    height: 1.97rem;
    background-color: #ffffff;
  }
  .msg-bar div {
    width: 33%;
    height: 1.29rem;
    font-size: 0.22rem;
    margin-top: 0.33rem;
  }

  .msg-bar div dt {
    height: 0.66rem;
    width: 100%;
    color: #999;
  }

  .msg-bar div dd {
    margin-left: 0;
    margin-top: 0.25rem;
    font-size: 0.28rem;
    color: #333;
  }

  .center {
    border-right: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
  }
  .card{
    background: url("../../../../static/img/huiyuanka.png")50% 50% no-repeat;
    background-size: contain;
  }
  .marketing{
    background: url("../../../../static/img/fangan.png")50% 50% no-repeat;
    background-size: contain;
  }
  .control{
    background: url("../../../../static/img/guanli.png")50% 50% no-repeat;
    background-size: contain;
  }
  .message {
    height: 1.0rem;
    background-color: #ffffff;
    margin-top: 0.25rem;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e8e8e8;
  }
  .messages{
    height: 1.0rem;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
  }
  .message-icon i{
    display: inline-block;
    width: 0.42rem;
    height: 0.38rem;
    background: url("../../../../static/img/xiaoxi1.png")50% 50% no-repeat;
    background-size: cover;
  }
  .message-back-icon{
    font-size: 0.28rem;
    color: #666;
    width: 30%;
    position: relative;
  }
  .message-back-icon i {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background: url("../../../../static/img/jiantou.png")50% 50% no-repeat;
    position: absolute;
    top: 0.32rem;
    right: 0.3rem;
  background-size: cover;
  }
  .message-icon,.message-msg,.message-back-icon,.we-icon,.phone-icon{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .message-icon,.we-icon,.phone-icon{
    margin-left: 0.3rem;
  }
  .message-msg{
    font-size: 0.26rem;
    margin-left: 0.2rem;
    width: 60%;
    text-align: left;
  }
  .we-icon i {
    display: inline-block;
    width: 0.42rem;
    height: 0.35rem;
    background: url("../../../../static/img/guanyuwomen.png")50% 50% no-repeat;
    background-size: cover;
  }
  .phone-icon i{
    display: inline-block;
    width: 0.42rem;
    height: 0.4rem;
    background: url("../../../../static/img/dianhua1.png")50% 50% no-repeat;
    background-size: cover;
  }
  .btn{
    font-size: 0.28rem;
    color: #333;
    height: 1.0rem;
    background-color: #ffffff;
    margin-top: 0.3rem;
    line-height: 3.5;
  }
</style>
