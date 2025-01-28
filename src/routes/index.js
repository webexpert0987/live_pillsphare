import About from '../pages/About';
import Checkout from '../pages/Checkout';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Payment from '../pages/Payment';
import Registration from '../pages/Registration';
import Product from '../pages/product';
import ThankYouPage from '../pages/thankyou';
import Shop from '../pages/Shop';
import CategoryPage from '../pages/CategoryPage';

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/Shop",
    component: Shop,
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
    path: "/product/:slug",
    component: Product,
    exact: true,
  },
  {
    path: "/category/:slug",
    component: CategoryPage,
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
  {
    path: "/thankyou",
    component: ThankYouPage,
    exact: true,
  },
//   {
//     path: "*",  // Wildcard for 404 Page
//     component: NotFoundPage,
//   }
];

export default routes;