<template>
  <div class="header">
    <!-- header  -->
    <div class="header-2">
      <span class="font">会员详情<i class="back" @click="goback()"></i></span>
    </div>
    <!-- 会员资料 -->
    <div class="peopledetail">
      <span class="icon"><i></i></span>
      <span class="icon-two">
        <dt>{{datas.Name}}&nbsp;&nbsp;{{datas.Phone}}</dt>
        <dd class="fontcolor">
          <span style="display: inline" v-if='datas.Gender === "1" '>男</span>
          <span style="display: inline" v-if='datas.Gender === "0" '>女</span>
          &nbsp;&nbsp;生日&nbsp;:&nbsp;{{datas.Birthday}}</dd>
      </span>
      <span class="icon-three">{{datas.Title}}</span>
    </div>
    <!-- 内容区域 -->
    <div class="msg-bar">
      <div class="center">
        <dt>累计消费</dt>
        <dd><span class="colors">&yen;</span>{{datas.TotalConsume}}</dd>
      </div>
      <div>
        <dt>储值总额</dt>
        <dd><span class="colors">&yen;</span>{{datas.TotalStoredValue}}</dd>
      </div>
    </div>
    <!-- 会员信息 -->
    <div class="member">
      <!-- 会员编号 -->
      <div class="member-nums">
        <span>会员编号</span>
        <span class="styles">{{datas.CardId}}</span>
      </div>
      <!-- 添加日期 -->
      <div class="member-dates">
        <span>添加日期</span>
        <span class="styles">{{datas.AddDate}}</span>
      </div>
    </div>
    <!-- 公司注册符号与名称-->
    <p class="footer">&copy;2017用道云</p>
  </div>
</template>
<script>
  export default {
    name: 'header',
    data(){
      return{
        datas:''
      }
    },
    created(){
      this.datas = this.$route.query.plan;
    },
    methods: {
      goback() {
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

  .peopledetail {
    width: 100%;
    height: 1.18rem;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
    font-size: 0.3rem;
    padding-top: 0.37rem;
  }

  .peopledetail span {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .peopledetail span i {
    display: inline-block;
    width: 0.83rem;
    height: 0.83rem;;
    background: url("../../../../static/img/man.png") 50% 50% no-repeat;
    background-color: #eef2f9;
    border-radius: 100px;
    margin-left: 0.3rem;
    margin-right: 0.15rem;
    background-size: 50%;
  }

  .fontcolor {
    color: #666;
    margin-left: 0.28rem;
  }

  .peopledetail span dt {
    text-align: left;
    margin-bottom: 0.2rem;
    font-size: 0.3rem;
    color: #333;
  }

  .peopledetail span dd {
    margin: 0;
  }

  .msg-bar {
    display: -webkit-box;
    margin-top: 0.22rem;
    background-color: #ffffff;
    height: 1.71rem;
    margin-bottom: 0.22rem;
  }

  .msg-bar div {
    width: 50%;
    height: 1.03rem;
    font-size: 0.22rem;
    margin-top: 0.47rem;
  }

  .msg-bar div dt {
    font-size: 0.24rem;
    color: #999;
  }

  .msg-bar div dd {
    margin-left: 0;
    margin-top: 0.32rem;
    font-size: 0.34rem;
    color: #ff6633;
  }

  .center {
    border-right: 1px solid #E4E4E4;
    border-left: 1px solid #E4E4E4;
  }

  .icon {
    width: 20%;
  }

  .icon-two {
    width: 60%;
    text-align: left;
  }

  .icon-three {
    width: 20%;
  }

  .colors {
    font-size: 0.22rem;
  }

  .member {
    background-color: #ffffff;
    margin-top: 0.22rem;
    font-size: 0.3rem;
  }

  .member-nums, .member-dates {
    height: 0.9rem;
    margin-left: 0.3rem;
    display: flex;
    justify-content: center;
    text-align: left;
    border-bottom: 1px solid #e8e8e8;
  }

  .member-nums span, .member-dates span {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 50%;
  }

  .styles {
    text-align: right;
    color: #666;
    padding-right: 0.3rem;
  }

  .footer {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #bbb;
  }
</style>
