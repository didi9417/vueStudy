<template>
    <div>
        <h2>Board</h2>
        <div class="searchWrap">
                <input type="text" v-model="keyword" @keyup.enter="fnBoardSearch" /> 
                <a href="javascript:;" @click="fnBoardSearch" class="BoardSearch btn">검색</a>
        </div>
        <div class="listWrap">
            <table class="tbList">
                <colgroup>
                    <col width="6%" />
                    <col width="*" />
                    <col width="10%" />
                    <col width="15%" />
                </colgroup>
                <tr>
                    <th>No</th>
                    <th>제목</th>
                    <th>아이디</th>
                    <th>날짜</th>
                </tr>
                <tr v-for="(row, idx) in list" :key="idx">
                    <td>{{row.ROWNUM}}</td>
                    <td class="txt_left"><a href="javascript:;" @click="fnBoardDetail(`${row.ymd}`,`${row.num}`,`${row.board_code}`)">{{row.subject}}</a></td>
                    <td>{{row.id}}</td>
                    <td v-if="row.regdate != null">{{(row.regdate+"").substring(0,10)}}</td>
                    <td v-if="row.regdate == null">-</td>
                </tr>
                <tr v-if="list.length == 0">
                    <td colspan="4">데이터가 없습니다.</td>
                </tr>
            </table>
        </div>

        <div class="pagination" v-if="paging.totalCount > 0">
			<a href="javascript:;" @click="fnPage(1)" class="first">&lt;&lt;</a>
			<a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"  class="prev">&lt;</a>
			<template v-for=" (n,index) in paginavigation()">
				<template v-if="paging.page==n">
					<strong :key="index">{{n}}</strong>
				</template>
				<template v-else>
					<a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{n}}</a>
				</template>
			</template>
			<a href="javascript:;" v-if="paging.total_page > paging.end_page" @click="fnPage(`${paging.end_page+1}`)"  class="next">&gt;</a>
			<a href="javascript:;" @click="fnPage(`${paging.total_page}`)" class="last">&gt;&gt;</a>
		</div>

        <div class="btnRightWrap">
                <a href="javascript:;" @click="fnBoardWriteForm" class="BoardWriteForm btn">글쓰기</a>
        </div>

    </div>
</template>
<script>
export default {
    data(){ //변수생성
            return{
                    body:'', // 현재 리스트 페이지의 게시판코드, 키워드, 페이지 전송
                    board_code:'news', // 게시판코드
                    list:'',    //리스트 데이터
                    no:'',  // 게시판 숫자
                    paging:'', // 페이징 데이터
                    start_page:'', // 시작 페이지
                    page:this.$route.query.page ? this.$route.query.page : 1,
                    keyword:this.$route.query.keyword,
                    paginavigation:function(){ // 페이징 처리 반복문
                            var pageNumber = [];
                            var start_page = this.paging.start_page;
                            var end_page = this.paging.end_page;
                            for (var i = start_page; i <= end_page; i++) {
                                pageNumber.push(i);
                            }
                            return pageNumber;
                    }
            }
    },
    mounted(){  // 페이지 시작시 함수 실행
        this.fnGetList();
    },
    methods:{
        fnGetList(){
            this.body = {
                board_code:this.board_code,
                keyword:this.keyword,
                page:this.page
            }
            this.$axios.get("http://localhost:3000/select",{params:this.body})
            .then((res)=>{
                if(res.data.success){
                    this.list = res.data.list;
                    this.paging = res.data.paging;
                    this.no = this.paging.totalCount - ((this.paging.page-1) * this.paging.ipp);
                }else{
                    alert("서버와의 연결에 실패하였습니다");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        fnBoardWriteForm(){
            this.$router.push("./BoardWrite");
        },
        fnBoardSearch(){
            this.paging.page = 1;
            this.fnGetList();
        },
        fnPage(n){
            if (this.page != n) {
                this.page = n;
                this.fnGetList();
            }
        },
        fnBoardDetail(ymd,num,board_code){
            this.body = {
                ymd:ymd,
                num:num,
                board_code:board_code
            }
            this.$router.push({path:'./BoardDetail', query:this.body}); // 상세페이지 라우터 호출
        }
    }
}
</script>
<style scope>
	.searchWrap{border:1px solid #888; border-radius:5px; text-align:center; padding:20px 0; margin-bottom:40px;}
	.searchWrap input{width:60%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888;}
	.searchWrap .btnSearch{display:inline-block; margin-left:10px;}
	.tbList th{border-top:1px solid #888;}
	.tbList th, .tbList td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbList td.txt_left{text-align:left;}
	.btnRightWrap{text-align:right; margin:10px 0 0 0;}

	.pagination{margin:20px 0 0 0; text-align:center;}
	.first, .prev, .next, .last{border:1px solid #666; margin:0 5px;}
	.pagination span{display:inline-block; padding:0 5px; color:#333;}
	.pagination a{text-decoration:none; display:inline-block; padding:0 5px; color:#666;}
</style>