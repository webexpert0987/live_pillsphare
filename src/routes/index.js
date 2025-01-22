import About from '../pages/About';
import Checkout from '../pages/Checkout';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Payment from '../pages/Payment';
import Registration from '../pages/Registration';
import Product from '../pages/product';

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
  {
    path: "/product/:id",
    component: Product,
    exact: true,
  },
  // {
  //   path: "/checkout",
  //   component: Checkout,
  //   exact: true,
  // },
  {
    path: "/payment",
    component: Payment,
    exact: true,
  },
//   {
//     path: "*",  // Wildcard for 404 Page
//     component: NotFoundPage,
//   }
];

export default routes;