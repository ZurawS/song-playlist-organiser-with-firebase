import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue";
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue";
import UserPlaylists from "../views/playlists/UserPlaylists.vue";

//route guard
import { projectAuth } from "@/firebase/config";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    return next({
      name: "Login",
    });
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/playlist/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlist/:id",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: "/playlist/user",
    name: "UserPlaylists",
    component: UserPlaylists,
    beforeEnter: requireAuth,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
