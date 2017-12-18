<template>
  <div class="header">
    <!--页头信息-->
    <div class="header-3">
      <span class="back" @click="goback()"><i></i></span>
      <span class="font">进货请求</span>
      <div class="clack"><i></i>待进货</div>
    </div>
    <!-- 货单详情 -->
    <div class="storage-list">
      <div>
        <span class="title">单号&nbsp;:&nbsp;</span>
        <span>89568745566</span>
      </div>
      <div>
        <span class="title">入库时间&nbsp;:&nbsp;</span>
        <span>2017.08.10 15&nbsp;:&nbsp;24&nbsp;:&nbsp;30</span>
      </div>
      <div>
        <span class="title">供应商&nbsp;:&nbsp;</span>
        <span>朵拉总部</span>
      </div>
      <div>
        <span class="title">总价&nbsp;:&nbsp;</span>
        <span>&yen;&nbsp;8896.25</span>
      </div>
    </div>
    <!-- 货物详情 -->
    <div class="headline">货物详情</div>
    <div class="container">
      <div class="list-one">
        <div class="list-item">
          <div class="item-first">
            <dt>XXX狗粮
            </dt>
            <dd>&yen;20/件 &nbsp;条码:123456789</dd>
          </div>
          <div class="item-second">
            <dt>10 <span class="unit">件</span></dt>
            <dd>红色/S码</dd>
          </div>
          <div class="item-thirdly"><i></i></div>
        </div>
      </div>
      <div class="list-one">
        <div class="list-item">
          <div class="item-first">
            <dt>XXX狗粮
            </dt>
            <dd>&yen;20/件 &nbsp;条码:123456789</dd>
          </div>
          <div class="item-second">
            <dt>10 <span class="unit">件</span></dt>
            <dd>红色/S码</dd>
          </div>
          <div class="item-thirdly"><i></i></div>
        </div>
      </div>
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
  .header{
    height: 100%;
  }
  .header-3 {
    background-color: #4A505F;
    height: 1.848rem;
    line-height: 0.664rem;
    padding-top: 0.176rem;
  }

  .back i {
    display: inline-block;
    width: 0.236rem;
    height: 0.38rem;
    background: url("../../../../static/img/01_033.png") no-repeat;
    vertical-align: top;
    background-size: cover;
  }
  .clack{
    font-size: 0.3rem;
    color: #ffffff;
    padding-left: 4.5%;
    text-align: left;
  }
  .clack i {
    display: inline-block;
    width: 0.48rem;
    height: 0.48rem;
    background: url("../../../../static/img/zhongbiao.png") no-repeat;
    vertical-align: middle;
    margin-right: 0.16rem;
    margin-bottom: 0.1rem;
    background-size: cover;
  }
  .header-3 span {
    display: inline-block;
  }

  .font {
    width: 85%;
    font-size: 0.36rem;
    text-align: center;
    color: #ffffff;
  }

  .back {
    display: inline-block;
    vertical-align: -webkit-baseline-middle;
  }
  .storage-list{
    height: 3.25rem;
    width: 100%;
    background-color: #ffffff;
    margin-top: 0.25rem;
    text-align: left;
    font-size: 0.26rem;
    line-height: 3;
  }
  .storage-list div{
    height: 0.8rem;
    margin-left: 0.3rem;
    border-bottom: 1px solid #e8e8e8;
  }
  .storage-list div span{
    display: inline-block;
  }
  .title{
    color: #6A6A6A;
    width: 1.28rem;
    text-align: right;
  }
  .headline{
    height: 0.66rem;
    text-align: left;
    color: #A4A4A4;
    font-size: 0.27rem;
    line-height: 2.5;
    margin-left: 0.3rem;
  }

  .container{
    background-color: #ffffff;
  }
  .list-one {
    height: 1.3rem;
    background-color: #ffffff;
    margin-left: 0.3rem;
  }

  .list-item {
    text-align: left;
    height: 100%;
    line-height: 2;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e8e8e8;
  }

  .item-first, .item-second, .item-thirdly {
    display: inline-block;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  dt {
    font-size: 0.3rem;

  }

  dd {
    margin: 0;
    font-size: 0.24rem;
    color: #999999;
  }

  .item-first {
    text-align: left;
    width: 70%;
  }

  .item-second {
    text-align: right;
    width: 15%;
  }

  .unit {
    font-size: 0.24rem;
    color: #999999;
  }

  .item-thirdly {
    margin-left: 0.15rem;
  }

  .item-thirdly i {
    display: inline-block;
    width: 1rem;
    height: 100%;
    background: url("../../../../static/img/jiantou.png") 50% 50% no-repeat;
    background-size: 30%;
  }
  .footer {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
</style>
