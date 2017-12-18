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
      <span class="lastName">{{cardDatas.Title}}</span>
    </div>
    <!-- 内容详情 -->
    <div class="container">
      <div class="article-one">
        <span class="price">售价</span>
        <span class="num">{{cardDatas.Price}}</span>
      </div>
      <div class="article-one">
        <span class="price">最低储值</span>
        <span class="num">{{cardDatas.Amount}}</span>
      </div>
      <div class="article-one">
        <span class="price">最低积分</span>
        <span class="num">{{cardDatas.Integral}}</span>
      </div>
    </div>
    <!-- 会员权益 -->
    <div class="member-equity">
      <!-- 会员折扣 -->
      <div class="member-discount">
        <span class="discount">会员权益</span>
        <span class="discount-icon"><span><i></i></span>会员折扣</span>
      </div>
      <!-- 折扣显示 -->
      <div class="zhekou">
      <div class="integral-double-two">
        <span class="item-one"><span><i></i></span>产品</span>
        <span class="item-two">{{cardDatas.GoodsDiscount}}</span>
        <span class="item-three">折</span>
      </div>
      <div class="integral-double-two">
        <span class="item-one"><span><i></i></span>服务</span>
        <span class="item-two">{{cardDatas.ServiceDiscount}}</span>
        <span class="item-three">折</span>
      </div>
      <div class="integral-double-two">
        <span  :class="{distanceActive:distanceactive,distance:distance}"><i :class="{distanceIcon:distanceicon}"></i></span>
        <span>适用于储值支付</span>
      </div>
    </div>
      <!-- 积分加倍 -->
      <div class="integral-double">
        <div class="integral-double-one"><span><i></i></span> 积分加倍</div>
        <div class="integral-double-two">
          <span class="item-one"><span><i></i></span>积分加倍</span>
          <span class="item-two">{{cardDatas.Multiple}}</span>
          <span class="item-three">倍</span>
        </div>
      </div>
    </div>
    <!--卡颜色 -->
    <div class="card-color">
      <span class="card-color-title"><span>卡颜色</span></span>
      <span class="diamonds"><i :style="{backgroundColor : cardDatas.ColorValue}"></i></span>
      <span class="back-icon"><i></i></span>
    </div>
    <!-- 提示信息 -->
    <div class="hint">
      <div class="hint-msg">
        <span class="hint-head">操作提示</span>
        <span class="hint-body">{{cardDatas.Notice}}</span>
        <span class="hint-back-icon"><i></i></span>
      </div>
      <div class="hint-msg">
        <span class="hint-head">特权说明</span>
        <span class="hint-body">{{cardDatas.Prerogative}}</span>
        <span class="hint-back-icon"><i></i></span>
      </div>
      <div class="hint-msg">
        <span class="hint-head">使用须知</span>
        <span class="hint-body">{{cardDatas.Description}}</span>
        <span class="hint-back-icon"><i></i></span>
      </div>
    </div>
    <!-- 修改 删除 按钮-->
    <div class="btn">
      <span class="change" @click="goChangeCard()">修改</span>
      <span class="delete" @click="delect()">删除</span>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import {MessageBox} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import getData from '../../../assets/Data';
  var md5 = require('md5');
    export default {
      name:'MemberCardDetail',
      data(){
        return{
          distanceactive:false,
          distance:true,
          distanceicon:false
        }
      },
      computed:{
        ...mapGetters([
          'cardDatas'
        ])
      },
      created(){
        if( this.$route.query.plan == '1' ){
          this.distanceactive = true;
          this.distance = false;
          this.distanceicon =true;
        }
      },
      methods:{
        goback(){
          this.$router.go(-1);

        },
        goChangeCard(){
          this.$router.push({path:'/Index/Myshop/MembershipCard/ChangeCard', query:{ plan : this.cardDatas.CardId}})
        },
        delect() {
          MessageBox.confirm('确定删除当前会员卡?', '').then(action => {
            if (action == 'confirm') {
              //删除员工
              let time = Date.parse(new Date()).toString().substring(0, 10);
              let objs = {
                system_id: 85916832,
                timestamp: time,
                store_id: localStorage.getItem('storeId')
              };
              let sortStr = getData(objs);
              let strings = "";
              let key = localStorage.getItem('Key');
              for (let i in sortStr) {
                strings += i + "=" + sortStr[i] + "&"
              }
              //拼接秘钥
              strings += "key" + "=" + key;
              //加密后的字符串
              let signValue = md5(strings).toUpperCase();
              this.$http({
                method: 'post',
                url: 'https://api.yongdaoyun.com/special/pet/card_item_del.php',
                data: {
                  "store_id": localStorage.getItem('storeId'),
                  "system_id": 85916832,
                  "timestamp": time,
                  "sign": signValue,
                  "data": {
                    card_id:localStorage.getItem('cardid')
                  }
                }
              }).then(res => {
                console.log(res);
                if (res.data.err_code == "0000") {
                  Toast({
                    message: '删除成功',
                    className: 'ok'
                  })
                  this.$router.push({path: '/Index/Myshop/MembershipCard'})
                } else {
                  Toast({
                    message: '出错啦！',
                    className: 'ok'
                  })
                }

              }).catch(err => {
                console.log(err)
              })
            }
            console.log('yes')
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
  .price,.firstName{
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
  .zhekou{
    border-bottom: 1px solid #e8e8e8;
  }
  .member-discount{
    min-height: 0.92rem;
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
    background-color: #ef8700;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.16rem;
    position: relative;
  }
  .discount-icon span i{
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url("../../../../static/img/gouxuanfuben.png")no-repeat;
    position: absolute;
    top:25%;
    right: 25%;
    background-size: cover;
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
    margin-right: 0.525rem;
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
    border-radius: 6px;
    margin-right: 0.16rem;
  }
  .card-color-title{
    width: 84%;
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
 /* .hint-back-icon{
    padding-top: 0.375rem;
  }*/
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
  .change,.delete{
    display: inline-block;
    height: 0.72rem;
    width: 3.216rem;
    border: 1px solid #a8a8a8;
    font-size: 0.34rem;
    line-height: 2;
    margin-top: 0.1rem;
    border-radius: 8px;
  }
  .change{
    margin-right: 0.15rem;
  }


  .distanceActive{
    margin-top: 0.26rem;
    margin-left: 0.6rem;
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #349946;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.16rem;
    position: relative;
    border: 1px solid #DDDDDD;
  }
  .distance{
    margin-top: 0.26rem;
    margin-left: 0.6rem;
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #ffffff;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.16rem;
    position: relative;
    border: 1px solid #DDDDDD;
  }
  .distanceIcon{
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url("../../../../static/img/gouxuanfuben.png")no-repeat;
    position: absolute;
    top:25%;
    right: 25%;
    background-size: cover;
  }
</style>
