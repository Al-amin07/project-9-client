"use client"

import { type LucideIcon } from "lucide-react"

import {
    Collapsible,

    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,

    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({
    items,
}: {
    items: {
        title: string
        href: string
        icon?: LucideIcon
        // isActive?: boolean
        // items?: {
        //     title: string
        //     url: string
        // }[]
    }[]
}) {
    const pathname = usePathname()
    return (
        <SidebarGroup>

            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton className="py-3" tooltip={item.title}>
                                    {item.icon && <span className=""><item.icon /></span>}
                                    <Link className={`${pathname === item.href ? "bg-primary text-white" : "text-black"}  py-4 px-4 w-full `} href={item.href}>
                                        <span>{item.title}</span></Link>

                                </SidebarMenuButton>
                            </CollapsibleTrigger>

                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
