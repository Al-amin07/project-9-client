"use client"

import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { useAuth } from "@/provider/UserProvider"
import { adminLinks, userLinks } from "./navLinks"
import { IUser } from "@/types"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, logOut, isLoading } = useAuth()!

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}
            </SidebarHeader>
            {
                !user && isLoading ? <p>Loading....</p> : <SidebarContent>
                    <NavMain items={user?.role === "ADMIN" ? adminLinks : userLinks} />

                </SidebarContent>
            }
            <SidebarFooter>
                <NavUser logOut={logOut} user={user as IUser} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
