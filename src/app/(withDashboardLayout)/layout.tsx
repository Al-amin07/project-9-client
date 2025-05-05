import React from 'react'

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/module/dashboard/sidebar/app-sidebar'

import { DashboardNavbar } from '@/components/module/dashboard/DashboardNavbar'
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex justify-between   h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center justify-between w-full  px-4">
                        <div>
                            <SidebarTrigger className="-ml-1 cursor-pointer" />
                        </div>
                        <DashboardNavbar />
                    </div>
                </header>
                <div className="  p-8 pt-0">

                    {children}

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
