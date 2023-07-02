import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router';
import HomePage from "@/Routerview/HomePage.vue";
import MyTimeTravel from "@/Routerview/MyTimeTravel.vue";
import test from "@/Routerview/test.vue";


const routes = [


    {
        path: '/',
        redirect: '/HomePage'
    },
    {
        path: '/HomePage',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path: '/Time',
        name: 'Time',
        component: MyTimeTravel
    },
    {
        path:'/test/:id',
        name:'Ti',
        component:test
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;