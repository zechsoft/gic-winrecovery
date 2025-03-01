  import Dashboard from "views/Dashboard/Dashboard.js";
  import Tables from "views/Dashboard/Tables.js";
  import SupplierInfo from "views/Dashboard/SupplierInfo.js";
  import CustomerOrder from "views/Dashboard/CustomerOrder.js";
  import Profile from "views/Dashboard/Profile.js";
  import SignIn from "views/Pages/SignIn.js";
  import SignUp from "views/Pages/SignUp.js";
  import MaterialReplenishment from "views/Dashboard/MaterialReplenishment.js"; 
  import MaterialInquiry from "views/Dashboard/MaterialInquiry.js";
  import CustomerDeliveryNotice from "views/Dashboard/CustomerDeliveryNotice.js";
  import DailyWorkReport from "views/Dashboard/DailyWorkReport.js";

  import {
    HomeIcon,
    StatsIcon,
    CreditIcon,
    PersonIcon,
    DocumentIcon,
    RocketIcon,
    SupportIcon,
  } from "components/Icons/Icons";

  var clientRoutes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <HomeIcon color='inherit' />,
      component: Dashboard,
      layout: "/client",  // Changed to client layout
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <PersonIcon color='inherit' />,
      secondaryNavbar: true,
      component: Profile,
      layout: "/client",  // Changed to client layout
    },
    {
      path: "/signin",
      name: "Sign In",
      icon: <DocumentIcon color='inherit' />,
      component: SignIn,
      layout: "/auth",
    },
    {
      path: "/signup",
      name: "Sign Up",
      icon: <DocumentIcon color='inherit' />,
      component: SignUp,
      layout: "/auth",
    },
    {
      path: "/daily-work-report",
      name: "Daily Work",
      icon: <StatsIcon color='inherit' />,
      component: DailyWorkReport,
      state: "pageCollapse",
      layout: "/client",  // Changed to client layout
    },
    {
      path: "/tables",
      name: "View Tables",
      icon: <StatsIcon color='inherit' />,
      component: Tables,
      state: "pageCollapse",
      layout: "/client",  // Changed to client layout
    },
    {
      name: "Tables",
      category: "account",
      state: "pageCollapse",
      views: [
        {
          path: "/supplier-info",
          name: "Supplier Info",
          icon: <StatsIcon color='inherit' />,
          secondaryNavbar: true,
          component: SupplierInfo,
          layout: "/client",  // Changed to client layout
        },
        {
          path: "/customer-order",
          name: "Customer Order",
          icon: <StatsIcon color='inherit' />,
          secondaryNavbar: true,
          component: CustomerOrder,
          layout: "/client",  // Changed to client layout
        },
        {
          path: "/material-inquiry",
          name: "Material Inquiry",
          icon: <StatsIcon color='inherit' />,
          secondaryNavbar: true,
          component: MaterialInquiry,
          layout: "/client",  // Changed to client layout
        },
        {
          path: "/material-replenishment",
          name: "Material Replenish",
          icon: <StatsIcon color='inherit' />,
          secondaryNavbar: true,
          component: MaterialReplenishment,
          layout: "/client",  // Changed to client layout
        },
        {
          path: "/customer-delivery-notice",
          name: "Customer Delivery",
          icon: <StatsIcon color='inherit' />,
          secondaryNavbar: true,
          component: CustomerDeliveryNotice,
          layout: "/client",  // Changed to client layout
        },
      ],
    },
  ];

  export default clientRoutes;
