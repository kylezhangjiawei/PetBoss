<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">会员卡详情
        <i class="back" @click="goback()"></i></span>
    </div>
    <!-- 会员卡名称 -->
    <div class="card-name">
      <span class="firstName">会员卡名称</span>
      <span class="lastName">宠物洗护VIP卡</span>
    </div>
    <!-- 内容详情 -->
    <div class="container">
      <div class="article-one">
        <span class="price">售价</span>
        <span class="num">100</span>
      </div>
      <div class="article-one">
        <span class="price">最低储值</span>
        <span class="num">500</span>
      </div>
      <div class="article-one">
        <span class="price">最低积分</span>
        <span class="num">100</span>
      </div>
    </div>
    <!-- 会员权益 -->
    <div class="member-equity">
      <!-- 会员折扣 -->
      <div class="member-discount">
        <span class="discount">会员权益</span>
        <span class="discount-icon"><span><i></i></span>会员折扣</span>
      </div>
      <!-- 积分加倍 -->
      <div class="integral-double">
        <div class="integral-double-one"><span><i></i></span> 积分加倍</div>
        <div class="integral-double-two">
          <span class="item-one"><span><i></i></span>积分加倍</span>
          <span class="item-two">2</span>
          <span class="item-three">倍</span>
        </div>
      </div>
    </div>
    <!--卡颜色 -->
    <div class="card-color">
      <span class="card-color-title"><span>卡颜色</span></span>
      <span class="diamonds"><i></i></span>
      <span class="back-icon"><i></i></span>
    </div>
    <!-- 提示信息 -->
    <div class="hint">
      <div class="hint-msg">
        <span class="hint-head">操作提示</span>
        <span class="hint-body">使用时倾向工作人员出示卡号</span>
        <span class="hint-back-icon"><i></i></span>
      </div>
      <div class="hint-msg">
        <span class="hint-head">特权说明</span>
        <span class="hint-body">凭借此卡可享受会员卡带来的优惠等一系列活动</span>
        <span class="hint-back-icon"><i></i></span>
      </div>
      <div class="hint-msg">
        <span class="hint-head">使用须知</span>
        <span class="hint-body">会员卡仅限本人使用，不得转让，违者作废会员卡....</span>
        <span class="hint-back-icon"><i></i></span>
      </div>
    </div>
    <!-- 修改 删除 按钮-->
    <div class="btn">
      <span class="delete" @click="openConfirm()">停用</span>
    </div>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui';
  import {Toast} from 'mint-ui';
  export default {
    name:'header',
    methods:{
      goback(){
        this.$router.go(-1)
      },
//      goChangeCard(){
//        this.$router.push({path:'/Index/Myshop/MembershipCard/ChangeCard'})
//      },
      openConfirm() {
        MessageBox.confirm('确定停用此会员卡?', '').then(action => {
          if (action == 'confirm') {
            Toast({
              message: '停用成功',
              className: 'ok'
            })
          }
        }).catch(err => {
          console.log(err);
        })
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

  .card-name{
    height: 0.92rem;
    background-color: #ffffff;
    margin-top: 0.25rem;
    display: flex;
    justify-content: flex-start;
    padding-left: 0.3rem;
    font-size: 0.3rem;
    line-height: 3;
  }
  .firstName{
    margin-right: 0.5rem;
  }
  .lastName{
    color: #999;
  }
  .container{
    background-color: #ffffff;
    padding-left: 0.3rem;
    margin-top: 0.22rem;
  }
  .article-one{
    height: 0.92rem;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e8e8e8;
    font-size: 0.3rem;
    line-height: 3;
  }
  .price{
    color: #333;
    width: 30%;
    text-align: left;
  }
  .num{
    color: #666;
  }
  .member-equity{
    background-color: #ffffff;
    margin-top: 0.22rem;
    padding-left: 0.3rem;
  }
  .member-discount{
    height: 0.92rem;
    border-bottom: 1px solid #e8e8e8;
    font-size: 0.3rem;
    display: flex;
    justify-content: flex-start;
    line-height: 3;
  }
  .discount{
    width:30%;
    text-align: left;
  }
  .discount-icon{
    position: relative;
  }
  .discount-icon span{
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #DDDDDD;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.16rem;
    position: relative;
  }
  .integral-double-one{
    height: 0.92rem;
    font-size: 0.3rem;
    line-height: 3;
    padding-left: 30%;
    text-align: left;
  }
  .integral-double-one span{
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #349946;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.1rem;
    position: relative;
  }
  .integral-double-one span i {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url("../../../../static/img/gouxuanfuben.png")no-repeat;
    position: absolute;
    top:25%;
    right: 25%;
    background-size: cover;
  }
  .integral-double-two{
    height: 0.92rem;
    font-size: 0.3rem;
    margin-left: 30%;
    background-color: #f8f8f8;
    display: flex;
    justify-content: flex-start;
    line-height: 3;
    color: #999;
  }
  .item-one span{
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.16rem;
    position: relative;
  }
  .item-two{
    height: 0.72rem;
    display: inline-block;
    background-color: #e8e8e8;
    width: 35%;
    margin-top: 0.1rem;
    margin-left: 0.1rem;
    margin-right: 0.18rem;
    text-align: left;
    padding-left: 0.16rem;
    line-height: 2.5;
  }
  .card-color{
    margin-top: 0.22rem;
    height: 0.92rem;
    font-size: 0.3rem;
    display: flex;
    justify-content: flex-start;
    background-color: #ffffff;
    padding-left: 0.3rem;
  }
  .card-color span {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .diamonds i{
    width: 0.4rem;
    height: 0.4rem;
    background-color: #ef8700;
    border-radius: 6px;
    margin-right: 0.16rem;
  }
  .card-color-title{
    width: 85%;
    text-align: left;
  }
  .back-icon i{
    width: 0.32rem;
    height: 0.32rem;
    background: url("../../../../static/img/jiantou.png")50% 50% no-repeat;
  }
  .hint{
    margin-top: 0.22rem;
    background-color: #ffffff;
    padding-left: 0.3rem;
  }
  .hint-msg{
    height: 0.92rem;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: flex-start;
    font-size: 0.3rem;
    line-height: 3.5;
  }
  .hint-head,.hint-body,.hint-back-icon{
    /*display: flex;*/
    /*justify-content: center;*/
    /*flex-direction: column;*/
    display: inline-block;
  }
  .hint-head{
    text-align: left;
    width: 20%;
  }
  .hint-body{
    text-align: left;
    width: 72%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .hint-back-icon i {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background: url("../../../../static/img/jiantou.png")50% 50% no-repeat;
  }
  .btn{
    height: 0.94rem;
    background-color: #ffffff;
    margin-top: 0.1rem;
       display: flex;
    justify-content: center;
  }
  .delete{
    display: inline-block;
    height: 0.72rem;
    width: 6.48rem;
    border: 1px solid #a8a8a8;
    font-size: 0.34rem;
    line-height: 2;
    margin-top: 0.1rem;
    border-radius: 8px;
  }
</style>
