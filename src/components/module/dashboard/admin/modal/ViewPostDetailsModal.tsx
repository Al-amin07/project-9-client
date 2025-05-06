import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,

    DialogTrigger,
} from "@/components/ui/dialog";
import { IPost, IUser } from "@/types";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ViewPostDetailsModal({ post }: { post: IPost }) {
    const statusIcon =
        post.status === "APPROVED" ? (
            <CheckCircle className="w-4 h-4 text-green-600 inline mr-1" />
        ) : post.status === "REJECTED" ? (
            <XCircle className="w-4 h-4 text-red-600 inline mr-1" />
        ) : (
            <Clock className="w-4 h-4 text-gray-500 inline mr-1" />
        );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="border-0 text-sm cursor-pointer hover:bg-secondary px-2.5 py-1.5 ">View Details</span>
            </DialogTrigger>

            <DialogContent className="max-w-2xl p-4 pt-8 overflow-hidden rounded-xl">
                <div className="flex  gap-4">
                    <img
                        src={post?.image}
                        alt={post?.title}
                        className="w-full flex-1 h-32 object-cover"
                    />
                    <DialogHeader className=" flex-1">
                        <h1 className="text-2xl font-bold">{post?.title}</h1>
                        <p className="text-sm text-muted-foreground">
                            Posted by {(post?.user as IUser)?.fullName} ({(post?.user as IUser)?.role})
                        </p>
                        <p>{post?.location}</p>
                    </DialogHeader>
                </div>

                <div className="">


                    <div className="space-y-3 text-sm text-gray-700">
                        <Detail label="Description" value={post.description} />

                        <Detail label="Category" value={post.category.name} />
                        <Detail label="Price" value={`$${post.price.toFixed(2)}`} />

                        <Detail label="Premium" value={post.isPremium ? "Yes" : "No"} />
                        <div>
                            <span className="font-medium text-gray-900">Status:</span>{" "}
                            <Badge

                                className={`ml-1 rounded-full ${post.status === "APPROVED"
                                    ? "bg-green-50 text-green-500"
                                    : post.status === "REJECTED"
                                        ? "bg-red-50 text-red-500"
                                        : "bg-yellow-50 text-yellow-500"}`}
                            >
                                {statusIcon}
                                {post.status}
                            </Badge>
                        </div>
                        {post?.reasons && (
                            <Detail label="Rejection Reason" value={post.reasons} />
                        )}
                        <Detail
                            label="Created At"
                            value={new Date(post.createdAt).toLocaleString()}
                        />

                    </div>

                    <div className="mt-6 text-right">
                        <DialogClose asChild>
                            <Button variant="outline">
                                Close
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function Detail({ label, value }: { label: string; value: string | number }) {
    return (
        <p>
            <span className="font-medium text-gray-900">{label}:</span>{" "}
            <span className="text-gray-700">{value}</span>
        </p>
    );
}
