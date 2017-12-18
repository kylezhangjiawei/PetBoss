<template>
  <div class="header-12">
    <!-- 导航条 搜索框-->
    <div class="header-2">
      <div class="font">
        <span class="back" @click="goback()"><i></i></span>
        <input type="search" class="search" placeholder="请输入姓名/手机号">
        <span @click="torequest()" class="size">发起</span>
        <i class="more" @click="sheetVisible = true"></i>
      </div>
    </div>
    <!-- 内容导航条 -->
    <mt-navbar class="page-part" v-model="selecteds">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">待进货</mt-tab-item>
      <mt-tab-item id="3">已完成</mt-tab-item>
      <mt-tab-item id="4">已取消</mt-tab-item>
    </mt-navbar>
    <!-- 内容区域-->
    <div class="containerSt">
      <mt-tab-container v-model="selecteds">
        <mt-tab-container-item id="1">
          <div class="list-one" @click="goto()">
            <div class="list-item">
              <div class="item-first">
                <dt>单号&nbsp;:&nbsp;20170822896</dt>
                <dd>总价&nbsp;:&nbsp;&yen;5897&nbsp;&nbsp;&nbsp;供应商&nbsp;:&nbsp;朵拉总部</dd>
              </div>
              <div class="item-second">
                <dt><span class="unit">待进货</span></dt>
                <dd>2017.08.15</dd>
              </div>
              <div class="item-thirdly"><i></i></div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 模态框选择器 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancel-text=""></mt-actionsheet>
  </div>
</template>
<script>
    export default {
      name:'header',
      data(){
        return{
          selecteds:'1',
          sheetVisible: false,
          actions: []
        }
      },
      methods:{
        goback(){
          this.$router.go(-1)
        },
        goto(){
          this.$router.push({path:'/Producthtml/Stock/detail'})
        },
        torequest(){
          this.$router.push({path:'/Producthtml/Stock/request'})
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
  .header-12 {
    overflow: auto;
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
    display: flex;
    justify-content: center;
  }

  .back {
    display: inline-block;
    width: 0.23rem;
    height: 0.38rem;
    background: url("../../../../static/img/01_033.png") no-repeat;
    position: absolute;
    top: 35%;
    left: 5%;
    background-size: cover;
  }

  .font {
    width: 100%;
    font-size: 0.36rem;
    text-align: center;
    color: #ffffff;
  }
  .size{
    font-size: 0.3rem;
    margin-left: 0.2rem;
  }
  .more {
    display: inline-block;
    width: 0.48rem;
    height: 0.2rem;
    background: url("../../../../static/img/dian2.png") 50% 50% no-repeat;
    background-size: cover;
    position: absolute;
    top: 40%;
    right: 4%;
  }
  .search {
    width: 4.66rem;
    height: 0.64rem;
    display: inline-block;
    font-size: 0.28rem;
    background-color: #323845;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 6px;
    padding-left: 0.3rem;
  }

  ::-webkit-input-placeholder {
    color: #ffffff;
  }

  /* chrome */
  ::-moz-placeholder {
    color: #ffffff;
  }

  /* firefox 19+ */
  :-ms-input-placeholder {
    color: #ffffff;
  }

  /* ie */


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

  .containerSt {
    margin-top: 1.99rem;
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
    width: 20%;
  }

  .unit {
    color: red;
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
