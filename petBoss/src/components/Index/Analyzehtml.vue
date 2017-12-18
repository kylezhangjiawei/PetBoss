<template>
  <div class="header">
<!--     <div>
      <span>{{done}}</span>

      <button @click="add()">+</button>
      <button @click="delt()">-</button>
    </div>
    <div>
      <input v-validate="'confirmed:pw_confirm'" :class="{'input': true, 'is-danger': errors.has('confirm_field') }" name="confirm_field" type="password" placeholder="Enter The Password">
      <span v-show="errors.has('confirm_field')" class="help is-danger">{{ errors.first('confirm_field') }}</span>
      <input name="pw_confirm" :class="{'input': true, 'is-danger': errors.has('confirm_field') }" type="password" placeholder="Confirm the password">
      <input type="text" v-model="messages" :value="messages | test">

    </div>
    <div style="font-size: 50px" @click="test()">
      {{msg}}
    </div>
    <div id="demo">
      <input v-model="inpNum"/>
      <p>
        {{inpNum}}
      </p>
    </div>
    <div>
      <input v-model='search' />
      <ul v-for="item in searchData ">
        <li>{{item.name}},价格:￥{{item.price}}</li>
      </ul>
    </div> -->
  <div class="container">
    <div class="images">
    </div>
    <div class="fontSize">努力开发中，尽情期待...</div>
    <button class="btn" @click="goback()">返回</button>
  </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
    export default {
      name:'header',
      data(){
        return{
          price:5,
          messages:'',
          oldNum:0,
          search:'',
          msg:[{
            name:'张三'
          },
            {name:'李四'},
            {name:'王麻子'}
          ],
          products: [{
            name: '苹果',
            price: 25,
            category: "水果"
          }, {
            name: '香蕉',
            price: 15,
            category: "水果"
          }, {
            name: '雪梨',
            price: 65,
            category: "水果"
          }, {
            name: '宝马',
            price: 2500,
            category: "汽车"
          }, {
            name: '奔驰',
            price: 10025,
            category: "汽车"
          }, {
            name: '柑橘',
            price: 15,
            category: "水果"
          }, {
            name: '奥迪',
            price: 25,
            category: "汽车"
          }]
        }
      },
      filters:{
        test(value){
          if(!value) return '';
          value = value.toString();
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      },
      computed:{
//        count(){
//            return this.$store.state.test.count
//        }
        ...mapGetters([
          'done'
        ]),
        inpNum:{
          get:function(){
            return this.oldNum;

          },
          set:function(newValue){
            this.oldNum=newValue.replace(/[^\d]/g,'');
          }
        },
        searchData() {
          var search = this.search;
          if (search) {
            return this.products.filter(function(product) {
              return Object.keys(product).some(function(key) {
                return String(product[key]).toLowerCase().indexOf(search) > -1
              })
            })
          }
          return this.products;
        }
      },
      methods:{
        add(){
          this.$store.dispatch('test',this.price)
        },
        delt(){
          this.$store.dispatch('text',this.price)
        },
        test(){
//          this.$nextTick(function(){
//           let  datas=[
//              {name:'小甜甜'},
//              {name:'张三'},
//              {name:'李四'},
//              {name:'王麻子'}
//            ]
//            this.msg=datas
//          })
        },
        goback(){
          this.$router.go(-1);
        }
      }
    }
</script>
<style scoped>
  .header{
    height: 100%;
    background-color: #ffffff;
  }
.images{
  width: 4.8rem;
  height: 2.34rem;
  background: url("../../../static/img/main_empty.png") no-repeat;
  background-size: cover;
  margin: 0 auto;
}
  .fontSize{
    margin-top: 0.48rem;
    font-size: 0.28rem;
    color: #666666;
  }
  .container{
    padding-top: 2.4rem;
  }
  .btn{
    width: 4.14rem;
    height: 0.88rem;
    font-size: 0.34rem;
    color: #333333;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #666666;
    background-color: #ffffff;
    margin-top: 1rem;
  }
</style>
