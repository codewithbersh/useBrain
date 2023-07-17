import { Icons } from "@/components/icons";
import { NavItem } from "@/types";

export const mainConfig: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Icons.layoutDashboard,
  },
  {
    title: "Lesson",
    href: "/lesson",
    icon: Icons.scrollText,
  },
  {
    title: "Explore",
    href: "/explore",
    icon: Icons.globe,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Icons.settings,
  },
];
