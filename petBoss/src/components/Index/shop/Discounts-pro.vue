<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">优惠项目设置<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 优惠内容区域-->
    <div class="container">
      <!-- 新增优惠-->
      <div class="add-discounts" @click="showModal = true">+新增优惠</div>
      <!-- 优惠类别-->
      <div class="all-discounts" v-for="item in discounts">
        <dt>充&yen;{{item.price}}</dt>
        <dd>送&yen;{{item.dis}}</dd>
      </div>
    </div>
    <!-- 模态框组件 -->
    <modal v-if="showModal">
      <span slot="header">新增优惠项目</span>
      <div slot="body">
        <div class="Pay">
          <label for="">充值金额&nbsp;:</label>
          <input type="number" placeholder="请输入金额" class="money" v-model="pay">
        </div>
        <div>
          <label for="">赠送金额&nbsp;:</label>
          <input type="number" placeholder="请输入金额" class="money" v-model="money">
        </div>
      </div>
      <div slot="footer">
        <span class="delete" @click="turnOf()">取消</span>
        <span class="oks" @click="Ok()">确定</span>
      </div>
    </modal>
  </div>
</template>
<script>
    export default {
      name:'header',
      data(){
        return{
          showModal:false,
          pay:'',
          money:'',
          discounts:[
            {
              price:100,
              dis:10
            },
            {
              price:200,
              dis:50
            },
            {
              price:300,
              dis:100
            },
            {
              price:500,
              dis:200
            }
          ]
        }
      },
      methods:{
        goback(){
          this.$router.go(-1)
        },
        turnOf(){
          this.showModal = false
        },
        Ok(){
          this.showModal = false
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
  .container{
    padding-left: 0.3rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .add-discounts{
    height:1.27rem;
    width: 2.1rem;
    border: 0.02rem dashed #f5d38c;
    border-radius: 0.08rem;
    font-size: 0.3rem;
    color: #ff6633;
    background-color: #ffffff;
    line-height: 1.27rem;
    margin-right: 0.3rem;
    margin-top: 0.3rem;
  }
  .all-discounts{
    height:1.27rem;
    width: 2.1rem;
    border: 0.02rem dashed #f5d38c;
    border-radius: 0.08rem;
    color: #ff6633;
    background-color: #FEEFCD;
    margin-right: 0.24rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 0.3rem;
  }
  .all-discounts dt{
    font-size: 0.32rem;
    color: #ba7009;
    margin-bottom: 0.12rem;
  }
  .all-discounts dd{
    margin: 0;
    font-size: 0.26rem;
    color: #CB9654;
  }
  .money{
    width: 4.5rem;
    height: 0.72rem;
    font-size: 0.26rem;
    border: 1px solid #e8e8e8;
    outline: none;
    margin-left: 0.25rem;
    padding-left: 0.15rem;
  }
  .Pay{
    padding-top: 0.35rem;
    margin-bottom: 0.25rem;
  }
  .delete{
    display: inline-block;
    height: 100%;
    width: 50%;
    font-size: 0.34rem;
    color: #333;
    line-height: 3;
  }
  .oks{
    display: inline-block;
    height: 100%;
    width: 50%;
    font-size: 0.34rem;
    color: #ffffff;
    line-height: 3;
    background-color: #f36344;
  }
</style>

