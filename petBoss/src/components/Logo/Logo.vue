<template >
  <!-- logo -->
  <div id="test">
    <img class="logo" src="../../../static/img/logo2_03.png">
    <img class="window" src="../../../static/img/window.png" alt="">
    <p>&copy;2017用道云</p>
  </div>

</template>

<script>
export default {
  name:'test',
  data:function(){
    return {
      hrefs:'./Register.vue'
    }
  },
  beforeMount:function () {
    var _self = this;
    setTimeout(function () {
      _self.$router.push({path:'/Register'})
    },1000)
  },
}

</script>

<style scoped>
  #test {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    background-color: #ffffff;
  }
  .logo{
    display: inline-block;
    margin-top: 2.84rem;
    width: 2.4rem;
    height: 3.2rem;
  }
  .window{
    margin-top: 0.57rem;
    width: 100%;
    height: 1.11rem;
  }
  p{
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
</style>
