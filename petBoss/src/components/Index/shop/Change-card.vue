<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">修改会员卡
        <i class="back" @click="goback()"></i></span>
    </div>
    <!-- 会员卡名称 -->
    <div class="card-name">
      <span class="firstName">&lowast;会员卡名称</span>
      <input type="text" class="num" v-model="cardData.title">
    </div>
    <!-- 内容详情 -->
    <div class="container">
      <div class="article-one">
        <span class="price">&lowast;售价</span>
        <input type="number" class="num" v-model="cardData.price">
      </div>
      <div class="article-one">
        <span class="price">&lowast;最低储值</span>
        <input type="number" class="num" v-model="cardData.amount">
      </div>
      <div class="article-one">
        <span class="price">&lowast;最低积分</span>
        <input type="number" class="num" placeholder="请输入最低积分" v-model="cardData.integral">
      </div>
    </div>
    <!-- 会员权益 -->
    <div class="member-equity">
      <!-- 会员折扣 -->
      <div class="member-discount">
        <div class="discount-one">
          <span class="discount">&lowast;会员权益</span>
          <span class="discount-icon"><span :class="{itsBackground:isbackground,active:isactive}" @click="discountStyle()"><i :class="{itsBackIcon:isicon}"></i></span>会员折扣</span>
        </div>

        <!-- 弹出框 -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="modal">
            <div class="integral-double-two">
              <span class="item-one"><span><i></i></span>产品</span>
              <input type="number" class="integral-num" v-model="cardData.goods_discount" oninput="if(value.length>1)value=value.slice(0,1)" >
              <span class="item-three">折</span>
            </div>
            <div class="integral-double-two">
              <span class="item-one"><span><i></i></span>服务</span>
              <input type="number" class="integral-num" v-model="cardData.service_discount">
              <span class="item-three">折</span>
            </div>
            <div class="integral-double-two">
              <span  :class="{distanceActive:distanceactive,distance:distance}" @click="distanceStyle()"><i :class="{distanceIcon:distanceicon}"></i></span>
              <span>适用于储值支付</span>
            </div>
          </div>
        </transition>
      </div>
      <!-- 积分加倍 -->
      <div class="integral-double">
        <div class="integral-double-one"><span :class="{doubleBackground:doubleback,doubleActive:doubleactive}" @click="doubleStyle()"><i :class="{doubleIcon:doubleicon}"></i></span> 积分加倍</div>
        <transition name="slide-fade" mode="out-in">
          <div class="integral-double-two" v-if="modals">
            <span class="item-one"><span><i></i></span>积分加倍</span>
            <input type="number" class="item-two" v-model="cardData.multiple">
            <span class="item-three">倍</span>
          </div>
        </transition>
      </div>
    </div>
    <!--卡颜色 -->
    <div class="card-color" @click="goCardColor()">
      <span class="card-color-title"><span>&lowast;卡颜色</span></span>
      <span class="diamonds"><i :style="{backgroundColor:cardColors}"></i></span>
      <span class="back-icon"><i></i></span>
    </div>
    <!-- 提示信息 -->
    <div class="hint">
      <div class="hint-msg">
        <span class="hint-head">&lowast;操作提示</span>
        <input type="text" class="num hint-body" placeholder="使用时倾向工作人员出示卡号" v-model="cardData.notice">
        <span class="hint-back-icon"><i></i></span>
      </div>
      <div class="hint-msg">
        <span class="hint-head">&lowast;特权说明</span>
        <input type="text" class="num hint-body" placeholder="凭借此卡可享受会员卡带来的优惠等一系列活动" v-model="cardData.prerogative">
        <span class="hint-back-icon"><i></i></span>
      </div>
      <div class="hint-msg">
        <span class="hint-head">&lowast;使用须知</span>
        <input type="text" class="num hint-body" placeholder="会员卡仅限本人使用，不得转让，违者作废会员卡...." v-model="cardData.description">
        <span class="hint-back-icon"><i></i></span>
      </div>
    </div>
    <!-- 修改 删除 按钮-->
    <div class="btn" @click="changeCards()"><span>保存</span></div>
  </div>
</template>
<script>
  import getData from '../../../assets/Data'
  var md5 = require('md5');
  export default {
    name: 'changeCard',
    data() {
      return {
        isbackground: true,
        isicon: false,
        isactive: false,
        doubleback: true,
        doubleicon: false,
        doubleactive: false,
        distanceactive:false,
        distance:true,
        distanceicon:false,
        modal:false,
        modals:false,
        cardColors:'',
        cardData:{
          title:'',
          card_id:'',
          price:'',
          notice:'',
          prerogative:'',
          description:'',
          color:'',
          goods_discount:'',
          service_discount:'',
          use_type:'',
          multiple:'',
          amount:'',
          integral:''
        }
      }
    },
    activated(){
      if (!localStorage.getItem('cardColor')){
        this.cardColors = '#ef8700'
      }else {
        this.cardColors = localStorage.getItem('cardColor');
      }
      console.log(this.$route.query.plan);
      this.cardData.card_id = this.$route.query.plan
    },
    deactivated(){
      this.$destroy()
    },
    methods: {
      goback() {
        this.$router.go(-1)
      },
      goCardColor(){
        this.$router.push({path:'/Index/Myshop/MembershipCard/AddMemberCard/CartColor'})
      },
      goCardMsg(){
        this.$router.push({path:'/Index/Myshop/MembershipCard/AddMemberCard/CardMsg'})
      },
      discountStyle() {
        if (this.isbackground == true) {
          this.isbackground = false;
          this.isicon = true;
          this.isactive = true;
          this.modal = true;
        } else {
          this.isbackground = true;
          this.isicon = false;
          this.isactive = false;
          this.modal = false;
        }
      },
      doubleStyle() {
        if (this.doubleback == true) {
          this.doubleback = false;
          this.doubleicon = true;
          this.doubleactive = true;
          this.modals = true;
        } else {
          this.doubleback = true;
          this.doubleicon = false;
          this.doubleactive = false;
          this.modals = false;
        }
      },
      distanceStyle(){
        if (this.distance ==true){
          this.distance = false;
          this.distanceactive=true;
          this.distanceicon = true;
          this.cardData.use_type = 1;
        }else {
          this.distance = true;
          this.distanceactive=false;
          this.distanceicon = false;
          this.cardData.use_type = 0;
        }
      },
      changeCards(){
        this.cardData.color = localStorage.getItem('cardValue');
        let time = Date.parse(new Date()).toString().substring(0,10);
        let datas = {
          title:this.cardData.title,
          card_id:this.cardData.card_id,
          price:this.cardData.price,
          notice:this.cardData.notice,
          prerogative:this.cardData.prerogative,
          description:this.cardData.description,
          color:this.cardData.color,
          goods_discount:this.cardData.goods_discount,
          service_discount:this.cardData.service_discount,
          use_type:this.cardData.use_type,
          multiple:this.cardData.multiple,
          amount:this.cardData.amount,
          integral:this.cardData.integral
        };
        console.log(datas);
        let objs = {
          system_id:85916832,
          store_id:localStorage.getItem('storeId'),
          timestamp:time,
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
        this.$http({
          method:'post',
          url:'https://api.yongdaoyun.com/special/pet/card_item_update.php',
          data:{
            "store_id":localStorage.getItem('storeId'),
            "system_id":85916832,
            "timestamp":time,
            "sign":signValue,
            "data":datas
          }
        }).then( res =>{
          console.log(res)
          this.$router.push({path:'/Index/Myshop/MembershipCard'})
        }).catch( err => {
          console.log(err)
        })
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


  .card-name {
    height: 0.92rem;
    background-color: #ffffff;
    margin-top: 0.25rem;
    display: flex;
    justify-content: flex-start;
    padding-left: 0.3rem;
    font-size: 0.3rem;
    line-height:0.92rem;
  }


  .lastName {
    color: #999;
  }

  .container {
    background-color: #ffffff;
    padding-left: 0.3rem;
    margin-top: 0.22rem;
  }

  .article-one {
    height: 0.92rem;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e8e8e8;
    font-size: 0.3rem;
    line-height:0.92rem;
  }

  .price,.firstName {
    color: #333;
    width: 30%;
    text-align: left;
    line-height: 0.92rem;
    padding-top: 0.04rem;
  }

  .num {
    color: #666;
    border: none;
    outline: none;
    font-size: 0.3rem;
  }

  .member-equity {
    background-color: #ffffff;
    margin-top: 0.22rem;
    padding-left: 0.3rem;
  }

  .member-discount {
    min-height: 0.92rem;
    border-bottom: 1px solid #e8e8e8;
    font-size: 0.3rem;
    line-height:0.92rem;
  }

  .discount {
    width: 30%;
    text-align: left;
  }
  .discount-one{
    width: 100%;
    display: flex;
    justify-content: flex-start;
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
  .discount-icon {
    position: relative;
  }

  .itsBackground{
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #DDDDDD;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.16rem;
    position: relative;
  }
  .active{
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #349946;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.16rem;
    position: relative;
  }
  .itsBackIcon{
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url("../../../../static/img/gouxuanfuben.png")no-repeat;
    position: absolute;
    top:25%;
    right: 25%;
    background-size: cover;
  }

  .integral-double-one {
    height: 0.92rem;
    font-size: 0.3rem;
    line-height:0.92rem;
    padding-left: 30%;
    text-align: left;
  }
  .doubleBackground{
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #DDDDDD;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.09rem;
    position: relative;
  }
  .doubleActive{
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #349946;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.525rem;
    position: relative;
  }
  .doubleIcon {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url("../../../../static/img/gouxuanfuben.png")no-repeat;
    position: absolute;
    top:25%;
    right: 25%;
    background-size: cover;
  }

  .integral-double-two {
    height: 0.92rem;
    font-size: 0.3rem;
    margin-left: 30%;
    background-color: #f8f8f8;
    display: flex;
    justify-content: flex-start;
    line-height:0.92rem;
    color: #999;
  }

  .item-one span {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 6px;
    vertical-align: text-top;
    margin-right: 0.16rem;
    position: relative;
  }

  .item-two {
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
    border: none;
    outline: none;
    font-size: 0.3rem;
  }
  .integral-num{
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
    border: none;
    outline: none;
    font-size: 0.3rem;
  }

  .card-color {
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

  .diamonds i {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 6px;
    margin-right: 0.16rem;
  }

  .card-color-title {
    width: 85%;
    text-align: left;
  }

  .back-icon i {
    width: 0.32rem;
    height: 0.32rem;
    background: url("../../../../static/img/jiantou.png") 50% 50% no-repeat;
  }

  .hint {
    margin-top: 0.22rem;
    background-color: #ffffff;
    padding-left: 0.3rem;
  }

  .hint-msg {
    height: 0.92rem;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: flex-start;
    font-size: 0.3rem;
    line-height:0.92rem;
  }

  .hint-head, .hint-body, .hint-back-icon {
    /*display: flex;*/
    /*justify-content: center;*/
    /*flex-direction: column;*/
    display: inline-block;
  }

  .hint-head {
    text-align: left;
    width: 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 0.04rem;
  }

  .hint-body {
    text-align: left;
    width: 72%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

/*  .hint-back-icon {
    padding-top: 0.375rem;
  }*/

  .hint-back-icon i {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background: url("../../../../static/img/jiantou.png") 50% 50% no-repeat;
  }

  .btn {
    height: 0.94rem;
    background-color: #ffffff;
    margin-top: 0.1rem;
        display: flex;
    justify-content: center;
  }

  .btn span {
    display: inline-block;
    font-size: 0.34rem;
    color: #fff;
    height: 0.72rem;
    width: 6.9rem;
    background-color: #ff6733;
    margin-top: 0.1rem;
    line-height: 2;
    border-radius: 8px;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    transform: translate(0, -20px);
  }
</style>
