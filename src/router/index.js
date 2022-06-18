import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../components/Layout";
import Bookrack from "../views/Bookrack";
import Statistic from "../views/Statistic";
import Truelove from "../views/Truelove";
import Other from "../views/Other";
import Extract from "../views/Extract";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "layout",
    redirect: "/extract",
    component: Layout,
    children: [
      {
        path: "bookrack",
        name: "bookrack",
        redirect: "/extract",
        component: Bookrack,
        children: [
          {
            path: "truelove",
            name: "truelove",
            component: Truelove,
          },
          {
            path: "other",
            name: "other",
            component: Other,
          }
        ]
      },
      {
        path: "statistic",
        name: "statistic",
        component: Statistic,
      },
      {
        path: "extract",
        name: "extract",
        component: Extract,
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
