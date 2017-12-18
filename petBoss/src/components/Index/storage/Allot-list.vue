<template>
    <div class="header-12">
      <!-- header -->
      <div class="header-2">
        <span class="font">总部调拨单<i class="back" @click="goback()"></i> <i class="more" @click="sheetVisible = true"></i></span>
      </div>
      <!-- 内容导航条 -->
      <mt-navbar class="page-part" v-model="selecteds">
        <mt-tab-item id="1">进货</mt-tab-item>
        <mt-tab-item id="2">调货</mt-tab-item>
        <mt-tab-item id="3">退货</mt-tab-item>
      </mt-navbar>
      <!-- 内容区域-->
      <div class="containerAl">
        <mt-tab-container v-model="selecteds">
          <mt-tab-container-item id="1">
            <div class="list-one" @click="goto(item,index)" v-for="(item,index) in AllotList">
              <div class="list-item">
                <div class="item-first">
                  <dt>{{item.AddDate}}</dt>
                  <dd>供应商&nbsp;:&nbsp;{{item.Supplier}}&nbsp; 单号&nbsp;:&nbsp;{{item.SupplierNumber}}</dd>
                </div>
                <div class="item-second">
                  <dt>&yen;{{item.AllPrice}}</dt>
                  <dd></dd>
                </div>
                <div class="item-thirdly"><i></i></div>
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
  import getData from '../../../assets/Data'
  var md5 = require('md5');
  import {Toast} from 'mint-ui';
    export default {
      name:'header',
      data(){
        return{
          selecteds:'1',
          sheetVisible: false,
          actions: [],
          AllotList:[]
        }
      },
      created(){
        this.getAllotList();
      },
      methods:{
        goto(item,index){
          console.log(item)
          this.$router.push({path:'/Producthtml/Put-in-storage/Storagedetail',query:{plan:item}})
        },
        goback(){
          this.$router.go(-1)
        },
        storage() {
          this.$router.push({path:'/Producthtml/Put-in-storage'})
        },
        stock() {
          this.$router.push({path:'/Producthtml/Stock'})
        },
        allot() {
          this.$router.push({path:'/Producthtml/Allot'})
        },
//        获取总部调拨单页面数据
        getAllotList(){
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
            url:'https://api.yongdaoyun.com/special/pet/boss/boss_hq_select_order.php',
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
            if(res.data.err_code === "0000"){
              this.AllotList = res.data.data;
            }else {
              Toast({
                message: '数据获取失败',
                duration: 2000,
                className:'ok'
              })
            }
          }).catch( err =>{
            console.log(err)
          })
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
    background: url("../../../../static/img/01_033.png") no-repeat;
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
    background: url("../../../../static/img/dian2.png") 50% 50% no-repeat;
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

  .containerAl {
    margin-top: 2.09rem;
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
    margin-bottom: 0.1rem;

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
    width: 22%;
  }

  .unit {
    font-size: 0.24rem;
    color: #999999;
  }

  .item-thirdly i {
    display: inline-block;
    width: 0.5rem;
    height: 100%;
    background: url("../../../../static/img/jiantou.png") 50% 45% no-repeat;
    background-size: contain;
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
