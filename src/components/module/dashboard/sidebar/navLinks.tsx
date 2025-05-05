import { ILink } from "@/types/link.type";
import { SquareTerminal, Users } from "lucide-react";

export const adminLinks: ILink[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: SquareTerminal,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "Posts",
        href: "/admin/posts",
        icon: Users,
    },
    {
        title: "Categories",
        href: "/admin/categories",
        icon: Users,
    },
    {
        title: "Comments",
        href: "/user/comments",
        icon: Users,
    },


];
export const userLinks = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: SquareTerminal,
    },
    {
        title: "Users",
        href: "/users",
        icon: Users,
    },
    {
        title: "My Posts",
        href: "/user/posts",
        icon: Users,
    }
];

