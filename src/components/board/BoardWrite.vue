<template>
    <div>
        <h1>Board {{num ? 'Edit' : 'Write'}}</h1>
        <div class="AddWrap">
            <form>
                <table class="tbAdd">
                    <colgroup>
                        <col width="15%"/>
                        <col width="*"/>
                    </colgroup>
                    <tr>
                        <!-- <th>제목</th> -->
                        <td><input type="text" v-model="subject" ref="subject" placeholder="제목을 입력해 주세요"></td> <!-- v-model 양방향데이터전송으로 상세 데이터를 넣어준다 -->
                    </tr>
                    <tr>
                        <!-- <th>내용</th> -->
                        <td><textarea v-model="content" ref="content" id="content"></textarea></td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="btnWrap">
            <a href="javascript:;" @click="fnBoardList" class="BoardList btn">목록</a>
            <a href="javascript:;" @click="fnBoardWrite" class="BoardWrite btn" v-if="!num">등록</a>
            <a href="javascript:;" @click="fnBoardEdit" class="BoardWrite btn" v-else>수정</a>
            <a href="javascript:;" @click="fnXlsxDown" class="xlsx btn">엑셀</a>
        </div>
    </div>
</template>

<script>
import $axios from 'axios';
import $ from 'jquery';
import 'bootstrap';
import 'summernote/dist/summernote-lite.js';
import 'summernote/dist/summernote-lite.css';
// import 'summernote/dist/lang/summernote-ko-KR';
// const XLSX = require("xlsx");
const ExcelJS = require('exceljs');
import { saveAs } from "file-saver";

export default {
    data(){
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth()+1;
        const day = now.getDate();
        var ymd = year+(("00"+month.toString()).slice(-2))+(("00"+day.toString()).slice(-2));
        
        return{
            ymd:ymd,
            board_code:'news',
            subject:'',
            content:'',
            id:'admin',
            form:'', // form 전속 데이터
            body:this.$route.query,
            num:this.$route.query.num,
            people: [
                { name: 'Anna', age: '13' },
                { name: 'Elsa', age: '14' },
            ]
        }
    },
    mounted(){  // 최초 로딩시 실행
        $('#content').summernote({
            height: 300,
            lang: "ko-KR",
            placeholder: '이곳에 내용을 작성하세요',
            callbacks:{
				onImageUpload: function(files) {
                    for (var i = files.length - 1; i >= 0; i--) {
		            	sendFile(files[i], this);
		            }
		        }
			}
        });
        if(this.num) {
            this.fnGetDetail(); // num 값이 있으면 편집할 상세 데이터를 호출함
        }
    },
    methods:{
        fnBoardList(){
            this.$router.push({path:'./BoardList', query:this.body});
        },
        fnGetDetail(){
            this.$axios.get('http://localhost:3000/detail',{params:this.body})
            .then((res)=>{
                this.subject = res.data.result[0].subject;
                this.content = res.data.result[0].content.replace(/(\n)/g,'<br/>');
                $('#content').summernote('code',this.content);
            })
            .catch((err)=>{
                console.log(err);
            });
        },
        fnBoardWrite(){
            this.content = document.getElementById("content").value;
            if(!this.subject){
                alert("제목을 입력해 주세요");
                this.$refs.subject.focus(); // 이 방식으로 선택자를 찾는다
                return false;
            }
            this.form = {
                ymd:this.ymd,
                board_code:this.board_code,
                subject:this.subject,
                content:this.content,
                id:this.id
            }
            this.$axios.post("http://localhost:3000/insert", this.form)
            .then((res)=>{
                if(res.data.success){
                    alert("게시글이 등록되었습니다.");
                    this.fnBoardList();
                }else{
                    alert("게시글 등록에 실패하였습니다.");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        fnBoardEdit(){
            this.content = document.getElementById("content").value;
            if(!this.subject.trim()){
                alert("제목을 입력해 주세요");
                this.$refs.subject.focus(); // 이 방식으로 선택자를 찾는다.
                return false;
            }
            this.form= {
                ymd:this.$route.query.ymd,
                board_code:this.board_code,
                subject:this.subject,
                content:this.content,
                num:this.num
            }
            this.$axios.put("http://localhost:3000/edit", this.form)
            .then((res)=>{
				if(res.data.success) {
					alert('수정되었습니다.');
                    this.$router.push({path:'./BoardDetail', query:this.form}); // 상세보기 페이지로 이동
				} else {
					alert("서버와의 연결에 실패했습니다.");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
        },
        async fnXlsxDown(){

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("My Sheet"); // sheet 이름이 My Sheet

            const rawData = [
                {header: "order_id", data: ['12345678', '12345679', '12345680']},
                {header: "store_id", data: ['storeA', 'storeB', 'storeC']},
                {header: "country_id", data: ['KR', 'KR', 'KR']},
                {header: "price", data: ['15000', '10000', '20000']}
            ]

            rawData.forEach((data, index) => {
                worksheet.getColumn(index + 1).values = [data.header, ...data.data];
            });

            // 다운로드
            const mimeType = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], mimeType);
            saveAs(blob, "testExcel.xlsx");
        }
    }
}
function sendFile(file, el){
    var form_data = new FormData();
    form_data.append('file', file);
    $axios({
        method:'post',
        url:'http://localhost:3000/ImgUpload',
        data:form_data,
        enctype: 'multipart/form-data'
    }).then((res)=>{
        if(res.data.success) {
            console.log(res.data.fileInfo.path);
            $(el).summernote('editor.insertImage', 'http://localhost:3000'+res.data.fileInfo.path);
        } else {
            alert("서버와의 연결에 실패했습니다.");
        }
    }).catch((err)=>{
        console.log(err);
    });
}
</script>
<style>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbAdd td{padding:10px 10px; box-sizing:border-box;}
	.tbAdd td input{width:100%; min-height:30px; box-sizing:border-box; padding:0 10px;}
	.tbAdd td textarea{width:100%; min-height:300px; padding:10px; box-sizing:border-box; resize: none;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.BoardWrite {background:#43b984}
	.btnDelete{background:#f00;}
</style>