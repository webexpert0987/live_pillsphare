import About from '../pages/About';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Registration from '../pages/Registration';

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/about",
    component: About,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/registration",
    component: Registration,
    exact: true,
  },
//   {
//     path: "*",  // Wildcard for 404 Page
//     component: NotFoundPage,
//   }
];

export default routes;