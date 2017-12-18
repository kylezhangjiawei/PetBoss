<template>
  <div class="header">
    <div class="header-2">
      <span class="back" @click="goback()"><i></i></span>
      <span class="font">详情</span>
    </div>
    <div class="container">
      <h4 class="titles">{{datas.Name}}</h4>
      <div><span class="headMsg">商品规格&nbsp;:&nbsp;</span>{{datas.str}}</div>
      <div><span class="headMsg">商品价格&nbsp;:&nbsp;</span>&yen;{{datas.Price}}</div>
      <div><span class="headMsg">商品条码&nbsp;:&nbsp;</span>{{datas.Barcode}}</div>
      <div><span class="headMsg">剩余库存&nbsp;:&nbsp;</span>{{datas.Stock}}</div>
    </div>
    <!-- 确定按钮 -->
  <!--   <div class="btn">
      <button class="btn-style" type="button">进货</button>
    </div> -->
  </div>
</template>
<script>
  export default{
    name:'header',
    data(){
      return{
        datas:''
      }
    },
    created(){
      this.datas = this.$route.query.plan;
      console.log(this.datas)
    },
    methods:{
      goback(){
        this.$router.go(-1);
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
  .container{
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 0.3rem;
    font-size: 0.3rem;
    text-align: left;
    color: #333333;
    font-weight: bold;
  }
  .container div{
    margin-left: 0.3rem;
    padding-right: 0.3rem;
    border-bottom: 1px solid #e8e8e8;
    min-height: 0.9rem;
    line-height: 0.9rem;
  }
  .titles{
    word-break: break-all;
    margin: 0;
    margin-left: 0.3rem;
    padding-right: 0.3rem;
    border-bottom: 1px solid #e8e8e8;
    margin-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
  .headMsg{
    color: #999999;
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
</style>
