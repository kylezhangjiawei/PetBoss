<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">报表详情<i class="back" @click="gobakc()"></i></span>
    </div>
    <!-- 实收金额 -->
    <div class="money">
      <div class="product-price">
        <dt class="prices">&yen;&nbsp;{{datas.total.actual_price}}</dt>
        <dd class="receipts">实收金额</dd>
      </div>
    </div>
    <!-- 消费商品详情-->
    <div class="product-detail" v-for="item in datas.orderdata">
      <div>
        <div class="messages">
          <dt>{{item.goods_name}}</dt>
          <dd>&yen;&nbsp;{{item.goods_price}}&nbsp;&nbsp;{{item.goods_num}}</dd>
        </div>
        <div class="price">&yen;&nbsp{{item.goods_total}}</div>
      </div>
    </div>
    <!--账务信息 -->
    <div class="bill">
      <div class="client">
        {{datas.nameres.Name}}&nbsp;&nbsp;{{datas.nameres.Phone}}
      </div>
      <div class="bill-detail">
        <div><span class="bill-msg">销售单号&nbsp;:&nbsp;</span><span>{{datas.saledata.transaction_id}}</span></div>
        <div><span class="bill-msg">销售时间&nbsp;:&nbsp;</span><span>{{datas.saledata.add_date}}</span></div>
        <div><span class="bill-msg">收银员&nbsp;:&nbsp;</span><span>{{datas.saledata.author}}</span></div>
        <div><span class="bill-msg">收款方式&nbsp;:&nbsp;</span><span>{{datas.saledata.pay_method}}</span></div>
      </div>
      <div class="total">
        合计金额&nbsp;:&nbsp;&yen;&nbsp;{{datas.total.total_price}}&nbsp;&nbsp;应收&nbsp;:&nbsp;&yen;&nbsp;{{datas.total.amount_price}}&nbsp;&nbsp;实收&nbsp;:&nbsp;&yen;&nbsp;{{datas.total.actual_price}}
      </div>
    </div>
  </div>
</template>
<script>
  import getData from '../../../assets/Data'
  import { Toast } from 'mint-ui';
  var md5 = require('md5');
    export default {
      name:'header',
      data(){
        return{
          datas:''
        }
      },
      created(){
        this.datas = this.$route.query.plan;
        console.log(this.datas)
      },
      methods:{
        gobakc(){
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
  .money{
    height: 2.5rem;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
  }
  .product-price{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .prices{
    font-size: 0.56rem;
    color: #333;
    margin-bottom: 0.1rem;
  }
  .receipts{
    font-size: 0.28rem;
    color: #999;
    margin: 0;
    }

  .product-detail{
    margin-top: 0.13rem;
    background-color: #ffffff;
    font-size: 0.26rem;
    padding-left: 0.3rem;
  }
  .product-detail div{
    display: flex;
    justify-content: center;
    height: 1.3rem;
    border-bottom: 1px solid #e8e8e8;
  }
  .messages,.price{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .messages dt{
    color: #333;
    padding-right: 0.7rem;
  }
  .messages dd{
    margin: 0;
    color: #666;
  }
  .messages{
    width: 80%;
    text-align: left;
  }
  .price{
    width: 20%;
    text-align: center;
  }
  .bill{
    margin-top: 0.12rem;
    background-color: #ffffff;
    padding-left: 0.3rem;
  }
  .client{
    height: 0.8rem;
    border-bottom: 1px solid #e8e8e8;
    padding-top: 0.3rem;
    font-size: 0.3rem;
    text-align: left;
  }
  .bill-detail{
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    font-size: 0.28rem;
    padding-bottom: 0.3rem;
  }
  .bill-detail div{
    margin-top: 0.3rem;
    display: flex;
    justify-content: flex-start;
  }
  .bill-msg{
    width: 19%;
    text-align: right;
    color: #999;
  }
  .total{
    font-size: 0.28rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
</style>
