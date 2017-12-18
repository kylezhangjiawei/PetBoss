<template>
  <div class="header4">
    <!-- header -->
    <div class="header-2">
      <span class="font">
        库存
        <i class="back" @click="goback()"></i>
        <i class="more" @click="sheetVisible = true"></i>
        <p class="screen" @click="open()">筛选</p>
      </span>
    </div>
    <!-- 内容 -->
    <div class="containerKc">
        <!-- 年月 -->
        <div class="year-month">2017.08</div>
        <!-- 数据列表 -->
        <div class="content">
          <div class="items">
            <div class="item-list">
              <div class="item-first">
                <span class="month">08.22</span>
              </div>
              <div class="item-second">
                <dt>单号:1248935420</dt>
                <dd>总价：&yen;580 &nbsp; 供应商：朵拉总部</dd>
              </div>
              <div class="item-thirdly">
                <i class="icon"></i>
              </div>
            </div>
          </div>
          <div class="items">
            <div class="item-list">
              <div class="item-first">
                <span class="month">08.22</span>
              </div>
              <div class="item-second">
                <dt>单号:1248935420</dt>
                <dd>总价：&yen;580 &nbsp; 供应商：朵拉总部</dd>
              </div>
              <div class="item-thirdly">
                <i class="icon"></i>
              </div>
            </div>
          </div>
          <div class="items">
            <div class="item-list">
              <div class="item-first">
                <span class="month">08.22</span>
              </div>
              <div class="item-second">
                <dt>单号:1248935420</dt>
                <dd>总价：&yen;580 &nbsp; 供应商：朵拉总部</dd>
              </div>
              <div class="item-thirdly">
                <i class="icon"></i>
              </div>
            </div>
          </div>
        </div>
      <!-- 年月 -->
      <div class="year-month">2017.08</div>
      <!-- 数据列表 -->
      <div class="content">
        <div class="items">
          <div class="item-list">
            <div class="item-first">
              <span class="month">08.22</span>
            </div>
            <div class="item-second">
              <dt>单号:1248935420</dt>
              <dd>总价：&yen;580 &nbsp; 供应商：朵拉总部</dd>
            </div>
            <div class="item-thirdly">
              <i class="icon"></i>
            </div>
          </div>
        </div>
        <div class="items">
          <div class="item-list">
            <div class="item-first">
              <span class="month">08.22</span>
            </div>
            <div class="item-second">
              <dt>单号:1248935420</dt>
              <dd>总价：&yen;580 &nbsp; 供应商：朵拉总部</dd>
            </div>
            <div class="item-thirdly">
              <i class="icon"></i>
            </div>
          </div>
        </div>
        <div class="items">
          <div class="item-list">
            <div class="item-first">
              <span class="month">08.22</span>
            </div>
            <div class="item-second">
              <dt>单号:1248935420</dt>
              <dd>总价：&yen;580 &nbsp; 供应商：朵拉总部</dd>
            </div>
            <div class="item-thirdly">
              <i class="icon"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 年月 -->
      <div class="year-month">2017.08</div>
      <!-- 数据列表 -->
      <div class="content">
        <div class="items">
          <div class="item-list">
            <div class="item-first">
              <span class="month">08.22</span>
            </div>
            <div class="item-second">
              <dt>单号:1248935420</dt>
              <dd>总价：&yen;580 &nbsp; 供应商：朵拉总部</dd>
            </div>
            <div class="item-thirdly">
              <i class="icon"></i>
            </div>
          </div>
        </div>
        <div class="items">
          <div class="item-list">
            <div class="item-first">
              <span class="month">08.22</span>
            </div>
            <div class="item-second">
              <dt>单号:1248935420</dt>
              <dd>总价：&yen;580 &nbsp; 供应商：朵拉总部</dd>
            </div>
            <div class="item-thirdly">
              <i class="icon"></i>
            </div>
          </div>
        </div>
        <div class="items">
          <div class="item-list">
            <div class="item-first">
              <span class="month">08.22</span>
            </div>
            <div class="item-second">
              <dt>单号:1248935420</dt>
              <dd>总价：&yen;580 &nbsp; 供应商：朵拉总部</dd>
            </div>
            <div class="item-thirdly">
              <i class="icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 公司注册符号与名称-->
    <!--<p class="footer">&copy;2017用道云</p>-->
    <!-- 模态框 -->
      <mt-popup
        v-model="popupVisible"
        position="top"
        class="modal"
      >
        <div class="modal-container">
            <div class="inTime">
              <span class="timeOne">入库时间&nbsp;:</span>
              <input type="date">
              <span class="timeTwo">至</span>
              <input type="date">
            </div>
          <div class="inTimes">
              <span class="timeOne">供应商&nbsp;:</span>
            <select class="choices">
              <option value="1">朵拉总部</option>
              <option value="2">朵拉总部2</option>
              <option value="3">朵拉总部3</option>
            </select>
          </div>
          <div class="inTimes">
            <span class="timeOne">入库单号&nbsp;:</span>
            <input maxlength="11" type="number" placeholder="入库单号" class="nums">
          </div>
          <div class="btn">
              <button class="lookIt" @click="search()">查询</button>
          </div>
        </div>
      </mt-popup>
    <!-- 模态框选择器 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancel-text=""></mt-actionsheet>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import { Toast } from 'mint-ui';
    export default {
      name:'header4',
      data(){
        return{
          popupVisible:false,
          selects:'',
          increase: false,
          actions: [],
          values:'',
          sheetVisible: false,
          up: [
            {
              names: '朵拉总部1'
            },
            {
              names: '朵拉总部2'
            },
            {
              names: '朵拉总部3'
            }
          ],
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
      },
      methods:{
        open(){
          this.popupVisible=true
        },
        goback(){
          this.$router.go(-1)
        },
        search(){
           this.popupVisible=false;
//          Indicator.open('正在加载...');
//          setTimeout(() => Indicator.close(), 1000);
          this.$router.push({path:'/Producthtml/Put-in-storage/Storagedetail'})
        },
        selectClick(item) {
          this.values = item.names;
          this.increase = false;
        },
        selectChoice() {
          if (this.increase == false) {
            this.increase = true;
          } else {
            this.increase = false;
          }
        },
        stock() {
//          this.$router.push({path:'/Producthtml/Stock'})
          Toast({
            message: '该页面功能正在开发..',
            duration: 2000,
            className:'ok'
          })
        },
        allot() {
//          this.$router.push({path:'/Producthtml/Allot'})
          Toast({
            message: '该页面功能正在开发..',
            duration: 2000,
            className:'ok'
          })
        },
        storage() {
          this.$router.push({path:'/Producthtml/Put-in-storage'})
        },
      }
    }
</script>
<style scoped>
  .header4{
    height: 100%;
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
    top: 44%;
    right: 5%;
  }

  .containerKc{
    height: 100%;
    overflow: auto;
    margin-top: 1.0rem;
  }
  .screen{
    font-size: 0.3rem;
    position: absolute;
    top:18%;
    right: 16%;
    margin: 0;
  }

  .year-month{
    height: 0.8rem;
    font-size: 0.3rem;
    line-height: 0.88rem;
    text-align: left;
    color: #333333;
    padding-left: 0.3rem;
  }
  .content{
    height: auto;
    background-color: #ffffff;
  }
  .items,.backgroundcolor{
    height: 1.3rem;
    background-color: #ffffff;
  }
  .item-list{
    text-align: left;
    height: 100%;
    line-height: 2;
    display: flex;
    justify-content: flex-start;
    margin-left: 0.3rem;
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
  .item-thirdly i {
    display: inline-block;
    width: 0.75rem;
    height: 100%;
    background: url("../../../../static/img/jiantou.png") 50% 50% no-repeat;
        background-size: 60%;
  }

  .item-second{
    width: 80%;
    padding-left: 0.3rem;
  }

  .item-first{
    color: #999999;
    font-size: 0.3rem;
  }
  .modal{
    width: 100%;
    top: 1.0rem;
  }
  .modal-container{
    height: 4.45rem;
    background-color: #ffffff;
    display: flex;
    margin: 0;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
  }
  .inTime{
    display: flex;
    justify-content: flex-start;
    font-size: 0.26rem;
    color: #333333;
    padding-top: 0.35rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }
  .inTimes{
    display: flex;
    justify-content: flex-start;
    font-size: 0.26rem;
    color: #333333;
    padding-top: 0.24rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }
  .timeOne{
    padding-right: 0.1rem;
    text-align: right;
    width: 1.32rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .inTime input{
    height: 0.72rem;
    width: 2.5rem;
    outline: none;
    border: 1px solid #e8e8e8;
    font-size: 0.26rem;
  }
  .timeTwo{
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .choices{
    width: 5.5rem;
    height: 0.72rem;
    font-size: 0.26rem;
    color: #333333;
    border: 1px solid #cccccc;
    padding-left: 0.2rem;
  }
  .nums{
    width: 5.3rem;
    height: 0.72rem;
    font-size: 0.26rem;
    border: 1px solid #cccccc;
    padding-left: 0.2rem;
  }
  .btn{
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    padding-top: 0.35rem;
  }
  .lookIt{
    width: 4rem;
    height: 0.72rem;
    border-radius: 6px;
    border: none;
    background-color: #4b5060;
    font-size: 0.26rem;
    color: #ffffff;
  }
</style>

<style>
  .header4 .v-modal{
    top:1.0rem;
  }
</style>
