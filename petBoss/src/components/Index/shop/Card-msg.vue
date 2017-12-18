<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">操作提示<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 内容主体 -->
    <div class="container">
      使用时请向工作人员出示卡号
    </div>
    <!-- 公司注册符号与名称-->
    <p class="footer">&copy;2017用道云</p>
  </div>
</template>
<script>
    export default {
      name:'header',
      methods:{
        goback(){
          this.$router.go(-1)
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
    height: 5.15rem;
    line-height: 4.15rem;
    padding-top: 1.1rem;
    position: relative;
  }

  .back {
    display: inline-block;
    width: 1.4375rem;
    height: 2.375rem;
    background: url("../../../../static/img/01_033.png") no-repeat;
    vertical-align: top;
    position: absolute;
    top: 30%;
    left: 5%;
  }

  .header-2 span {
    display: inline-block;
  }

  .font {
    width: 100%;
    font-size: 2.25rem;
    text-align: center;
    color: #ffffff;
  }

  .container{
    height: 25rem;
    background-color: #ffffff;
    font-size: 1.875rem;
    color: #666;
    line-height: 40px;
    padding-left: 1.875rem;
    padding-top: 1.875rem;
    margin-top: 1.5625rem;
    text-align: left;
  }
  .footer {
    font-size: 1.25rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
</style>
