<template>
  <div id="app">
    <!-- 추가된 헤더 컴포넌트 사용 -->
    <MyHeader />
    <div class="container"> <!-- class 추가 --> 
      <router-view/>
    </div>
    <!-- 추가된 풋터 컴포넌트 사용 -->
    <MyFooter />
  </div>
</template>

<script>
import MyHeader from './components/common/MyHeader.vue'
import MyFooter from './components/common/MyFooter.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter
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
.container{width:800px; margin:0 auto;}
a{text-decoration:none;}
.btn{padding:10px; background:#34445c; color:#fff;}
</style>
