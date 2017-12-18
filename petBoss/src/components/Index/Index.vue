<style scoped>
  .footer {
    height: 100%;
  }

  .footbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    background-color: #ffffff;
    height: 1rem;
    box-shadow: 0px -3px 8px rgba(0,0,0,.05);
    border-top: 1px #e5e5e5;
  }

  a {
    width: 25%;
    text-decoration: none;
    color: #999999;
    margin-top: 0.16rem;
  }

  a, a:hover, a:active, a:visited, a:link, a:focus {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    background: none;
    text-decoration: none;
  }

  .test{
    height: 0.45rem;
    position: relative;
  }

  .footIcon{
    width: 0.45rem;
    height: 0.45rem;
    position: absolute;
    /*left: 35%;*/
    left: 38%;
  }
  　　
  .footbar img {
    width: 0.45rem;
    height: 0.45rem;
  }

  .footbar span {
    display: block;
    font-size:0.2rem;
  }

  .active {
    background-color: #ffffff;
    color: #ff6633;
  }
  . .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    transform: translate(-70px, 0);
  }

</style>
<template>
  <div class="footer">
        <router-view></router-view>
    <nav class="footbar" id="navBar">
      <router-link v-for="(item,index) in footBar" :key="item.id" :to="{ name : item.link}" @click.native="goto(index)" >
        <div class="test">
          <img :src="imagePath(item.icon,index)"  class="footIcon">
        </div>
        <span :class="[indexs === index ? selected : '']">{{item.name}}</span>
      </router-link>
    </nav>
  </div>

</template>
<script>
  export default {
    name: 'page-tab-container',
    data() {
      return {
        selected: 'active',
        footBar: [
          {
            name: '首页',
            icon: 'index',
            link: 'Indexhtml',
            tid:'1'
          },
          {
            name: '人员',
            icon: 'people',
            link: 'Peoplehtml',
            tid:'2'
          },
          {
            name: '货物',
            icon: 'product',
            link: 'Producthtml',
            tid:'3'
          },
          {
            name: '业绩',
            icon: 'performance',
            link: 'Performancehtml',
            tid:'4'
          },
//          {
//            name: '分析',
//            icon: 'analyze',
//            link: 'Analyzehtml',
//            tid:'5'
//          }
        ],
        indexs: 0,
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.indexs = this.footBar.findIndex(item => to.name === item.link)

      next()
    },
    created() {
      this.indexs = this.footBar.findIndex(item => this.$route.name === item.link)
//      console.log(this.$route.fullPath)
    },
    watch: {
      navBar(){
        let h = document.body.scrollHeight;
        window.onresize = function(){
          if (document.body.scrollHeight < h) {
            this.navBar = false;
          }else{
            this.navBar = true;
          }
        }
      }
  },
    methods: {
      goto(num) {
        this.indexs = num;
      },
      imagePath(icon,index){
        return require(`../../../static/img/${icon}${this.indexs ===index  ? '-1' :''}.png`)
      }
    }

  }
</script>

