<template>
  <div class="header-12">
    <!-- header -->
    <div class="header-2">
      <!-- @click="sheetVisible = true" 底部弹出框选按钮 -->
      <span class="font">库存<i class="back" @click="goback()"></i> <i class="more"></i></span>
    </div>
    <!-- 内容导航条 -->
    <mt-navbar class="page-part" v-model="selecteds">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">饱和</mt-tab-item>
      <mt-tab-item id="3">缺货</mt-tab-item>
      <mt-tab-item id="4">临期</mt-tab-item>
    </mt-navbar>
    <!-- 内容区域-->
    <div class="containerIos">
      <mt-tab-container v-model="selecteds">
        <mt-tab-container-item id="1">
          <div class="itemList" v-for="(item,index) in Products" v-if='item.HideType == "1" ' @click="goto(item,index)">
            <div class="List">
              <p class="listHead">{{item.Name}}</p>
              <p class="listBody">
                <span>&yen;&nbsp;{{item.Price}}/{{item.Unit}}</span>
                <span class="Code">条码 ：{{item.Barcode}}</span>
                <span class="stock"  v-if="item.StockWarning == 2">缺货</span>
                <span class="postpone" v-if="item.AdventWarning == 1">临期</span>
              </p>
              <p class="listFoot">
                <span class="Num">{{item.Stock}}</span>
                <span class="piece">{{item.Unit}}</span>
                <span class="Unit">{{item.str}}</span>
              </p>
              <i class="goTo"></i>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="itemList" v-for="(item,index) in Products" v-if='item.HideType == "1"&&item.StockWarning == "1" ' @click="goto(item,index)">
            <div class="List">
              <p class="listHead">{{item.Name}}</p>
              <p class="listBody">
                <span>&yen;&nbsp;{{item.Price}}/{{item.Unit}}</span>
                <span class="Code">条码 ：{{item.Barcode}}</span>
                <span class="stock"  v-if="item.StockWarning == 2">缺货</span>
                <span class="postpone" v-if="item.AdventWarning == 1">临期</span>
              </p>
              <p class="listFoot">
                <span class="Num">{{item.Stock}}</span>
                <span class="piece">{{item.Unit}}</span>
                <span class="Unit">{{item.str}}</span>
              </p>
              <i class="goTo"></i>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="itemList" v-for="(item,index) in Products" v-if='item.HideType == "1"&&item.StockWarning == "2" ' @click="goto(item,index)">
            <div class="List">
              <p class="listHead">{{item.Name}}</p>
              <p class="listBody">
                <span>&yen;&nbsp;{{item.Price}}/{{item.Unit}}</span>
                <span class="Code">条码 ：{{item.Barcode}}</span>
                <span class="stock"  v-if="item.StockWarning == 2">缺货</span>
                <span class="postpone" v-if="item.AdventWarning == 1">临期</span>
              </p>
              <p class="listFoot">
                <span class="Num">{{item.Stock}}</span>
                <span class="piece">{{item.Unit}}</span>
                <span class="Unit">{{item.str}}</span>
              </p>
              <i class="goTo"></i>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div class="itemList" v-for="(item,index) in Products" v-if='item.HideType == "1"&&item.StockWarning == "3" ' @click="goto(item,index)">
            <div class="List">
              <p class="listHead">{{item.Name}}</p>
              <p class="listBody">
                <span>&yen;&nbsp;{{item.Price}}/{{item.Unit}}</span>
                <span class="Code">条码 ：{{item.Barcode}}</span>
                <span class="stock"  v-if="item.StockWarning == 2">缺货</span>
                <span class="postpone" v-if="item.AdventWarning == 1">临期</span>
              </p>
              <p class="listFoot">
                <span class="Num">{{item.Stock}}</span>
                <span class="piece">{{item.Unit}}</span>
                <span class="Unit">{{item.str}}</span>
              </p>
              <i class="goTo"></i>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 模态框选择器 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancel-text=""></mt-actionsheet>
  </div>
</template>
<script>
  import getData from '../../assets/Data';
  import { Toast } from 'mint-ui';
  var md5 = require('md5');
  export default {
    name: 'header',
    data() {
      return {
        selecteds: '1',
        sheetVisible: false,
        actions: [],
        Products:[],
      }
    },
    computed:{

    },
    created(){
      this.names = localStorage.getItem('Name');
      //获取周月销售金额排行
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
      this.$http({
        method:'post',
        url:'https://api.yongdaoyun.com/special/pet/commodity/commodity_item_info.php',
        data:{
          "store_id":localStorage.getItem('storeId'),
          "system_id":85916832,
          "timestamp":time,
          "sign":signValue,
          "data":{

          }
        }
      }).then( res =>{
        console.log(res);
        this.Products = res.data.data;

        let str = [];
        const fn = (obj) => {
          let aaa = "";
          for( let prop in obj ){
            aaa += `${prop}:${obj[prop]},`;
          }
          return aaa.slice(0,aaa.length - 1 );
        };
        this.Products.forEach(item => {
          item.str = fn(JSON.parse(item.Sku));
        });
      }).catch( err =>{
        console.log(err)
      })
    },
    methods: {
      goback(){
      this.$router.go(-1)
      },
      storage() {
        this.$router.push({path:'/Producthtml/Put-in-storage'})
      },
      stock() {
//        this.$router.push({path:'/Producthtml/Stock'})
        Toast({
          message: '该页面功能正在开发..',
          duration: 2000,
          className:'ok'
        })
      },
      allot() {
//        this.$router.push({path:'/Producthtml/Allot'})
        Toast({
          message: '该页面功能正在开发..',
          duration: 2000,
          className:'ok'
        })
      },
      goto(item,index){
        console.log(item)
        this.$router.push({path:'/Producthtml/ProductDetail',query:{plan:item}})
      }
    },
    mounted() {
      this.actions = [
        {
          name: '入库单',
          method: this.storage
        },
        {
          name: '总部进货请求',
          method: this.stock
        },
        {
          name: '总部调拨单',
          method: this.allot
        }
      ]
    }
  }
</script>
<style scoped>
  .header-12{
    overflow: auto;
    height: 100%;
  }
  .header-2 {
    background-color: #4A505F;
    height: 0.824rem;
    line-height: 0.664rem;
    padding-top: 0.176rem;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .back {
    display: inline-block;
    width: 0.23rem;
    height: 0.38rem;
    background: url("../../../static/img/01_033.png") no-repeat;
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
  .more {
    display: inline-block;
    width: 0.48rem;
    height: 0.2rem;
    background: url("../../../static/img/dian2.png") 50% 50% no-repeat;
    background-size: cover;
    position: absolute;
    top: 40%;
    right: 5%;
  }

  .page-part {
    position: fixed;
    top: 1.0rem;
    left: 0px;
    right: 0px;
    z-index: 1;
    font-size: 0.3rem;
    color: #999;
    height: 0.88rem;
    line-height: 0.88rem;
  }

  .containerIos {
    margin-top: 2.09rem;
    margin-bottom: 1rem;
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
    width: 80%;
  }

  .item-second {
    text-align: right;
    width: 18%;
  }
  .item-second dd{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .unit {
    font-size: 0.24rem;
    color: #999999;
  }

  /*.item-thirdly {*/
    /*margin-left: 0.9375rem;*/
  /*}*/

  .item-thirdly i {
    display: inline-block;
    width: 0.75rem;
    height: 100%;
    background: url("../../../static/img/jiantou.png") 50% 50% no-repeat;
    background-size: 50%;
  }
  .stock{
    background-color: #f20202;
    color: #ffffff;
    padding: 0px 6px;
    font-size: 0.22rem;
    border-radius: 5px;
  }
  .postpone{
    background-color: #444444;
    color: #ffffff;
    padding: 0px 6px;
    font-size: 0.22rem;
    border-radius: 5px;
  }

  .itemList{
    margin-left: 0.3rem;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
    position: relative;
    border-bottom: 1px solid #e8e8e8;
  }
  .itemList p{
    margin: 0;
  }
  .List{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 94%;
  }
  .listHead,.listBody,.listFoot{
    display: table-cell;
    text-align: left;
  }
  .listHead{
    font-size: 0.3rem;
    word-break: break-all;
    color: #333;
    padding-top: 0.25rem;
  }
  .listBody{
    font-size: 0.24rem;
    color: #999999;
    padding-top: 0.15rem;
  }
  .Code{
    margin-left: 0.15rem;
    margin-right: 0.15rem;
  }
  .listFoot{
    padding-top: 0.28rem;
    padding-bottom: 0.25rem;
    font-size: 0.24rem;
  }
  .Unit{
    margin-left: 0.15rem;
  }
  .Num{
    color: #ff6633;
    font-size: 0.3rem;
  }
  .piece{
    color: #ff6633;
    font-size: 0.24rem;
  }
  .goTo{
    display: inline-block;
    width: 0.75rem;
    height: 100%;
    background: url("../../../static/img/jiantou.png") 50% 50% no-repeat;
    background-size: 50%;
    position: absolute;
    top:0;
    right: 2%;
  }
</style>
<style>
  .header-12 .mint-navbar .mint-tab-item,.mint-tab-item{
    padding: 0;
  }
  .header-12 .mint-tab-item-label{
    line-height: inherit;
    margin: 0;
  }
  .header-12 .mint-navbar .mint-tab-item.is-selected{
    margin-bottom: 0px;
  }
</style>
