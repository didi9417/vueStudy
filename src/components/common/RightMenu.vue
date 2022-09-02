<template>
    <div class="LeftMenu">
        <button type="button" class="close" @click="leftMenuClose"><img src="../../assets/close.png"></button>
    </div>
</template>
<script>
export default {
    mounted(){

    },
    methods:{
		leftMenuClose(){
			let target = document.getElementsByClassName("LeftMenu");
			target[0].style.right = "-360px";
		}
    }
}
</script>
<style scope>
    .LeftMenu{background: aliceblue; width: 340px; height: 100%; padding: 100px 0 50px; top: 0; right: -360px; position: fixed; z-index: 101; transition: all 0.2s ease;}
    .LeftMenu .close{position: absolute; top: 30px; right: 37px; width: 42px; border: 2px solid #ddd; cursor: pointer; padding: 3px 10px; background-color: transparent;}
    .LeftMenu .close img {width: 18px;}
</style>