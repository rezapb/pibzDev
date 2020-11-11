import React from "react";

import {
  Home,
  MenuBook,
  Code,
  Phone,
  PersonAdd,
  VpnKey,
  Dashboard,
  ExitToApp,
  Build,
} from "@material-ui/icons";

// Guest Links
export const guestsLinks = [
  {
    href: "/",
    text: "خانه",
    icon: <Home />,
  },
  {
    href: "/posts",
    text: "مقالات",
    icon: <MenuBook />,
  },
  {
    href: "/about",
    text: "درباره من",
    icon: <Code />,
  },
  {
    href: "/contact",
    text: "تماس با من",
    icon: <Phone />,
  },
];
export const guestsLinksBottom = [
  {
    href: "/register",
    text: "ثبت نام",
    icon: <PersonAdd />,
  },
  {
    href: "/login",
    text: "ورود",
    icon: <VpnKey />,
  },
];

// User Links
export const userLinks = [
  {
    href: "/",
    text: "خانه",
    icon: <Home />,
  },
  {
    href: "/posts",
    text: "مقالات",
    icon: <MenuBook />,
  },
  {
    href: "/dashboard",
    text: "داشبورد",
    icon: <Dashboard />,
  },
  {
    href: "/about",
    text: "درباره من",
    icon: <Code />,
  },
  {
    href: "/contact",
    text: "تماس با من",
    icon: <Phone />,
  },
];
export const userLinksBottom = [
  {
    href: "/#",
    text: "خروج",
    icon: <ExitToApp />,
  },
];

// Admin Links
export const adminLinks = [
  {
    href: "/",
    text: "خانه",
    icon: <Home />,
  },
  {
    href: "/posts",
    text: "مقالات",
    icon: <MenuBook />,
  },
  {
    href: "/dashboard",
    text: "داشبورد",
    icon: <Dashboard />,
  },
  {
    href: "/adminPanel",
    text: "پنل ادمین",
    icon: <Build />,
  },
  {
    href: "/about",
    text: "درباره من",
    icon: <Code />,
  },
  {
    href: "/contact",
    text: "تماس با من",
    icon: <Phone />,
  },
];
export const adminLinksBottom = [
  {
    href: "/#",
    text: "خروج",
    icon: <ExitToApp />,
  },
];
