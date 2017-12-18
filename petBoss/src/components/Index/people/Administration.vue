<template>
  <div class="header">
    <div class="header-2">
      <div class="font">
        <span class="back" @click="goback()"><i></i></span>
        <input type="search" class="search" placeholder="请输入姓名/手机号"  v-model="search">
        <span @click="goto()" class="size">添加</span>
      </div>
    </div>
    <!-- 开通人员账号按钮 -->
    <div class="btnB">
      <button @click="goto()">+添加人员账号</button>
    </div>
    <!-- 开通人员列表 -->
    <div class="containers">
      <div class="list-container" v-for="(list,index) in searchs" @click="light(index,list)"
           :class="{'on':flag === index}">
        <!--<div>-->
          <!--<dt>{{list.StaffName}}</dt>-->
          <!--<dd>{{list.StaffPhone}}</dd>-->
          <!--<span :class='[ list.State === "1" ? isTure : isFalse]'>{{list.JobName}}</span>-->
          <!--<span class="icon"><span v-show='list.State == "2"'>未激活</span><i></i></span>-->
          <!--<span class="icon"><span v-show='list.State == "3"'>已停用</span><i></i></span>-->
        <!--</div>-->
        <div class="itemContainer">
          <div class="itemLeft">
            <div class="itemTitle">
              <span class="Names">{{list.StaffName}}</span>
              <span>{{list.StaffPhone}}</span>
            </div>
            <div class="itemBody">
              <span :class='[ list.State === "1" ? isTure : isFalse]'>{{list.JobName}}</span>
            </div>
          </div>
          <div class="itemRight">
            <div class="itemTitle icon">
              <span v-show='list.State == "2"'>未激活</span>
              <span v-show='list.State == "3"'>已停用</span>
            </div>
            <div class="goIcon">
              <i></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import getData from '../../../assets/Data'
  var md5 = require('md5');
  export default {
    name: 'header',
    data() {
      return {
        peoplelist:[],
        flag: -1,
        isFalse:'JobName',
        isTure:'jobName',
        search:''
      }
    },
    computed:{
      searchs() {
        var search = this.search;
        if (search) {
          return this.peoplelist.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.peoplelist;
      },
    },
    created(){
      //查看员工接口
      let time = Date.parse(new Date()).toString().substring(0,10);
      let objs = {
        system_id:85916832,
        timestamp:time,
        store_id:localStorage.getItem('storeId')
      };
      let sortStr=getData(objs);
      let strings="";
      let key = localStorage.getItem('Key');
      for(let i in sortStr){
        strings+=i+"="+sortStr[i] + "&"
      }
      //拼接秘钥
      strings+="key"+"="+key;
      //加密后的字符串
      let signValue = md5(strings).toUpperCase();
      this.$http({
        method:'post',
        url:'https://api.yongdaoyun.com/special/pet/staff/staff_info.php',
        data:{
          "store_id":localStorage.getItem('storeId'),
          "system_id":85916832,
          "timestamp":time,
          "sign":signValue,
          "data":{

          }
        }
      }).then( res =>{
        console.log(res);
        this.peoplelist = res.data.data;
      }).catch( err =>{
        console.log(err)
      })
    },
    deactivated(){
      this.$destroy()
    },
    methods: {
      light(index,list) {
        this.flag = index;
//        Indicator.open('正在加载...');
//        setTimeout(() => Indicator.close(), 1000);
        this.$router.push({path: '/Index/Peoplehtml/Administration/PeppleDetailTwo',query:{plan:list}});
        this.$store.dispatch('addPeopleDetail',list);
      },
      goback() {
        this.$router.go(-1)
      },
      goto() {
        this.$router.push({path: '/Peoplehtml/Administration/Openup'})
      }
    }
  }
</script>
<style scoped>
  .header {
    overflow: hidden;
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
    position: absolute;
    right: 3.5%;
    top:22%;
    font-size: 0.3rem;
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
  .btnB {
    height: 2.4rem;
  }

  .btnB button {
    width: 6.9rem;
    height: 0.9rem;
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px dashed #ff6633;
    color: #ff6633;
    font-size: 0.3rem;
    margin-top: 1.32rem;
  }

  .containers {
    overflow: hidden;
    background-color: #ffffff;
    margin-top: 0.1rem;
  }

  .list-container {
    height: 1.4rem;
    text-align: left;
    position: relative;
    display: flex;
  }
  .itemContainer{
    width: 100%;
    margin-left: 0.3rem;
    border-bottom: 1px solid #e8e8e8;
    font-size: 0.3rem;
    display: flex;
    justify-content: space-between;
  }
  .itemLeft,.itemRight{
    display: flex;
    justify-content: flex-start;
  }
  .itemTitle{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .itemBody{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 0.9rem;
  }
  .Names{
    padding-bottom: 0.1rem;
  }
  .on {
    background-color: #e8e8e8;
  }

  .icon {
    padding-right: 0.2rem;
    font-size: 0.24rem;
    color: #999;
  }
  .jobName{
    display: inline-block;
    position: absolute;
    text-align: left;
    font-size: 0.24rem;
    color: #FF6633;
    top:40%;
    left: 38%;
  }
  .JobName{
    display: inline-block;
    position: absolute;
    text-align: left;
    font-size: 0.24rem;
    color: #666;
    top:40%;
    left: 38%;
  }
  .goIcon{
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-right: 0.3rem;
  }

  .goIcon i {
    background: url("../../../../static/img/jiantou.png")  no-repeat;
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: text-bottom;
    background-size: contain;
    margin-left: 0.2rem;
  }
</style>
