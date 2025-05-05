"use client"

import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { useAuth } from "@/provider/UserProvider"
import { adminLinks, userLinks } from "./navLinks"
import { IUser } from "@/types"
import { UserCircle } from "lucide-react"
import Link from "next/link"
import { PuffLoader } from "react-spinners"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, logOut, isLoading } = useAuth()!
    const { open } = useSidebar()

    return (
        <>

            <Sidebar className={`${!open && '-translate-x-32'}`} collapsible="icon" {...props} >
                <SidebarHeader>
                    <div className="">

                        <Link href={'/'} className={`text-2xl block mx-auto text-center w-full font-semibold text-primary py-4 hover:scale-110 transition-all duration-400 ${!open ? "opacity-0" : ""} transition-all duration-1000`}>RateMyBite  </Link>
                        <div className="flex flex-col gap-5
                     p-2 border-y border-gray-200 bg-white">

                            <div className="flex flex-col  items-center ">
                                <UserCircle className="w-12 h-12" />
                                <div className="flex flex-col items-center text-right">
                                    <span className="text-sm font-medium text-gray-800">{user?.fullName || "John Doe"}</span>
                                    <span className="text-xs text-gray-500">{user?.role}</span>
                                </div>

                            </div>
                        </div>




                    </div>

                </SidebarHeader>
                {
                    !user && isLoading ? <div className="h-full flex items-center justify-center">
                        <PuffLoader
                            color="#FF3C48"
                            size={40}
                            speedMultiplier={1}
                        />

                    </div> : <SidebarContent>
                        <NavMain items={user?.role === "ADMIN" ? adminLinks : userLinks} />

                    </SidebarContent>
                }
                <SidebarFooter>
                    <NavUser logOut={logOut} user={user as IUser} />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>

        </>
    )
}
