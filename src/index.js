import {createRouter, createWebHistory} from 'vue-router';
import HomePage from "@/Routerview/HomePage.vue";
import MyTimeTravel from "@/Routerview/MyTimeTravel.vue";


const routes = [
    {
        path:'/',
      redirect:'/HomePage',
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
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;