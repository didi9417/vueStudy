<template>
    <div>
        <h1>Detail</h1>
        <div class="AddWrap">
            <form>
                <table class="tbAdd">
                    <colgroup>
                        <col width="15%" />
                        <col width="*" />
                    </colgroup>
                    <tr>
                        <th>제목</th>
                        <td>{{subject}}</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td class="txt_content" v-html="content"></td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="btnWrap">
            <a href="javascript:;" @click="fnList" class="btn">목록</a>
            <a href="javascript:;" @click="fnEdit" class="btnAdd btn">수정</a>
            <a href="javascript:;" @click="fnDel" class="btnDel btn">삭제</a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            body:this.$route.query,
            subject:'',
            content:'',
            num:this.$route.query.num
        }
    },
    mounted(){
        this.fnGetDetail();
    },
    methods:{
        fnGetDetail(){
            this.$axios.get('http://localhost:3000/detail',{params:this.body})
            .then((res)=>{
                this.body = res.data.result[0];
                this.subject = res.data.result[0].subject;
                this.content = res.data.result[0].content.replace(/(\n)/g,'<br/>');
            })
            .catch((err)=>{
                console.log(err);
            });
        },
        fnList(){
            delete this.body.num;
            this.$router.push({path:'./BoardList', query:this.body});
        },
        fnEdit(){
            this.$router.push({path:'./BoardWrite', query:this.body}); // BoardWrite 라우터로 이동하면서 해당 라우터에 파라미터 넘겨줌
        },
        fnDel(){
            this.$axios.delete("http://localhost:3000/delete",{params:this.body})
            .then((res)=>{
                if(res.data.success){
                    alert("삭제되었습니다.");
                    this.fnList();
                }else{
                    alert("서버와의 연결에 실패하였습니다");
                }
            })
        }
    }
}
</script>

<style>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0; }
	.tbAdd td{padding:10px 10px; box-sizing:border-box; text-align:left;}
	.tbAdd td.txt_content{height:300px; vertical-align:top;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDel{background:#f00;}
</style>