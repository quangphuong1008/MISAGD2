import Employee from '../views/Employee.vue'
import VueRouter from 'vue-router';
import AccountObjectList from '../views/account_object/AccountObjectDetail.vue'

const routes = [
    { path: "/", redirect: '/home' },
    {
        path: "/home", 
        name: "home", 
        component: AccountObjectList
    },
    {
        path: "/CAProcess",
        component: Employee
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router;