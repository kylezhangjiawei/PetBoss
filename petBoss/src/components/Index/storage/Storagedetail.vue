<template>
    <div class="header">
      <!--页头信息-->
      <div class="header-2">
        <span class="back" @click="goback()"><i></i></span>
        <span class="font">详情</span>
      </div>
      <!-- 货单详情 -->
      <div class="storage-list">
        <div>
          <span class="title">单号&nbsp;:&nbsp;</span>
          <span>{{datas.SupplierNumber}}</span>
        </div>
        <div>
          <span class="title">入库时间&nbsp;:&nbsp;</span>
          <span>{{datas.AddDate}}</span>
        </div>
        <div>
          <span class="title">供应商&nbsp;:&nbsp;</span>
          <span>{{datas.Supplier}}</span>
        </div>
        <div>
          <span class="title">总价&nbsp;:&nbsp;</span>
          <span>&yen;&nbsp;{{datas.AllPrice}}</span>
        </div>
      </div>
      <!-- 货物详情 -->
      <div class="headline">货物详情</div>
      <div class="container">
        <div class="list-one" v-for="(item,index) in datas.commodity_info">
          <div class="list-item">
            <div class="item-first">
              <dt>{{item.Name}}</dt>
              <dd>&yen;{{item.Price}}/{{item.Unit}} &nbsp;条码:{{item.Barcode}}</dd>
            </div>
            <div class="item-second">
              <dt>{{item.Price}}<span class="unit">{{item.Unit}}</span></dt>
              <dd>{{item.Sku}}</dd>
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
      data(){
        return{
          datas:''
        }
      },
      created(){
        this.detail();
      },
      methods:{
        goback(){
          this.$router.go(-1)
        },
//        上一页点击后传过来的数据
        detail(){
          this.datas = this.$route.query.plan;
          console.log(this.datas)
        }
      }
    }
</script>
<style scoped>
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
    border-bottom: 1px solid #e8e8e8;
  }

  .list-item {
    text-align: left;
    height: 100%;
    line-height: 2;
    display: flex;
    justify-content: flex-start;
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
    width: 60%;
  }

  .item-second {
    text-align: right;
    width: 18%;
  }

  .unit {
    font-size: 0.24rem;
    color: #999999;
  }

  .item-thirdly {
    margin-left: 0.9375rem;
  }

  .item-thirdly i {
    display: inline-block;
    width: 0.75rem;
    height: 100%;
    background: url("../../../../static/img/jiantou.png") 50% 50% no-repeat;
    background-size: 60%;
  }
  .footer {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
</style>
