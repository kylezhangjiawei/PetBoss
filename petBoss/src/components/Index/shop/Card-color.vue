<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">卡颜色<i class="back" @click="goback()"></i></span>
    </div>
    <!-- VIP卡调色板 -->
    <div class="pet-vipcard" :style="{backgroundColor:Colors}">
      <div class="background">
        <div class="card-name">
          <dt>宠物洗护VIP卡</dt>
          <dd>最低储值500元&nbsp;|&nbsp;卡费10元</dd>
        </div>
        <div class="card-discount">
          7.5&nbsp;<span class="size">折</span>
        </div>
      </div>
    </div>
    <!-- VIP卡颜色板 -->
    <div class="card-colors">
      <span class="colors" v-for="(item,index) in backColor" :style="{background:item.color}" @click="goClick(item,index)"><i :class="{'tick':indexs == index}"></i></span>
    </div>
    <!-- 公司注册符号与名称-->
    <p class="footer">&copy;2017用道云</p>
  </div>
</template>
<script>
    export default {
      name:'header',
      data(){
        return{
          backColor:[
            {color:'#a9d92d',value:'Color110'},
            {color:'#63b359',value:'Color010'},
            {color:'#45bd80',value:'Color020'},
            {color:'#509fc9',value:'Color030'},
            {color:'#5885cf',value:'Color040'},
            {color:'#9062c0',value:'Color050'},
            {color:'#d09a45',value:'Color060'},
            {color:'#e4b138',value:'Color070'},
            {color:'#ee903c',value:'Color080'},
            {color:'#f08500',value:'Color120'},
            {color:'#dd6549',value:'Color090'},
            {color:'#cc463d',value:'Color100'},
          ],
          indexs:'-1',
          Colors:'#f08500'
        }
      },
      methods:{
        goback(){
          this.$router.go(-1)
        },
        goClick(data,index){
          this.indexs  = index;
          this.Colors = data.color;
          localStorage.setItem('cardColor',data.color);
          localStorage.setItem('cardValue',data.value);
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
    width: 70%;
  }

  .card-name dt {
    margin-bottom: 0.16rem;
  }

  .card-name dd {
    margin: 0;
    font-size: 0.22rem;
  }

  .card-discount {
    font-size: 0.5rem;
    color: #fff;
    width: 25%;
    text-align: right;
    line-height: 2.5;
  }

  .size {
    font-size: 0.24rem;
  }
  .card-colors{
    padding-left: 0.3rem;
    margin-top: 0.3rem;
    text-align: left;
  }
  .colors{
    display: inline-block;
    height: 0.6rem;
    width: 0.64rem;
    border-radius: 8px;
    margin-right: 0.25rem;
    margin-top: 0.3rem;
    position: relative;
  }
  .footer {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
  .tick{
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url("../../../../static/img/gouxuanfuben.png")no-repeat;
    position: absolute;
    top:35%;
    right: 35%;
        background-size: cover;
  }
</style>
