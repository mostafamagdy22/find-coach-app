import { createRouter, createWebHistory } from "vue-router";
import CoachDetails from "./pages/coaches/CoachDetails.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegister from "./pages/coaches/CoachRegister.vue";

import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestRecived from "./pages/requests/RequestsRecived.vue";

import UserAuth from './pages/auth/UserAuth.vue';

import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      props: true,
      component: CoachDetails,
      children: [{ path: "contact", component: ContactCoach }],
    },
    { path: "/register", component: CoachRegister },
    { path: "/request", component: RequestRecived },
    { path: '/auth', component: UserAuth},
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
