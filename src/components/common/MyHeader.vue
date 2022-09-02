<template>
	<header>
		<h1><router-link to="/"><img alt="Vue logo" src="../../assets/logo.png" width="80"></router-link></h1>
		<div class="menuWrap">
			<ul class="menu">
				<li><router-link to="/trip/TripList">TRIP</router-link></li>
				<li><router-link to="/board/BoardList">BOARD</router-link></li>
				<!-- <li><a href="javascript:;">메뉴2</a></li>
				<li><a href="javascript:;">메뉴3</a></li>
				<li><a href="javascript:;">메뉴4</a></li> -->
				<li><img src="../../assets/menu.png" id="menuOpenBtn" @click="leftMenuOpen"></li>
			</ul>
		</div>
	</header>
</template>

<script>
export default {
	mounted(){
		
	},
	methods:{
		leftMenuOpen(){
			let target = document.getElementsByClassName("LeftMenu");
			target[0].style.right = "0px";
		}
	}
}
</script>

<style scoped>
header{width:100%; text-align:center; position:relative; height:120px; border-bottom:1px solid #35495e}
header h1{position:absolute; top:0; left:100px;}
header ul.menu:after{display:block; clear:both; content:'';}
header ul.menu{position:absolute; top:20px; right:50px;}
header ul.menu li{float:left; padding:10px 20px; list-style:none; cursor: pointer;}

a{text-decoration:none; color:#333;}
</style>
