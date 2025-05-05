import { ILink } from "@/types/link.type";
import { LucideAlbum, LucidePanelRightInactive, SquareTerminal, UserRoundPenIcon, Users } from "lucide-react";

export const adminLinks: ILink[] = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
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
        icon: LucidePanelRightInactive,
    },
    {
        title: "Categories",
        href: "/admin/categories",
        icon: LucideAlbum,
    },
    {
        title: "My Profile",
        href: "/profile",
        icon: UserRoundPenIcon,
    },


];
export const userLinks = [
    {
        title: "Dashboard",
        href: "/user/dashboard",
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
    },
    {
        title: "My Profile",
        href: "/profile",
        icon: UserRoundPenIcon,
    },
];

