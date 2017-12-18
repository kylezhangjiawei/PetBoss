<template>
  <div class="header-12">
    <div class="header-2">
      <div class="font">
        <span class="back" @click="goback()"><i></i></span>
        <input type="search" class="search" placeholder="请输入姓名/手机号" v-model="search">
        <span @click="goto()" class="size">管理</span>
      </div>
    </div>
    <mt-navbar class="page-part" v-model="selecteds">
      <mt-tab-item id="1">周排名</mt-tab-item>
      <mt-tab-item id="2">月排名</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selecteds" class="list">
      <mt-tab-container-item id="1">
        <div class="itemList" v-for="(list,index) in searchWeek" @click="light(index,list)" :class="{'on':flag === index}">
          <div class="itemContainer" >
            <div class="itemBox">
              <div class="Nums">{{list.w_number}}</div>
              <div class="Msg">
                <span class="Names">{{list.StaffName}}</span>
                <span class="phoneNum">{{list.StaffPhone}}</span>
              </div>
            </div>
            <div class="itemBox">
              <div class="Price">&yen;{{list.w_total}}</div>
              <div class="goIcon"><i></i></div>
            </div>
          </div>
        </div>
    </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="itemList" v-for="(list,index) in searchMonth" @click="light(index,list)" :class="{'on':flag === index}">
          <div class="itemContainer" >
            <div class="itemBox">
              <div class="Nums">{{list.m_number}}</div>
              <div class="Msg">
                <span class="Names">{{list.StaffName}}</span>
                <span class="phoneNum">{{list.StaffPhone}}</span>
              </div>
            </div>
            <div class="itemBox">
              <div class="Price">&yen;{{list.m_total}}</div>
              <div class="goIcon"><i></i></div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import getData from '../../assets/Data'
  var md5 = require('md5');
  export default {
    name: 'header-12',
    data() {
      return {
        selecteds: '1',
        flag: -1,
        names: '',
        search:'',
        monthRanking:[],
        weekRanking:[]
      }
    },
    created(){
      this.names = localStorage.getItem('Name');
      //获取周月销售金额排行
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
        url:'https://api.yongdaoyun.com/special/pet/boss/boss_clerk_ranking.php',
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
        this.monthRanking = res.data.data.month_ranking;
        this.weekRanking = res.data.data.week_ranking;
      }).catch( err =>{
        console.log(err)
      })
    },
    computed:{
      searchWeek() {
        var search = this.search;
        if (search) {
          return this.weekRanking.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.weekRanking;
      },
      searchMonth() {
        var search = this.search;
        if (search) {
          return this.monthRanking.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.monthRanking;
      }
    },
    methods: {
      light(index, item) {
        this.flag = index;
        this.names = item;
        console.log(this.names);
        this.$router.push({path: '/Peoplehtml/Peopledetail', query: {plan: this.names}})
        this.$store.dispatch('savePeopleDetail',item);
      },
      goback() {
        this.$router.go(-1)
      },
      goto() {
        this.$router.push({path: '/Peoplehtml/Administration'});
      }
    }
  }
</script>
<style scoped>
  .header-12 {
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
  }

  .back {
    display: inline-block;
    width: 0.23rem;
    height: 0.38rem;
    background: url("../../../static/img/01_033.png") no-repeat;
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
  .itemList{
    background-color: #ffffff;
    font-size: 0.3rem;
  }
  .itemContainer{
    margin-left: 0.3rem;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    height: 1.3rem;
  }
  .Nums,.Msg,.Price,.goIcon{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .Nums{
    color: #999999;
    font-size: 0.34rem;
    text-align: left;
  }
  .Msg {
    text-align: left;
    margin-left: 0.34rem;
  }
  .Names{
    color: #333333;
    margin-bottom: 0.1rem;
  }
  .itemBox{
    display: flex;
    justify-content: space-between;
  }
  .phoneNum{
    color: #999999;
  }
  .Price{
    text-align: right;
    padding-right: 0.2rem;
    color: #ff6633;
    font-size: 0.34rem;
  }
  .goIcon{
    padding-right: 0.3rem;
  }
  .goIcon i{
    width: 0.12rem;
    height: 0.22rem;
    background: url("../../../static/img/link_arrow_icon.png") no-repeat;
    background-size: cover;
  }
  .page-part {
    position: fixed;
    top: 1.0rem;
    left: 0px;
    right: 0px;
    z-index: 1;
    font-size: 0.3rem;
    color: #999;
    height: 0.88rem;
    line-height: 0.88rem;
  }

  .list {
    margin-top: 2.2rem;
    margin-bottom: 1rem;
  }

  .list-container {
    height: 1.4rem;
    background-color: #ffffff;
    text-align: left;
  }

  .list-container div, .list-container span {
    display: inline-block;
  }

  .peoplist {
    margin-left: 0.3rem;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #e8e8e8;
    position: relative;
  }

  .list-container div dt {
    font-size: 0.3rem;
    color: #333;
    margin-top: 0.25rem;
    margin-bottom: 0.1rem;
  }

  .list-container div dd {
    font-size: 0.24rem;
    color: #999;
    margin: 0;
  }

  .number {
    font-size: 0.34rem;
    color: #A0A0A0;
    vertical-align: top;
    margin-top: 0.48rem;
    display: inline-block;
  }

  .money {
    font-size: 0.34rem;
    color: #ff6633;
    vertical-align: top;
    margin-top: 0.48rem;
    width: 54%;
    display: inline-block;
    text-align: right;
  }

  .backIcon i{
    display: inline-block;
    position: absolute;
    top: 25%;
    right: 6%;
    width: 0.75rem;
    height: 0.75rem;
    background: url("../../../static/img/jiantou.png") 50% 50% no-repeat;
    background-size: 50%;
  }
  .on {
    background-color: #e8e8e8;
  }
</style>
<style>
  .header-12 .mint-navbar .mint-tab-item,.mint-tab-item{
    padding: 0;
  }
  .header-12 .mint-tab-item-label{
    line-height: inherit;
    margin: 0;
  }
  .header-12 .mint-navbar .mint-tab-item.is-selected{
    margin-bottom: 0px;
  }
  .header-12 .mint-tab-container-wrap{
    overflow: hidden;
  }
</style>
