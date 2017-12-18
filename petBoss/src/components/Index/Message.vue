<template>
  <div class="header">
    <!--页头信息-->
    <div class="header-2">
      <span class="font">消息通知
        <i class="back" @click="goback()"></i></span>
    </div>
    <!-- 信息内容 -->
    <div class="msg-container">
      <!-- 图标 -->
      <div class="item-one">
      <i :class="{'msg-icon':msgicon,'msg-active':msgactive}"><em :class="{'msg-dot':msgdot}"></em></i>
      </div>
      <!-- 信息内容 -->
      <div class="item-two" @click="goto()">
        <span class="font-one">总部进货请求通知</span>
        <span class="font-two">南昌充足物流S总部发来一份进货单请求，请尽快处理</span>
        <span class="font-three">2017-08-26 &nbsp;15:29</span>
      </div>
      <!-- 前进图标 -->
      <div class="item-three"><i></i></div>
    </div>
  </div>
</template>
<script>
    export default {
      name:'header',
      data(){
        return{
          msgicon:true,
          msgdot:true,
          msgactive:false
        }
      },
      methods:{
        goback(){
          this.$router.go(-1)
        },
        goto(){
          this.msgicon=false;
          this.msgdot = false;
          this.msgactive = true;
          this.$router.push({path:'/Indexhtml/Message/Detaile'})
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
  .msg-container{
    margin-bottom: 0.22rem;
    height: 2.35rem;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
  }
  .item-one, .item-two, .item-three{
    display: inline-block;
    height: 100%;
  }
  .item-one{
    width: 10%;
    margin-left: 0.3rem;
    margin-right: 0.25rem;
  }
  .item-two{
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
  }
  .item-three{
    width: 12%;
  }
  .msg-icon{
    display: inline-block;
    width: 0.65rem;
    height: 0.65rem;
    background: url("../../../static/img/message.png")50% 50% no-repeat;
    background-color: #2fb82f;
    margin-top: 0.32rem;
    position: relative;
    background-size: 65%;
  }
  .msg-active{
    display: inline-block;
    width: 0.65rem;
    height: 0.65rem;
    background: url("../../../static/img/message.png")50% 50% no-repeat;
    background-color: #c8c8c8;
    margin-top: 0.32rem;
    position: relative;
    background-size: 65%;
  }
  .msg-dot{
    display: inline-block;
    width: 0.16rem;
    height: 0.16rem;
    background-color: #ff6733;
    border-radius: 100px;
    position: absolute;
    top: -0.07rem;
    right: -0.09rem;
  }
  .item-two span {
    display: inline-block;
  }
  .font-one{
    font-size: 0.3rem;
    color: #333;
  }
  .font-two{
    font-size: 0.28rem;
    color: #666;
  }
  .font-three{
    font-size: 0.26rem;
    color: #656;
  }
  .item-three{
    width: 10%;
  }
  .item-three i{
    display: inline-block;
    width: 0.3rem;
    height: 100%;
    background: url("../../../static/img/back .png")50% 50% no-repeat;
  }
</style>
