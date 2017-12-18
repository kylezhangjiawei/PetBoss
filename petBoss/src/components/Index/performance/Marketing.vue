<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">营销<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 优惠券 -->
    <div class="discount-coupon">
      <div class="Coupon">
        <div class="title">优惠券</div>
        <div class="turnover">
          <div class="percentage"><span :style="percentagecolor"></span></div>
          <div class="text-msg">
            <dt><span class="distance">使用率</span><span>较前月</span></dt>
            <dd>80% <i class="icon"></i></dd>
          </div>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="msg-bar">
        <div>
          <dt>种类总计</dt>
          <dd>8种</dd>
        </div>
        <div class="center">
          <dt>发放总数</dt>
          <dd>1083张</dd>
        </div>
        <div>
          <dt>已使用</dt>
          <dd>866张</dd>
        </div>
      </div>
    </div>
    <!-- 满赠，满减 -->
    <div class="discount-coupon">
      <div class="Coupon">
        <div class="title">满赠/满减</div>
        <div class="turnover">
          <div class="percentage"><span :style="percentagecolortwo"></span></div>
          <div class="text-msg">
            <dt><span class="distance">使用率</span><span>较前月</span></dt>
            <dd>80% <i class="icons"></i></dd>
          </div>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="msg-bar">
        <div>
          <dt>种类总计</dt>
          <dd>3种</dd>
        </div>
        <div class="center">
          <dt>参与人数</dt>
          <dd>866人</dd>
        </div>
        <div>
          <dt>增加收益</dt>
          <dd>&yen;8696.52</dd>
        </div>
      </div>
    </div>
    <!-- 营销名称 -->
    <div class="discount-coupon">
      <div class="Coupon">
        <div class="title">营销名称</div>
        <div class="turnover">
          <div class="percentage"><span :style="percentagecolorthree"></span></div>
          <div class="text-msg">
            <dt><span class="distance">使用率</span><span>较前月</span></dt>
            <dd>55% <i class="icons"></i></dd>
          </div>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="msg-bar">
        <div>
          <dt>种类总计</dt>
          <dd>6种</dd>
        </div>
        <div class="center">
          <dt>参与人数</dt>
          <dd>216人</dd>
        </div>
        <div>
          <dt>增加收益</dt>
          <dd>&yen;8696.52</dd>
        </div>
      </div>
    </div>
    <!-- 公司注册符号与名称-->
    <p id="footer">&copy;2017用道云</p>
  </div>
</template>
<script>
    export default {
      name:'header',
      data(){
        return{
          percentagecolor:{
            display:'inline-block',
            backgroundColor:'#54c2be',
            width:'',
            height:'100%'
          },
          percentagecolortwo:{
            display:'inline-block',
            backgroundColor:'#ffc656',
            width:'',
            height:'100%'
          },
          percentagecolorthree:{
            display:'inline-block',
            backgroundColor:'#4a505f',
            width:'',
            height:'100%'
          }

        }
      },
      created(){
        this.percentagecolor.width=80+'%';
        this.percentagecolortwo.width=26+'%';
        this.percentagecolorthree.width=55+'%';
      },
      methods:{
        goback(){
          this.$router.go(-1)
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
  .discount-coupon{
    margin-top: 0.14rem;
    background-color: #ffffff;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }
  .Coupon{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    border-bottom: 1px solid #e8e8e8;
  }
  .title{
    font-size: 0.3rem;
    font-weight: bold;
    text-align: left;
    height: 0.84rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .turnover{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-bottom: 0.3rem;
  }
  .percentage{
    height: 0.8rem;
    width: 4.58rem;
    background-color: #e8e8e8;
    text-align: left;
    display: flex;
  }
  .text-msg{
    font-size: 0.22rem;
    line-height: 1.5;
  }
  .text-msg dt{
    color: #999;
    margin-left: 0.25rem;
  }
  .distance{
    margin-right: 0.55rem;
  }
  .text-msg dd{
    margin-left: 0.25rem;
    text-align: left;
    font-size: 0.3rem;
    color: #ff6633;
  }
  .icon{
    display: inline-block;
    background: url("../../../../static/img/down.png")50% 50% no-repeat;
    width: 0.2rem;
    height: 0.24rem;
    margin-left: 0.71rem;
  }
  .icons{
    display: inline-block;
    background: url("../../../../static/img/up.png")50% 50% no-repeat;
    width: 0.2rem;
    height: 0.24rem;
    margin-left: 0.71rem;
  }
  .msg-bar {
    display: -webkit-box;
    margin-top: 1px;
    height: 1.36rem;
  }

  .msg-bar div {
    width: 33%;
    height: 1.03rem;
    font-size: 0.22rem;
    margin-top: 0.29rem;
  }

  .msg-bar div dt {
    font-size: 0.22rem;
    color: #999;
  }

  .msg-bar div dd {
    margin-left: 0;
    margin-top: 0.15rem;
    font-size: 0.32rem;
    color: #333;
  }

  .center {
    border-right: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
  }
  #footer {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
</style>
