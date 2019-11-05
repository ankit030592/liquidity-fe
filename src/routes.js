import Home from './components/Home.vue';
import UserForm from './components/UserForm.vue';
import Login from './components/Login.vue';
import GetUser from './components/getUser.vue';
import Department from './components/Department.vue';
import Error from './components/404.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: UserForm },
    { path: '/login', component: Login },
    { path: '/user/:id', component: GetUser },
    { path: '/department', component: Department },
    { path: '/404', component: Error, name: '404' }
];

export default routes;
