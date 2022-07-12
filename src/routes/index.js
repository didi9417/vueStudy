import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from '@/components/HelloWorld'; //메인 컴포넌트 호출
import BoardList from '@/components/board/BoardList'; //게시판 리스트 컴포넌트 호출
import BoardWrite from '@/components/board/BoardWrite'; // 게시글 등록 컴포넌트 호출
import BoardDetail from '@/components/board/BoardDetail'; // 게시글 상세보기 컴포넌트 호출

const routes = [
    {
        path:'/',
        name:HelloWorld,
        component:HelloWorld
    },
    {
        path:'/board/BoardList',
        name:BoardList,
        component:BoardList
    },
    {
        path:'/board/BoardWrite',
        name:BoardWrite,
        component:BoardWrite
    },
    {
        path:'/board/BoardDetail',
        name:BoardDetail,
        component:BoardDetail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router