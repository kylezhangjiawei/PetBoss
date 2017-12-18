<template>
    <div class="header">
      <!--页头信息-->
      <div class="header-2">
        <span class="back" @click="goback()"><i></i></span>
        <span class="font">发起进货请求</span>
      </div>
      <!-- 选择供应商 -->
      <div class="supplier">
        <span class="font-left">供应商</span>
        <span class="font-center">请选择</span>
        <span class="font-right"><i></i></span>
      </div>
      <!-- 选择进货商品 -->
      <div class="headline">选择进货商品</div>
      <!-- 商品选择 -->
      <!--<div class="container">-->
        <!--<div class="product">-->
          <!--<div class="part-one">-->
            <!--<dt>XXX狗粮</dt>-->
            <!--<dd>&yen;20/件 &nbsp;条码:123456789</dd>-->
          <!--</div>-->
          <!--<div class="part-two">-->
              <!--<span><i class="icon-add"></i></span>-->
              <!--<span class="num">100</span>-->
              <!--<span><i class="icon-subtract"></i></span>-->
              <!--<span><i class="icon-delect"></i></span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="product">-->
          <!--<div class="part-one">-->
            <!--<dt>XXX狗粮xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</dt>-->
            <!--<dd>&yen;20/件 &nbsp;条码:123456789</dd>-->
          <!--</div>-->
          <!--<div class="part-two">-->
            <!--<span><i class="icon-add"></i></span>-->
            <!--<span class="num">100</span>-->
            <!--<span><i class="icon-subtract"></i></span>-->
            <!--<span><i class="icon-delect"></i></span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="product">-->
          <!--<span class="icon-adds"><i></i></span>-->
          <!--<span class="text">添加商品</span>-->
        <!--</div>-->
      <!--</div>-->
      <div class="containers">
        <div class="titles">
          <p class="headMsg">毛发润泽专用剂 猫犬通用 170ml</p>
          <p class="bodyMsg">
            <span class="Num">&yen;&nbsp;220/瓶</span>
            <span>条码 : 89999457122</span>
          </p>
        </div>
        <div class="operation">
          <span class="subtract"></span>
          <span class="showNum">20</span>
          <span class="add"></span>
          <span class="delet"></span>
        </div>
      </div>
      <div class="product">
      <span class="icon-adds"><i></i></span>
      <span class="text">添加商品</span>
      </div>
      <!-- 确定按钮 -->
      <div class="btn">
        <button class="btn-style" type="button" @click="ok()">确定</button>
      </div>
    </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import {MessageBox} from 'mint-ui';
    export default {
      name:'header',
      data(){
        return{

        }
      },
      methods:{
        goback(){
          MessageBox.confirm('还未保存发布，确定取消此次操作？','').then(action => {
            if (action = 'confirm'){
              this.$router.go(-1)
            }
          }).catch(err =>{
            console.log(err)
          })

        },
        ok(){
          Toast({
            message: '发起成功',
            className: 'ok'
          })
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

  .supplier{
    height: 0.9rem;
    background-color: #ffffff;
    margin-top: 0.3rem;
    font-size: 0.3rem;
    display: flex;
    justify-content: flex-start;
    line-height: 3;
  }
  .supplier span {
    display: inline-block;
  }
  .font-left{
    color: #333333;
    width: 25%;
    padding-left: 0.3rem;
    text-align: left;
  }
  .font-center{
    color: #cccccc;
    width: 65%;
    text-align: left;
  }
  .font-right{
    width: 5%;
  }
  .font-right i{
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url("../../../../static/img/jiantou.png") 50% 50% no-repeat;
    background-size: contain;
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
  .product {
    padding-left: 0.3rem;
    display: flex;
    justify-content: flex-start;
    font-size: 0.3rem;
    background-color: #ffffff;
    height: 1.1rem;
    line-height: 2;
  }
  dt{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  dd{
    margin: 0;
    font-size: 0.26rem;
    color: #A6A6A6;
  }
  .part-one{
    text-align: left;
    width: 50%;
  }
  .part-two{
    display: flex;
    justify-content: flex-start;
    width: 50%;
  }
  .part-two span{
    width: 25%;
  }
  .icon-add{
    display: inline-block;
    height: 100%;
    width: 0.48rem;
    background: url("../../../../static/img/jianhao.png")50% 50% no-repeat;
    background-size: contain;
  }
  .num{
    padding-top: 0.35rem;
  }
  .icon-subtract{
    display: inline-block;
    height: 100%;
    width: 0.48rem;
    background: url("../../../../static/img/jiahao.png")50% 50% no-repeat;
    background-size: contain;
  }
  .icon-delect{
    display: inline-block;
    height: 100%;
    width: 0.48rem;
    background: url("../../../../static/img/lajitong.png")50%  65% no-repeat;
    background-size: contain;
  }
  .icon-adds i{
    display: inline-block;
    height: 100%;
    width: 0.48rem;
    background: url("../../../../static/img/xuxianjiahao.png")50% 50% no-repeat;
    background-size: contain;
  }
  .text{
    padding-top: 0.25rem;
    margin-left: 0.3rem;
  }
  .btn{
    height: 0.94rem;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }
  .btn-style{
    width: 90%;
    height: 0.7rem;
    background-color: #FF6630;
    border: none;
    border-radius: 8px;
    outline: none;
    font-size: 0.3rem;
    color: #ffffff;
    margin-top: 0.12rem;
  }
  .containers{
    border-bottom: 1px solid #e8e8e8;
  }
  .titles{
    background-color: #ffffff;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }
  .titles p{
    margin: 0;
    text-align: left;
  }
  .headMsg{
    font-size: 0.3rem;
    color: #333333;
    padding-top: 0.25rem;
  }
  .bodyMsg{
    font-size: 0.24rem;
    color: #999999;
    padding-bottom: 0.25rem;
  }
  .Num{
    margin-right: 0.15rem;
  }
  .operation{
    background-color:#f7f9ff ;
    display: flex;
    height: 0.73rem;
    padding-top: 0.17rem;
    justify-content: center;
    position: relative;
  }
  .operation span{
    display: inline-block;
  }
  .showNum{
    width: 2rem;
    height: 0.55rem;
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    font-size: 0.34rem;
    line-height: 0.55rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
  }
  .subtract{
    width: 0.55rem;
    height: 0.55rem;
    background: url("../../../../static/img/amount_less_icon.png")50% 50% no-repeat;
    background-size: cover;
  }
  .add{
    width: 0.55rem;
    height: 0.55rem;
    background: url("../../../../static/img/amount_plus_icon.png")50% 50% no-repeat;
    background-size: cover;
  }
  .delet{
    width: 0.4rem;
    height: 0.4rem;
    background: url("../../../../static/img/del_icon.png") no-repeat;
    background-size: cover;
    position: absolute;
    top:30%;
    right: 8%;
  }
</style>
