<template>
  <div class="changepwd">
    <!-- header -->
    <mt-header fixed title="修改密码">

        <mt-button icon="back" slot="left" @click="goback()"></mt-button>

    </mt-header>
    <!-- 修改密码内容区域-->
    <div class="container">
      <mt-field label="原密码" placeholder="请输入原密码" type="password"></mt-field>
      <mt-field label="新密码" placeholder="请输入新密码" type="password"></mt-field>
      <mt-field label="确认密码" placeholder="请确认密码" type="password"></mt-field>
    </div>
    <!-- 确认按钮 -->
    <button type="submit" class="button-color">确认修改</button>
    <!-- 公司注册符号与名称-->
    <p class="footer">&copy;2017用道云</p>
  </div>
</template>
<script>
  export default {
    name: 'changepwd',
    methods:{
      goback(){
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  .changepwd {
    height: 100%;
  }

  .container {
    margin-top: 2rem;
  }

  .button-color {
    background-color: #FF6733;
    border: none;
    width: 39.375rem;
    height: 5.5rem;
    font-size: 2.125rem;
    border-radius: 8px;
    color: #ffffff;
    margin-top: 2.625rem;
  }

  .footer {
    font-size: 1.25rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
</style>
