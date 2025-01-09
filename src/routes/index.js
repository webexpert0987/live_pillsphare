import About from '../pages/About';
import HomePage from '../pages/HomePage';

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
//   {
//     path: "*",  // Wildcard for 404 Page
//     component: NotFoundPage,
//   }
];

export default routes;