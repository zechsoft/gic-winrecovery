import React, { Component } from 'react';
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

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: Profile,
    layout: "/admin",
  },
  {
    name: "Tables",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/supplier-info",
        name: "Supplier Info",
        rtlName: "لوحة القيادة",
        icon: <StatsIcon color='inherit' />,
        secondaryNavbar: true,
        component: SupplierInfo,
        layout: "/admin",
      },
      {
        path: "/customer-order",  // Updated path
        name: "Customer Order",  // Updated name
        rtlName: "لوحة القيادة",
        icon: <StatsIcon color='inherit' />,
        secondaryNavbar: true,
        component: CustomerOrder,  // Updated component name
        layout: "/admin",
      },
      {
        path: "/material-inquiry",  // Updated path
        name: "Material Inquiry",  // Updated name
        rtlName: "لوحة القيادة",
        icon: <StatsIcon color='inherit' />,
        secondaryNavbar: true,
        component: MaterialInquiry,  // Updated component name
        layout: "/admin",
      },
      {
        path: "/material-replenishment",  // Updated path
        name: "Material Replenish",  // Added line break
        rtlName: "لوحة القيادة",
        icon: <StatsIcon color='inherit' />,
        secondaryNavbar: true,
        component: MaterialReplenishment,  // Updated component name
        layout: "/admin",
      },
      {
        path: "/customer-delivery-notice",  // Updated path
        name: "Customer Delivery",  // Updated name
        rtlName: "لوحة القيادة",
        icon: <StatsIcon color='inherit' />,
        secondaryNavbar: true,
        component: CustomerDeliveryNotice,  // Updated component name
        layout: "/admin",
      },

    ],
  },
  
  {
    path: "/daily-work-report",
    name: "Daily Work",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color='inherit' />,
    component: DailyWorkReport,
    state: "pageCollapse",
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "View Tables",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color='inherit' />,
    component: Tables,
    state: "pageCollapse",
    layout: "/admin",
  },
  {
    path: "/signin",
    name: "Sign In",
    rtlName: "لوحة القيادة",
    icon: <DocumentIcon color='inherit' />,
    component: SignIn,
    layout: "/auth",
  },
  {
    path: "/signup",
    name: "Sign In",
    rtlName: "لوحة القيادة",
    icon: <DocumentIcon color='inherit' />,
    component: SignUp,
    layout: "/auth",
  },
];

export default dashRoutes;