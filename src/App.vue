<template>
  <div id="app">
    <!-- 추가된 헤더 컴포넌트 사용 -->
    <Header/>
    <RightMenu/>
    <div class="container"> <!-- class 추가 --> 
      <router-view/>
    </div>
    <!-- 추가된 풋터 컴포넌트 사용 -->
    <Footer />
  </div>
</template>

<script>
import Header from './components/common/MyHeader.vue'
import Footer from './components/common/Footer.vue'
import RightMenu from './components/common/RightMenu.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    RightMenu
  }
}
</script>

<style>
html,body{padding:0; margin:0;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1{color:#43b984;}
table{width:100%; border-collapse:collapse;}
.wrap{width:100%;}
.container{width:70%; margin:0 auto; /*float: right;*/}
a{text-decoration:none;}
.btn{padding:10px; background:#34445c; color:#fff;}
</style>
