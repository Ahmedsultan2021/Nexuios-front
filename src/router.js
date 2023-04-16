import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import dashboard from "./views/dashboard.vue";
import Home from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import showRoom from "./views/room/showRoom.vue";
import editRoom from "./views/room/editRoom.vue";
import allusers from "./views/users/showAllUsers.vue";
import test from "./views/room/test.vue";
import addRoom from "./views/room/addRoom.vue";
import Profile from "./views/Profile.vue";
import axios from "./axios.config";

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      components: {
        header: AppHeader,
        default: dashboard,
        footer: AppFooter
      }
    },
    {
      path: "/",
      name: "display-2",
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        // footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        // footer: AppFooter
      }
    },
    {
      path: "/test",
      name: "test",
      components: {
        header: AppHeader,
        default: test,
        footer: AppFooter
      }
    },
    {
      path: "/editRoom/:id",
      name: "editRoom",
      props: true,
      components: {
        header: AppHeader,
        default: editRoom,
        footer: AppFooter
      }
    },
    {
      path: "/addRoom",
      name: "addRoom",
      components: {
        header: AppHeader,
        default: addRoom,
        footer: AppFooter
      }
    },
    {
      path: "/allusers",
      name: "allusers",
      components: {
        header: AppHeader,
        default: allusers,
        footer: AppFooter
      }
    },
    {
      path: "/showRoom/:id",
      name: "showRoom",
      props: true,
      components: {
        header: AppHeader,
        default: showRoom,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    }
  ],
  
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token && to.name !== "login" && to.name !== "display-2") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router