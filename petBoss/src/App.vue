<template>
  <div id="app">
      <keep-alive :include="['addMemberCard','changeCard','indexHtml']">
        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }

</script>

<style>
  html {
    background-color: #efefef;
    height: 100%;
    width: 100%;
    position: relative;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    position: relative;
    -webkit-touch-callout: none;                /* prevent callout to copy image, etc when tap to hold */
    -webkit-text-size-adjust: none;             /* prevent webkit from resizing text to fit */
    -webkit-user-select: none;                  /* prevent copy paste, to allow, change 'none' to 'text' */
  }

  #app {
    font-family: Microsoft YaHei;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    height: 100%;
    width: 100%;
  }
  /* 模态框样式 */
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 6.7rem;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 0.08rem;
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    height: 4.3rem;
  }

  .modal-header {
    height: 0.9rem;
    font-size: 0.26rem;
    background-color: #f6f6f6;
    color: #333;
    line-height: 0.9rem;
    border-top-left-radius: 0.08rem;
    border-top-right-radius: 0.08rem;
  }

  .modal-body {
    height: 2.4rem;
    border-bottom: 0.01rem solid #e8e8e8;
    font-size: 0.26rem;
  }
  .modal-footer{
    height: 1rem;
  }
  .modal-footer div{
    display: flex;
    justify-content: flex-start;
  }
  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  /* IOS下手机点击出现灰色背景解决方法*/
  *{
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    background: none;
    text-decoration: none;
  }
  /* IOS 样式 */
  /*.mint-header{*/
    /*height:1.14rem;*/
  /*}*/
  /*.mint-header.is-fixed{*/
    /*padding-top: 0.2rem;*/
  /*}*/
  /*#app .header-1{*/
    /*height: 1.2rem;*/
    /*line-height: 1.2rem;*/
    /*padding-top: 0.2rem;*/
  /*}*/
  /*#app .header-3{*/
    /*height: 2.048rem;*/
    /*line-height: 0.864rem;*/
    /*padding-top: 0.476rem;*/
  /*}*/
  /*#app .header-2{*/
    /*height: 1.024rem;*/
    /*line-height: 0.864rem;*/
    /*padding-top: 0.376rem;*/
  /*}*/
  /*#app .userInfo{*/
    /*top:27%;*/
  /*}*/
  /*#app .back{*/
    /*top:45%;*/
  /*}*/
  /*#app .more{*/
     /*top:52%;*/
   /*}*/
  /*#app .page-part{*/
    /*top: 1.4rem;*/
  /*}*/
  /*#app .size{*/
    /*top:28%;*/
  /*}*/
  /*#app .screen{*/
    /*top:27%;*/
  /*}*/
  /*#app .list{*/
    /*margin-top: 2.4rem;*/
  /*}*/
  /*#app .time-choice{*/
    /*margin-top: 2.734rem;*/
  /*}*/
  /*#app .accounts{*/
    /*margin-top: 2.87rem;*/
  /*}*/
  /*#app .monthly{*/
    /*top: 27%;*/
  /*}*/
  /*#app .containerIos,#app .containerSt,#app .containerAl{*/
    /*margin-top: 2.39rem;*/
  /*}*/
  /*#app .containerKc{*/
    /*margin-top: 1.4rem;*/
  /*}*/
  /*#app .modal{*/
    /*top: 1.4rem;*/
  /*}*/
  /*#app .header4 .v-modal{*/
    /*top: 1.4rem;*/
  /*}*/
  /*#app .listM{*/
    /*margin-top: 5.2rem;*/
  /*}*/
  /*#app .time-choiceTT{*/
    /*margin-top: 1.4rem;*/
  /*}*/
  /*#app .btnB{*/
    /*height: 2.8rem;*/
  /*}*/
  /*#app .btnB button{*/
    /*margin-top: 1.72rem;*/
  /*}*/
  /*#app .Search{*/
    /*margin-top: 0.2rem;*/
    /*height: 0.64rem;*/
  /*}*/
  /*#app .modalss,#app .messagess{*/
    /*top: 35%;*/
  /*}*/

  .wrongTip{
    background-color: #cc2200;
    font-size: 0.3rem;
    min-height: 0.75rem;
    width: 100%;
    border-radius: 0;
    top: 0 !important;
  }
  .mint-toast{
    max-width: 100%;
  }
</style>
