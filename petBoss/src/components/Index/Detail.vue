<template>
  <div class="header">
    <!--页头信息-->
    <div class="header-2">
      <span class="back" @click="goback()"><i></i></span>
      <span class="font">详情</span>
    </div>
    <!-- 内容详情 -->
    <div class="container">
      <h1>总部进货请求通知</h1>
      <h2>南昌宠物物流S总部发来一份进货请求单，请尽快处理。</h2>
      <h2>这里面就是消息通知的具体内容全部显示出来。</h2>
      <h2>另外，您可以绑定宠店宝微信，也可以及时收到信息通知，不错误任何消息。</h2>
      <h3>时间：2017-08-26 15:29</h3>
    </div>
  </div>
</template>
<script>
    export default {
      name:'header',
      methods:{
        goback(){
          this.$router.go(-1)
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
  .container{
    background-color: #ffffff;
    text-align: left;
  }
  h1,h2,h3{
    margin: 0;
    padding-left: 0.3rem;
  }
  h1{
    padding-top: 0.48rem;
    padding-bottom: 0.4rem;
    color: #333;
    font-size: 0.34rem;
  }
  h2{
    color: #333;
    font-size: 0.3rem;
  }
  h3{
    padding-top: 0.45rem;
    padding-bottom: 0.45rem;
    color: #666;
    font-size: 0.26rem;
  }
</style>
