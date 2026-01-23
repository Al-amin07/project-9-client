"use client";

import { User, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IUser } from "@/types";
import Link from "next/link";

export default function Profile({ data }: { data: IUser }) {
    return (
        <div className="max-w-xl mx-auto mt-10 px-4">
            <Card className="max-w-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Profile</CardTitle>
                    <Link href={'/change-password'}>
                        <Button variant="outline" size="sm" className="cursor-pointer">
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Change Password
                        </Button>
                    </Link>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col items-center mb-6">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage
                                src={data?.photo || "/placeholder.svg?height=96&width=96"}
                                alt="Profile picture"
                            />
                            <AvatarFallback>
                                <User className="h-12 w-12" />
                            </AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-semibold">{data?.fullName || "John Doe"}</h2>
                        <h2 className="text-xs mt-2 bg-red-100 text-red-500 px-3 py-1 rounded-full font-bold capitalize">{data?.role || "USER"}</h2>
                    </div>

                    <div className="space-y-5">
                        <div className="flex justify-between items-center w-full ">
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                                <p>{data?.email || "johndoe@example.com"}</p>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                                {
                                    data?.status === 'ACTIVE' ?
                                        <p className="bg-green-100 text-green-500 text-xs px-3 py-1 rounded-full font-bold capitalize">{data?.status}</p>
                                        :
                                        data?.status === "DELETED" ?
                                            <p className="bg-red-100 text-red-500 px-3 text-xs py-1 rounded-full font-bold capitalize">{data?.status}</p>
                                            :
                                            <p className="bg-yellow-100 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold capitalize">{data?.status}</p>
                                }

                            </div>
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                            <p className="whitespace-pre-wrap">
                                {"I'm a software developer based in New York. I specialize in building web applications using React and Next.js."}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
