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
import BlogPage from "../components/Blog";
//////////////////////
import HeyFever from "../components/CategoryInfoPages/HayFever";
import CystitisTreatment from "../components/CategoryInfoPages/CystitisTreatment";
import ContraceptiveTreatment from "../components/CategoryInfoPages/ContraceptiveTreatment";
import AcidReflux from "../components/CategoryInfoPages/AcidReflux";
import PrematureEjaculation from "../components/CategoryInfoPages/PrematureEjaculation";
import HairLoss from "../components/CategoryInfoPages/HairLoss";
import ErectileDysPage from "../components/CategoryInfoPages/ErectileDysfunction";
import StopSmokingPage from "../components/CategoryInfoPages/StopSmoking";
import PeriodPainPage from "../components/CategoryInfoPages/PeriodPain";
import PeriodDelayPage from "../components/CategoryInfoPages/PeriodDelay";
import MigraineTreatmentPage from "../components/CategoryInfoPages/MigraineTreatment";

import PrivacyPolicy from "../components/PolicyPages/PrivacyPolicy";
import RefundsReturns from "../components/PolicyPages/RefundsReturns";
import ReorderYourPrescription from "../components/PolicyPages/ReorderYourPrescription";
import TermsAndConditions from "../components/PolicyPages/TermsAndConditions";
import TermsOfUse from "../components/PolicyPages/TermsOfUse";
import OurPrescribers from "../components/PolicyPages/OurPrescribers";
import LowPriceGuarantee from "../components/PolicyPages/LowPriceGuarantee";
import FeedbackComplaints from "../components/PolicyPages/FeedbackComplaints";
import DeliveryInformation from "../components/PolicyPages/DeliveryInformation";
import CookiesPolicy from "../components/PolicyPages/CookiesPolicy";
import UserAccount from "../pages/UserAccount";

import HowItWork from "../pages/HowItWork";

import Verification from "../pages/Verification";
import ForgotPassword from "../pages/ForgotPassword";
import BlogDetail from "../components/Blog/BlogDetail";
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
    component: BlogPage,
    exact: true,
  },
  {
    path: "/support/:slug",
    component: BlogDetail,
    exact: true,
  },
  {
    path: "/heyfever",
    component: HeyFever,
    exact: true,
  },
  {
    path: "/cystitis-treatment",
    component: CystitisTreatment,
    exact: true,
  },
  {
    path: "/contraceptive-treatment",
    component: ContraceptiveTreatment,
    exact: true,
  },
  {
    path: "/acid-reflux",
    component: AcidReflux,
    exact: true,
  },
  {
    path: "/premature-ejaculation",
    component: PrematureEjaculation,
    exact: true,
  },
  {
    path: "/hair-loss",
    component: HairLoss,
    exact: true,
  },
  {
    path: "/erectile-dys",
    component: ErectileDysPage,
    exact: true,
  },
  {
    path: "/stop-smoking",
    component: StopSmokingPage,
    exact: true,
  },
  {
    path: "/period-pain",
    component: PeriodPainPage,
    exact: true,
  },
  {
    path: "/period-delay",
    component: PeriodDelayPage,
    exact: true,
  },
  {
    path: "/migraine-treatment",
    component: MigraineTreatmentPage,
    exact: true,
  },
  {
    path: "/verification",
    component: Verification,
    exact: true,
  },
  {
    path: "/thankyou",
    component: ThankYouPage,
    exact: true,
  },
  {
    path: "/privacy-policy",
    component: PrivacyPolicy,
    exact: true,
  },
  {
    path: "/refunds-returns",
    component: RefundsReturns,
    exact: true,
  },
  {
    path: "/reorder-prescription",
    component: ReorderYourPrescription,
    exact: true,
  },
  {
    path: "/terms-conditions",
    component: TermsAndConditions,
    exact: true,
  },
  {
    path: "/terms-of-use",
    component: TermsOfUse,
    exact: true,
  },
  {
    path: "/our-prescribers",
    component: OurPrescribers,
    exact: true,
  },
  {
    path: "/low-price-guarantee",
    component: LowPriceGuarantee,
    exact: true,
  },
  {
    path: "/feedback-complaints",
    component: FeedbackComplaints,
    exact: true,
  },
  {
    path: "/delivery-information",
    component: DeliveryInformation,
    exact: true,
  },
  {
    path: "/cookies-policy",
    component: CookiesPolicy,
    exact: true,
  },
  {
    path: "/account",
    component: UserAccount,
    exact: true,
  },
  {
    path: "/how-it-work",
    component: HowItWork,
    exact: true,
  },
  {
    path: "/forgot",
    component: ForgotPassword,
    exact: true,
  },
];

export default routes;
