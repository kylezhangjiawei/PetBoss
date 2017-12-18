<template>
  <div class="header13">
    <!-- header  -->
    <div class="header-2">
      <span class="font">会员卡设置
        <i class="back" @click="goback()"></i></span>
    </div>
    <!-- 自有会员卡，总部会员卡-->
    <mt-navbar class="page-part" v-model="selecteds">
      <mt-tab-item id="1">自有会员卡</mt-tab-item>
      <mt-tab-item id="2">总部会员卡</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selecteds" class="lister">
      <mt-tab-container-item id="1">
        <!-- 新增会员卡 -->
        <div class="add-card" @click="goAddMemberCard()">&#43;新增会员卡 <span class="colors"> &#40;<span
          class="have">{{length}}</span>&#47;<span class="all">10</span>&#41;</span></div>
        <!-- VIP卡详情-->
        <div class="pet-vipcard" @click="gomemberCardDetail(items,index)" v-for="(items,index) in Datas" :style="{ backgroundColor:items.ColorValue}">
          <div class="background">
            <div class="card-name">
              <dt>{{items.Title}}</dt>
              <dd>最低储值{{items.Amount}}元&nbsp;|&nbsp;卡费10元</dd>
            </div>
            <div class="fathers">
              <div class="card-discount" v-if="items.GoodsDiscount != 10 ">
                <!--{{items.GoodsDiscount}}&nbsp;<span class="size">折</span>-->
                <dt>{{items.GoodsDiscount}}</dt>
                <dd>产品折扣</dd>
              </div>
              <div class="card-discount" v-if=" items.ServiceDiscount != 10">
                <!--{{items.GoodsDiscount}}&nbsp;<span class="size">折</span>-->
                <dt>{{items.ServiceDiscount}}</dt>
                <dd>服务折扣</dd>
              </div>
            </div>

          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!--&lt;!&ndash; VIP卡详情&ndash;&gt;-->
        <!--<div class="pet-vipcard" @click="goBlockupCard()" style="background-color:#4fa0c8">-->
          <!--<div class="background">-->
            <!--<div class="card-name">-->
              <!--<dt>宠物洗护VIP卡</dt>-->
              <!--<dd>最低储值500元&nbsp;|&nbsp;卡费10元</dd>-->
            <!--</div>-->
            <!--<div class="card-discount">-->
              <!--7.5&nbsp;<span class="size">折</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div>
          <img src="../../../../static/img/main_empty.png" alt="开发中" style="width: 4.8rem;height: 2.34rem">
          <p style="font-size: 0.2rem">努力开发中，尽情期待...</p>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import getData from '../../../assets/Data';
  var md5 = require('md5');
  export default {
    name: 'header5',
    data() {
      return {
        selecteds: '1',
        Datas:[],
        length:''
      }
    },
    created(){
      let time = Date.parse(new Date()).toString().substring(0,10);
      let objs = {
        system_id:85916832,
        timestamp:time,
        store_id:localStorage.getItem('storeId')
      };
      let sortStr=getData(objs);
      let strings="";
      let key = localStorage.getItem('Key');
      for(let i in sortStr){
        strings+=i+"="+sortStr[i] + "&"
      }
      //拼接秘钥
      strings+="key"+"="+key;
      //加密后的字符串
      let signValue = md5(strings).toUpperCase();
      //会员卡查询接口
      this.$http({
        method:'post',
        url:'https://api.yongdaoyun.com/special/pet/card_item_select.php',
        data:{
          "store_id":localStorage.getItem('storeId'),
          "system_id":85916832,
          "timestamp":time,
          "sign":signValue,
          "data":{

          }
        }
      }).then( res =>{
        this.Datas = res.data.data;
        this.length = res.data.data.length;
        console.log(this.Datas)
      }).catch( err =>{
        console.log(err)
      })
    },
    methods: {
      goback() {
        this.$router.go(-1)
      },
      gomemberCardDetail(items,index) {
        this.$router.push({path: '/Index/Myshop/MembershipCard/MemberCardDetail' , query:{ plan: items.UseType}});
        localStorage.setItem('cardid',items.CardId);
        this.$store.dispatch('cardDatas',items)
      },
      goAddMemberCard() {
        this.$router.push({path: '/Index/Myshop/MembershipCard/AddMemberCard'})
      },
      goBlockupCard(){
        this.$router.push({path: '/Index/Myshop/MembershipCard/BlockupCard'})
      }
    }
  }
</script>
<style scoped>
  .header13 {
    height: 100%;
  }

    .header-2 {
    background-color: #4A505F;
    height: 0.824rem;
    line-height: 0.664rem;
    padding-top: 0.176rem;
    position: fixed;
      left: 0;
      right: 0;
      z-index: 1;
      top: 0;
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

  .page-part {
    font-size: 0.3rem;
    color: #999;
    height: 0.88rem;
    line-height: 0.88rem;
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index: 1;
    margin-top: 1rem;
  }

  .lister {
    margin-top: 0.3rem;
  }

  .add-card {
    height: 1.0rem;
    font-size: 0.3rem;
    color: #ff6633;
    line-height: 1.0rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    background-color: #ffffff;
    border: 1px dashed #F89071;
    border-radius: 8px;
  }

  .colors {
    color: #999;
  }

  .have {
    color: #333;
    font-size: 0.26rem;
  }

  .all {
    font-size: 0.26rem;
  }

  .pet-vipcard {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    height: 1.2rem;
    margin-top: 0.3rem;
    border-radius: 8px;
  }

  .background {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    background: url("../../../../static/img/beijingwenli.png") 100% 50% no-repeat;
  }

  .card-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.32rem;
    color: #fff;
    text-align: left;
    padding-left: 0.2rem;
    width: 50%;
  }

  .card-name dt {
    margin-bottom: 0.16rem;
  }

  .card-name dd {
    margin: 0;
    font-size: 0.22rem;
  }

  .card-discount {
    font-size: 0.42rem;
    color: #fff;
    width: 35%;
    text-align: center;
    line-height: 1.75;
    display: inline-block;
  }
  .card-discount dd{
    font-size: 0.2rem;
    margin-left: 0;
  }
  .fathers{
    width: 45%;
    text-align: right;
  }
  .size {
    font-size: 0.24rem;
  }
</style>
<style>
  .header13 .mint-tab-container-item {
    background-color: #EFEFEF;
  }
  .header13 .mint-navbar .mint-tab-item,.mint-tab-item{
    padding: 0;
  }
  .header13 .mint-tab-item-label{
    line-height: inherit;
    margin: 0;
  }
  .header13 .mint-navbar .mint-tab-item.is-selected{
    margin-bottom: 0px;
  }
  .header13 .mint-tab-container-wrap{
    margin-top: 1.804rem;
  }
</style>
