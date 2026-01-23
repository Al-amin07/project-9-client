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
import Image from "next/image"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, logOut, isLoading } = useAuth()!
    const { open } = useSidebar()

    return (
        <>

            <Sidebar className={`${!open && '-translate-x-32'}`} collapsible="icon" {...props} >
                <SidebarHeader>
                    <div className="">

                        <Link href="/" className="flex items-center justify-center gap-2 p-0 ">
                            <Image
                                src="/image/logo/logo.png"
                                alt="Logo"
                                width={150}
                                height={150}
                                className=""
                            />

                        </Link>
                        <div className="flex flex-col gap-5
                     p-2 border-y border-gray-200 bg-white">

                            <div className="flex flex-col  items-center ">
                                <UserCircle className="w-12 h-12" />
                                <div className="flex flex-col items-center text-right">
                                    <span className="text-sm font-medium text-gray-800">{user?.fullName || ""}</span>
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
