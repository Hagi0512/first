import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "@/views/error/NotFound.vue";
import PkIndexView from "@/views/pk/PkIndexView.vue";
import RankListIndexView from "@/views/ranklist/RankListIndexView.vue";
import RecordIndexView from "@/views/record/RecordIndexView.vue";
import UserBotIndexView from "@/views/user/bot/UserBotIndexView.vue";
import TexT from "@/components/TexT.vue";
import TexT2 from "@/components/TexT2.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RankListIndexView,
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
  },
  {
    path: "/user/bot/",
    name: "userbot_index",
    component: UserBotIndexView,
  },
  {
    path: "/404/",
    name: "Not Found",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  },
  {
    path: "/text1/",
    name: "text1",
    component: TexT,
  },
  {
    path: "/text2/",
    name: "text2",
    component: TexT2,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
