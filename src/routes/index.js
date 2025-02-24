import About from "../pages/About";
import Checkout from "../pages/Checkout";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Payment from "../pages/Payment";
import Registration from "../pages/Registration";
import Product from "../pages/product";
import ThankYouPage from "../pages/thankyou";
import Shop from "../pages/Shop";
import CategoryPage from "../pages/CategoryPage";
import WeightLoss from "../pages/WeightLoss";
import Questionnaire from "../components/Questionnaire/QuestionnairePage";
import OffersPage from "../components/Offers/OffersPage";
import OnlineClinic from "../components/OnlineClinic/OnlineClinicPage";
import Faqs from "../components/Faqs/Faqs";
import Orderhisttory from "../pages/orderHistory";
import OnlineClinicCategory from "../pages/OnlineClinicCategory";
import SupportPage from "../components/Support/Support";

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
  {
    path: "/weight-loss",
    component: WeightLoss,
    exact: true,
  },
  {
    path: "/questionnaire",
    component: Questionnaire,
    exact: true,
  },
  {
    path: "/offers",
    component: OffersPage,
    exact: true,
  },
  {
    path: "/online-clinic",
    component: OnlineClinic,
    exact: true,
  },
  {
    path: "/faqs",
    component: Faqs,
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
    path: "/order-history",
    component: Orderhisttory,
    exact: true,
  },
  //   {
  //     path: "*",  // Wildcard for 404 Page
  //     component: NotFoundPage,
  //   }

  {
    path: "/online-clinic/:slug",
    component: OnlineClinicCategory,
    exact: true,
  },
  {
    path: "/support",
    component: SupportPage,
    exact: true,
  },
];

export default routes;
