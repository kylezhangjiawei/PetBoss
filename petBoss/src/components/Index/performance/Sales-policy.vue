<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">营销<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 内容区域 -->
    <div class="msg-bar">
      <div>
        <dt>种类总计</dt>
        <dd>6种</dd>
      </div>
      <div class="center">
        <dt>发放总数</dt>
        <dd>5583张</dd>
      </div>
      <div>
        <dt>已使用</dt>
        <dd>4866张</dd>
      </div>
    </div>
    <!-- 表单内容-->
    <div class="tables">
      <table>
        <thead class="table-head">
          <tr>
            <td class="item-one">种类</td>
            <td>发放量</td>
            <td>已使用</td>
            <td>使用率</td>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr>
            <td class="item-one">2017中秋节礼品代金券50元</td>
            <td class="item-two">714</td>
            <td class="item-two">514</td>
            <td class="item-two">60%</td>
          </tr>
          <tr>
            <td class="item-one">2017中秋节礼品代金券50元</td>
            <td class="item-two">714</td>
            <td class="item-two">514</td>
            <td class="item-two">60%</td>
          </tr>
          <tr>
            <td class="item-one">2017中秋节礼品代金券50元</td>
            <td class="item-two">714</td>
            <td class="item-two">514</td>
            <td class="item-two">60%</td>
          </tr>
          <tr>
            <td class="item-one">2017中秋节礼品代金券50元</td>
            <td class="item-two">714</td>
            <td class="item-two">514</td>
            <td class="item-two">60%</td>
          </tr>
          <tr>
            <td class="item-one">2017中秋节礼品代金券50元</td>
            <td class="item-two">714</td>
            <td class="item-two">514</td>
            <td class="item-two">60%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 公司注册符号与名称-->
    <p class="footer">&copy;2017用道云</p>
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
  .msg-bar {
    display: -webkit-box;
    height: 1.71rem;
    background-color: #ffffff;
  }

  .msg-bar div {
    width: 33%;
    height: 1.03rem;
    font-size: 0.22rem;
    margin-top: 0.47rem;
  }

  .msg-bar div dt {
    font-size: 0.22rem;
    color: #999;
  }

  .msg-bar div dd {
    margin-left: 0;
    margin-top: 0.32rem;
    font-size: 0.32rem;
    color: #333;
  }

  .center {
    border-right: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
  }
  .tables{
    margin-top: 0.22rem;
    background-color: #ffffff;
  }
  .tables table{
    width: 100%;
  }
  .table-head{
    font-size: 0.24rem;
    color: #999;
  }
  .table-head tr td{
    padding-top: 0.17rem;
    padding-bottom: 0.2rem;
    text-align: left;
    border-bottom: 1px solid #e8e8e8;
  }
  .item-one{
    padding-left: 0.3rem;
  }
  .table-body{
    font-size: 0.26rem;
    color: #666;
  }
  .table-body tr td{
    padding-top: 0.23rem;
    padding-bottom: 0.27rem;
    text-align: left;
    border-bottom: 1px solid #e8e8e8;
  }
  .item-two{
    padding-left: 0.16rem;
  }
  .footer {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
</style>
